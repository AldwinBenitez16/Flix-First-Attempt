import React, {Component} from 'react';

// Components
import Loading from './Loading';

import axios from 'axios';

// CSS
import '../css/info.css';

class Info extends Component {

    noRepeat = (movieArray, tvArray) => {
        let cleanArray = movieArray;

        for(let i = 0; i < movieArray.length; i++) {
            for(let x = 0; x < tvArray.length; x++) {
                if(movieArray[i] === tvArray[x]) {
                    cleanArray.splice(i);
                    {continue; }
                }
            }
        }
        return cleanArray;
    }

    rateMovie = (rating, type, id, session_id) => {
        axios({
            url: `https://api.themoviedb.org/3/${type}/${id}/rating?api_key=a34097a10fd6daf67cb09e71f3d7a0ea&session_id=${session_id}`,
            method: 'post',
            data: {
                value:  (parseFloat(rating) === 0) ? 0.50 : rating
            }
        })
        .then(res => console.log(res));
    }

    deleteRating = (type, id, session_id) => {
        axios({
            method: 'delete',
            url: `https://api.themoviedb.org/3/${type}/${id}/rating?api_key=a34097a10fd6daf67cb09e71f3d7a0ea&session_id=${session_id}`
        })
        .then(res => console.log(res));
    }

    updateValue = (step) => {
        let input = parseFloat(this.inputRef.current.textContent);
        if(input + step <= 10 && input + step >= 0) {
            this.inputRef.current.textContent = input + step;
        }
    }

    inputRef = React.createRef();
    render() {
        const {getData, containerRef, infoRef, createGenres} = this.props;

        let data = getData.posterInfo;

        let genreArray = [data.data];
        let movieArray = createGenres(genreArray, getData.data.movieGenres.genres);
        let tvArray = createGenres(genreArray, getData.data.tvGenres.genres);
        let cleanArray = this.noRepeat(movieArray, tvArray);

        let type = 'movie';
        let title = data.title;
        if(!title) {
            type = 'tv';
            title = data.data.name;
        }

        let date;
        if(data.data.release_date) date = data.data.release_date.substring(0, 4);
        if(data.data.first_air_date) date = data.data.first_air_date.substring(0, 4);
        
        const id = data.data.id;
        return (
            <div ref={infoRef} className='info-container'>
                <h2>{title}<span>({date})</span></h2>
                <button onClick={() => {
                        infoRef.current.style.display = 'none';
                        containerRef.current.style.width = '100vw';
                }} className='exit'>X</button>
                <h3>Overview</h3>
                <p className='overview'>{data.overview}</p>
                <ul className='genres'>
                    {cleanArray}
                </ul>
                <div className='rating-container'>
                    <button onClick={() => this.deleteRating(type, id, getData.user.session_id)}>Delete Rating</button>
                    <button onClick={() => this.updateValue(-(0.5))}>-</button>
                    <p ref={this.inputRef}>0</p>
                    <button onClick={() => this.updateValue(0.5)}>+</button>
                    <button onClick={() => this.rateMovie(this.inputRef.current.textContent, type, id, getData.user.session_id)}>Rate</button>
                </div>
            </div>
        );
    }
}

export default Info;
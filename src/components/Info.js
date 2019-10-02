import React, {Component} from 'react';

// Components
import Loading from './Loading';

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

    render() {
        const {getData, containerRef, infoRef, createGenres} = this.props;

        let data = getData.posterInfo;

        let genreArray = [data.data];
        let movieArray = createGenres(genreArray, getData.data.movieGenres.genres);
        let tvArray = createGenres(genreArray, getData.data.tvGenres.genres);
        let cleanArray = this.noRepeat(movieArray, tvArray);

        let title = data.title;
        if(!title) title = data.data.name;

        let date;
        if(data.data.release_date) date = data.data.release_date.substring(0, 4);
        if(data.data.first_air_date) date = data.data.first_air_date.substring(0, 4);

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
            </div>
        );
    }
}

export default Info;
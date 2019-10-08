import React, {Component} from 'react';

// Components
import Loading from './Loading';

// axios
import axios from 'axios';

// cookies
import Cookies from 'js-cookie';

// CSS
import '../css/info.css';

// images
import list from '../images/svg/list.svg'
import addlist from '../images/svg/addlist.svg'
import removelist from '../images/svg/removelist.svg'
import addfavorite from '../images/svg/add-favorite.svg'
import removefavorite from '../images/svg/remove-favorite.svg'
import addwatch from '../images/svg/add-watch.svg'
import removewatch from '../images/svg/remove-watch.svg'

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

    async addMovieToList(media_name, media_id, list_id) {
        const {getData, addListMedia} = this.props;
        const session_id = getData.user.session_id;

        await axios({
            url: `https://api.themoviedb.org/3/list/${list_id}/add_item?api_key=a34097a10fd6daf67cb09e71f3d7a0ea&session_id=${session_id}`,
            method: 'post',
            data: {
                media_id: media_id
            }
        }).then(res => console.log(res));
        await addListMedia(list_id, {[media_id]: {name: media_name}});
        // console.log(this.props.getData.list);
        Cookies.set('list', JSON.stringify(this.props.getData.list), {expires: 2147483647});
    }

    async removeMoviesFromList(media_id, list_id) {
        const {getData, removeListMedia} = this.props;
        const session_id = getData.user.session_id;
    
        await axios({
            url: `https://api.themoviedb.org/3/list/${list_id}/remove_item?api_key=a34097a10fd6daf67cb09e71f3d7a0ea&session_id=${session_id}`,
            method: 'post',
            data: {
                media_id: media_id
            }
        }).then(res => console.log(res));
        removeListMedia(list_id, delete getData.list[list_id].media[media_id]);
        console.log(getData.list);
        Cookies.set('list', JSON.stringify(this.props.getData.list), {expires: 2147483647});
    }

    rateMovie = (rating, type, mediatype, name, id) => {
        const session_id = this.props.getData.user.session_id;
        axios({
            url: `https://api.themoviedb.org/3/${mediatype}/${id}/rating?api_key=a34097a10fd6daf67cb09e71f3d7a0ea&session_id=${session_id}`,
            method: 'post',
            data: {
                value:  (parseFloat(rating) === 0) ? 0.50 : rating
            }
        })
        .then(res => console.log(res));
        const list_id = this.getList(type);
        this.addMovieToList(name, id, list_id);
    } 

    deleteRating = (type, mediatype, id) => {
        let session_id = this.props.getData.user.session_id;
        axios({
            method: 'delete',
            url: `https://api.themoviedb.org/3/${mediatype}/${id}/rating?api_key=a34097a10fd6daf67cb09e71f3d7a0ea&session_id=${session_id}`
        })
        .then(res => console.log(res));
        const list_id = this.getList(type);
        this.removeMoviesFromList(id, list_id);
    }

    addMedia = (type, name, id) => {
        const list_id = this.getList(type);
        this.addMovieToList(name, id, list_id);
    }

    deleteMedia = (type, id) => {
        const list_id = this.getList(type);
        this.removeMoviesFromList(id, list_id);
    }

    getList = (type) => {
        let list_id;
        for(let key in this.props.getData.list) {
            if(this.props.getData.list[key].name === type) list_id = key
        }
        return list_id;
    }

    updateValue = (step) => {
        let input = parseFloat(this.inputRef.current.textContent);
        if(input + step <= 10 && input + step >= 0) {
            this.inputRef.current.textContent = input + step;
        }
    }

    createList = (name, id) => {
        const {getData} = this.props;
        let list = [];
        for(let key in getData.list) {
            if(getData.list[key].name !== 'Rated' &&
            getData.list[key].name !== 'Favorites' && 
            getData.list[key].name !== 'Watch Later') {
                list.push(
                <li id={key} key={key} onClick={(e) => {
                    const list_id = e.currentTarget.id;
                    {!(id in getData.list[key].media) ? this.addMovieToList(name, id, list_id) 
                    : this.removeMoviesFromList(id, list_id)}
                }}>{getData.list[key].name}
                <img 
                className='icon'
                src={!(id in getData.list[key].media) ? addlist : removelist} 
                alt='list icon'/>
                </li>
                );
            }    
        }

        return list;
    }

    inputRef = React.createRef();
    lsRef = React.createRef();
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
                { getData.user.isAuthenticated ?
                (
                    <div className='list-bar'> 
                        <div className='rating-container'>
                            <button onClick={() => this.deleteRating('Rated', type, id)}>Delete Rating</button>
                            <button onClick={() => this.updateValue(-(0.5))}>-</button>
                            <p ref={this.inputRef}>0</p>
                            <button onClick={() => this.updateValue(0.5)}>+</button>
                            <button onClick={() => this.rateMovie(this.inputRef.current.textContent, 'Rated', type, title, id)}>Rate</button>
                        </div>
                        <div className='addlist ls-container'>
                            <img 
                            onClick={() => {
                                if(this.lsRef.current.style.display === '') {
                                    this.lsRef.current.style.display = 'initial';
                                } else {
                                    this.lsRef.current.style.display = '';
                                }
                            }}
                            src={list} 
                            alt='list icon'
                            />
                            <div ref={this.lsRef} className='ls-overlay'>
                                {this.createList(title, id)}
                            </div>
                        </div>
                        <div className='addlist'>
                            <img 
                            src={!(id in getData.list[this.getList('Favorites')].media) ? addfavorite : removefavorite} 
                            alt='favorite icon' 
                            onClick={() => !(id in getData.list[this.getList('Favorites')].media) ? this.addMedia('Favorites', title, id) : this.deleteMedia('Favorites', id)}     
                            />
                        </div>
                        <div className='addlist'>
                            <img 
                            src={!(id in getData.list[this.getList('Watch Later')].media) ? addwatch : removewatch} 
                            alt='watch later icon' 
                            onClick={() => !(id in getData.list[this.getList('Watch Later')].media) ? this.addMedia('Watch Later',title, id) : this.deleteMedia('Watch Later', id)}  
                            />
                        </div>
                    </div>
                )
                :
                null
                }
            </div>
        );
    }
}

export default Info;
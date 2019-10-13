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

    async addMovieToList(media_name, media_id, list_id, mediatype) {
        const {getData, addListMedia, createList} = this.props;
        const session_id = getData.user.session_id;

        if(mediatype === 'movie') {
            await axios({
                url: `https://api.themoviedb.org/3/list/${list_id}/add_item?api_key=a34097a10fd6daf67cb09e71f3d7a0ea&session_id=${session_id}`,
                method: 'post',
                data: {
                    media_id: media_id
                }
            });
            addListMedia(list_id, {[media_id]: {name: media_name}});
            createList();
        } else {
            console.log('Unable to add tv shows to list at current version');
        }
    }

    async removeMoviesFromList(media_id, list_id, mediatype) {
        const {getData, removeListMedia} = this.props;
        const session_id = getData.user.session_id;
    
        if(mediatype === 'movie') {
            await axios({
                url: `https://api.themoviedb.org/3/list/${list_id}/remove_item?api_key=a34097a10fd6daf67cb09e71f3d7a0ea&session_id=${session_id}`,
                method: 'post',
                data: {
                    media_id: media_id
                }
            }).then(res => console.log(res));
            removeListMedia(list_id, delete getData.list[list_id].media[media_id]);
        } else {
            console.log('Unable to add tv shows to list at current version');
        }
    }

    rateMovie = (rating, type, mediatype, name, id, session_id, session_type) => {
        axios({
            url: `https://api.themoviedb.org/3/${mediatype}/${id}/rating?api_key=a34097a10fd6daf67cb09e71f3d7a0ea&${session_type}=${session_id}`,
            method: 'post',
            data: {
                value:  (parseFloat(rating) === 0) ? 0.50 : rating
            }
        })
        .then(res => console.log(res));
        if(!this.props.getData.guest.isAuthenticated) {
            const list_id = this.getList(type);
            this.addMovieToList(name, id, list_id, mediatype);
        }
    } 

    deleteRating = (type, mediatype, id, session_id, session_type) => {
        axios({
            method: 'delete',
            url: `https://api.themoviedb.org/3/${mediatype}/${id}/rating?api_key=a34097a10fd6daf67cb09e71f3d7a0ea&${session_type}=${session_id}`
        })
        .then(res => console.log(res));
        if(!this.props.getData.guest.isAuthenticated) {
            const list_id = this.getList(type);
            this.removeMoviesFromList(id, list_id, mediatype);
        }
    }

    addMedia = (type, name, id, mediatype) => {
        const list_id = this.getList(type);
        this.addMovieToList(name, id, list_id, mediatype);
    }

    deleteMedia = (type, id, mediatype) => {
        const list_id = this.getList(type);
        this.removeMoviesFromList(id, list_id, mediatype);
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

    createList = (name, id, mediatype) => {
        const {getData} = this.props;
        let list = [];
        for(let key in getData.list) {
            if(getData.list[key].name !== 'Rated' &&
            getData.list[key].name !== 'Favorites' && 
            getData.list[key].name !== 'Watch Later') {
                list.push(
                <li id={key} key={key} onClick={(e) => {
                    const list_id = e.currentTarget.id;
                    if(!(id in getData.list[key].media)) { 
                        this.addMovieToList(name, id, list_id, mediatype)
                    } else {
                        this.removeMoviesFromList(id, list_id, mediatype)
                    }
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
        const authId = this.props.getData.user.session_id;
        const guestId = getData.guest.session_id;

        const favorites = getData.list[this.getList('Favorites')];
        const watch = getData.list[this.getList('Watch Later')];
        return (
            <div ref={infoRef} className='info-container'>
                <div className='info-card'>
                    <h2>{title}<span>({date})</span></h2>
                    <button onClick={() => {
                            infoRef.current.style.display = 'none';
                            containerRef.current.style.width = '100vw';
                            if(containerRef.current.style.display === 'none') {
                                containerRef.current.style.display = 'initial';
                            } 
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
                                <button onClick={() => this.deleteRating('Rated', type, id, authId, 'session_id')}>Delete Rating</button>
                                <button onClick={() => this.updateValue(-(0.5))}>-</button>
                                <p ref={this.inputRef}>0</p>
                                <button onClick={() => this.updateValue(0.5)}>+</button>
                                <button onClick={() => this.rateMovie(this.inputRef.current.textContent, 'Rated', type, title, id, authId, 'session_id')}>Rate</button>
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
                                    {this.createList(title, id, type)}
                                </div>
                            </div>
                            <div className='addlist'>
                                <img 
                                src={!(favorites ? id in favorites.media : false) ? addfavorite : removefavorite} 
                                alt='favorite icon' 
                                onClick={() => !(favorites ? id in favorites.media : false) ? this.addMedia('Favorites', title, id, type) : this.deleteMedia('Favorites', id, type)}     
                                />
                            </div>
                            <div className='addlist'>
                                <img 
                                src={!(favorites ? id in watch.media : false) ? addwatch : removewatch} 
                                alt='watch later icon' 
                                onClick={() => !(favorites ? id in watch.media : false) ? this.addMedia('Watch Later', title, id, type) : this.deleteMedia('Watch Later', id, type)}  
                                />
                            </div>
                        </div>
                    )
                    :
                    null
                    }

                    { getData.guest.isAuthenticated ?
                    (
                        <div className='list-bar'> 
                            <div className='rating-container'>
                                <button onClick={() => this.deleteRating('Rated', type, id, guestId, 'guest_session_id')}>Delete Rating</button>
                                <button onClick={() => this.updateValue(-(0.5))}>-</button>
                                <p ref={this.inputRef}>0</p>
                                <button onClick={() => this.updateValue(0.5)}>+</button>
                                <button onClick={() => this.rateMovie(this.inputRef.current.textContent, 'Rated', type, title, id, guestId, 'guest_session_id')}>Rate</button>
                            </div>
                        </div>
                    )
                    :
                    null
                    }
                </div>
            </div>
        );
    }
}

export default Info;
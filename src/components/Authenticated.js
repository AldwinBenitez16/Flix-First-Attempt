import React, {PureComponent} from 'react';

// Components
import Info from '../components/Info';
import Loading from '../components/Loading';
import List from '../components/List';

// CSS
import '../css/authenticated.css';

import axios from 'axios';
import Cookies from 'js-cookie';

class Authenticated extends PureComponent {

    UNSAFE_componentWillMount() {
        const {getSlides, getData} = this.props;
        getSlides(window.innerWidth);

        let prevWidth = window.innerWidth;
        function updateSlides() {
            let widthDif = window.innerWidth - prevWidth;
            if(Math.abs(widthDif) >= 230) {
                prevWidth = window.innerWidth;
                getSlides(window.innerWidth);
            }
            let frameID = window.requestAnimationFrame(updateSlides);
        }
        updateSlides();
        // Cookies.remove('list');
        // Checks if default lsit are created
        let Favorites;
        let Watch;
        let Rated;
        for(let key in getData.list) {
            if(getData.list[key].name === 'Favorites') Favorites = getData.list[key];
            if(getData.list[key].name === 'Watch Later') Watch = getData.list[key];
            if(getData.list[key].name === 'Rated') Rated = getData.list[key];
        }
        if(!Favorites) {
            this.updateList('Favorites', 'My favorite movies and tv shows');
        }
        if(!Watch) {
            this.updateList('Watch Later', 'Movies and tv shows Ill watch later');
        }
        if(!Rated) {
            this.updateList('Rated', 'Movies that Ive Rated');
        }
    }

    listRef = React.createRef();
    listdescRef = React.createRef();
    listnameRef = React.createRef();
    updateList = (name, desc) => {
        this.createList(name, desc);
    }

    async createList(name, desc) {
        const {getData, updateList} = this.props;
        const session_id = getData.user.session_id;

            await axios({
                url: `https://api.themoviedb.org/3/list?api_key=a34097a10fd6daf67cb09e71f3d7a0ea&session_id=${session_id}`,
                method: 'post',
                data: { 
                    name: name,
                    description: desc,
                    language: 'en'
                }
            })
            .then(res => {
                const list_id = res.data.list_id;
                updateList({[list_id]: {name, desc, media: {}}});
            })
            .catch( err => {
                if(err.response.status === 422) {
                    console.log('Invalid name/description for list');
                } else {
                    console.log('Error has occured', err);
                }
            });
            Cookies.set('list', JSON.stringify(this.props.getData.list), {expires: 365});
    }

    getId = (type) => {
        const {getData} = this.props;
        for(let key in getData.list) {
            if(getData.list[key].name === type) {
                return key;
            }
        }
    }

    render() {
        const {getData, getSlides, addListMedia, createGenres, removeListMedia, updateList, getPosterInfo, createList} = this.props;

        let name = this.listnameRef.current;
        let desc = this.listdescRef.current;
        return (
            <div>
                <div className='authlist-container'>
                    <div className='boxes'>
                        <div className='quantity'>{getData.list[this.getId('Favorites')].items || 0}</div>
                        <h3>Favourites</h3>
                    </div>
                    <div className='boxes'>
                        <div className='quantity'>{getData.list[this.getId('Watch Later')].items || 0}</div>
                        <h3>Watch Later</h3>
                    </div>
                    <div className='boxes'>
                        <div  className='quantity'>{getData.list[this.getId('Rated')].items || 0}</div>
                        <h3>Rated Movie</h3>
                    </div>
                    <div className='boxes list-container'>
                        <button id='create' onClick={() => {
                            if(this.listRef.current.style.display === '') {
                                this.listRef.current.style.display = 'flex'
                            } else {
                                this.listRef.current.style.display = ''
                            }
                        }}>+</button>
                        <h3>Create List</h3>
                        <div className='list-overlay' ref={this.listRef}>
                            <input ref={this.listnameRef} type='text' name='name' defaultValue='Name' onClick={(e) => {
                                if(e.currentTarget.value === 'Name') {
                                    e.currentTarget.value = '';
                                }
                            }} />
                            <textarea ref={this.listdescRef} defaultValue='A description of the list...' onClick={(e) => {
                                if(e.currentTarget.value === 'A description of the list...') {
                                    e.currentTarget.value = '';
                                }
                            }}> 
                            </textarea>
                            <button onClick={ () => {
                                if(!this.props.getData.guest.isAuthenticated) {
                                    this.updateList(name.value, desc.value)
                                } else {
                                    console.log('Please log-in to create list');
                                }
                                }}>Submit</button>
                            <button onClick={() => this.listRef.current.style.display = ''}>Cancel</button>
                        </div>
                    </div>
                </div>
                <List
                getData={getData}
                getSlides={getSlides}
                slideToShow={getData.slideToShow} 
                updateList={updateList}
                getPosterInfo={getPosterInfo}
                createGenres={createGenres}
                addListMedia={addListMedia}
                removeListMedia={removeListMedia}  
                createList={createList}
                />
            </div>
        );
    }
}

export default Authenticated;
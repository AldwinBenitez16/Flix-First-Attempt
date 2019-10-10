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

    containerRef = React.createRef();
    infoRef = React.createRef();

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

    render() {
        const {getData, getSlides, addListMedia} = this.props;

        let name = this.listnameRef.current;
        let desc = this.listdescRef.current;
        return (
            <div className='info-wrapper'>
                <div ref={this.containerRef} className='main-container'>
                    <div className='authlist-container'>
                        <button onClick={() => {
                            console.log(this.props.getData.list);
                        }}>
                            get list
                        </button>
                        <div className='boxes'>
                            <div className='quantity'>0</div>
                            <h3>Favourites</h3>
                        </div>
                        <div className='boxes'>
                            <div className='quantity'>0</div>
                            <h3>Watch Later</h3>
                        </div>
                        <div className='boxes'>
                            <div  className='quantity'>0</div>
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
                                <input ref={this.listnameRef} type='text' name='name' defaultValue='name' onClick={(e) => {
                                    if(e.currentTarget.value === 'name') {
                                        e.currentTarget.value = '';
                                    }
                                }} />
                                <textarea ref={this.listdescRef} defaultValue='A description of the list...' onClick={(e) => {
                                    if(e.currentTarget.value === 'A description of the list...') {
                                        e.currentTarget.value = '';
                                    }
                                }}> 
                                </textarea>
                                <button onClick={ () =>this.updateList(name.value, desc.value)}>Submit</button>
                                <button>Cancel</button>
                            </div>
                        </div>
                    </div>
                    <List
                    getData={getData}
                    getSlides={getSlides}
                    slideToShow={getData.slideToShow} 
                    addListMedia={addListMedia}
                    />
                </div>
            </div>
        );
    }
}

export default Authenticated;
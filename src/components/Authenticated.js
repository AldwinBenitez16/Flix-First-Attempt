import React, {PureComponent} from 'react';

// Components
import SliderContainer from './SliderContainer';
import Info from '../components/Info';
import Loading from '../components/Loading';

// CSS
import '../css/authenticated.css';

import axios from 'axios';
import Cookies from 'js-cookie';

class Authenticated extends PureComponent {

    UNSAFE_componentWillMount() {
        const {getSlides} = this.props;
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
    }

    containerRef = React.createRef();
    infoRef = React.createRef();

    listRef = React.createRef();
    listdescRef = React.createRef();
    listnameRef = React.createRef();
    async createList() {
        const {getData, updateList} = this.props;
        const name = this.listnameRef.current.value;
        const desc = this.listdescRef.current.value;
        const session_id = getData.user.session_id;

        let isCreated = false;
        for(let i = 0; i < getData.list.created.length; i++) {
            if(desc === getData.list.created[i].desc) {
                isCreated = true;
            }
        }

        if(!isCreated) {
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
                updateList({list_id, name: name, desc: desc});
            });
            console.log(this.props.getData.list.created);
            Cookies.set('created', JSON.stringify(this.props.getData.list.created), {expires: 1});
            Cookies.remove('created');
        } else {
            console.log(`A similar list has been created. Please use another desc/name or delete the existing list, ${name}.`);
        }
    }

    submit = () => {
        this.createList();
    }

    render() {
        const {getData, getPosterInfo, createGenres} = this.props;

        return (
            <div className='info-wrapper'>
                <Info 
                createGenres={createGenres} 
                getData={getData} 
                containerRef={this.containerRef}
                infoRef={this.infoRef}
                />
                <div ref={this.containerRef} className='main-container'>
                    <div className='authlist-container'>
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
                                <button onClick={this.submit}>Submit</button>
                                <button>Cancel</button>
                            </div>
                        </div>
                    </div>
                    {/* <SliderContainer 
                    getPosterInfo={getPosterInfo}
                    containerRef={this.containerRef} 
                    infoRef={this.infoRef}
                    slideToShow={getData.slideToShow} 
                    getData={getData}  
                    type='now_playingMovie'
                    title='Playing Now' />
                    <SliderContainer 
                    getPosterInfo={getPosterInfo}
                    containerRef={this.containerRef}
                    infoRef={this.infoRef} 
                    slideToShow={getData.slideToShow} 
                    getData={getData} 
                    type='trendingMovie'
                    title='Trending Movies' />
                    <SliderContainer 
                    getPosterInfo={getPosterInfo}
                    containerRef={this.containerRef} 
                    infoRef={this.infoRef}
                    slideToShow={getData.slideToShow} 
                    getData={getData}
                    type='trendingTv' 
                    title='Trending TV Shows' />
                    <SliderContainer 
                    getPosterInfo={getPosterInfo}
                    containerRef={this.containerRef} 
                    infoRef={this.infoRef}
                    slideToShow={getData.slideToShow} 
                    getData={getData} 
                    type='upcomingMovie'
                    title='Upcoming Movies' /> */}
                </div>
            </div>
        );
    }
}

export default Authenticated;
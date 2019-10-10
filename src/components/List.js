import React, {Component} from 'react';

// Components
import Loading from '../components/Loading';

// Slick
import SliderContainer from "./SliderContainer";
import Info from './Info';

// React-Router-Dom
import {NavLink} from 'react-router-dom';

import axios from 'axios';
import image from '../images/poster-add.png';


class List extends Component {
    
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

        this.createList();
    }

    async getList(list_id){
        const {addListMedia, updateList} = this.props;
        const data = await axios({
            url: `https://api.themoviedb.org/3/list/${list_id}?api_key=a34097a10fd6daf67cb09e71f3d7a0ea&language=en-US`,
            method: 'get'
        })
        .then(res => {
            updateList({[list_id]: {...this.props.getData.list[list_id], items: res.data.items.length}});
            for(let i = 0; i < res.data.items.length; i++) {
                addListMedia(list_id, {[res.data.items[i].id]: {...this.props.getData.list[list_id].media[res.data.items[i].id],data: res.data.items[i]}});
            }
        })
        .catch(err => {
            console.log(list_id + ' was not retrieved', err);
        });
    }

    updateMovie = (list_id) => {
        this.getList(list_id);
    } 

    createList = () => {
        const {getData} = this.props;
        for(let key in getData.list) {
            this.updateMovie(key);
        }
    }

    containerRef = React.createRef();
    infoRef = React.createRef();

    createListSlides = () => {
        const {getData, getPosterInfo} = this.props;
        const list = [];
        const lists = [];
        
        let results = [];
        let title = [];
        let listId = [];
        for(let key in getData.list) {
            results = [];

            listId.push(key);
            title.push(getData.list[key].name);
            for(let mediakey in getData.list[key].media) {
                results.push(getData.list[key].media[mediakey].data);
            }
            while(results.length < 7) {
                results.push({
                    
                });
            }
            lists.push(results);
        }

        for(let i = 0; i < lists.length; i++) {
            list.push(                    
                <SliderContainer 
                    key={title[i]}
                    getPosterInfo={getPosterInfo}
                    containerRef={this.containerRef}
                    infoRef={this.infoRef} 
                    slideToShow={getData.slideToShow} 
                    getData={getData} 
                    data={lists[i]}
                    title={title[i]} 
                    listImage={image} />
            );
        }  

        return list;
    }

    render() {
        const {getData, createGenres, addListMedia, removeListMedia} = this.props;

        return(
            <div className='info-wrapper'>
                <Info 
                createGenres={createGenres} 
                getData={getData} 
                containerRef={this.containerRef}
                infoRef={this.infoRef}
                addListMedia={addListMedia}
                removeListMedia={removeListMedia}  
                />
                <div ref={this.containerRef} className='main-container'>
                    {this.createListSlides()}
                </div>
            </div>
        );
    }
}

export default List;
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
        const {getSlides, createList} = this.props;
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

        createList();
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
            if(lists[i][0]) {
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
        }  

        return list;
    }

    render() {
        const {getData, createGenres, addListMedia, removeListMedia, createList} = this.props;

        return(
            <div className='info-wrapper'>
                <Info 
                createGenres={createGenres} 
                getData={getData} 
                containerRef={this.containerRef}
                infoRef={this.infoRef}
                addListMedia={addListMedia}
                removeListMedia={removeListMedia}  
                createList={createList}
                />
                <div ref={this.containerRef} className='main-container'>
                    {this.createListSlides()}
                </div>
            </div>
        );
    }
}

export default List;
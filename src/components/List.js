import React, {Component} from 'react';

// Slick
import Slider from "react-slick";

// React-Router-Dom
import {NavLink} from 'react-router-dom';

import axios from 'axios';
import { arrayExpression } from '@babel/types';

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
    }

    async getList(list_id){
        const {addListMedia} = this.props;
        const data = await axios({
            url: `https://api.themoviedb.org/3/list/${list_id}?api_key=a34097a10fd6daf67cb09e71f3d7a0ea&language=en-US`,
            method: 'get'
        })
        .then(res => {
            let counter = 0;
            if(res) {
                for(let i = 0; i < res.data.items.length; i++) {
                    counter++;
                    // addListMedia(list_id, {[res.data.items[i].id]: {data: res.data.items[i]}});
                }
            }
            console.log(res.data.items.length);
        })
        .catch(err => {
            console.log(list_id + ' was not retrieved', err);
        });
    }

    updateMovie = (list_id) => {
        this.getList(list_id);
    } 

    createList = (results) => {
        this.updateMovie(results);
    }

    createListSlides = () => {
        const {getData} = this.props;
        const list = [];

        let results = [];
        for(let key in getData.list) {
            list.push(this.createList(key));
        }

        return list;
    }

    render() {
        const {slideToShow} = this.props;

        let settings = { 
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: slideToShow,
            slidesToScroll: slideToShow
        }

        return(
            <div className='list-main-container'>
                {this.createListSlides()}
            </div>
        );
    }
}

export default List;
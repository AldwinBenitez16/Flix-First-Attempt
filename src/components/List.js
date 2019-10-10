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
        await axios({
            url: `https://api.themoviedb.org/3/list/${list_id}?api_key=a34097a10fd6daf67cb09e71f3d7a0ea&language=en-US`,
            method: 'get'
        })
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(list_id + ' was not retrieved', err);
        });
    }

    updateMovie = (type) => {
        let list_id = this.getListid(type);
        this.getList(list_id);
    }

    createList = (results) => {
        this.updateMovie('Favorites');
    }

    getListid = (type) => {
        let list_id;
        for(let key in this.props.getData.list) {
            if(this.props.getData.list[key].name === type) list_id = key
        }
        return list_id;
    }

    createListSlides = () => {
        const {getData} = this.props;
        const list = [];

        let results = [];
        for(let key in getData.list) {
            results = [];
            for(let mediakey in getData.list[key].media) {
                results.push(getData.list[key].media[mediakey].data);
            }
            this.createList(results);
        }
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
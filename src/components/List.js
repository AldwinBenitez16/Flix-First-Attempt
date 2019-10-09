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

    createList = (results) => {
        console.log(results);
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
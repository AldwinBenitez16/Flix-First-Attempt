import React, {Component} from 'react';

// Components
import Loading from '../components/Loading';

// Slick
import Slider from "react-slick";

// React-Router-Dom
import {NavLink} from 'react-router-dom';

import axios from 'axios';


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
        const {addListMedia} = this.props;
        const data = await axios({
            url: `https://api.themoviedb.org/3/list/${list_id}?api_key=a34097a10fd6daf67cb09e71f3d7a0ea&language=en-US`,
            method: 'get'
        })
        .then(res => {
            for(let i = 0; i < res.data.items.length; i++) {
                addListMedia(list_id, {[res.data.items[i].id]: {data: res.data.items[i]}});
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

    createListSlides = () => {
        const {getData} = this.props;

        const lists = [];
        let results = [];
        for(let key in getData.list) {
            results = [];
            for(let mediakey in getData.list[key].media) {
                results.push(getData.list[key].media[mediakey]);
            }
            lists.push(results);
        }
        
        console.log(lists);

    }

    render() {

        return(
            <div className='list-main-container'>
                {this.createListSlides()}
            </div>
        );
    }
}

export default List;
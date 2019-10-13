import React, {Component} from 'react';

// Slick
import Slider from "react-slick";

// React-Router-Dom
import {NavLink} from 'react-router-dom';

// Components
import LoadingSpinner from './Loading';

class SliderContainer extends Component {
    render() {
        const {slideToShow, getData, category, data, title, containerRef, infoRef, getPosterInfo, listImage} = this.props;

        if (!data || !(infoRef.current !== null)) return <LoadingSpinner />;

        let settings = { 
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: slideToShow,
            slidesToScroll: slideToShow
        }

        let queryType = 'movie';
        if(data[0].name) queryType = 'tv'
        
        let queryCategory = category;

        return(
            <div className='container'>
                    <div className='title'>
                        <h3>{title}</h3>
                        {queryCategory ?
                        <NavLink to={`/pages/${queryType}-${queryCategory}-1`}>
                        <button>View More</button>
                        </NavLink>
                        :
                        null}
                    </div>
                    <Slider {...settings}>
                    {data.map((item,index) => {
                        if(!item) return null

                        return(
                            <div key={index} className='poster'>
                                <div className='voteAvg'>{(item.vote_average > 0) ? item.vote_average : null}</div>
                                <img
                                id='carousel-poster'
                                onClick={() => {
                                    let width = window.innerWidth;
                                    if(width > 768) {
                                        infoRef.current.style.display = 'flex';
                                        infoRef.current.style.width = '40vw';
                                        containerRef.current.style.width = '60vw';  
                                        getPosterInfo(item);
                                    } else {
                                        infoRef.current.style.display = 'flex';
                                        containerRef.current.style.display = 'none';
                                        infoRef.current.style.width = '100vw';
                                        containerRef.current.style.width = '0vw';  
                                        getPosterInfo(item);
                                    }    
                                }}
                                onError={(e) => {
                                    e.target.src='https://i.imgur.com/zwpr2vD.jpg'
                                }} 
                                src={item.poster_path ? `https://image.tmdb.org/t/p/w500/${item.poster_path}` : listImage}
                                />
                            </div>
                        );
                    })}
                    </Slider>
            </div>
        );
    }
}

export default SliderContainer;
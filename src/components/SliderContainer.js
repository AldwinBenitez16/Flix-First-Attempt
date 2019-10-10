import React, {Component} from 'react';

// Slick
import Slider from "react-slick";

// React-Router-Dom
import {NavLink} from 'react-router-dom';

// Components
import LoadingSpinner from './Loading';

class SliderContainer extends Component {
    render() {
        const {slideToShow, getData, category, data, title, containerRef, infoRef, getPosterInfo} = this.props;

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

        console.log(data);
        return(
            <div className='container'>
                    <div className='title'>
                        <h3>{title}</h3>
                        <NavLink to={`/pages/${queryType}-${queryCategory}-1`}>
                        <button>View More</button>
                        </NavLink>
                    </div>
                    <Slider {...settings}>
                    {data.map((item,index) => {
                        return(
                            <div key={index} className='poster'>
                                <div className='voteAvg'>{item.vote_average}</div>
                                <img
                                onClick={() => {
                                    infoRef.current.style.display = 'flex';
                                    containerRef.current.style.width = '80vw';  
                                    getPosterInfo(item);       
                                }}
                                onError={(e) => {
                                    e.target.src='https://i.imgur.com/zwpr2vD.jpg'
                                }} 
                                src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} />
                            </div>
                        );
                    })}
                    </Slider>
            </div>
        );
    }
}

export default SliderContainer;
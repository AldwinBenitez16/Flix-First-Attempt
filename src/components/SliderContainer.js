import React, {Component} from 'react';

// Slick
import Slider from "react-slick";

// React-Router-Dom
import {NavLink} from 'react-router-dom';

// Components
import LoadingSpinner from './Loading';

class SliderContainer extends Component {
    render() {
        const {slideToShow, getData, type, title} = this.props;
        console.log(type);    
        console.log(getData);
        if (!getData.data[type]) return <LoadingSpinner />;

        let settings = { 
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: slideToShow,
            slidesToScroll: slideToShow
        }

        const data = getData.data[type].results;

        return(
            <div className='container'>
                    <div className='title'>
                        <h3>{title}</h3>
                        <NavLink to={`/page/${title}`}>
                        <button>View More</button>
                        </NavLink>
                    </div>
                    <Slider {...settings}>
                    {data.map((item,index) => {
                        return(
                            <div key={index} className='poster'>
                                <img
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
// React
import React, {Component} from 'react';

// Components
import LoadingSpinner from '../components/LoadingSpinner';

// Slick
import Slider from "react-slick";

// CSS
import '../css/home.css';

// Image

class Home extends Component {

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

    render() {      
        const {getData} = this.props;

        let settings = { 
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: getData.slideToShow,
            slidesToScroll: 1
        }

        if(!getData.data.trendingMovie ||
            !getData.data.trendingTv || 
            !getData.data.upcomingMovie ||
            !getData.data.playingNow) {
            return <LoadingSpinner />
        }

        const upcoming = getData.data.upcomingMovie.results;
        const playing = getData.data.playingNow.results;
        const trendingM = getData.data.trendingMovie.results;
        const trendingT = getData.data.trendingTv.results;

        return (
             <div>
                <main>
                <div className='container'>
                    <div className='title'>
                        <h3>Playing Now</h3>
                    </div>
                    <Slider {...settings}>
                    {playing.map((trend,index) => {
                        return(
                            <div key={index} className='poster'>
                                <img
                                onError={(e) => {
                                    e.target.src='https://i.imgur.com/zwpr2vD.jpg'
                                }} 
                                src={`https://image.tmdb.org/t/p/w500/${trend.poster_path}`} />
                            </div>
                        );
                    })}
                    </Slider>
                </div>
                <div className='container'>
                    <div className='title'>
                        <h3>Trending Movies</h3>
                    </div>
                    <Slider {...settings}>
                        {trendingM.map((trend,index) => {
                            return(
                                <div key={index} className='poster'>
                                    <img
                                    onError={(e) => {
                                        e.target.src='https://i.imgur.com/zwpr2vD.jpg'
                                    }} 
                                    src={`https://image.tmdb.org/t/p/w500/${trend.poster_path}`} />
                                </div>
                            );
                        })}
                    </Slider>
                </div>
                <div className='container'>
                    <div className='title'>
                        <h3>Trending TV Shows</h3>
                    </div>
                    <Slider {...settings}>
                        {trendingT.map((trend,index) => {
                            return(
                                <div key={index} className='poster'>
                                    <img
                                    onError={(e) => {
                                        e.target.src='https://i.imgur.com/zwpr2vD.jpg'
                                    }} 
                                    src={`https://image.tmdb.org/t/p/w500/${trend.poster_path}`} />
                                </div>
                            );
                        })}
                    </Slider>
                </div>
                <div className='container'>
                    <div className='title'>
                        <h3>Upcoming Movies</h3>
                    </div>
                    <Slider {...settings}>
                    {upcoming.map((trend,index) => {
                        return(
                            <div key={index} className='poster'>
                                <img
                                onError={(e) => {
                                    e.target.src='https://i.imgur.com/zwpr2vD.jpg'
                                }} 
                                src={`https://image.tmdb.org/t/p/w500/${trend.poster_path}`} />
                            </div>
                        );
                    })}
                    </Slider>
                </div>
                </main>
            </div>
        )
    }
}
  
export default (Home);
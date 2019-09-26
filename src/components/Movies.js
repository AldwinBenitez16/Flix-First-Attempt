import React, {Component} from 'react';

// Components
import SliderContainer from './SliderContainer';

// CSS
import '../css/movie.css';

class Movie extends Component {

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

        return (
            <div className='movie-container'>
                <SliderContainer slideToShow={getData.slideToShow} 
                getData={getData}  
                type='now_playingMovie'
                title='Playing Now' />
                <SliderContainer slideToShow={getData.slideToShow} 
                getData={getData} 
                type='trendingMovie'
                title='Trending Movies' />
                <SliderContainer slideToShow={getData.slideToShow} 
                getData={getData}  
                type='top_ratedMovie'
                title='Top Rated' />
                <SliderContainer slideToShow={getData.slideToShow} 
                getData={getData} 
                type='upcomingMovie'
                title='Upcoming Movies' />
            </div>
        );
    }
}

export default Movie;
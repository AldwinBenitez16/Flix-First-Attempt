import React, {Component} from 'react';

// Components
import SliderContainer from './SliderContainer';

// CSS
import '../css/movie.css';

class Shows extends Component {

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
            <div className='show-container'>
                <SliderContainer slideToShow={getData.slideToShow} 
                getData={getData}
                type='trendingTv' 
                title='Trenidng TV Shows' />
            </div>
        );
    }
}

export default Shows;
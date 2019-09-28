import React, {Component} from 'react';

// Components
import SliderContainer from './SliderContainer';
import Info from '../components/Info';

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

    containerRef = React.createRef();
    infoRef = React.createRef();

    render() {
        const {getData, getPosterInfo, createGenres} = this.props;
    
        return (
            <div className='info-wrapper'>
                <Info 
                createGenres={createGenres} 
                getData={getData} 
                containerRef={this.containerRef}
                infoRef={this.infoRef}
                />
                <div ref={this.containerRef} className='main-container'>
                <SliderContainer 
                getPosterInfo={getPosterInfo}
                containerRef={this.containerRef} 
                infoRef={this.infoRef}
                slideToShow={getData.slideToShow} 
                getData={getData}
                type='trendingTv' 
                title='Trenidng TV Shows' />
                </div>
            </div>
        );
    }
}

export default Shows;
import React, {PureComponent} from 'react';

// Components
import SliderContainer from './SliderContainer';
import Info from '../components/Info';
import Loading from '../components/Loading';

// CSS
import '../css/authenticated.css';

class Authenticated extends PureComponent {

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
                    type='now_playingMovie'
                    title='Playing Now' />
                    <SliderContainer 
                    getPosterInfo={getPosterInfo}
                    containerRef={this.containerRef}
                    infoRef={this.infoRef} 
                    slideToShow={getData.slideToShow} 
                    getData={getData} 
                    type='trendingMovie'
                    title='Trending Movies' />
                    <SliderContainer 
                    getPosterInfo={getPosterInfo}
                    containerRef={this.containerRef} 
                    infoRef={this.infoRef}
                    slideToShow={getData.slideToShow} 
                    getData={getData}
                    type='trendingTv' 
                    title='Trending TV Shows' />
                    <SliderContainer 
                    getPosterInfo={getPosterInfo}
                    containerRef={this.containerRef} 
                    infoRef={this.infoRef}
                    slideToShow={getData.slideToShow} 
                    getData={getData} 
                    type='upcomingMovie'
                    title='Upcoming Movies' />
                </div>
            </div>
        );
    }
}

export default Authenticated;
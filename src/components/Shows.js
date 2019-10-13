import React, {Component} from 'react';

// Components
import SliderContainer from './SliderContainer';
import Info from '../components/Info';

// CSS
import '../css/movie.css';

class Shows extends Component {

    UNSAFE_componentWillMount() {
        const {getSlides} = this.props;
        let width = window.innerWidth;
        getSlides(width);

        let prevWidth = width;
        function updateSlides() {
            width = window.innerWidth;
            let widthDif = width - prevWidth;
            if(Math.abs(widthDif) >= 230) {
                prevWidth = width;
                getSlides(width);
            }
            let frameID = window.requestAnimationFrame(updateSlides);
        }
        updateSlides();
    }

    containerRef = React.createRef();
    infoRef = React.createRef();

    render() {
        const {getData, getPosterInfo, createGenres, addListMedia, removeListMedia, createList} = this.props;
    
        return (
            <div className='info-wrapper'>
                <Info 
                createGenres={createGenres} 
                getData={getData} 
                containerRef={this.containerRef}
                infoRef={this.infoRef}
                addListMedia={addListMedia}
                removeListMedia={removeListMedia}  
                createList={this.createList}
                />
                <div ref={this.containerRef} className='main-container'>
                <SliderContainer 
                getPosterInfo={getPosterInfo}
                containerRef={this.containerRef} 
                infoRef={this.infoRef}
                slideToShow={getData.slideToShow} 
                getData={getData}
                category='trending'
                data={getData.data['trendingTv'].results}
                title='Trending TV Shows' />
                <SliderContainer 
                getPosterInfo={getPosterInfo}
                containerRef={this.containerRef} 
                infoRef={this.infoRef}
                slideToShow={getData.slideToShow} 
                getData={getData}
                category='top_rated'
                data={getData.data['top_ratedTv'].results}
                title='Top Rated TV Shows' />
                <SliderContainer 
                getPosterInfo={getPosterInfo}
                containerRef={this.containerRef} 
                infoRef={this.infoRef}
                slideToShow={getData.slideToShow} 
                getData={getData}
                category='on_the_air'
                data={getData.data['on_the_airTv'].results}
                title='New Episode This Week' />
                <SliderContainer 
                getPosterInfo={getPosterInfo}
                containerRef={this.containerRef} 
                infoRef={this.infoRef}
                slideToShow={getData.slideToShow} 
                getData={getData}
                category='airing_today'
                data={getData.data['airing_todayTv'].results}
                title='Airing today' />
                </div>
            </div>
        );
    }
}

export default Shows;
import React, {Component} from 'react';

// Components
import SliderContainer from './SliderContainer';
import Info from '../components/Info';

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

    containerRef = React.createRef();
    infoRef = React.createRef();

    render() {
        const {getData, getPosterInfo, createGenres, addListMedia, removeListMedia} = this.props;

        return (
            <div className='info-wrapper'>
                <Info 
                createGenres={createGenres} 
                getData={getData} 
                containerRef={this.containerRef}
                infoRef={this.infoRef}
                addListMedia={addListMedia}
                removeListMedia={removeListMedia}  
                />
                <div ref={this.containerRef} className='main-container'>
                <SliderContainer 
                getPosterInfo={getPosterInfo}
                containerRef={this.containerRef} 
                infoRef={this.infoRef}
                slideToShow={getData.slideToShow} 
                getData={getData}  
                category='now_playing'
                data={getData.data['now_playingMovie'].results}
                title='Playing Now' />
                <SliderContainer 
                getPosterInfo={getPosterInfo}
                containerRef={this.containerRef} 
                infoRef={this.infoRef}
                slideToShow={getData.slideToShow} 
                getData={getData} 
                category='trending'
                data={getData.data['trendingMovie'].results}
                title='Trending Movies' />
                <SliderContainer 
                getPosterInfo={getPosterInfo}
                containerRef={this.containerRef} 
                infoRef={this.infoRef}
                slideToShow={getData.slideToShow} 
                getData={getData}  
                category='top_rated'
                data={getData.data['top_ratedMovie'].results}
                title='Top Rated' />
                <SliderContainer 
                getPosterInfo={getPosterInfo}
                containerRef={this.containerRef} 
                infoRef={this.infoRef}
                slideToShow={getData.slideToShow} 
                getData={getData} 
                category='upcoming'
                data={getData.data['upcomingMovie'].results}
                title='Upcoming Movies' />
            </div>
            </div>
        );
    }
}

export default Movie;
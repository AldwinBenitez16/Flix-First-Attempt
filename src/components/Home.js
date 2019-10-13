// React
import React, {Component} from 'react';

// Components
import SliderContainer from './SliderContainer';
import Info from '../components/Info';

// CSS
import '../css/home.css';

class Home extends Component {

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
            <div ref={this.wrapperRef} className='info-wrapper'>
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
                    category='trending'
                    data={getData.data['trendingTv'].results}
                    title='Trending TV Shows' />
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
        )
    }
}
  
export default (Home);
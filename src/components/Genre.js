// React
import React, {Component} from 'react';

// Components
import LoadingSpinner from '../components/LoadingSpinner';

// CSS
import '../css/genre.css';

// Slick
import Slider from "react-slick";

class Genre extends Component {

    UNSAFE_componentWillMount() {
        const {fetchProducts, genretype} = this.props;
        let genreid = this.getGenre(genretype);
        // console.log(genreid);
        fetchProducts(
            `https://api.themoviedb.org/3/discover/movie?api_key=a34097a10fd6daf67cb09e71f3d7a0ea&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreid}`,
            `${genretype}`
        );
    }

    getGenre = (genretype) => {
        const {getData} = this.props;
        console.log(getData);
        let genreid;
        getData.data.genres.genres.forEach(genre => {
            if(genre.name === genretype) {
                genreid = genre.id;
            }
        });
        return genreid;
    }

    render() {
        const {getData, genretype} = this.props;

        let settings = { 
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: getData.slideToShow,
            slidesToScroll: 1
        }

        console.log(getData.data);
        if(!getData.data[genretype]) {
            return <LoadingSpinner />
        }

        const genreArray = getData.data[genretype].results;

        return(

            <div>
                <div className='page-container'>
                    <div className='title'>
                            <h3>{genretype}</h3>
                    </div>
                        {genreArray.map((trend,index) => {
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
                </div>
                <div className='page-btns'>
                    
                </div>
            </div>
        );
    }
}
  
export default (Genre);

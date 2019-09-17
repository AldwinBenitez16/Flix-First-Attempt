// React
import React, {Component} from 'react';

// Slick
import Slider from "react-slick";

// CSS
import '../css/home.css';

export default class Home extends Component {

    render() {      
        // const {trending, fetchProducts} = this.props;
        // console.log(trending);

        let settings = { 
            dots: false,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1
        }

        const {trending} = this.props;
        return (
             <div>
                <main>
                    <div className='trend-container'>
                        <div className='background-image' key='background-image'>
                            <img src={`https://image.tmdb.org/t/p/w500/${trending[0].backdrop_path}`}/>
                        </div>
                        <div className='poster-trend'>
                            <Slider {...settings}>
                                {
                                    trending.map((trend,index) => {
                                            return(
                                            <div key={index} className='poster'>
                                                <img src={`https://image.tmdb.org/t/p/w500/${trend.poster_path}`} />
                                            </div>
                                        );
                                    })
                                }
                            </Slider>
                        </div>
                    </div>
                </main>

                <footer>
                </footer>
            </div>
        )
    }
}
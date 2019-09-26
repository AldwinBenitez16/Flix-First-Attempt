// React
import React, {Component} from 'react';

// Components
import LoadingSpinner from './Loading';

class Background extends Component {

    getGenre = (genre, id) => {
        for(let i = 0; i < genre.length; i++) {
            if(genre[i].id === id) {
                return genre[i].name;
            }
        }
    }

    createGenres = (image, genre) => {
        let genreList = [];

        for(let i = 0; i < image[0].genre_ids.length; i++) {
            let genres;

            genres = this.getGenre(genre, image[0].genre_ids[i]);
            genreList.push(<li key={i} className={genres}>{genres}</li>);
        }
        return genreList;
    }

    getPath = (genre, getData) => {
        console.log(getData);
        for(let i = 0; i < genre.length; i++) {
            if(window.location.href === 'http://localhost:3000/') return  getData.data.trendingMovie.results
            if(window.location.href === 'http://localhost:3000/movies') return  getData.data.playingNow.results
            if(window.location.href === 'http://localhost:3000/tv') return  getData.data.trendingTv.results

            if(window.location.href.substring(0,window.location.href.indexOf('-')).replace('%20','') === `http://localhost:3000/genre/${genre[i].name.replace(/\s/g,'')}`) {
                console.log(genre[i].name.replace(/\s/g,''));
                return  getData.data[genre[i].name.replace(/\s/g,'')].results;
            }     
        }
    }

    render() {
        const {getData, genre} = this.props;

        if((Object.getOwnPropertyNames(getData.data).length <= 8) && 
        !(window.location.href === 'http://localhost:3000/') &&
        !(window.location.href === 'http://localhost:3000/movies') &&
        !(window.location.href === 'http://localhost:3000/tv')) {
            return <LoadingSpinner />
        }

        let image;
        image = this.getPath(genre, getData);

        return (
            <div className='background-image' key='background-image'>
                <img src={`https://image.tmdb.org/t/p/w1280/${image[0].backdrop_path}`}/>
                <div className='info-overlay'>
                    <h2>{image[0].original_title}</h2>
                    <p>{image[0].overview}</p>
                    <ul className='genres'>
                        {this.createGenres(image, genre)}
                    </ul>
                </div> 
            </div>
        );
    }
}
  
export default Background;
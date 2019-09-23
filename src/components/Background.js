// React
import React, {Component} from 'react';

// Components
import LoadingSpinner from '../components/LoadingSpinner';

class Background extends Component {

    getGenre = (genre, id) => {
        for(let i = 0; i < genre.length; i++) {
            if(genre[i].id === id) {
                return genre[i].name;
            }
        }
    }

    createGenres = (trending, genre) => {
        let genreList = [];

        for(let i = 0; i < trending[0].genre_ids.length; i++) {
            let genres;

            genres = this.getGenre(genre, trending[0].genre_ids[i]);
            genreList.push(<li key={i} className={genres}>{genres}</li>);
        }
        return genreList;
    }

    render() {
        const {trending, genre} = this.props;

        if(!trending || !genre) {
            return <LoadingSpinner />
        }
        return (
            <div className='background-image' key='background-image'>
                <img src={`https://image.tmdb.org/t/p/w1280/${trending[0].backdrop_path}`}/>
                <div className='info-overlay'>
                    <h2>{trending[0].original_title}</h2>
                    <p>{trending[0].overview}</p>
                    <ul className='genres'>
                        {this.createGenres(trending, genre)}
                    </ul>
                </div> 
            </div>
        );
    }
}
  
export default Background;
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

    getPath = (getData, genre,type, category) => {
console.log(getData);
        for(let i = 0; i < genre.length; i++) {
            if(window.location.href === 'http://localhost:3000/movies') return  getData.data.now_playingMovie.results
            if(window.location.href === 'http://localhost:3000/tv') return  getData.data.trendingTv.results

            if(genre[i].name.toLowerCase().replace(/\s/g,'') === category.replace(/%20/g,'')) {
                return  getData.data[`${category.replace(/%20/g,'')}${this.capitalize(type)}`].results;
            } else if(getData.data[`${category.replace(/%20/g,'')}${this.capitalize(type)}`]) {
                return  getData.data[`${category.replace(/%20/g,'')}${this.capitalize(type)}`].results;
            }
        }

        return  getData.data.trendingMovie.results
    }

    getIndices = (element, elementArray) => {
        let indices = [];
        var idx = elementArray.indexOf(element);
        while (idx != -1) {
          indices.push(idx);
          idx = elementArray.indexOf(element, idx + 1);
        }

        return indices;
    }

    capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    render() {
        const {getData, movieGenres, tvGenres} = this.props;

        let genre = movieGenres;
        let test = window.location.href.substring(window.location.href.lastIndexOf('/')+1);
        let indices = this.getIndices('-', test);
        let type = test.substring(0, indices[0]);
        let category = test.substring(indices[0]+1, indices[1]);

        if(!(Object.getOwnPropertyNames(getData.data).length >= 8) && 
        !(window.location.href === 'http://localhost:3000/') &&
        !(window.location.href === 'http://localhost:3000/movies') &&
        !(window.location.href === 'http://localhost:3000/tv') && 
        !(getData.data[`${category.replace(/%20/g,'')}${this.capitalize(type)}`])) {
            return <LoadingSpinner />
        }

        if(type === 'tv') genre = tvGenres

        let image = this.getPath(getData, genre, type, category);

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
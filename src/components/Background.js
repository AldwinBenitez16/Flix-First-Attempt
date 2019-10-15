// React
import React, {Component} from 'react';

// Components
import LoadingSpinner from './Loading';

class Background extends Component {

    getPath = (getData, genre,type, category) => {

        if(type === 'search')   return  [...getData.data.search.tvData, ...getData.data.search.movieData];
        if(window.location.href === `${window.location.origin}/movies`) return  getData.data.now_playingMovie.results
        if(window.location.href === `${window.location.origin}/tv`) return  getData.data.trendingTv.results

        for(let i = 0; i < genre.length; i++) {
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
        const {getData, movieGenres, tvGenres, createGenres} = this.props;

        let genre = movieGenres;
        let test = window.location.href.substring(window.location.href.lastIndexOf('/')+1);
        let indices = this.getIndices('-', test);
        let type = test.substring(0, indices[0]);
        let category = test.substring(indices[0]+1, indices[1]);
        // console.log([...getData.data.search.tvData, ...getData.data.search.movieData].length);

        if(!(Object.getOwnPropertyNames(getData.data).length >= 12) && 
        !(window.location.href === `${window.location.origin}/home`) &&
        !(window.location.href === `${window.location.origin}/movies`) &&
        !(window.location.href === `${window.location.origin}/tv`) && 
        !(getData.data[`${category.replace(/%20/g,'')}${this.capitalize(type)}`]) &&
        !([...getData.data.search.tvData, ...getData.data.search.movieData].length > 0)) {
            return <LoadingSpinner />
        }

        let image = this.getPath(getData, genre, type, category);
        let counter = 0;
        let backdrop = image[0].backdrop_path;
        while(backdrop === null) {
            counter++;
            backdrop = image[counter].backdrop_path;
        }
    
        let title = image[counter].title;

        if(!title) {
            title = image[counter].original_name;
            genre = tvGenres;
        }

        return (    
            <div className='background-image' key='background-image'>
                <img src={`https://image.tmdb.org/t/p/w1280/${backdrop}`}/>
                <div className='info-overlay'>
                    <h2>{title}</h2>
                    <p>{image[counter].overview}</p>
                    <ul className='genres'>
                        {createGenres(image, genre)}
                    </ul>
                </div> 
            </div>
        );
    }
}
  
export default Background;
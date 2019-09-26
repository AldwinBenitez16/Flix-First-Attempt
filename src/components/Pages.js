// React
import React, {Component} from 'react';

// Components
import Loading from './Loading';

// CSS
import '../css/genre.css';

class Pages extends Component {

    UNSAFE_componentWillMount() {
        let {fetchProducts, type, category, page} = this.props;

        let genreid = this.getGenre(category, type);
        if(genreid) {
            console.log(type + '/' + category + '/' + genreid);
            fetchProducts(
                `https://api.themoviedb.org/3/discover/tv?api_key=a34097a10fd6daf67cb09e71f3d7a0ea&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreid}`,
                `${category.replace(/\s/g,'')}`
            );  
        } else if(category === 'trending') {
            fetchProducts(
                `https://api.themoviedb.org/3/${category}/${type}/week?api_key=a34097a10fd6daf67cb09e71f3d7a0ea&language=en-US&page=${page}`,
                `${category}${this.capitalizeFirstLetter(type)}`
            );
        } else {
            fetchProducts(
                `https://api.themoviedb.org/3/${type}/${category}?api_key=a34097a10fd6daf67cb09e71f3d7a0ea&language=en-US&page=${page}`,
                `${category}${this.capitalizeFirstLetter(type)}`
            );
        }
    }

    getGenre = (category, type) => {
        const {getData} = this.props;
        let genreid;

        let index = category.length;
        if(type === 'tv') index = category.indexOf('&')-1; 
        getData.data[`${type}Genres`].genres.forEach(genre => {
            if(genre.name.substring(0, index).toLowerCase() === category.substring(0, index)) {
                genreid = genre.id;
            }
        });
        return genreid;
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    render() {
        const {getData, category, page} = this.props;

        return(
            <div>

            </div>
        );
    }
}

export default Pages;
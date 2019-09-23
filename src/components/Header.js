// React
import React, {Component} from 'react';

// React Router
import {
    BrowserRouter as Router,
    Route,
    Switch
  } from 'react-router-dom';

// React-Router-Dom
import {NavLink} from 'react-router-dom';

// Components
import Background from './Background';
import LoadingSpinner from '../components/LoadingSpinner';

// images
import logo from '../images/svg/logo.svg';
import tmdb from '../images/tmdb-logo2.png'

// CSS
import '../css/header.css';

class Header extends Component {
    
    displayRef = React.createRef();
    createGenreList = (genreData) => {
        // console.log(genreData);
        let genres = [];
        for(let i = 0; i < genreData.length; i++) {
            genres.push(<NavLink key={genreData[i].id} id={genreData[i].id} to={`/genre/${genreData[i].name}`} >{genreData[i].name}</NavLink>);
        }
        return genres;
    }

    showGenres = () => {
        if(this.displayRef.current.style.display === '') {
            this.displayRef.current.style.display = 'flex';
            this.displayRef.current.className += ' active';
        } else {
            this.displayRef.current.style.display = '';
        }
    }

    render() {
        const {getData} = this.props;

        if(!getData.data.trendingMovie || 
            !getData.data.trendingTv ||
            !getData.data.genres) {
            return <LoadingSpinner />;
        }
    
        const trending = getData.data.trendingMovie.results;
        const genre = getData.data.genres.genres;

        return (
                <div className='header-container'>
                <Route exact path='/' render={() => <Background trending={trending} genre={genre}/>} />
                    
                    <header>
                        <div className='../images/logo.svg'>
                            <a href='#top'>
                                <img className='logo' src={logo} alt='' height='40'/>
                            </a>
                            <a href='https://www.themoviedb.org/?language=en-US' target='_blank'>
                                <img className='logo-tmdb' src={tmdb} alt='' height='25'/>
                            </a>
                        </div>
                        <nav>
                            <ul>
                                <li><NavLink exact to='/'>Home</NavLink></li>
                                <li><a className='genre-btn' onClick={this.showGenres}>Genre</a></li>
                                <li><NavLink to='/movies'>Movies</NavLink></li>
                                <li><NavLink to='/tv'>Tv Shows</NavLink></li>
                                <li><NavLink to='/favourites'>Favourites</NavLink></li>
                            </ul>
                            <div ref={this.displayRef} className='genreContainer'>
                                {this.createGenreList(genre)}
                            </div>
                        </nav>
                        <div className='search'>
                            <input type='text' id='search' name='search' placeholder=' Search' />
                        </div>
                    </header>
                </div>
        );
    }
} 


export default (Header);
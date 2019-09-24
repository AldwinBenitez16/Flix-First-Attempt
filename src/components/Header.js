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
            genres.push(<NavLink onClick={() => {
                this.container.current.className = 'header-genre';
                window.location = `/genre/${genreData[i].name}-${1}`;
            }} key={genreData[i].id} id={genreData[i].id} to={`/genre`} >{genreData[i].name}</NavLink>);
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
    
    container = React.createRef();

    render() {
        const {getData} = this.props;

        if(!(Object.getOwnPropertyNames(getData.data).length >= 5)) {
            return <LoadingSpinner />;
        }

        const genre = getData.data.genres.genres;

        return (
                <div ref={this.container} className='header-container'>
                <Route path='/' render={() => <Background getData={getData} genre={genre}/>} />
                    
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
                                <li><NavLink onClick={() => {
                                    this.container.current.className = 'header-container';
                                }} exact to='/'>Home</NavLink></li>
                                <li><a className='genre-btn' onClick={this.showGenres}>Genre</a></li>
                                <li><NavLink onClick={() => {
                                    this.container.current.className = 'header-genre';
                                }} to='/movies'>Movies</NavLink></li>
                                <li><NavLink onClick={() => {
                                    this.container.current.className = 'header-genre';
                                }} to='/tv'>Tv Shows</NavLink></li>
                                <li><NavLink onClick={() => {
                                    this.container.current.className = 'header-genre';
                                }} to='/favourites'>Favourites</NavLink></li>
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
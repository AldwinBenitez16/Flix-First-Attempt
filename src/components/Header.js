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
import LoadingSpinner from './Loading';

// images
import logo from '../images/svg/logo.svg';
import tmdb from '../images/tmdb-logo2.png'
import search from '../images/search.png';

// CSS
import '../css/header.css';

// Cookie manager
import Cookie from 'js-cookie';
import axios from 'axios';

class Header extends Component {

    createGenreList = (genreData) => {
        let genreList = [];
        for(let i = 0; i < genreData.length; i++) {
            genreList.push(<a onClick={(e) => {
                let type = e.currentTarget.parentNode.id;
                window.location.pathname = `/pages/${type}-${genreData[i].name.toLowerCase()}-${1}`;
            }} key={genreData[i].id} >{genreData[i].name}</a>);
        }
        return genreList;
    } 

    authRef = React.createRef();
    movieRef = React.createRef();
    tvRef = React.createRef();
    showGenres = (type) => {
        let reference = this[`${type}Ref`];
        reference.current.style.display = 'flex';
    }

    hideGenres = (type) => {
        let reference = this[`${type}Ref`];
        reference.current.style.display = '';
    }

    async removeUser() {
        const {getUserInfo, getGuestInfo} = this.props;
        await getUserInfo({
            isAuthenticated: false,
            username: "",
            password: "",
            session_id: "",
            errors: []
        });
        await Cookie.remove('AuthenticatedUser');
        await getGuestInfo({
            isAuthenticated: false,
            session_id: "",
        });
        await Cookie.remove('guest');
    }

    getSearch = (e) => {
        e.preventDefault();
        let query = this.searchRef.current.value;
        if(query === '') {
            console.log('Please enter search')
            return;
        };
        this.getResults(query);
    }

    async getResults(query) {
        const {removeSearch} = this.props;
        await removeSearch();
        await this.search(query, 'movie');
        await this.search(query, 'tv');
        // window.location.href = `${window.location.origin}/pages/search-${query}-${1}`;
    }

    async search(query, type) {
        const {updateSearch} = this.props;
        await axios({
            method: 'get',
            url: `
            https://api.themoviedb.org/3/search/${type}?api_key=a34097a10fd6daf67cb09e71f3d7a0ea&language=en-US&query=${query}&page=1&include_adult=false&region=en-US`
        })
        .then(res => {
            if(res.data.results.length === 0) console.log('No Results Found');
            updateSearch(res.data.results);
        })
        .catch(err => {
            console.log('Search Failed', err)
        });
        Cookie.set('search', JSON.stringify(this.props.getData.data.search), {expires: 365});
    }

    searchRef = React.createRef();
    render() {
        const {getData, createGenres, containerRef} = this.props;

        if(!(Object.getOwnPropertyNames(getData.data).length >= 6)) {
            return <LoadingSpinner />;
        }

        const movieGenres = getData.data.movieGenres.genres;
        const tvGenres = getData.data.tvGenres.genres;
        const loginPath = (window.location.pathname !== '/login') && (window.location.pathname !== '/authenticated');
        return (
            <div ref={containerRef} className={loginPath ? 'header-container' : 'login-container'}>
                { loginPath ?
                    (<Route 
                    path='/' 
                    render={() => <Background 
                        getData={getData} 
                        movieGenres={movieGenres}
                        tvGenres={tvGenres}  
                        createGenres={createGenres}  
                        />} 
                    />)
                    :
                    (null)
                }

                <header>
                    <div className='../images/logo.svg'>
                        <NavLink activeClassName='logoActive' to='/home'> 
                            <img className='logo' src={logo} alt='' height='40'/>
                        </NavLink>
                        <a href='https://www.themoviedb.org/?language=en-US' target='_blank'>
                            <img className='logo-tmdb' src={tmdb} alt='' height='30'/>
                        </a>
                    </div>
                    <nav>
                        <ul>
                            <li><NavLink to='/home'>Home</NavLink></li>
                            <li><NavLink to='/movies' className='genre-btn' onMouseLeave={ () => this.hideGenres('movie')} onMouseOver={ () => this.showGenres('movie')} >Movies</NavLink></li>    
                            <li><NavLink to='/tv' className='genre-btn' onMouseLeave={ () => this.hideGenres('tv')} onMouseOver={() => this.showGenres('tv')} >Tv Shows</NavLink></li>
                            <li className='auth-container'>
                            {(getData.user.isAuthenticated || getData.guest.isAuthenticated) ? (<NavLink onMouseLeave={() => this.authRef.current.style.display = ''} onMouseOver={() => {
                                this.authRef.current.style.display = 'initial';
                            }} className='authenticated' exact to='/authenticated'>Welcome <span>{getData.user.username}</span></NavLink>) : null}
                            <div onMouseOver={ () => this.authRef.current.style.display = 'initial'} onMouseLeave={() => {
                                this.authRef.current.style.display = '';
                            }} ref={this.authRef} className='auth-overlay'>
                                <a onClick={() => this.removeUser()}>Log out</a>
                            </div>
                            </li>
                        </ul>

                        <div ref={this.movieRef} id='movie' className='genreContainer' onMouseOver={ () => this.showGenres('movie')} onMouseLeave={() => this.hideGenres('movie')}>
                            {this.createGenreList(movieGenres)}
                        </div>
                        <div ref={this.tvRef} id='tv' className='genreContainer' onMouseOver={ () => this.showGenres('tv')} onMouseLeave={() => this.hideGenres('tv')}>
                            {this.createGenreList(tvGenres)}
                        </div>
                    </nav>
                    <div className='search'>
                        <form onSubmit={(e) => this.getSearch(e)} className='search-container' >
                            <input ref={this.searchRef} type='text' id='search' name='search' placeholder=' Search' />
                            <button className='search-btn' type='submit'>
                                <img src={search} alt='search icon'/>
                            </button>
                        </form>
                        {(getData.user.isAuthenticated || getData.guest.isAuthenticated) ? null : (<div  className='login'><NavLink onClick={() => {
                            window.location.pathname = '/login'
                        }} className='login' to='/login'>Log In</NavLink></div>)}
                    </div>
                </header>
        </div>
        );
    }
} 

export default (Header);
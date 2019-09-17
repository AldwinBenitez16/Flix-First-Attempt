// React
import React from 'react';

// React-Router-Dom
import {NavLink} from 'react-router-dom';

// images
import logo from '../images/logo.svg';

// CSS
import '../css/header.css';

const Header = () => {
    return (
        <header>
            <div className='../images/logo.svg'>
                <img className='logo' src={logo} alt='' height='40'/>
            </div>
            <nav>
                <ul>
                    <li><NavLink exact to='/'>Home</NavLink></li>
                    <li><NavLink to='/genre'>Genre</NavLink></li>
                    <li><NavLink to='/movies'>Movies</NavLink></li>
                    <li><NavLink to='/tv'>Tv Shows</NavLink></li>
                    <li><NavLink to='/favourites'>Favourites</NavLink></li>
                </ul>
            </nav>
            <div className='search'>
                <input type='text' id='search' name='search' placeholder=' Search' />
            </div>
        </header>
    );
} 

export default Header;
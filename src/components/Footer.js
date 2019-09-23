// React
import React from 'react';

// images
import tmdb from '../images/tmdb-logo.png';
import mail from '../images/svg/mail.svg';
import github from '../images/svg/github.svg';
import linkedin from '../images/svg/linkedin.svg';
import home from '../images/svg/home.svg';

// CSS
import '../css/footer.css';

const Footer = () => {
    return(
        <footer>
        <div className='icon-container'>
            <a href='#top'>
                <img className='icon' src={home} />
            </a>
            <a href='https://github.com/AldwinBenitez16' target='_blank'>
                <img className='icon' src={github} />
            </a>
            <a href='https://ca.linkedin.com/' target='_blank'>
                <img className='icon' src={linkedin} />
            </a>
            <a href='mailto:'>
                <img className='icon' src={mail} />
            </a>
        </div>

        <div className='tmdb'>
            <a href='https://www.themoviedb.org/?language=en-US' target='_blank'>
                <img className='tmdb-logo' src={tmdb} />
            </a>
        </div>
    </footer>
    );
}

export default Footer;
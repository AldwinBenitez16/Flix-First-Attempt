// React
import React, {Component} from 'react';

// Components
import Loading from './Loading';
import Info from '../components/Info';

// CSS
import '../css/pages.css';

class Pages extends Component {

    UNSAFE_componentWillMount() {
        let {fetchProducts, type, category, page} = this.props;

        let genreid = this.getGenre(category, type);

        if(genreid) {
            fetchProducts(
                `https://api.themoviedb.org/3/discover/${type}?api_key=a34097a10fd6daf67cb09e71f3d7a0ea&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreid}`,
                `${category.replace(/\s/g,'')}${this.capitalizeFirstLetter(type)}`
            );  
        } else if(category === 'trending') {
            fetchProducts(
                `https://api.themoviedb.org/3/${category}/${type}/week?api_key=a34097a10fd6daf67cb09e71f3d7a0ea&language=en-US&page=${page}`,
                `${category.replace(/\s/g,'')}${this.capitalizeFirstLetter(type)}`
            );
        } else {
            fetchProducts(
                `https://api.themoviedb.org/3/${type}/${category}?api_key=a34097a10fd6daf67cb09e71f3d7a0ea&language=en-US&page=${page}`,
                `${category.replace(/\s/g,'')}${this.capitalizeFirstLetter(type)}`
            );
        }
    }

    newPage = (page) => {
        const {type, category} = this.props;
        window.location = window.location.origin + `/pages/${type}-${category}-${page}`;
    }

    createPages = (category, page, maxpages) => {
        let pages =[];
        let btnNum = 7; 

        if(maxpages < 7) btnNum = maxpages;

        for(let i = 0; i < btnNum; i++) {
            let info = i+1;
            let activate = '';

            if(page > 3) info = (page-3)+(i);
            if(info === parseInt(page)) activate = 'active-page';
             
            if(info <= maxpages){ 
                pages.push(<button onClick={(e) => {
                    this.newPage(e.target.textContent);
                }} className={activate} key={`${info}`} >{info}</button>);
            }
        }

        return pages;
    }

    getGenre = (category, type) => {
        const {getData} = this.props;
        let genreid;

        let index = category.length;
        if(type === 'tv' && category.indexOf('&')-1 > -1) index = category.indexOf('&')-1; 
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

    containerRef = React.createRef();
    infoRef = React.createRef();

    render() {
        const {getData, category, type, page, getPosterInfo, createGenres, addListMedia, removeListMedia} = this.props;

        if(!getData.data[`${category.replace(/\s/g,'')}${this.capitalizeFirstLetter(type)}`]) return <Loading />

        let data = getData.data[`${category.replace(/\s/g,'')}${this.capitalizeFirstLetter(type)}`];

        return(
            <div className='info-wrapper'>
                <Info 
                createGenres={createGenres} 
                getData={getData} 
                containerRef={this.containerRef}
                infoRef={this.infoRef}
                addListMedia={addListMedia}
                removeListMedia={removeListMedia}  
                />
                <div ref={this.containerRef} className='main-container'>
                    <div className='page-container'>
                        <div className='title'>
                                <h3>{category}</h3>
                        </div>
                            {data.results.map((item,index) => {
                                return(
                                    <div key={index} className='poster'>
                                        <img
                                        onClick={() => {
                                            this.infoRef.current.style.display = 'flex';
                                            this.containerRef.current.style.width = '80vw';
                                            getPosterInfo(item);       
                                        }}
                                        onError={(e) => {
                                            e.target.src='https://i.imgur.com/zwpr2vD.jpg'
                                        }} 
                                        src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`} />
                                    </div>
                                );
                            })}
                    </div>
                    <div className='page-btns'>
                        <div className='btn-bar'>
                            <button onClick={() => { 
                                if(parseInt(page)-1 > 0) 
                                    this.newPage((parseInt(page) -1)) 
                                }
                            }>&lt;</button>
                            {this.createPages(category, page, data.total_pages)}
                            <button onClick={() => { 
                                if(parseInt(page) < data.total_pages){ 
                                    this.newPage((parseInt(page) + 1));
                                }
                            }}>&gt;</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Pages;
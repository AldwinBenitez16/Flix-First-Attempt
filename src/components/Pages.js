// React
import React, {Component} from 'react';

// Components
import Loading from './Loading';
import Info from '../components/Info';

// CSS
import '../css/pages.css';

import axios from 'axios';

class Pages extends Component {
    

    UNSAFE_componentWillMount() {
        let {fetchProducts, type, category, page} = this.props;

        let genreid = this.getGenre(category, type);
        if(type !== 'search') {
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
        } else {
            this.getSearch(category);
        }
    }

    async getResults(query) {
        await this.search(query, 'movie');
        await this.search(query, 'tv');
        console.log(this.props.getData.data.search);
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
            updateSearch({[type + 'Data']: res.data.results, [type + 'Pages']: res.data.total_pages});
        })
        .catch(err => {
            console.log('Search Failed', err)
        });
    }

    getSearch = (query) => {
        this.getResults(query);
    }

    newPage = (page) => {
        const {type, category} = this.props;
        window.location = window.location.origin + `/pages/${type}-${category}-${page}`;
    }

    createPages = (type, category, page, maxpages) => {
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
        let datatype = `${type}Genres`;

        if(type === 'search') {
            getData.data[`${'tv'}Genres`].genres.forEach(genre => {
                if(genre.name.substring(0, index).toLowerCase() === category.substring(0, index)) {
                    genreid = genre.id;
                }
            });
            getData.data[`${'movie'}Genres`].genres.forEach(genre => {
                if(genre.name.substring(0, index).toLowerCase() === category.substring(0, index)) {
                    genreid = genre.id;
                }
            });
        } else {
            getData.data[datatype].genres.forEach(genre => {
                if(genre.name.substring(0, index).toLowerCase() === category.substring(0, index)) {
                    genreid = genre.id;
                }
            });
        }
        
        return genreid;
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    containerRef = React.createRef();
    infoRef = React.createRef();

    render() {
        const {getData, category, type, page, getPosterInfo, createGenres, addListMedia, removeListMedia, createList} = this.props;
        console.log(!getData.data[`${category.replace(/\s/g,'')}${this.capitalizeFirstLetter(type)}`]);
        if(!getData.data[`${category.replace(/\s/g,'')}${this.capitalizeFirstLetter(type)}`] && 
        !([...getData.data.search.tvData, ...getData.data.search.movieData].length > 0)) return <Loading />

        let data = getData.data[`${category.replace(/\s/g,'')}${this.capitalizeFirstLetter(type)}`];
        if(data) data = getData.data[`${category.replace(/\s/g,'')}${this.capitalizeFirstLetter(type)}`];
        if(type === 'search') data = [...getData.data.search.tvData, ...getData.data.search.movieData];
        console.log(data);
        return(
            <div className='info-wrapper'>
                <Info 
                createGenres={createGenres} 
                getData={getData} 
                containerRef={this.containerRef}
                infoRef={this.infoRef}
                addListMedia={addListMedia}
                removeListMedia={removeListMedia}  
                createList={createList}
                />
                <div ref={this.containerRef} className='main-container'>
                    <div className='page-container'>
                        <div className='title'>
                                <h3>{(category != 'sci') ? category.substring(0,1).toUpperCase() + category.substring(1) : 'Sci-Fi & Adventure'}</h3>
                        </div>
                            {(type === 'search' ? data : data.results).map((item,index) => {
                                return(
                                    <div key={index} className='poster'>
                                        <img
                                        onClick={() => {
                                            this.infoRef.current.style.display = 'flex';
                                            this.infoRef.current.className = 'info-container overlay';
                                            this.infoRef.current.style.top = 'calc(' + window.pageYOffset + 'px + 25vh)';
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
                            {this.createPages(type ,category, page, data.total_pages)}
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
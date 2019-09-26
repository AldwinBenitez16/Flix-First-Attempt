// React
import React, {Component} from 'react';

// Components
import Loading from './Loading';

// CSS
import '../css/genre.css';

class Genre extends Component {


    UNSAFE_componentWillMount() {
        let {fetchProducts, genretype, genrepage} = this.props;
        let genreid = this.getGenre(genretype);

        fetchProducts(
            `https://api.themoviedb.org/3/discover/tv?api_key=a34097a10fd6daf67cb09e71f3d7a0ea&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${genrepage}&with_genres=${genreid}`,
            `${genretype.replace(/\s/g,'')}`
        );
    }

    getGenre = (genretype) => {
        const {getData} = this.props;
        let genreid;
        getData.data.genres.genres.forEach(genre => {
            if(genre.name === genretype) {
                genreid = genre.id;
            }
        });
        return genreid;
    }

    newPage = (genretype, newPage) => {
        window.location = `${genretype}-${newPage}`;
    }

    createPages = (genretype, pageNum, genrepage) => {
        let pages =[];
        let btnNum;

        if(pageNum >= 7) btnNum = 7; 
        if(pageNum < 7) btnNum = pageNum;

        for(let i = 0; i < btnNum; i++) {
            let info;
            let activate;
            if(genrepage <= 3) info = i+1;
            if(genrepage > 3) info = (genrepage-3)+(i);
            if(info !== parseInt(genrepage)) activate = '';
            if(info === parseInt(genrepage)) activate = 'active-page';
             
            if(info <= pageNum){ 
                pages.push(<button onClick={(e) => {
                    this.newPage(genretype, e.target.textContent);
                }} className={activate} key={`${info}`} >{info}</button>);
            }
        }

        return pages;
    }

    render() {
        const {getData, genretype, genrepage} = this.props;

        let genreclean = genretype.replace(/\s/g,'');

        if(!getData.data[genreclean]) return <Loading />

        const genreArray = getData.data[genreclean].results;

        return(

            <div className='pagination-container'>
                <div className='page-container'>
                    <div className='title'>
                            <h3>{genretype}</h3>
                    </div>
                        {genreArray.map((trend,index) => {
                            return(
                                <div key={index} className='poster'>
                                    <img
                                    onError={(e) => {
                                        e.target.src='https://i.imgur.com/zwpr2vD.jpg'
                                    }} 
                                    src={`https://image.tmdb.org/t/p/w500/${trend.poster_path}`} />
                                </div>
                            );
                        })}
                </div>
                <div className='page-btns'>
                    <div className='btn-bar'>
                        <button onClick={() => { 
                            if(parseInt(genrepage)-1 > 0) 
                                this.newPage(genretype, (parseInt(genrepage) -1)) 
                            }
                        }>&lt;</button>
                        {this.createPages(genretype, getData.data[genreclean].total_pages, genrepage)}
                        <button onClick={() => { 
                            if(parseInt(genrepage) < getData.data[genreclean].total_pages){ 
                                this.newPage(genretype, (parseInt(genrepage) + 1));
                            }
                        }}>&gt;</button>
                    </div>
                </div>
            </div>
        );
    }
}
 
export default (Genre);

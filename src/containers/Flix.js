// React 
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Redux 
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as StoreActionCreators from '../actions/store'; 
import fetchProductsAction from '../actions/fetchProducts';

// Component
import Login from '../components/Login';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Home from '../components/Home';
import Pages from '../components/Pages';
import Movie from '../components/Movies';
import Shows from '../components/Shows';
import Authenticated from '../components/Authenticated';

import Loading from '../components/Loading';


// React Router
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';

class Flix extends Component{

  UNSAFE_componentWillMount() {
    const {fetchProducts} = this.props;
    fetchProducts(
      'https://api.themoviedb.org/3/movie/top_rated?api_key=a34097a10fd6daf67cb09e71f3d7a0ea&language=en-US&page=1',
      'top_ratedMovie'
    );
    fetchProducts(
      'https://api.themoviedb.org/3/movie/upcoming?api_key=a34097a10fd6daf67cb09e71f3d7a0ea&language=en-US&page=1',
      'upcomingMovie'
    );
    fetchProducts(
      'https://api.themoviedb.org/3/movie/now_playing?api_key=a34097a10fd6daf67cb09e71f3d7a0ea&language=en-US&page=1',
      'now_playingMovie'
    );
    fetchProducts(
      'https://api.themoviedb.org/3/trending/movie/week?api_key=a34097a10fd6daf67cb09e71f3d7a0ea',
      'trendingMovie'
    );
    fetchProducts(
      'https://api.themoviedb.org/3/trending/tv/week?api_key=a34097a10fd6daf67cb09e71f3d7a0ea',
      'trendingTv'
    );
    fetchProducts(
      'https://api.themoviedb.org/3/genre/movie/list?api_key=a34097a10fd6daf67cb09e71f3d7a0ea&language=en-US',
      'movieGenres'
    );
    fetchProducts(
      'https://api.themoviedb.org/3/genre/tv/list?api_key=a34097a10fd6daf67cb09e71f3d7a0ea&language=en-US',
      'tvGenres'
    );
  }

  getGenre = (genre, id) => {
      for(let i = 0; i < genre.length; i++) {
          if(genre[i].id === id) {
              return genre[i].name;
          }
      }
  }

  createGenres = (image, genre) => {
      let genreList = [];

      for(let i = 0; i < image[0].genre_ids.length; i++) {
          let genres;

          
          genres = this.getGenre(genre, image[0].genre_ids[i]);
          genreList.push(<li id={image[0].genre_ids[i]} key={i} className={genres}>{genres}</li>);
      }
      return genreList;
  }

  containerRef = React.createRef();
  render() {
    const {getData, 
      fetchProducts, 
      getSlides, 
      getPosterInfo, 
      getUserInfo, 
      updateList, 
      addListMedia, 
      removeListMedia} = this.props;

    if(!(Object.getOwnPropertyNames(getData.data).length >= 7)) return <Loading />

    return(
      <Router>
        <div className="App">
          <Header 
          getData={getData}
          createGenres={this.createGenres}  
          containerRef={this.containerRef}
          getUserInfo={getUserInfo}
          />

          <Switch>
            <Route 
            path='/home' 
            render={() => <Home 
              createGenres={this.createGenres}
              getData={getData} 
              getSlides={getSlides}
              getPosterInfo={getPosterInfo} 
              addListMedia={addListMedia}
              removeListMedia={removeListMedia}  
              /> 
            } />
            <Route 
            path='/pages/:type-:category-:page' 
            render={(props) => <Pages 
              createGenres={this.createGenres}
              getPosterInfo={getPosterInfo}
              type={props.match.params.type}
              category={props.match.params.category}
              page={props.match.params.page} 
              getData={getData}
              fetchProducts={fetchProducts}
              addListMedia={addListMedia}
              removeListMedia={removeListMedia}  
              />
            } />
            <Route 
            path='/movies' 
            render={() => <Movie 
              createGenres={this.createGenres}
              getPosterInfo={getPosterInfo}
              getData={getData} 
              getSlides={getSlides}
              addListMedia={addListMedia}
              removeListMedia={removeListMedia} />
            } />
            <Route 
            path='/tv' 
              render={() => <Shows 
              createGenres={this.createGenres}
              getPosterInfo={getPosterInfo}
              getData={getData} 
              getSlides={getSlides} 
              addListMedia={addListMedia}
              removeListMedia={removeListMedia} />
            } />
            <Route 
              path='/login' 
              render={() => <Login 
                getData={getData}
                getUserInfo={getUserInfo}
                fetchProducts={fetchProducts} />
            } />
            <Route //private route
              path='/authenticated'
              render={ props => getData.user.isAuthenticated ? (
                <Authenticated 
                  getData={getData}
                  fetchProducts={fetchProducts}
                  createGenres={this.createGenres}
                  getSlides={getSlides}
                  getUserInfo={getUserInfo}
                  getPosterInfo={getPosterInfo}
                  updateList={updateList}
                  getSlides={getSlides}
                  addListMedia={addListMedia}
                /> // Loads the component passed to it
              ) : (
                  <Redirect to={{
                  pathname: '/login',
                  state: {from: props.location}
                  }} />// Redirects to signin page
              )}
            />
          </Switch>
          <Footer />
        </div>
      </Router>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchProducts: fetchProductsAction,
  getSlides: StoreActionCreators.getSlideToShow,
  getPosterInfo: StoreActionCreators.getPosterInfo,
  getUserInfo: StoreActionCreators.getUserInfo,
  updateList: StoreActionCreators.updateList,
  addListMedia: StoreActionCreators.addListMedia,
  removeListMedia: StoreActionCreators.removeListMedia
}, dispatch)

const mapStateToProps = state => ({
  getData: state,
  getDataPending: state.pending,
  getDataError: state.error
})

export default connect(mapStateToProps, mapDispatchToProps)(Flix);

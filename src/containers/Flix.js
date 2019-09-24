// React 
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Redux 
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as StoreActionCreators from '../actions/store'; 
import fetchProductsAction from '../actions/fetchProducts';

// Component
import Header from '../components/Header';
import Home from '../components/Home';
import Genre from '../components/Genre';
import Footer from '../components/Footer';
import LoadingSpinner from '../components/LoadingSpinner';

// React Router
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

class Flix extends Component{

  UNSAFE_componentWillMount() {
    const {fetchProducts} = this.props;
    fetchProducts(
      'https://api.themoviedb.org/3/trending/movie/week?api_key=a34097a10fd6daf67cb09e71f3d7a0ea',
      'trendingMovie'
    );
    fetchProducts(
      'https://api.themoviedb.org/3/trending/tv/week?api_key=a34097a10fd6daf67cb09e71f3d7a0ea',
      'trendingTv'
    );
    fetchProducts(
      'https://api.themoviedb.org/3/movie/upcoming?api_key=a34097a10fd6daf67cb09e71f3d7a0ea&language=en-US&page=1',
      'upcomingMovie'
    );
    fetchProducts(
      'https://api.themoviedb.org/3/movie/now_playing?api_key=a34097a10fd6daf67cb09e71f3d7a0ea&language=en-US&page=1',
      'playingNow'
    );
    fetchProducts(
      'https://api.themoviedb.org/3/genre/movie/list?api_key=a34097a10fd6daf67cb09e71f3d7a0ea&language=en-US',
      'genres'
    );
  }

  render() {
    const {dispatch, getSlides, getData, fetchProducts, getDataError, getDataPending} = this.props;
    if(!(Object.getOwnPropertyNames(getData.data).length >= 5)) return <LoadingSpinner />

    return(
      <Router>
        <div className="App">
          <Header getData={getData}/>

          <Switch>
            <Route exact path='/' render={() => <Home getData={getData} getSlides={getSlides} /> } />
            <Route path='/genre/:genretype-:genrepage' render={(props) => <Genre genretype={props.match.params.genretype} genrepage={props.match.params.genrepage} getData={getData} fetchProducts={fetchProducts} /> } />
          </Switch>

          <Footer />
        </div>
      </Router>
    )
  }
}

Flix.propTypes = {
  getDataPending: PropTypes.bool
}

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchProducts: fetchProductsAction,
  getSlides: StoreActionCreators.getSlideToShow
}, dispatch)

const mapStateToProps = state => ({
  getData: state,
  getDataPending: state.pending,
  getDataError: state.error
})

export default connect(mapStateToProps, mapDispatchToProps)(Flix);

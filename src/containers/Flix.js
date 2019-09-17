// React 
import React, {Component} from 'react';
import PropTypes from 'prop-types';

// Redux 
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as StoreActionCreators from '../actions/store'; 

// Component
import Header from '../components/Header';
import Home from '../components/Home';
import LoadingSpinner from '../components/LoadingSpinner';

// React Router
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

import fetchProductsAction from '../actions/fetchProducts';

class Flix extends Component{

  UNSAFE_componentWillMount() {
    const {fetchProducts} = this.props;
    fetchProducts(
      'https://api.themoviedb.org/3/trending/all/week?api_key=a34097a10fd6daf67cb09e71f3d7a0ea',
      'trending'
    );
  }
  
  shouldComponentRender() {
    const {getData} = this.props;
    if(getData.trending) {
      return true
    } else {
      return false;
    }
  }

  render() {
    const {dispatch, fetchProducts, getData, getTrendError, getTrendPending} = this.props;
    
    if(!this.shouldComponentRender()) return <LoadingSpinner />

    return(
      <Router>
        <div className="App">
          <Header />

          <Switch>
            <Route exact path='/' 
              render={() => <Home images={getData.images} fetchProducts={fetchProducts} trending={getData.trending}/>} />
          </Switch>
        </div>
      </Router>
    )
  }
}

Flix.propTypes = {
  getTrendPending: PropTypes.bool
}

const mapStateToProps = state => ({
  getData: state.data,
  getTrendPending: state.pending,
  getTrendError: state.error
})

const mapDispatchToProps = dispatch => bindActionCreators({
  fetchProducts: fetchProductsAction
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(Flix);

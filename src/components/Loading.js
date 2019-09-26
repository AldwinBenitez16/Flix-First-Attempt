import React from 'react';
import { BallBeat } from 'react-pure-loaders';

import '../css/loading.css';

class Loading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }
  render() {
    return (
      <div className='loading-container'>
        <BallBeat
          color={'#404042'}
          loading={this.state.loading}
        />
      </div>
    )
  }
}

export default Loading;
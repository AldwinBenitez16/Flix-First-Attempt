import React from 'react';
import ReactDOM from 'react-dom';
import Flix from './containers/Flix';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Flix />, div);
  ReactDOM.unmountComponentAtNode(div);
});

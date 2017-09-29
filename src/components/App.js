import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PageTopMenu from './PageTopMenu';
import * as actionCreators from '../actions/actionCreators';

class App extends Component {
  render () {
    return (
      <div>
        <PageTopMenu />
        {React.cloneElement(this.props.children, this.props)}
      </div>
    );
  }
}

function mapStateToProps (state) {
  return state;
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const AppConnect = connect(mapStateToProps, mapDispatchToProps)(App);

export default AppConnect;

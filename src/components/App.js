import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReduxToastr from 'react-redux-toastr';

import PageTopMenu from './PageTopMenu';
import * as actionCreators from '../actions/actionCreators';

import 'react-redux-toastr/lib/css/react-redux-toastr.min.css';

import { ConnectedRouter } from 'react-router-redux';

import EditorsRoute from '../routes/editor/EditorsRoute';
import ValidatorsRoute from '../routes/validator/ValidatorsRoute';
import DiffsRoute from '../routes/diff/DiffsRoute';
import { Route, Redirect, Switch } from 'react-router';
import SplitPane from 'react-split-pane';
import AsideVerticalTabs from './AsideVerticalTabs';

class App extends React.Component {
  get something () {
    return [{
      component: <EditorsRoute />,
      url: '/editor',
      storeName: 'editors'
    }, {
      component: <ValidatorsRoute />,
      url: '/validator',
      storeName: 'validators'
    }, {
      component: <DiffsRoute />,
      url: '/diff',
      storeName: 'diffs'
    }];
  }

  renderRouterTabs () {
    return (
      this.something.map((route, i) => {
        return (
          <Route key={i} path={`${route.url}/:tabIndex`} render={props => {
            return (this.props[route.storeName][ props.match.params.tabIndex ])
              ? <AsideVerticalTabs tabList={this.props[route.storeName]} linkBase={route.url} storeName={route.storeName} />
              : <Redirect to={`${route.url}`} />;
          }} />
        );
      })
    );
  }

  renderRouterContent () {
    const result = [];

    this.something.forEach((route, i) => {
      const routeComponent = (
        <Route key={i} path={`${route.url}/:tabIndex`} render={props => {
          return (this.props[route.storeName][ props.match.params.tabIndex ])
              ? React.cloneElement(route.component, props)
              : <Redirect to={`${route.url}`} />;
        }} />
      );
      const redirectComponent = <Redirect from={`${route.url}`} to={`${route.url}/0`} />;

      result.push(routeComponent);
      result.push(redirectComponent);
    });

    return result;
  }

  render (store) {
    return (
      <div>
        <ReduxToastr
          timeOut={4000}
          newestOnTop={false}
          preventDuplicates
          position='top-left'
          transitionIn='fadeIn'
          transitionOut='fadeOut'
          progressBar />

        <PageTopMenu />

        <div className='j-main'>
          <SplitPane
            split='vertical'
            minSize={100}
            maxSize={300}
            defaultSize={150}
            className='primary'>

            <aside className='j-aside-tabs'>
              <Switch>
                {this.renderRouterTabs()}
              </Switch>
            </aside>

            <section className='j-pane-container'>
              <section className='j-pane'>
                <Switch>
                  {this.renderRouterContent()}
                </Switch>
              </section>
            </section>
          </SplitPane>
        </div>
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

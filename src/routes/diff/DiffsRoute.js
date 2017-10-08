import React from 'react';
import { FormGroup, Label, ButtonGroup, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SplitPane from 'react-split-pane';
import jsondiffpatch from 'jsondiffpatch';
import jsondiffpatchFormatters from 'jsondiffpatch/src/formatters';
import jsonDiff from 'rfc6902-json-diff';

import JsonEditor from '../../components/JsonEditor';
import AsideVerticalTabs from '../../components/AsideVerticalTabs';
// import ValidationFeedback from '../../components/ValidationFeedback';
import * as actionCreators from './actions/actionCreators';

const RADIO_VALUE_HTML = 'RADIO_VALUE_HTML';
const RADIO_VALUE_RFC6902 = 'RADIO_VALUE_RFC6902';

class ValidatorsRoute extends React.Component {
  constructor () {
    super();

    this.jsondiffpatch = jsondiffpatch.create({});

    this.state = {
      rSelected: RADIO_VALUE_HTML
    };
  }

  get tabIndex () {
    return this.props.match.params.tabIndex;
  }

  get currentDiffObj () {
    return this.props.diffs[ this.tabIndex ];
  }

  onChangePaneValue (pane, value, e) {
    this.setState({
      ...this.state,
      shouldRenderOutput: false
    });

    if (pane === 'left') {
      this.props.updateLeftJsonPaneValue(this.tabIndex, value);
    } else {
      this.props.updateRightJsonPaneValue(this.tabIndex, value);
    }
  }

  onClickOutputBtn (rSelected) {
    this.setState({ ...this.state, rSelected });
  }

  getJsonValues () {
    try {
      return {
        leftValue: JSON.parse(this.currentDiffObj.leftValue),
        rightValue: JSON.parse(this.currentDiffObj.rightValue)
      };
    } catch (e) {
      return {};
    }
  }

  renderHtmlOutput () {
    const { leftValue, rightValue } = this.getJsonValues();

    if (!leftValue || !rightValue) return;

    const delta = this.jsondiffpatch.diff(leftValue, rightValue);
    const diffHtml = jsondiffpatchFormatters.html.format(delta, leftValue);

    return (
      <div dangerouslySetInnerHTML={{__html: diffHtml}} />
    );
  }

  renderJsonRfc9602Output () {
    const { leftValue, rightValue } = this.getJsonValues();

    if (!leftValue || !rightValue) return;

    const diffJson = jsonDiff(leftValue, rightValue);

    return (
      <JsonEditor mode={'code'} value={diffJson} onChange={e => {}} onError={e => {}} />
    );
  }

  renderResult () {
    if (!this.state.shouldRenderOutput) {
      return (
        <Button onClick={e => this.setState({...this.state, shouldRenderOutput: true})}>Render with new values!</Button>
      );
    }

    if (this.state.rSelected === RADIO_VALUE_HTML) {
      return this.renderHtmlOutput();
    } else if (this.state.rSelected === RADIO_VALUE_RFC6902) {
      return this.renderJsonRfc9602Output();
    }
  }

  render () {
    return (
      <div className='j-main'>
        <SplitPane
          split='vertical'
          minSize={50}
          maxSize={300}
          defaultSize={150}
          className='primary'>
          <aside className='j-aside-tabs'>
            <AsideVerticalTabs
              tabList={this.props.diffs}
              linkBase={'/diff/'}
              storeName='diffs'
            />
          </aside>
          <section className='j-pane-container'>
            <div className='j-pane'>

              <div className='col-xs-6'>
                <JsonEditor
                  mode={'code'}
                  value={this.currentDiffObj.leftValue}
                  onChange={this.onChangePaneValue.bind(this, 'left')}
                  onError={e => {}}
                  />

              </div>
              <div className='col-xs-6'>
                <JsonEditor
                  mode={'code'}
                  value={this.currentDiffObj.rightValue}
                  onChange={this.onChangePaneValue.bind(this, 'right')}
                  onError={e => {}}
                  />

              </div>

              <div className='clearfix' />

              <ButtonGroup>
                <Button
                  color='primary'
                  onClick={this.onClickOutputBtn.bind(this, RADIO_VALUE_HTML)}
                  active={this.state.rSelected === RADIO_VALUE_HTML}>HTML</Button>
                <Button
                  color='primary'
                  onClick={this.onClickOutputBtn.bind(this, RADIO_VALUE_RFC6902)}
                  active={this.state.rSelected === RADIO_VALUE_RFC6902}>JSON</Button>
              </ButtonGroup>

              {this.renderResult()}

            </div>
          </section>
        </SplitPane>
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

const ValidatorsRouteConnect = connect(mapStateToProps, mapDispatchToProps)(ValidatorsRoute);

export default ValidatorsRouteConnect;

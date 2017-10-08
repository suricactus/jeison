import React from 'react';
import { FormGroup, Label, ButtonGroup, Button } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SplitPane from 'react-split-pane';
import jsondiffpatch from 'jsondiffpatch';
import jsondiffpatchFormatters from 'jsondiffpatch/src/formatters';
import jsonDiff from 'rfc6902-json-diff';
import stringify from 'json-stringify-pretty-compact';
import { toastr } from 'react-redux-toastr';

import JsonEditor from '../../components/JsonEditor';
import * as actionCreators from './actions/actionCreators';

import 'jsondiffpatch/public/formatters-styles/html.css';

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
    if (pane === 'left') {
      this.props.updateLeftJsonPaneValue(this.tabIndex, value);
    } else {
      this.props.updateRightJsonPaneValue(this.tabIndex, value);
    }
  }

  onClickOutputBtn (rSelected) {
    this.setState({ ...this.state, rSelected });
  }

  onErrorJson (e) {
    console.log(e);
    toastr.error('JSON values is invalid', 'Please check the error: ' + e);
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
      <JsonEditor mode={'code'} value={stringify(diffJson, null, 2)} onChange={e => {}} onError={e => {}} />
    );
  }

  renderResult () {
    if (this.state.rSelected === RADIO_VALUE_HTML) {
      return this.renderHtmlOutput();
    } else if (this.state.rSelected === RADIO_VALUE_RFC6902) {
      return this.renderJsonRfc9602Output();
    }
  }

  render () {
    return (
      <div>
        <SplitPane
          split='horizontal'
          minSize={300}
          maxSize={3000}
          defaultSize={400}
          className='primary'>

          <section className='j-pane-container'>
            <div className='j-pane j-pane-vertical'>
              <JsonEditor
                mode={'code'}
                value={this.currentDiffObj.leftValue}
                onChange={this.onChangePaneValue.bind(this, 'left')}
                onError={this.onErrorJson.bind(this)}
              />

            </div>
            <div className='j-pane j-pane-vertical'>
              <JsonEditor
                mode={'code'}
                value={this.currentDiffObj.rightValue}
                onChange={this.onChangePaneValue.bind(this, 'right')}
                onError={this.onErrorJson.bind(this)}
              />
            </div>
          </section>
          <section className='j-pane-container'>
            <div className='j-pane'>

              <FormGroup>
                <Label>Choose output type:</Label>
                <ButtonGroup>
                  <Button
                    color='primary'
                    onClick={this.onClickOutputBtn.bind(this, RADIO_VALUE_HTML)}
                    active={this.state.rSelected === RADIO_VALUE_HTML}>
                  HTML
                </Button>
                  <Button
                    color='primary'
                    onClick={this.onClickOutputBtn.bind(this, RADIO_VALUE_RFC6902)}
                    active={this.state.rSelected === RADIO_VALUE_RFC6902}>
                  JSON
                </Button>
                </ButtonGroup>
              </FormGroup>

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

import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Input } from 'reactstrap';
import SplitPane from 'react-split-pane';
import Ajv from 'ajv';

import JsonEditor from '../../components/JsonEditor';
import ValidationFeedback from '../../components/ValidationFeedback';
import * as actionCreators from './actions/actionCreators';

// import jsonSchemaV3 from '../../data/json-schema-draft-03.json';
import jsonSchemaV4 from 'ajv/lib/refs/json-schema-draft-04.json';
import jsonSchemaV6 from 'ajv/lib/refs/json-schema-draft-06.json';

class ValidatorsRoute extends React.Component {
  constructor () {
    super();

    this.ajv = new Ajv({
      meta: false,
      allErrors: true,
      verbose: true,
      jsonPointers: true,
      addUsedSchema: false,
      extendRefs: true,
      unknownFormats: 'ignore'
    });

    // TODO v3 does not work for some reason :(
    // this.ajv.addMetaSchema(jsonSchemaV3);
    this.ajv.addMetaSchema(jsonSchemaV4);
    this.ajv.addMetaSchema(jsonSchemaV6);

    this.state = {};
  }

  changeSchemaHandler (value, e) {
    this.props.schemaValidatorUpdateSchemaPaneValue(this.tabIndex, value);

    this.setState(prevState => ({
      ...prevState,
      hasSchemaError: false,
      schemaErrors: []
    }));

    this.validateSchema(value);
  }

  changeDataHandler (value, e) {
    this.props.schemaValidatorUpdateJsonPaneValue(this.tabIndex, value);

    this.setState(prevState => ({
      ...prevState,
      hasDataError: false,
      dataErrors: []
    }));

    this.validateSchema(this.currentValidator.schemaValue);
  }

  validateSchema (schema) {
    let hasSchemaError = false;

    try {
      schema = JSON.parse(schema);
    } catch (err) {
      this.setState(prevState => ({
        ...prevState,
        hasSchemaError: true,
        schemaErrors: [{
          message: 'Unable to parse JSON in Schema',
          isParseError: true
        }]
      }));
    }

    try {
      hasSchemaError = !this.ajv.validateSchema(schema, true);
    } catch (e) {
      this.setState(prevState => ({
        ...prevState,
        hasSchemaError: true,
        schemaErrors: [{
          message: e.message,
          isParseError: true
        }]
      }));

      return;
    }

    this.setState(prevState => ({
      ...prevState,
      hasSchemaError: hasSchemaError,
      schemaErrors: this.ajv.errors
    }));

    if (hasSchemaError) return;

    this.validateData(schema);
  }

  validateData (schema) {
    let data;

    try {
      data = JSON.parse(this.currentValidator.jsonValue);
    } catch (e) {
      console.log(999999999, e);
      this.setState(prevState => ({
        ...prevState,
        hasDataError: true,
        dataErrors: [{
          message: 'Unable to parse JSON in Schema',
          isParseError: true
        }]
      }));

      return;
    }

    this.setState(prevState => ({
      ...prevState,
      hasDataError: this.ajv.validate(schema, data),
      dataErrors: this.ajv.errors
    }));
  }

  changeCurrentSchemaPresetHandler (e) {
    const { match, schemaList, schemaValidatorUpdateSchemaPaneValue } = this.props;
    const value = e.target.value;
    const newPaneValue = JSON.stringify(schemaList[value].schema, null, 2);

    schemaValidatorUpdateSchemaPaneValue(match.params.tabIndex, newPaneValue);
  }

  renderSelectBox () {
    const { schemaList } = this.props;
    const sortedOptions = Object.keys(schemaList).sort((keyA, keyB) => schemaList[ keyA ].ordering - schemaList[ keyB ].ordering);
    const domOptions = sortedOptions.map((key, idx) => <option key={key} value={key}>{schemaList[ key ].label}</option>);

    return (
      <Input type='select' onChange={this.changeCurrentSchemaPresetHandler.bind(this)}>
        {domOptions}
      </Input>
    );
  }

  get currentValidator () {
    return this.props.validators[ this.tabIndex ];
  }

  get tabIndex () {
    return this.props.match.params.tabIndex;
  }

  render () {
    return (
      <div className='h100'>
        <nav>
          <div className='form-inline'>
            <label>
                    Select predefined schema:
                    {this.renderSelectBox()}
            </label>
          </div>
        </nav>
        <div style={{position: 'relative', height: 'calc(100% - 4rem)', 'overflow': 'auto'}}>
          <SplitPane
            split='horizontal'
            minSize={300}
            maxSize={2000}
            defaultSize={400}
            className='primary'>
            <section className='j-pane-container'>
              <div className='j-pane j-pane-vertical'>

                <h3>Schema</h3>
                <JsonEditor
                  mode={'code'}
                  value={this.currentValidator.schemaValue}
                  onChange={this.changeSchemaHandler.bind(this)}
                  onError={e => {}}
                    />
              </div>
              <div className='j-pane j-pane-vertical'>
                <h3>Data</h3>
                <JsonEditor
                  className=''
                  mode={'code'}
                  value={this.currentValidator.jsonValue}
                  onChange={this.changeDataHandler.bind(this)}
                  onError={e => {}}
                    />
              </div>
            </section>
            <section className='j-pane-container'>
              <div className='j-pane'>
                <ValidationFeedback
                  errors={this.state.schemaErrors}
                  success='Schema is valid!!!'
                  title='Schema validation' />

              </div>
              <div className='j-pane'>
                <ValidationFeedback
                  errors={this.state.dataErrors}
                  success='Everything is valid!!!'
                  title='Content validation' />

              </div>
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

const ValidatorsRouteConnect = connect(mapStateToProps, mapDispatchToProps)(ValidatorsRoute);

export default ValidatorsRouteConnect;

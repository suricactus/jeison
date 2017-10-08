import React from 'react';
import JSONEditor from 'jsoneditor';
import PropTypes from 'prop-types';

import 'jsoneditor/dist/jsoneditor.css';

class JsonEditor extends React.Component {
  static get propTupes () {
    return {
      onChange: PropTypes.func.isRequired,
      onError: PropTypes.func.isRequired
    };
  }

  componentDidMount () {
    // store the node on the `this.node` so we can access elsewhere
    this.node = this.refs.editor;

    this.$editor = new JSONEditor(this.node, {
      ...this.props,
      onChange: this.onEditorChange.bind(this),
      // onError: this.onEditorError.bind(this)
      onError: console.log
    });

    // moved this code so we can call it in other places
    this.updateValue();
  }

  componentWillUnmount () {
    this.$editor.destroy();
  }

  shouldComponentUpdate () {
    return false;
  }

  componentWillReceiveProps (newProps) {
    this.updateValue(newProps);
  }

  updateValue (props) {
    props = props || this.props;

    try {
      if (props.value !== this.$editor.getText()) {
        this.$editor.setText(props.value || '');
      }
    } catch (e) {
      this.onEditorError(e);
    }
  }

  onEditorChange () {
    try {
      const val = this.$editor.getText() || '';

      this.props.onChange(val);
    } catch (e) {
      this.onEditorError(e);
    }
  }

  onEditorError (e) {
    console.log(5555);
    this.props.onError(e);
  }

  render () {
    return (
      <div ref='editor' className={this.props.className} />
    );
  }
}

export default JsonEditor;

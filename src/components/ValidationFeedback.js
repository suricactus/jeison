import React from 'react';

class ValidationFeedback extends React.Component {
  renderSingleError (err) {
    const msg = err.isParseError
      ? err.message
      : `Validation at path "${err.schemaPath}": ${err.message}`;

    return (
      <p className='alert alert-danger'>
        {msg}
      </p>
    );
  }

  render () {
    let feedback = <p className='alert alert-success'>{this.props.success}!</p>;

    if (this.props.errors && this.props.errors.length) {
      feedback = this.props.errors.map(this.renderSingleError.bind(this));
    }

    return (
      <div>
        <h4>{this.props.title}</h4>
        {feedback}
      </div>
    );
  }
}

export default ValidationFeedback;

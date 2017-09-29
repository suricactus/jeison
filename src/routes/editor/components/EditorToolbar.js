import React from 'react';
import FontAwesome from 'react-fontawesome';
import { Button } from 'reactstrap';

export default class EditorPageMenu extends React.Component {
  handleDrag (e, drag) {
    const container = drag.node.closest('.j-pane-container');

    console.log(5555, e.screenX);
    console.log(6666, container.getBoundingClientRect());
  }

  render () {
    const { tabIndex } = this.props.match.params;

    return (
      <div className='j-editor-controls'>
        <Button ref='moveLeftToRight' onClick={() => this.props.editorMoveToRightJsonPane(tabIndex)}>
          <FontAwesome name='arrow-right' />
        </Button>
        <Button ref='moveRightToLeft' onClick={() => this.props.editorMoveToLeftJsonPane(tabIndex)}>
          <FontAwesome name='arrow-left' />
        </Button>
        <Button ref='swap' onClick={() => this.props.editorSwapValues(tabIndex)}>
          <FontAwesome name='exchange' />
        </Button>
        <div className='j-editor-control-resize' />
      </div>
    );
  }
}

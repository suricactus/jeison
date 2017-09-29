import React from 'react';
import { connect } from 'react-redux';
import SplitPane from 'react-split-pane';
import { bindActionCreators } from 'redux';

// Common components
import JsonEditor from '../../components/JsonEditor';
import AsideVerticalTabs from '../../components/AsideVerticalTabs';

// Route components
import EditorToolbar from './components/EditorToolbar';

// Route actions
import * as actionCreators from './actions/actionCreators';

class EditorsRoute extends React.Component {
  errorJsonPaneHandler (e) {
    console.log(e);
    // TODO show some kind of alert
  }

  changeJsonPaneHandler (leftOrRight, value, e) {
    const { match } = this.props;

    if (leftOrRight === 'left') {
      this.props.editorUpdatedLeftPaneValue(match.params.tabIndex, value);
    } else {
      this.props.editorUpdatedRightPaneValue(match.params.tabIndex, value);
    }
  }

  render () {
    const { match, editors } = this.props;
    const currentEditor = editors[ match.params.tabIndex ];

    return (
      <div className='j-main'>
        <SplitPane split='vertical' minSize={50} maxSize={300} defaultSize={150} className='primary'>
          <aside className='j-aside-tabs'>
            <AsideVerticalTabs
              tabList={this.props.editors}
              linkBase={'/editor/'}
              storeName='editors'
            />
          </aside>
          <section className='j-pane-container'>
            <div className='j-pane'>
              <JsonEditor
                mode={'code'}
                value={currentEditor.leftJsonPaneValue}
                onChange={this.changeJsonPaneHandler.bind(this, 'left')}
                onError={this.errorJsonPaneHandler.bind(this)} />
            </div>

            <EditorToolbar {...this.props} />

            <div className='j-pane'>
              <JsonEditor
                mode={'tree'}
                value={currentEditor.rightJsonPaneValue}
                onChange={this.changeJsonPaneHandler.bind(this, 'right')}
                onError={this.errorJsonPaneHandler.bind(this)} />
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

const EditorsRouteConnect = connect(mapStateToProps, mapDispatchToProps)(EditorsRoute);

export default EditorsRouteConnect;

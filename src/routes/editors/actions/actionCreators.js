export function editorSwapValues(tabIndex) {
  return {
    type: 'EDITOR_SWAP_VALUES',
    tabIndex
  };
}


export function editorMoveToLeftJsonPane(tabIndex) {
  return {
    type: 'EDITOR_MOVE_TO_LEFT_JSON_PANE',
    tabIndex
  };
}


export function editorMoveToRightJsonPane(tabIndex) {
  return {
    type: 'EDITOR_MOVE_TO_RIGHT_JSON_PANE',
    tabIndex
  };
}


export function editorAddNewTab(tabIndex) {
  return {
    type: 'EDITOR_ADD_NEW_TAB',
    tabIndex
  };
}


export function editorCloseTab(tabIndex) {
  return {
    type: 'EDITOR_CLOSE_TAB',
    tabIndex
  };
}


export function editorTabNameChange(tabIndex, name) {
  return {
    type: 'EDITOR_CHANGE_TAB_NAME',
    tabIndex,
    name
  };
}

export function editorUpdatedLeftPaneValue(tabIndex, value) {
  return {
    type: 'EDITOR_UPDATED_LEFT_PANE_VALUE',
    tabIndex,
    value
  };
}


export function editorUpdatedRightPaneValue(tabIndex, value) {
  return {
    type: 'EDITOR_UPDATED_RIGHT_PANE_VALUE',
    tabIndex,
    value
  };
}
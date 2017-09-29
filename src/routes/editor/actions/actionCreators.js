export function editorSwapValues (tabIndex) {
  return {
    type: 'EDITOR_SWAP_VALUES',
    tabIndex
  };
}

export function editorMoveToLeftJsonPane (tabIndex) {
  return {
    type: 'EDITOR_MOVE_TO_LEFT_JSON_PANE',
    tabIndex
  };
}

export function editorMoveToRightJsonPane (tabIndex) {
  return {
    type: 'EDITOR_MOVE_TO_RIGHT_JSON_PANE',
    tabIndex
  };
}

export function editorUpdatedLeftPaneValue (tabIndex, value) {
  return {
    type: 'EDITOR_UPDATE_LEFT_PANE_VALUE',
    tabIndex,
    value
  };
}

export function editorUpdatedRightPaneValue (tabIndex, value) {
  return {
    type: 'EDITOR_UPDATE_RIGHT_PANE_VALUE',
    tabIndex,
    value
  };
}

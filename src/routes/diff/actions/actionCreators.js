const storeName = 'diffs';

export function swapJsonPaneValues (tabIndex) {
  return {
    type: 'DIFF_SWAP_PANE_VALUES',
    storeName
  };
}

export function updateLeftJsonPaneValue (tabIndex, value) {
  return {
    type: 'DIFF_UPDATE_LEFT_JSON_PANE_VALUE',
    storeName,
    tabIndex,
    value
  };
}

export function updateRightJsonPaneValue (tabIndex, value) {
  return {
    type: 'DIFF_UPDATE_RIGHT_JSON_PANE_VALUE',
    storeName,
    tabIndex,
    value
  };
}

export default function diffsReducer (state = [createDefaultTab()], action) {
  if (action.storeName !== 'diffs') return state;

  if (action.tabIndex !== undefined && action.type !== 'ASIDE_TAB_NEW' && action.type !== 'ASIDE_TAB_CLOSE' && action.type !== 'ASIDE_TAB_RENAME') {
    return [
      ...state.slice(0, action.tabIndex),
      UpdateSinglePane(state[ action.tabIndex ], action),
      ...state.slice(+action.tabIndex + 1)
    ];
  }

  switch (action.type) {
    case 'ASIDE_TAB_NEW':
      return [
        ...state,
        createDefaultTab(state)
      ];

    case 'ASIDE_TAB_CLOSE':
      return [
        ...state.slice(0, action.tabIndex),
        ...state.slice(action.tabIndex + 1)
      ];

    case 'ASIDE_TAB_RENAME':
      return [
        ...state.slice(0, action.tabIndex),
        {
          ...state[ action.tabIndex ],
          name: action.name
        },
        ...state.slice(+action.tabIndex + 1)
      ];

    default:
      return state;
  }
}

function UpdateSinglePane (state, action) {
  switch (action.type) {
    case 'DIFF_SWAP_PANE_VALUES':
      const { leftValue, rightValue } = state;

      return {
        ...state,
        rightValue: leftValue,
        leftValue: rightValue
      };

    case 'DIFF_UPDATE_LEFT_JSON_PANE_VALUE':
      return {
        ...state,
        leftValue: action.value
      };

    case 'DIFF_UPDATE_RIGHT_JSON_PANE_VALUE':
      return {
        ...state,
        rightValue: action.value
      };

    default:
      return state;
  }
}

function createDefaultTab (state = []) {
  let humanIndex = 0;

  state.forEach((item) => {
    humanIndex = humanIndex < item.humanIndex ? item.humanIndex : humanIndex;
  });

  humanIndex++;

  const defaultTab = {
    humanIndex: humanIndex,
    name: 'Tab #' + humanIndex,
    leftValue: '{\n  "a": "5"\n}',
    rightValue: '{\n  "a": "6"\n}'
  };

  return defaultTab;
}

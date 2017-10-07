export default function editorsReducer (state = [createDefaultTab()], action) {
  if (action.storeName !== 'editors') return state;

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
  const rightJsonPaneValue = state ? state.rightJsonPaneValue : undefined;
  const leftJsonPaneValue = state ? state.leftJsonPaneValue : undefined;

  switch (action.type) {
    case 'EDITOR_UPDATE_LEFT_PANE_VALUE':
      return {
        ...state,
        leftJsonPaneValue: action.value
      };

    case 'EDITOR_UPDATE_RIGHT_PANE_VALUE':
      return {
        ...state,
        rightJsonPaneValue: action.value
      };

    case 'EDITOR_SWAP_VALUES':
      return {
        ...state,
        rightJsonPaneValue: leftJsonPaneValue,
        leftJsonPaneValue: rightJsonPaneValue
      };

    case 'EDITOR_MOVE_TO_LEFT_JSON_PANE':
      return {
        ...state,
        leftJsonPaneValue: rightJsonPaneValue
      };

    case 'EDITOR_MOVE_TO_RIGHT_JSON_PANE':
      return {
        ...state,
        rightJsonPaneValue: leftJsonPaneValue
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
    leftJsonPaneValue: `{
  "array": [
    1,
    2,
    3
  ],
  "boolean": true,
  "null": null,
  "number": 123,
  "object": {
    "a": "b",
    "c": "d",
    "e": "f"
  },
  "string": "Hello World"
}`,
    rightJsonPaneValue: `{a: 6}`

  };

  return defaultTab;
}

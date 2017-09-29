export default function editorsReducer (state = [createDefaultTab()], action) {
  console.log(action);

  if (action.tabIndex !== undefined && action.type !== 'ASIDE_TAB_NEW' && action.type !== 'ASIDE_TAB_CLOSE' && action.type !== 'ASIDE_TAB_RENAME') {
    return [
      ...state.slice(0, action.tabIndex),
      UpdateSinglePane(state[ action.tabIndex ], action),
      ...state.slice(+action.tabIndex + 1)
    ];
  }

  switch (action.type) {
    case 'ASIDE_TAB_NEW':
      if (action.storeName !== 'validators') return state;

      return [
        ...state,
        createDefaultTab(state)
      ];

    case 'ASIDE_TAB_CLOSE':
      if (action.storeName !== 'validators') return state;

      return [
        ...state.slice(0, action.tabIndex),
        ...state.slice(action.tabIndex + 1)
      ];

    case 'ASIDE_TAB_RENAME':
      if (action.storeName !== 'validators') return state;

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
    case 'SCHEMA_VALIDATOR_UPDATE_SCHEMA_PANE_VALUE':
      return {
        ...state,
        schemaValue: action.value
      };

    case 'SCHEMA_VALIDATOR_UPDATE_JSON_PANE_VALUE':
      return {
        ...state,
        jsonValue: action.value
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
    schemaValue: '{\n  "$schema": "http://json-schema.org/draft-06/schema#"\n}',
    jsonValue: '{}'
  };

  return defaultTab;
}

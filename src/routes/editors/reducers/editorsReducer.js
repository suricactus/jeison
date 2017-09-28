export default function editorsReducer(state = [createDefaultTab()], action) {
  if(action.tabIndex !== undefined && action.type !== 'EDITOR_ADD_NEW_TAB' && action.type !== 'EDITOR_CLOSE_TAB') {
    return [
        ...state.slice(0, action.tabIndex),
        UpdateSinglePane(state[ action.tabIndex ], action),
        ...state.slice(+action.tabIndex + 1)
      ];
  }

  switch (action.type) {
    case 'EDITOR_ADD_NEW_TAB':
      return [
        ...state, 
        createDefaultTab(state)
      ];
    case 'EDITOR_CLOSE_TAB':
      return [
        ...state.slice(0, action.tabIndex),
        ...state.slice(action.tabIndex + 1)
      ];
    default:
      return state; 
  }

}



function UpdateSinglePane(state, action) {
  const rightJsonPaneValue = state.rightJsonPaneValue;
  const leftJsonPaneValue = state.leftJsonPaneValue;

  switch (action.type) {

    case 'EDITOR_CHANGE_TAB_NAME':
      return {
        ...state,
        name: action.name
      };

    case 'EDITOR_UPDATE_LEFT_PANE_VALUE':
      return {
        ...state,
        leftJsonPaneValue: action.value,
      };

    case 'EDITOR_UPDATE_RIGHT_PANE_VALUE':
      return {
        ...state,
        rightJsonPaneValue: action.value,
      };

    case 'EDITOR_SWAP_VALUES':
      return {
        ...state,
        rightJsonPaneValue: leftJsonPaneValue,
        leftJsonPaneValue: rightJsonPaneValue
      }
    
    case 'EDITOR_MOVE_TO_LEFT_JSON_PANE':
      return {
        ...state,
        leftJsonPaneValue: rightJsonPaneValue,
      };

    case 'EDITOR_MOVE_TO_RIGHT_JSON_PANE':
      return {
        ...state,
        rightJsonPaneValue: leftJsonPaneValue,
      };

    default:
      return state;
  
  }
}



function createDefaultTab(state = []) {
  let humanIndex = 0;

  state.forEach((item) => { 
    humanIndex = humanIndex < item.humanIndex ? item.humanIndex : humanIndex;
  });

  humanIndex++;

  const defaultTab = {
    humanIndex: humanIndex,
    name: 'Tab #' + humanIndex,
    leftJsonPaneValue: {
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
    },
    rightJsonPaneValue: {a: 6},

    settings: {
      leftJsonPaneWidth: 66,
      rightJsonPaneWidth: 24
    },
  };

  return defaultTab;
}

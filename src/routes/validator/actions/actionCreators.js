const storeName = 'validators';

export function schemaValidatorValidate (tabIndex) {
  return {
    type: 'SCHEMA_VALIDATOR_VALIDATE',
    storeName
  };
}

export function schemaValidatorClearValidationErrors (tabIndex) {
  return {
    type: 'SCHEMA_VALIDATOR_CLEAR_VALIDATION_ERRORS',
    storeName
  };
}

export function schemaValidatorUpdateSchemaPaneValue (tabIndex, value) {
  return {
    type: 'SCHEMA_VALIDATOR_UPDATE_SCHEMA_PANE_VALUE',
    storeName,
    tabIndex,
    value
  };
}

export function schemaValidatorUpdateJsonPaneValue (tabIndex, value) {
  return {
    type: 'SCHEMA_VALIDATOR_UPDATE_JSON_PANE_VALUE',
    storeName,
    tabIndex,
    value
  };
}

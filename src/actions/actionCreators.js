export function asideTabNew (storeName, tabIndex) {
  return {
    type: 'ASIDE_TAB_NEW',
    storeName,
    tabIndex
  };
}

export function asideTabClose (storeName, tabIndex) {
  return {
    type: 'ASIDE_TAB_CLOSE',
    storeName,
    tabIndex
  };
}

export function asideTabRename (storeName, tabIndex, name) {
  return {
    type: 'ASIDE_TAB_RENAME',
    storeName,
    tabIndex,
    name
  };
}

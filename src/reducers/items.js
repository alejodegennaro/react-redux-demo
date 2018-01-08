import * as actionTypes from '../actions/items';

function itemsHasErrored(state, action) {
    return Object.assign({},state,{
      hasErrored: action.hasErrored,
    })
}

function itemsIsLoading(state, action) {
    return Object.assign({},state,{
      isLoading: action.isLoading,
    })
}

function getItems(state, action) {
    let result = Object.assign({}, state, {
        items: action.items,        
    });
    return result;
}

function itemRemove(state, action) {
    let result = Object.assign({}, state, {
        items: [
                  ...state.items.slice(0,action.index),
                  ...state.items.slice(action.index+1)
                ]       
    });
    return result;
}

const initialState = {
    items: [],
    hasErrored: false,
    isLoading: false
};

const ACTION_HANDLERS = {
    [actionTypes.ITEMS_HAS_ERRORED] : (state, action) => itemsHasErrored(state,action),
    [actionTypes.ITEMS_IS_LOADING]: (state, action) => itemsIsLoading(state,action),
    [actionTypes.ITEMS_FETCH_DATA_SUCCESS] : (state, action) => getItems(state,action),
    [actionTypes.ITEMS_REMOVE] : (state, action) => itemRemove(state,action),
};

export default function itemsReducer (state = initialState, action) {
    const handler = ACTION_HANDLERS[action.type]
    const resultState = handler ? handler(state, action) : state
    return resultState
};

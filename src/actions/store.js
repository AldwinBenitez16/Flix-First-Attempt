import * as StoreActionTypes from '../actiontypes/store';


export function fetchProductsPending() {
    return {
        type: StoreActionTypes.FETCH_PRODUCTS_PENDING
    }
}

export function fetchProductsSuccess(data, key) {
    return {
        type: StoreActionTypes.FETCH_PRODUCTS_SUCCESS,
        data,
        key
    }
}

export function fetchProductsError(error) {
    return {
        type: StoreActionTypes.FETCH_PRODUCTS_ERROR,
        error: error
    }
}
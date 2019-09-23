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

export function getSlideToShow(width) {
    let extraShow = (width-250) / 230;
    let slides = 1 + Math.floor(extraShow);

    return {
        type: StoreActionTypes.GET_SLIDE_TO_SHOW,
        slides
    }
}
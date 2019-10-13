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
    let extraShow = (width-200) / 300;
    let slides = 1 + Math.floor(extraShow);

    return {
        type: StoreActionTypes.GET_SLIDE_TO_SHOW,
        slides
    }
}

export function getPosterInfo(data) {
    return {
        type: StoreActionTypes.GET_POSTER_INFO,
        data
    }
}

export function getUserInfo(data) {
    return {
        type: StoreActionTypes.GET_USER_INFO,
        data
    }
}

export function getGuestInfo(data) {
    return {
        type: StoreActionTypes.GET_GUEST_INFO,
        data
    }
}

export function updateList(data) {
    return {
        type: StoreActionTypes.UPDATE_USER_LIST,
        data
    }
}

export function addListMedia(lsid, data) {
    return {
        type: StoreActionTypes.ADD_LIST_MEDIA,
        lsid,
        data
    }
}

export function removeListMedia(lsid, data) {
    return {
        type: StoreActionTypes.REMOVE_LIST_MEDIA,
        lsid,
        data
    }
}

export function updateSearch(data) {
    return {
        type: StoreActionTypes.UPDATE_SEARCH,
        data
    }
}





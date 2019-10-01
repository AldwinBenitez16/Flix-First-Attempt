// redux
import * as StoreActionTypes from '../actiontypes/store';

const initialState = {
    pending: false,
    data: {},
    error: null, 
    slideToShow: 1,
    posterInfo: {
        data: {
            genre_ids: []
        },
        title: 'N/A',
        overview: 'N/A', 
        genres: []
    },
    user: {
        isAuthenticated: false,
        username: '',
        password: '',
        session_id: '',
        errors: []
    }
};

export default function Store(state=initialState, action) {
    // console.log(action);
    switch(action.type) {
        case StoreActionTypes.FETCH_PRODUCTS_PENDING: 
            return {
                ...state,
                pending: true
            }
        case StoreActionTypes.FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                pending: false,
                data: {
                    ...state.data,
                    [action.key]: action.data
                }
            }
        case StoreActionTypes.FETCH_PRODUCTS_ERROR:
            return {
                ...state,
                pending: false,
                error: action.error
            }
        case StoreActionTypes.GET_SLIDE_TO_SHOW:
            // console.log(action);
            return {
                ...state,
                slideToShow: action.slides
            }
        case StoreActionTypes.GET_POSTER_INFO: 
            return {
                ...state,
                posterInfo: {
                    data: action.data,
                    title: action.data.title,
                    overview: action.data.overview,
                    genres: action.data.genre_ids
                }
            }
        default:
            return state;
    }
}
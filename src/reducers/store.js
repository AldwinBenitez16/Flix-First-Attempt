// redux
import * as StoreActionTypes from '../actiontypes/store';

// Cookie manager
import Cookies from 'js-cookie';

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
    user: Cookies.getJSON('AuthenticatedUser') || {
        isAuthenticated: false,
        username: '',
        password: '',
        session_id: '',
        errors: []
    },
    list: {
        favorites: Cookies.getJSON('favorites') || {
            list_id: '',
            media: {}
        },
        watch_later: Cookies.getJSON('watch_later') || {
            list_id: '',
            media: {}
        },
        rated: Cookies.getJSON('rated') || {
            list_id: '',
            media: {}
        },
        created: Cookies.getJSON('created') || {}
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
        case StoreActionTypes.GET_USER_INFO:
            return {
                ...state,
                user: {
                    ...state.user,
                    ...action.data
                }
            }
        case StoreActionTypes.UPDATE_USER_LIST:
            return {
                ...state,
                list: {
                    ...state.list,
                    ...action.data
                }
            }    
        case StoreActionTypes.UPDATE_USER_LIST_CREATED:
            return {
                ...state,
                list: {
                    ...state.list,
                    created: {
                        ...state.list.created,
                        ...action.data
                    }
                }
            } 
        case StoreActionTypes.UPDATE_LIST_MEDIA:
            return {
                ...state,
                list: {
                    ...state.list,
                    [action.type]: {
                        media: {
                            ...state.list[action.type].media,
                            ...action.data
                        }
                    }
                }
            }    
        default:
            return state;
    }
}
// redux
import * as StoreActionTypes from '../actiontypes/store';

// Cookie manager
import Cookies from 'js-cookie';

const initialState = {
    pending: false,
    data: {
        search: {
            tvData: [],
            movieData: [],
            tvPages: 0,
            moviePages: 0
        }
    },
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
    guest: Cookies.getJSON('guest') || {
        isAuthenticated: false,
        session_id: ''
    },
    list: Cookies.getJSON('list') || {
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
        case StoreActionTypes.GET_GUEST_INFO:
        return {
            ...state,
            guest: {
                ...state.guest,
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
        case StoreActionTypes.ADD_LIST_MEDIA:
            return {
                ...state,
                list: {
                    ...state.list,
                    [action.lsid]: {
                        ...state.list[action.lsid],
                        media: {
                            ...state.list[action.lsid].media,
                            ...action.data
                        }
                    }
                }
            }    
        case StoreActionTypes.REMOVE_LIST_MEDIA:
            return {
                ...state,
                list: {
                    ...state.list,
                    [action.lsid]: {
                        ...state.list[action.lsid],
                        ...action.data
                    }
                }
            } 
        case StoreActionTypes.UPDATE_SEARCH:
            return {
                ...state,
                data: {
                    ...state.data,
                    search: {
                        ...state.data.search,
                        ...action.data
                    }
                }
            } 
        case StoreActionTypes.REMOVE_SEARCH:
            return {
                ...state,
                data: {
                    ...state.data,
                    search: []
                }
            } 
        default:
            return state;
    }
}
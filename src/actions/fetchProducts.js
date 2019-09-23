import {fetchProductsPending, fetchProductsSuccess, fetchProductsError} from './store';

// Axios
import axios from 'axios';

function fetchProducts(url, key) {
    return dispatch => {
        dispatch(fetchProductsPending());
        axios.get(url)
        .then(res => {
            if(res.error) {
                throw(res.error);
            }
            dispatch(fetchProductsSuccess(res.data, key));
            return res.data.results;
        })
        .catch(error => {
            dispatch(fetchProductsError(error));
        })
    }
}

export default fetchProducts;

import service from '../service';
import { SET_CATEGORY, SET_PLACE } from '../constants/actions';

export const setCategoryAction = (langId) => {
    return async (dispatch) => {
        const category = await service.getCategory(langId);

        dispatch({
            type: SET_CATEGORY,
            payload: category,
        });
    };
};

export const setPlaceAction = (langId) => {
    return async (dispatch) => {
        const place = await service.getPlace(langId);

        dispatch({
            type: SET_PLACE,
            payload: place,
        });
    };
};

export default {
    setCategoryAction,
    setPlaceAction,
};

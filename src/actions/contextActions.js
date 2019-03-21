import service from '../service';
import { SET_CATEGORY, SET_PLACE,
    SET_CATEGORY_LOADING_STATE, SET_PLACE_LOADING_STATE, RESET_LOADING_STATE } from '../constants/actions';
import { LOADING_STATE, FINISHED_STATE } from '../constants/loadingStates';

export const setCategoryAction = (langId) => {
    return async (dispatch) => {
        // FIXME: this call should probably not be here,
        // but since this is the first thing loaded, it works.
        dispatch({
            type: RESET_LOADING_STATE,
        });
        dispatch({
            type: SET_CATEGORY_LOADING_STATE,
            payload: LOADING_STATE,
        });
        const category = await service.getCategory(langId);
        dispatch({
            type: SET_CATEGORY,
            payload: category,
        });
        dispatch({
            type: SET_CATEGORY_LOADING_STATE,
            payload: FINISHED_STATE,
        });
    };
};

export const setPlaceAction = (langId) => {
    return async (dispatch) => {
        dispatch({
            type: SET_PLACE_LOADING_STATE,
            payload: LOADING_STATE,
        });
        const place = await service.getPlace(langId);
        dispatch({
            type: SET_PLACE,
            payload: place,
        });
        dispatch({
            type: SET_PLACE_LOADING_STATE,
            payload: FINISHED_STATE,
        });
    };
};

export default {
    setCategoryAction,
    setPlaceAction,
};

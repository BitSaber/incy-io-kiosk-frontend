import service from '../service';

export const SET_CATEGORY = "SET_CATEGORY";
export const SET_PLACE = "SET_PLACE";

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

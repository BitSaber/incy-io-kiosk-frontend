
import service from '../service';
export const SET_CONTEXT = "SET_CONTEXT";

export const setContextAction = (langId) => {
    return async (dispatch) => {
        const category = await service.getCategory(langId);
        const place = await service.getPlace(langId);

        dispatch({
            type: SET_CONTEXT,
            payload: { category, place }
        });
    };
};

export default {
    setContextAction
};

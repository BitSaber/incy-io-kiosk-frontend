
import service from '../service';
export const SET_FUNFACTS = "SET_FUNFACTS";

export const setFunfactsAction = (langId) => {
    return async (dispatch) => {
        const category = await service.getCategory(langId);
        const place = await service.getPlace(langId);

        dispatch({
            type: SET_FUNFACTS,
            payload: {category, place}
        });
    };
};

export default {
    setFunfactsAction
};

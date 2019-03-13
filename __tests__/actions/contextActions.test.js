import { setCategoryAction, setPlaceAction } from "../../src/actions/contextActions";
import { SET_CATEGORY, SET_PLACE } from '../../src/constants/actions';

// we mock the service so that we can return custom data
jest.mock("../../src/service", () => {
    const mockCategories = [{
        id: 65336,
    }];

    const mockPlaces = [{
        id: 1234
    }];

    const mockGetCategory = jest.fn();
    const mockGetPlace = jest.fn();

    mockGetCategory.mockReturnValue(mockCategories);
    mockGetPlace.mockReturnValue(mockPlaces);
    return {
        getCategory: mockGetCategory,
        getPlace: mockGetPlace,
    };
});

describe('contextActions', () => {
    it('should get the categories and set the first one of them', async () => {
        const action = setCategoryAction("en");
        const mockDispatch = jest.fn();
        await action(mockDispatch);

        expect(mockDispatch).toHaveBeenCalledTimes(1);
        expect(mockDispatch.mock.calls[0][0]).toEqual({
            type: SET_CATEGORY,
            payload: [{ id: 65336, }],
        });
    });

    it('should get the place and set the first one of them', async () => {
        const action = setPlaceAction("en");
        const mockDispatch = jest.fn();
        await action(mockDispatch);

        expect(mockDispatch).toHaveBeenCalledTimes(1);
        expect(mockDispatch.mock.calls[0][0]).toEqual({
            type: SET_PLACE,
            payload: [{ id: 1234 }],
        });
    });
});

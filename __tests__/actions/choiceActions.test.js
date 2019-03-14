//import { setCurrentChoicesAction } from "../../src/actions/choiceActions";
//import { SET_CURRENT_CHOICES } from "../../src/constants/actions";

// we mock the service so that we can return custom data
jest.mock("../../src/service", () => {
    const mockChoices = [
        {
            id: 1,
        },
    ];
    const mockGetChoices = jest.fn();
    mockGetChoices.mockReturnValue(mockChoices);
    return {
        getChoices: mockGetChoices,
    };
});

describe("choiceActions", () => { // TODO: this test currently does nothing
    it("should set choices", async () => {
        // setCurrentChoicesAction(1);
        // const mockDispatch = jest.fn();
        // mockDispatch();
        // expect(mockDispatch).toHaveBeenCalledTimes(1);
        // expect(mockDispatch.mock.calls[0][0]).toEqual({
        //     type: SET_CURRENT_CHOICES,
        //     payload: [
        //         {
        //             id: 1,
        //         },
        //     ],
        // });
    });
});

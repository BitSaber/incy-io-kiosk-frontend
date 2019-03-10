import { setAvailableChoicesAction } from "../../src/actions/choiceActions";
import { SET_AVAILABLE_CHOICES } from "../../src/constants/actions";

// we mock the service so that we can return custom data
jest.mock("../../src/service", () => {
    const mockChoices = [
        {
            id: 1
        }
    ];
    const mockGetChoices = jest.fn();
    mockGetChoices.mockReturnValue(mockChoices);
    return {
        getChoices: mockGetChoices
    };
});

describe("choiceActions", () => {
    it("should get and set choices", async () => {
        const action = await setAvailableChoicesAction('1',"en");
        const mockDispatch = jest.fn();
        await action(mockDispatch);

        expect(mockDispatch).toHaveBeenCalledTimes(1);
        expect(mockDispatch.mock.calls[0][0]).toEqual({
            type: SET_AVAILABLE_CHOICES,
            payload: [
                {
                    id: 1
                }
            ]
        });
    })
})


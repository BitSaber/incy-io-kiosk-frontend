import { setQuestionsAction, SET_QUESTIONS } from "../../src/actions/questionActions";

// we mock the service so that we can return custom data
jest.mock("../../src/service", () => {
    const mockQuestions = [
        {
            id: 5205,
        },
        {
            id: 5206,
        },
        {
            id: 5207,
        },
        {
            id: 5201,
        }
    ];
    const mockGetQuestions = jest.fn();
    mockGetQuestions.mockReturnValue(mockQuestions);
    return {
        getQuestions: mockGetQuestions
    };
});

describe("questionActions", () => {
    it("should get, sort and set the questions", async () => {
        const action = await setQuestionsAction("en");
        const mockDispatch = jest.fn();
        await action(mockDispatch);

        expect(mockDispatch).toHaveBeenCalledTimes(1);
        expect(mockDispatch.mock.calls[0][0]).toEqual({
            type: SET_QUESTIONS,
            payload: [
                {
                    id: 5201,
                },
                {
                    id: 5205,
                },
                {
                    id: 5206,
                },
                {
                    id: 5207,
                },
            ],
        });
    });
});

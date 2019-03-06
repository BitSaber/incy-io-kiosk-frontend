import { setQuestionsAction, SET_QUESTIONS } from "../../src/actions/questionActions";

// we mock the service so that we can return custom data
jest.mock("../../src/service", () => {
    const mockQuestions = [
        {
            position: 2,
        },
        {
            position: 3,
        },
        {
            position: 4,
        },
        {
            position: 1,
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
                    position: 1,
                },
                {
                    position: 2,
                },
                {
                    position: 3,
                },
                {
                    position: 4,
                },
            ],
        });
    });
});

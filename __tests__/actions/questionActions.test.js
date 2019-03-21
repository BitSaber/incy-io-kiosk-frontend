import { setQuestionsAction } from "../../src/actions/questionActions";
import { SET_QUESTIONS } from "../../src/constants/actions";
//import { SET_QUESTIONS } from "../../src/constants/actions";

// we mock the service so that we can return custom data
jest.mock("../../src/service", () => {
    const mockQuestions = [
        {
            id: 2,
            position: 2,
        },
        {
            id: 3,
            position: 3,
        },
        {
            id: 4,
            position: 4,
        },
        {
            id: 1,
            position: 1,
        },
    ];
    const mockGetQuestions = jest.fn();
    mockGetQuestions.mockReturnValue(mockQuestions);
    return {
        getQuestions: mockGetQuestions,
    };
});

describe("questionActions", () => {
    it("should get, sort, filter by category questions and set the questions", async () => {
        const action = await setQuestionsAction("en");
        const mockDispatch = jest.fn();
        const mockGetState = () => ({
            context: {
                category: [{
                    question_ids: [ 1, 2, 3 ],
                }],
            },
        });
        await action(mockDispatch, mockGetState);

        // here we could also test that the loading states are dispatched correctly
        expect(mockDispatch).toHaveBeenCalledTimes(3);
        expect(mockDispatch.mock.calls[1][0]).toEqual({
            type: SET_QUESTIONS,
            payload: [
                {
                    id: 1,
                    position: 1,
                },
                {
                    id: 2,
                    position: 2,
                },
                {
                    id: 3,
                    position: 3,
                },
            ],
        });
    });
});

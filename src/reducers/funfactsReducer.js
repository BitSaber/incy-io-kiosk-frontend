
import SET_FUNFACTS from '../actions/funfactsActions';

const initialState = {
    place: {
        "data": [
            {
                "can_report_to": true,
                "id": 7925,
                "is_archived": false,
                "latitude": null,
                "longitude": null,
                "name": "Staging Place"
            }
        ]
    },
    category: {"data" : [{"id":65336,"parent_id":null,"name":"Equipment","default_place_id":null,"default_deadline_interval":null,"quick_report_observations":false,"use_statuses":false,"ask_for_name_other":false,"description_help_text":"","quick_report_redirect":null,"observation_description_default":"","icon":"co_operation","assignees_field_help_text":null,"can_report_to":true,"question_ids":[5201,5205,5206,5207]}]}
}

const reducer = (state = initialState, action) => {
    if (action.type === SET_FUNFACTS) {
        return {
            ...state,
            place: action.place,
            category: action.category
        }
    }

    return state
}

export default reducer;

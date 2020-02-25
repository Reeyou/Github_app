import Types from '../../action/TYPES'
import {FLAG_LANGUAGE} from "../../api/LanguageDao";

const defaultState = {
    languages: [],
    keys: []
};
export default function onAction(state = defaultState, action) {
    switch (action.type) {
        case Types.LANGUAGE_LOAD_SUCCESS://获取数据成功
            if (FLAG_LANGUAGE.flag_key === action.flag) {
                return {
                    ...state,
                    keys: action.languages
                }
            } else {
                return {
                    ...state,
                    languages: action.languages
                }
            }
        default:
            return state;
    }

}
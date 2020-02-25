import TYPES from '../TYPES'
import {handleData, _projectModals} from '../actionUtil'
import LanguageDao from "../../expand/dao/LanguageDao";

/**
 * 加载标签
 * @param flagKey
 * @returns {function(*)}
 */
export function onLoadLanguage(flagKey) {
    return async dispatch => {
        try {
            let languages = await new LanguageDao(flagKey).fetch();
            dispatch({type: TYPES.LANGUAGE_LOAD_SUCCESS, languages: languages, flag: flagKey})
        } catch (e) {
            console.log(e)
        }
    }
}
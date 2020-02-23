import Types from '../../action/TYPES'

const defaultState = {}

/**state树横向扩展
 * 如何动态设置store和动态获取store
 * TRENDING {
*   java {
*     items: [],
*     isLoading: false
*   }
 * }
 * @param {*} state 
 * @param {*} action 
 */
export default function onAction(state = defaultState, action) {
  switch (action.type) {
    case Types.TRENDING_REFRESH_SUCCESS:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          items: action.items, // 原始数据
          projectModes: action.projectModes, // 此次要展示的数据
          isLoading: false,
          hideLoadingMore: false
        },
      };
    case Types.TRENDING_REFRESH:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          isLoading: true,
          hideLoadingMore: true
        },
      };
    case Types.TRENDING_REFRESH_FAIL:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          isLoading: false
        },
      };
    case Types.TRENDING_LOAD_MORE_SUCCESS:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          projectModes: action.projectModes,
          hideLoadingMore: false,
          pageIndex: action.pageIndex
        },
      };
    case Types.TRENDING_LOAD_MORE_FAIL:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          hideLoadingMore: true,
          pageIndex: action.pageIndex
        },
      };
    default:
      return state
  }
}
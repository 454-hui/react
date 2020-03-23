import {FIND,DELETE, LOADING,EDIT,ADD,RESET,SEARCH,SAVE,SortFliter} from '../actionTypes'
const DefultData = {
    loading : true,
    cache: null, 	
    results: {
        result : null,
        oldData : null
    },
    editingKey: '',
    filteredInfo: null,
    sortedInfo: null,
}
const AppReducer = (state = DefultData, action) => {
    switch (action.type) {
        case  SEARCH :
            return {
                ...state,
                loading : false,
                results : {
                    result : action.payload
                }
            }
        case DELETE:
            return {
                ...state,
                loading : false,
                results  : {
                    oldData : action.payload.dataSource.filter(item => item.id !== action.payload.key),
                    result : action.payload.dataSource.filter(item => item.id !== action.payload.key)
                }
            }
        case RESET :
            return {
                ...state,
                loading : false,
                filteredInfo : null,
                sortedInfo : null,
            }
        case ADD:
            return {
                ...state,
                results : {
                    oldData : action.payload,
                    result : action.payload
                }
            }
        case LOADING :
            return {
                ...state,
                loading : true,
            }
        case SAVE:
            return {
                ...state,
                results : {
                    oldData : action.payload,
                    result : action.payload
                },
                editingKey : ''
            }
        case FIND:
            return {
                ...state,
                cache : action.payload,
                results : {
                    oldData : action.payload,
                    result : action.payload
                }
            }
        case EDIT : 
            return {
                ...state,
                editingKey : action.payload
            }
        case SortFliter :
            return{
                ...state,
                filteredInfo : action.payload.filters,
                sortedInfo : action.payload.sorter,
            }
        case "LoadingFlase" :
            return{
                ...state,
                loading : false
            }
      
        default:
            return state
    }
}

export default AppReducer



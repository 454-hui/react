
import { FIND, DELETE, LOADING, EDIT, ADD, RESET, SEARCH, SAVE, SortFliter } from '../actionTypes'
const mapDispatch = {
    DeteleAction: (data) => {
        return {
            type: DELETE,
            payload: data
        }
    },
    LoadingAction: () => {
        return {
            type: LOADING,
            payload: ''
        }
    },
    FindeAction: (data) => {
        return {
            type: FIND,
            payload: data
        }
    },

    EditAction: (data) => {
        return {
            type: EDIT,
            payload: data
        }
    },

    AddAction: (data) => {
        return {
            type: ADD,
            payload: data
        }
    },
    ResetAction: () => {
        console.log(123)
        return {
            type: RESET,
            payload: '',
        }
    },
    SearchAction: (data) => {
        return {
            type: SEARCH,
            payload: data
        }
    },
    SaveAction: (data) => {
        return {
            type: SAVE,
            payload: data,
        }
    },
    SortFliterAction: (data) => {
        return {
            type: SortFliter,
            payload: data,
        }
    },
    LoadingFlase : () => {
        return{
            type : "LoadingFlase"
        }
    },
    
    FetchAsync: (str, value) => {
        switch (str) {
            case "FETCH":
                return {
                    type: "FETCH"
                }
            case "SearchFetch":
                return {
                    type: 'SearchFetch',
                    payload: value
                }
            case "DeleteFetch" :
                return {
                    type : "DeleteFetch",
                    payload : value
                }
        }
    }

}
const mapState = (state) => {
    return { ...state }
}



export {
    mapState,
    mapDispatch
}
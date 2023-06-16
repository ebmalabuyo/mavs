import { createContext, useReducer} from "react"

export const FilteredListContext = createContext()

export const FilteredListReducer = (state, action) => {
    switch(action.type) {
        case "SET_FILTERED_LISTS":
            return {
                filteredPlayers: action.payload
            }
        default:
            return state
    }
}

export const FilteredListContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(FilteredListReducer, {
        filteredPlayers: []
    })



    return (
        <FilteredListContext.Provider value={{...state, dispatch}}>
            {children}
        </FilteredListContext.Provider>

    )
}
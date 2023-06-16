import { createContext, useReducer} from "react"

export const SearchedListContext = createContext()

export const SearchedListReducer = (state, action) => {
    switch(action.type) {
        case "SET_SEARCHED_LISTS":
            return {
                searchedPlayers: action.payload
            }
        default:
            return state
    }
}

export const SearchedListContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(SearchedListReducer, {
        searchedPlayers: []
    })



    return (
        <SearchedListContext.Provider value={{...state, dispatch}}>
            {children}
        </SearchedListContext.Provider>

    )
}
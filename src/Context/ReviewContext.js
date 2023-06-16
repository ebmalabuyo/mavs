import { createContext, useReducer} from "react"

export const ReviewContext = createContext()

export const reviewReducer = (state, action) => {
    switch(action.type) {
        case "SET_REVIEWS":
            return {
                reviewPlayers: action.payload
            }
        case "ADD_REVIEWS":
            return {
                reviewPlayers: [...state.reviewPlayers,action.payload]
            }
            case "REMOVE_REVIEWS":
                return {
                  reviewPlayers: state.reviewPlayers.filter(
                    player => player.nbaId !== action.payload.nbaId
                  )
                };
        default:
            return state
    }
}

export const ReviewContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(reviewReducer, {
        reviewPlayers: []
    })



    return (
        <ReviewContext.Provider value={{...state, dispatch}}>
            {children}
        </ReviewContext.Provider>

    )
}
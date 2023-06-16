import { SearchedListContext } from "../Context/SearchedListContext";

import {useContext } from "react"

export const useSearchedListContext = () => {
    const context = useContext(SearchedListContext)

    if(!context) {
        throw Error("useSearchedListContext must be used in a provide")
    }

    return context
}
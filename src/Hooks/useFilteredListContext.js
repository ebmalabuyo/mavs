import { FilteredListContext } from "../Context/FilterListContext";

import {useContext } from "react"

export const useFilteredListContext = () => {
    const context = useContext(FilteredListContext)

    if(!context) {
        throw Error("useFilteredListContext must be used in a provide")
    }

    return context
}
import { ReviewContext } from "../Context/ReviewContext";

import {useContext } from "react"

export const useReviewContext = () => {
    const context = useContext(ReviewContext)

    if(!context) {
        throw Error("useReviewContext must be used in a provide")
    }

    return context
}
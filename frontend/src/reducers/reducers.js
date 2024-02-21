import { combineReducers } from "redux";
import { Authreducer } from "./Authreducer/Authreducer";

export const allreducers = combineReducers({
    Authdetails : Authreducer
})
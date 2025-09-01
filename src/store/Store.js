import { configureStore } from "@reduxjs/toolkit";
 import authreducer from "./authSlice"
const Store=configureStore({
    reducer:{
        auth:authreducer
    },
})
export default Store
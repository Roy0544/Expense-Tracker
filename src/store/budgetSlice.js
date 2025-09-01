import  { createSlice } from "@reduxjs/toolkit"
const initialState={
   budets:[]   
}

const budgetSlice=createSlice({
    name:"budget",
    initialState,
    reducers:{
        addBudget(state,action){
            state.budets.push(action.payload)
        },
        allbudgets(state){
            state.budets
        }
    }
})
export const {addBudget,allbudgets}=budgetSlice.actions
export default budgetSlice.reducer
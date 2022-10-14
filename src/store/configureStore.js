import { configureStore } from "@reduxjs/toolkit";
import toDoList from "./modules/toDoList";


const store = configureStore({
    reducer: {
        toDoList:toDoList.reducer,
    }
});

export default store;
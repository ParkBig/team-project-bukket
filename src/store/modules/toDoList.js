import {createSlice} from '@reduxjs/toolkit';

const toDoList = createSlice({
    name: 'toDoList',
    initialState: { value: { TO_DO:[], DONE:[], DOING:[] } },
    reducers: {
        addToDo: (state, action) => {
            state.value["TO_DO"].push(action.payload);
        },
        addDone: (state, action) => {
            state.value["DONE"].push(action.payload);
        },
        addDoing: (state, action) => {
            state.value["DOING"].push(action.payload);
        }
    }
});

export const { addToDo, addDone } = toDoList.actions
export default toDoList;
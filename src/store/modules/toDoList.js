import {createSlice} from '@reduxjs/toolkit';

const toDoList = createSlice({
    name: 'toDoList',
    initialState: { value: { TO_DO:[], DONE:[], DOING:[] } },
    reducers: {
        addToDo: (state, action) => {
            state.value["TO_DO"].push(action.payload);
        },
        getToDo: (state, action) => {
            state.value[action.payload[0]] = action.payload[1]
        },
        addDone: (state, action) => {
            state.value["DONE"].push(action.payload);
        },
        addDoing: (state, action) => {
            state.value["DOING"].push(action.payload);
        },
        insertValue: (state, action) => {
            state.value[action.payload[0]].splice(action.payload[1],0,action.payload[2]);
        },
        deleteValue: (state, action) => {
            state.value[action.payload[0]].splice(action.payload[1],1)
        }
    }
});

export const { addToDo, addDone, addDoing, insertValue, deleteValue, getToDo } = toDoList.actions
export default toDoList;

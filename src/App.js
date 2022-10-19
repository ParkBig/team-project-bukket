import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Provider } from "react-redux";
import GotoList from "./components/GotoList";
import Main from "./pages/Main";
import store from "./store/configureStore";
import TodoList from "./pages/TodoList";
import Todo from "./pages/Todo";
import Doing from "./pages/Doing";
import Done from "./pages/Done";
import TodoDetail from "./pages/TodoDetail";
import DoingDetail from "./pages/DoingDetail";
import DoneDetail from "./pages/DoneDetail";


function App() {
  return (
    // <Main/>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/todoList" element={<TodoList/>}/>
          {/* 네스티드 라우터 쓸거임 대기하셈 */}
          <Route path="/todoList/:id" element={null} />
          <Route path="/todoList/TODO" element={<Todo/>} />
          <Route path="/todoList/DOING" element={<Doing/>} />
          <Route path="/todoList/DONE" element={<Done/>} />
          <Route path="/todoList/TODO/:id" element={<TodoDetail/>} />
          <Route path="/todoList/DOING/:id" element={<DoingDetail/>} />
          <Route path="/todoList/DONE/:id" element={<DoneDetail/>} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;

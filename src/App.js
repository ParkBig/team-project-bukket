import React from "react";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import { Provider } from "react-redux";
import GotoList from "./components/GotoList";
import Main from "./pages/Main";
import store from "./store/configureStore";
import TodoList from "./pages/TodoList";

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
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;

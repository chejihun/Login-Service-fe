import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import TodoBoard from "./components/TodoBoard";
import { useEffect, useState } from "react";
import api from "./utils/api";


function TodoPage() {

  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState("")
  const getTask = async () => {
    const response = await api.get("/tasks")
    setTodoList(response.data.data)
  }

  const addTask = async () => {
    try {
      const response = await api.post("/tasks", { task: todoValue, isComplete: false });
      if (response.status === 200) {
        console.log("success")
        setTodoValue("")
        getTask();
      } else {
        throw new Error("task can not br add")
      }
    } catch (error) {
      console.log("error", error)
    }
  }

  const updateTask = async (id) => {
    try {
      const task = todoList.find((item) => item._id === id);
      const response = await api.put(`/tasks/${id}`, { isComplete: !task.isComplete });
      if (response.status === 200) {
        getTask();
      }
    } catch (error) {
      console.log("error", error)
    }
  }

  const deleteTask = async (id) => {
    try {
      const response = await api.delete(`/tasks/${id}`);
      if (response.status === 200) {
        getTask();
      }
    } catch (error) {
      console.log("error", error);
    }
  }

  useEffect(() => {
    getTask();
  }, [])

  return (
    <div>
      <Container>
        <Row className="add-item-row">
          <Col xs={12} sm={10}>
            <input
              type="text"
              placeholder="할일을 입력하세요"
              className="input-box"
              value={todoValue}
              onChange={(event) => setTodoValue(event.target.value)}
            />
          </Col>
          <Col xs={12} sm={2}>
            <button className="button-add" onClick={addTask}>추가</button>
          </Col>
        </Row>
        <TodoBoard todoList={todoList} updateTask={updateTask} deleteTask={deleteTask} />
      </Container>

    </div>
  );
}

export default TodoPage;
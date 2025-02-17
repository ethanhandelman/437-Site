import './App.css'
import AddTaskForm from './components/AddTaskForm';
import ToDoItem from "./components/ToDoItem";
import Modal from "./components/Modal"
import React from "react"
import { nanoid } from "nanoid";
import { GroceryPanel } from './components/GroceryPanel';

function App(props) {
  const [taskList, setTaskList] = React.useState(props.tasks || []);
  const [modalOpen, setModalOpen] = React.useState(false);

  const taskItems = taskList.map((task) => (
    <ToDoItem key={task.id} id={task.id} name={task.name} completed={task.completed} deleteTask={deleteTask}/>
  ));
  
  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setTaskList([...taskList, newTask]);
    setModalOpen(false);
  }

  function deleteTask(id){
    const remainingTasks = taskList.filter((task) => id !== task.id);
    setTaskList(remainingTasks);
  }

  function toggleTaskCompleted(id) {
    const updatedTasks = taskList.map((task) => {
      // if this task has the same ID as the edited task
      if (id === task.id) {
        // use object spread to make a new object
        // whose `completed` prop has been inverted
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTaskList(updatedTasks);
  }

  return (
    <main className="m-4"> {/* Tailwind: margin level 4 on all sides */}
      <button onClick={() => setModalOpen(true)} className="p-1 bg-sky-500 text-white">Add Task</button>
      <section>
        <h1 className="text-xl font-bold m-2">To Do</h1>
        <ul className="ml-2">
          {taskItems}
        </ul>
      </section>
      <Modal headerLabel="Add Task" open={modalOpen} onCloseRequested={() => setModalOpen(false)}>
        <AddTaskForm onNewTask={addTask} deleteTask={deleteTask} toggleTaskCompleted={toggleTaskCompleted} />
      </Modal>
      <GroceryPanel addTask={addTask}></GroceryPanel>
    </main>
  );
}

export default App;

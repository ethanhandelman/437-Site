import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

function ToDoItem(props) {
    return (
      <li>
        <label className="mr-5">
          <input type="checkbox" defaultChecked={props.completed} onChange={() => props.toggleTaskCompleted(props.id)}/> {props.name}
        </label>
        <FontAwesomeIcon title="delete" onClick={() => props.deleteTask(props.id)} className="bg-white cursor-pointer" icon={faTrash} />
      </li>
    )
  }

  export default ToDoItem;
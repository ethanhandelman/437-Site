import React from 'react';

function AddTaskForm(props) {
    const[contents, setContents] = React.useState("");

    function handleChange(event){
        setContents(event.target.value);
    };

    function handleSubmit(event){
        event.preventDefault()
        if(contents != ""){
            props.onNewTask(contents)
            setContents("")
        }
    }

    return (
    <form onSubmit={handleSubmit}> {/* Unfortunately comments in JSX have to be done like this */}
        <input type="text" value={contents} onChange={handleChange} className="border-2 rounded-md h-10 m-2 indent-2" placeholder="New task name" />
        <button type="submit" className="rounded-md bg-sky-500 w-20 h-8 text-white hover:bg-sky-600 active:bg-sky-700 cursor-pointer">Add task</button>
    </form>
    )
}

export default AddTaskForm;
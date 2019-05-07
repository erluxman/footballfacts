class Todo {
    constructor(work, done) {
        this.work = work;
        this.done = done;
    }
}


class DB {

    static getAlltasks() {

        let tasks;
        if (localStorage.getItem('tasks') === null) {
            tasks = [];
        } else {
            tasks = JSON.parse(localStorage.getItem('tasks'));
        }

        return tasks;
    }
    static addTask(task) {
        const tasks = DB.getAlltasks();
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

class UI {
    static clearInput() {
        document.querySelector("#todo-field").value = "";
    }

    static showAlert(message, className) {
        const alert = document.querySelector('#message-dialog');
        alert.className = `alert alert-${className}`;
        const messageChild = document.createTextNode(message);
        alert.appendChild(messageChild);
        setTimeout(
            () => {
                alert.removeChild(messageChild);
                alert.className = `hidden`;
            }, 1500);
    }
}

document.querySelector("#todo-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const work = document.querySelector("#todo-field").value;
    const todo = new Todo(work, false);
    DB.addTask(todo);
    UI.showAlert("Successfully Added", "success");
    UI.clearInput();
});
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
    static getNotDoneTasks() {
        return DB.getAlltasks().filter((item) => {
            return item.done === false;
        });
    }
    static addTask(task) {
        const tasks = DB.getAlltasks();
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    static deleteTask(work) {
        const tasks = DB.getAlltasks();
        tasks.forEach((task, index) => {
            if (work == task.work) {
                tasks.splice(index, 1);
            }
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    static updateTask(work, completed) {
        console.log("task to update " + work);
        const tasks = DB.getAlltasks();
        tasks.forEach((task, index) => {
            if (work == task.work) {
                tasks.splice(index, 1);
            }
        });
        tasks.push(new Todo(work, completed));
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
}

class UI {
    static displayNotDoneTasks() {
        DB.getNotDoneTasks().forEach((task) => UI.addNotDonetask(task));
    }

    static addNotDonetask(task) {
        const list = document.querySelector('#todo-list');
        const row = document.createElement('tr');
        row.innerHTML = `
        <td class="not-done-work-text">${task.work}</td>
        <td><i class="far fa-trash-alt delete-task"></i></td>
        <td><i class="far fa-check-circle not-done-mark"></i></td>
        `;
        list.appendChild(row);
    }

    static removeTask(work) {
        console.log(work);
        work.parentElement.parentElement.remove();
    }

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

document.addEventListener('DOMContentLoaded', (event) => {
    UI.displayNotDoneTasks();
});

document.querySelector("#todo-list").addEventListener('click', handleDelete);

function handleDelete(e) {
    const classList = e.target.classList;
    if (classList.contains('delete-task')) {
        UI.removeTask(e.target);
        DB.deleteTask(e.target.parentElement.previousElementSibling.textContent);
        UI.showAlert("Deleted", "danger");
    }else if (classList.contains('not-done-mark')) {
        UI.removeTask(e.target);
        DB.updateTask(e.target.parentElement.previousElementSibling.previousElementSibling.textContent, true);
        UI.showAlert("Completed", "success");
    }
}

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
    static getDoneTasks() {
        return DB.getAlltasks().filter(item => {
            return item.done === true;
        });
    }

    static getNotDoneTasks() {
        return DB.getAlltasks().filter((item) => {
            return item.done === false;
        });
    }
}

class UI {

    static addDoneTask(task) {
        const list = document.querySelector('#done-list');
        const row = document.createElement('tr');
        row.innerHTML = `
        <td class="done-work-text">${task.work}</td>
        <td><i class="fas fa-thumbs-up like"></i></td>
        <td><i class="fas fa-thumbs-down dislike"></i></td>
        `;
        list.appendChild(row);
    }
    static displayDoneTasks() {
        DB.getDoneTasks().forEach((task) => UI.addDoneTask(task));
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    UI.displayDoneTasks();
});

document.querySelector("#done-list").addEventListener('click', handleDelete);

function handleDelete(e) {
    const classList = e.target.classList;
    if (classList.contains('like')) {
        /* UI.removeTask(e.target);
        UI.addNotDonetask(new Todo(e.target.parentElement.previousElementSibling.previousElementSibling.textContent, true));
        DB.updateTask(e.target.parentElement.previousElementSibling.previousElementSibling.textContent, false);
        UI.showAlert("Undo Complete", "success"); */
    } else if (classList.contains('dislike')) {
    }
}

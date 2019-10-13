document.body.requestFullscreen();
document.getElementById('input_field').addEventListener('keypress', e => {
    var key = e.which || e.keyCode;
    if (key == 13) {
        addTask();
    }
})


var timestamp = new Date().getTime()
// get data from database
var getDBtasks = JSON.parse(localStorage.getItem('tasks'));
if (!getDBtasks) {
    getDBtasks = JSON;
} else {
    for (item in getDBtasks) {
        task_append(getDBtasks[item]['task'], item);
        if (getDBtasks[item]['status'] === "checked") {

        }
        //clean the data if checked and over a day
        if (timestamp - getDBtasks[item]['timestamp'] > 86400000) {
            delete getDBtasks[item];
            localStorage.setItem('tasks', JSON.stringify(getDBtasks));
        }
    }
}


function addTask() {
    //get input
    var input_field = document.getElementById('input_field');
    var warning = document.getElementById('warning');
    var task = input_field.value;

    if (task !== '') {
        warning.style.display = 'none';
        //add to database
        var task_json = {
            "task": task,
            "status": "uncheck",
            "timestamp": timestamp
        }
        getDBtasks[`${task}` + `${timestamp}`] = task_json;
        //creating node from template
        task_append(task, task + timestamp);
        localStorage.setItem('tasks', JSON.stringify(getDBtasks));

        //append and calling for updates
        display_taskCount();
        input_field.value = '';
    } else {
        warning.style.display = 'block';
    }
}
function task_append(task, composite_key) {
    var tasks_container = document.getElementById('tasks_container');
    var task_div = document.createElement('DIV');
    task_div.innerHTML = `
        <div class="task">
            <div class="header">
                <a class="check">
                    <i class="far fa-circle"></i>
                </a>
                <p>${task}</p>
            </div>
            <a class="delete"><i
                    class="far
                    fa-trash-alt"></i></a>
        </div>
        <div class="line"></div>
    `;
    // set button listener
    task_div.childNodes[1].childNodes[3].addEventListener('click', () => {
        task_div.remove();
        delete getDBtasks[composite_key];
        localStorage.setItem('tasks', JSON.stringify(getDBtasks));

        display_taskCount();
    });
    tasks_container.appendChild(task_div);

    // set checkbox listener
    let checkbox = task_div.childNodes[1].childNodes[1].childNodes[1];
    let task_p = task_div.childNodes[1].childNodes[1].childNodes[3];

    if (getDBtasks) {
        console.log(getDBtasks[composite_key]['status'] + " asd");
        let status = getDBtasks[composite_key]['status'];
        if (status === "checked") {
            checkbox.innerHTML = `<i class="far fa-check-circle"></i>`;
            task_p.innerHTML = `<del>` + task_p.innerHTML + `</del>`;
        }
    }
    checkbox.addEventListener('click', () => {
        if (checkbox.innerHTML.includes("fa-check-circle")) {
            checkbox.innerHTML = `<i class="far fa-circle"></i>`;
            task_p.innerHTML = task_p.innerHTML.replace("<del>", "");
            task_p.innerHTML = task_p.innerHTML.replace("</del>", "");
            getDBtasks[composite_key]['status'] = "uncheck";
        } else {
            checkbox.innerHTML = `<i class="far fa-check-circle"></i>`;
            task_p.innerHTML = `<del>` + task_p.innerHTML + `</del>`;
            getDBtasks[composite_key]['status'] = "checked";
        }
        //update to database
        localStorage.setItem('tasks', JSON.stringify(getDBtasks));
        display_taskCount();
    });
    return task_div
}

function getTasks() {
    var tasks = document.getElementById('tasks_container');
    let count = 0;
    for (i = 3; i < tasks.childElementCount + 2; i++) {
        if (!tasks.childNodes[i].childNodes[1].childNodes[1].childNodes[3].innerHTML.includes("<del>")) {
            count += 1;
        }
    }
    return count;
}
function display_taskCount() {
    var task_count = document.getElementById('active_tasks');
    task_count.innerText = getTasks() + ' Active Tasks';
}
function display_date() {
    let day_date = document.getElementById('day_date');
    let getD = new Date();
    let today = getDayToString(getD.getDay());
    day_date.innerText = today + ', '
        + getD.getDate() + '/'
        + getD.getMonth() + '/'
        + getD.getFullYear();
}

function getDayToString(today) {
    let day = '';
    switch (today) {
        case 1:
            day = "Monday";
            break;
        case 2:
            day = "Tuesday";
            break;
        case 3:
            day = "Wednesday";
            break;
        case 4:
            day = "Thursday";
            break;
        case 5:
            day = "Friday";
            break;
        case 6:
            day = "Saturday";
            break;
        case 0:
            day = "Sunday";
    }
    return day;
}
display_date();
display_taskCount();
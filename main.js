// NOT SECURE!
var { createClient } = supabase;
var _supabase = createClient('https://ieyfgpklmrjyydtduzqd.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlleWZncGtsbXJqeXlkdGR1enFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU3MzM2NzAsImV4cCI6MjAxMTMwOTY3MH0.Aj88UhsBJ6NjJQW3Wfw6Z0mqfLFkkb9tIM22HYapJcI');

netlifyIdentity.init();
var user = netlifyIdentity.currentUser();
var userName = "viewer";
if (user != null) {
    userName = user.user_metadata.full_name;
}

let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
});

let formValidation = () => {
    if (textInput.value === "") {
        console.log("Field FOR is blank. Tip was generated.");
        textInput.placeholder = "Please, choose the executor :)";
    }
    else 
        if (textarea.value === "") {
            console.log("Field DESCRIPTION is blank. Tip was generated.");
            textarea.placeholder = "Please, type some description :)";
        }
        else {
            acceptData();
            add.setAttribute("data-bs-dismiss", "modal");
            add.click();

            (() => {
                add.setAttribute("data-bs-dismiss", "");
            })();
        }
};

let acceptData = async () => {
    if (!dateInput.value) {
        var date = new Date();
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        if (month < 10) month = "0" + month;
        if (day < 10) day = "0" + day;
        var today = year + "-" + month + "-" + day;
        dateInput.value = today;
    }
    var { error } = await _supabase.from('jobs')
        .insert(
            {
                created: userName,
                description: textarea.value,
                date: dateInput.value,
                for: textInput.value,
                status: true
            });
    if (error) {
        console.log("Error due insert to DB: ", error);
    }
    createTasks();
};

let createTasks = async () => {
    tasks.innerHTML = "";

    var { data, error } = await _supabase.from('jobs').select().eq('status', true);

    if (error) {
        console.log("Error due read from DB: ", error);
        data = [{}];
    }
    data.map((x, y) => {
        return (tasks.innerHTML += `
        <div id=${x.id}>
          <span class="fw-bold">${x.for}</span>
          <span class="small ">Due date: ${x.date}</span>
          <span class="big text-primary" style='font-weight:bold'>${x.description}</span>
            <span class="options">
            <i onClick= "doneTask(this);createTasks()" class="far fa-calendar-check" style='color:green'></i>
            <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit" style='color:yellow'></i>
            <i onClick= "deleteTask(this);createTasks()" class="fas fa-trash-alt" style='color:red'></i>
            </span>
        </div>
        `);
    });
    var elements = document.getElementsByClassName("options");
    if (!user) {
        for (var e of elements) {
            e.style.display = "none";
        }
    }
    
    resetForm();
};

let doneTask = async (e) => {
    //status = FALSE
    var { error } = await _supabase.from('jobs')
        .update({ status: false})
        .eq('id', e.parentElement.parentElement.id);
    e.parentElement.parentElement.remove();
};

let deleteTask = async (e) => {
    // status=NULL
    e.parentElement.parentElement.remove();
    var { error } = await _supabase.from('jobs')
        .update({ status: null })
        .eq('id', e.parentElement.parentElement.id);
};

let editTask = (e) => {
    var closeButton = document.getElementById("closeButton");
    closeButton.style.display = "none";

    let selectedTask = e.parentElement.parentElement;

    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    textarea.value = selectedTask.children[2].innerHTML;

    deleteTask(e);
};

let resetForm = () => {
    textInput.value = "";
    dateInput.value = "";
    textarea.value = "";
};

(async () => {
    createTasks();
})();
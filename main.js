const { createClient } = supabase;
const _supabase = createClient('https://ieyfgpklmrjyydtduzqd.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlleWZncGtsbXJqeXlkdGR1enFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU3MzM2NzAsImV4cCI6MjAxMTMwOTY3MH0.Aj88UhsBJ6NjJQW3Wfw6Z0mqfLFkkb9tIM22HYapJcI');

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
//let msg = document.getElementById("msg");
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
        console.log("success");
        //msg.innerHTML = "";
        acceptData();
        add.setAttribute("data-bs-dismiss", "modal");
        add.click();

        (() => {
            add.setAttribute("data-bs-dismiss", "");
        })();
    }
};

//let data = [{}];

let acceptData = async () => {
    //data.push({
    //    text: textInput.value,
    //    date: dateInput.value,
    //    description: textarea.value,
    //});

    //localStorage.setItem("data", JSON.stringify(data));
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
                created_at: dateInput.value,
                for: textInput.value
            });
    createTasks();
};

let createTasks = async () => {
    tasks.innerHTML = "";
    var { data } = await _supabase.from('jobs').select();
    data.map((x, y) => {
        return (tasks.innerHTML += `
    <div id=${x.id}>
            ${x.id}
          <span class="fw-bold">${x.created}</span>
          <span class="small text-secondary">${x.created_at}</span>
          <p>${x.description}</p>
  
          <span class="options">
            <i onClick= "doneTask(this)" class="far fa-calendar-check" style='color:green'></i>
            <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit" style='color:yellow'></i>
            <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt" style='color:red'></i>
          </span>
        </div>
    `);
    });

    resetForm();
};

let deleteTask = async (e) => {
    e.parentElement.parentElement.remove();
    //data.splice(e.parentElement.parentElement.id, 1);
    //localStorage.setItem("data", JSON.stringify(data));

    var { error } = await _supabase.from('jobs')
        .delete()
        .eq('id', e.parentElement.parentElement.id);
    
    //console.log();

};

let editTask = (e) => {
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
    //data = JSON.parse(localStorage.getItem("data")) || []
    var { data, error } = await _supabase.from('jobs').select();
        //.eq('created', userName)
        //.order('id', { ascending: false });
    console.log(data);
    createTasks(data);
})();
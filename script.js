import { createClient } from '@supabase/supabase-js'
const supabase = createClient('https://db.ieyfgpklmrjyydtduzqd.supabase.co', '2023_Supabase')
const todoList = document.getElementById("todoList");

const { jobs, error } = await supabase
  .from('jobs')
  .select()

renderTodos();

function renderTodos() {
  todoList.innerHTML = "";

  jobs.forEach((todo) => {
    const li = document.createElement("li");
    li.classList.add("todo-item");

    const span = document.createElement("span");
    span.textContent = todo.text;

    li.appendChild(span);

    todoList.appendChild(li);
  });
}

import { createClient } from '@supabase/supabase-js'
const supabase = createClient('https://ieyfgpklmrjyydtduzqd.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlleWZncGtsbXJqeXlkdGR1enFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU3MzM2NzAsImV4cCI6MjAxMTMwOTY3MH0.Aj88UhsBJ6NjJQW3Wfw6Z0mqfLFkkb9tIM22HYapJcI')
const todoList = document.getElementById("todoList");

const { jobs, error } = await supabase
  .from('jobs')
  .select()

renderTodos();

function renderTodos() {
  todoList.innerHTML = "";
   todoList.innerHTML += "Hello World!";
  
  });
}

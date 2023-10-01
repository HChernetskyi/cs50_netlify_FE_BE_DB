// Import the Supabase client
import { createClient } from '@supabase/supabase-js';

// Initialize the client with your Supabase URL and public anon key
const supabase = createClient(
  'https://ieyfgpklmrjyydtduzqd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlleWZncGtsbXJqeXlkdGR1enFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU3MzM2NzAsImV4cCI6MjAxMTMwOTY3MH0.Aj88UhsBJ6NjJQW3Wfw6Z0mqfLFkkb9tIM22HYapJcI'
);


// Get references to the form and list elements
const form = document.getElementById('todo-form');
const list = document.getElementById('todo-list');


// Handle form submissions
form.addEventListener('submit', async (event) => {
  event.preventDefault();


  // Get the value of the input field
  const todo = document.getElementById('todo-input').value;


  // Save the to-do item in your Supabase database
  const { data, error } = await supabase
    .from('todos')
    .insert([{ title: todo }]);


  // Handle any errors
  if (error) {
    console.error('Error saving to-do item:', error);
  } else {
    // Add the to-do item to the list
    const listItem = document.createElement('li');
    listItem.textContent = todo;
    list.appendChild(listItem);
  }
});

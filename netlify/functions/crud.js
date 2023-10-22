const { createClient } = supabase;
const _supabase = createClient('https://ieyfgpklmrjyydtduzqd.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlleWZncGtsbXJqeXlkdGR1enFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU3MzM2NzAsImV4cCI6MjAxMTMwOTY3MH0.Aj88UhsBJ6NjJQW3Wfw6Z0mqfLFkkb9tIM22HYapJcI');

let userName = 'viewer';
let description = 'next task';
let createdAt = new Date(dateAndTime.toDateString());
let userFor = 'anyone';

async function CreateTodo(userName, description, created_at, userFor) {
    let { data, error } = await _supabase.from('jobs')
        .insert(
            {
                created: userName,
                description: description,
                created_at: created_at,
                for: userFor
            });
    console.log(data);
    if (error) {
        console.error('Error saving to db [jobs]: ', error);
    }
}

async function ReadTodos() {
    let { data, error } = await _supabase.from('jobs').select();
    console.log(data);
    if (error) {
        console.error('Error reading from db [jobs]: ', error);
    }
    return data;
}

async function ReadTodosLogged(userName) {
    let { data, error } = await _supabase.from('jobs').select().eq('created', userName);
    console.log(data);
    if (error) {
        console.error("Error reading from db [jobs]: for user " + userName + ": ", error);
    }
    return data;
}

async function UpdateTodoLogged(id, userName, description, created_at, userFor, status) {
    let { data, error } = await supabase
        .from("jobs")
        .update(
            {
                created: userName,
                description: description,
                created_at: created_at,
                for: userFor,
                status: status
            })
        .match({ id: id });
    console.log(data);
    if (error) {
        console.error("Error updating in db [jobs]: for job " + id + ": ", error);
    }
    return data;
}
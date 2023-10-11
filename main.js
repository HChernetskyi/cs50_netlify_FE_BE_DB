const { createClient } = supabase;
const _supabase = createClient('https://ieyfgpklmrjyydtduzqd.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlleWZncGtsbXJqeXlkdGR1enFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU3MzM2NzAsImV4cCI6MjAxMTMwOTY3MH0.Aj88UhsBJ6NjJQW3Wfw6Z0mqfLFkkb9tIM22HYapJcI');
//console.log('Supabase Instance: ', _supabase);

let tasks = document.getElementById("tasks");
//tasks.innerText = "inner text";

async function getTodos() {
    let { data, error } = await _supabase.from('jobs').select();
    let jobStatus = 'In progress...';
    let job_status_id = 'job_status_id_progress';
    let html =
        `<table>
            <thead> 
                <tr>
                    <th>Job created by</th>
                    <th>Description</th>
                    <th>For</th>
                    <th>Created</th>
                    <th>Status</th>
                </tr>
                
            </thead>
        `;
    for (const d of data) {
        html +=
            `<tr>
                <td>${d.created}</td>
                <td>${d.description}</td>
                <td>${d.for}</td>
                <td>${d.created_at}</td>`;
                if (d.status) {
                    jobStatus = 'Done.';
                    job_status_id = 'job_status_id_done';
                }
                    
            html += `
                <td id=${job_status_id}>${jobStatus}</td>
            </tr>`;
    }
    html += `</table>`;
    tasks.innerHTML += html;
        

    
}

//getTodos().then((data) => {
    //console.log(data);
//});
// call function to get data from DB
getTodos();



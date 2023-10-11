const { createClient } = supabase;
const _supabase = createClient('https://ieyfgpklmrjyydtduzqd.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlleWZncGtsbXJqeXlkdGR1enFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU3MzM2NzAsImV4cCI6MjAxMTMwOTY3MH0.Aj88UhsBJ6NjJQW3Wfw6Z0mqfLFkkb9tIM22HYapJcI');
//console.log('Supabase Instance: ', _supabase);

let tasks = document.getElementById("tasks");
//tasks.innerText = "inner text";

async function getTodos() {
    let { data, error } = await _supabase.from('jobs').select();
    let html =
        `<table>
            <thead>
                <tr>
                    <th>Job created by</th>
                    <th>Description</th>
                    <th>For</th>
                </tr>
            </thead>
        `;
    for (const d of data) {
        html +=
            `<tr>
                <td>${d.created}</td>
                <td>${d.description}</td>
                <td>${d.for}</td>
            </tr>`;
    }
    html += `</table>`;
    tasks.innerHTML += html;
        

    //return (tasks.innerHTML +=
    //    '<ul>' +
    //        data.map(d => (
    //            '<li key=' + d.id + '>' + d.description + '</li>'
    //        )) +
    //    '</ul>');

    //    data.forEach((d) =>
    //    tasks.innerHTML +=
    //    '<tr>' +
    //        '<td>' + d.created_at + '</td>' +
    //        '<td>' + d.description + '</td>' +
    //    '</tr>'
    //);

    //tasks.innerHTML +=
    //    '</tbody>' +
    //    '</table>';

    //'<div>' +
    //    '<ul>' +
    //        d.description +
    //    '</ul>' +
    //'</div>'));
    //let header = "List of todo's:";
    //let html = `<h2>${header}</h2><ul>`;

    //for (const d of data) {
    //    html += `<li>${d.description}</li>`;
    //    html += ``
    //}
    //html += `</ul>`;
    //document.getElementById("demo").innerHTML = html;
    //tasks.innerHTML = html;

}

//getTodos().then((data) => {
    //console.log(data);
//});
// call function to get data from DB
getTodos();



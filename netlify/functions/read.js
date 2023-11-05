const { createClient } = require('@supabase/supabase-js');
const supabaseKey = process.env.SUPABASE_KEY;
const supabaseUrl = process.env.SUPABASE_URL;
const _supabase = createClient(supabaseUrl, supabaseKey);
exports.handler = async function readFromDb(event, context) {
    const { identity, user } = context.clientContext;
    var dataDB = [{}];
    
    let { data, error } = await _supabase.from('jobs').select(); //.neq('status', true)
    //console.log(data);
    //if (error) {
    //    console.log("Error due insert to DB: ", error);
    //}
    dataDB = data;

    var html = "";
    html += `
    <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Chores!</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/css/materialize.min.css">
            <style>
                body {
                    background-image: url('https://img.freepik.com/free-photo/adhesive-notes-fridge_23-2147696020.jpg');
                    background-repeat: no-repeat;
                    background-attachment: fixed;
                    background-size: cover;
                    }

                table {
                    font-family: arial, sans-serif;
                    border-collapse: collapse;
                    width: 100%;
                    position: absolute;
                    opacity: 1;
                    }
                td, th {
                    border: 1px solid #dddddd;
                    text-align: left;
                    padding: 8px;
                }

                thead, th {
                    background-color: darkorange;
                    text-align: center;
                }

                tr:hover {
                    background-color: #D6EEEE;
                }

                #done {
                    background-color: green
                }

                #deleted {
                    background-color: red
                }

                #progress {
                    background-color: yellow
                }

            </style>
        </head>

        <body>
        <div class="navDiv">
                <div class="navbar-fixed">
                    <nav>
                        <div class="nav-wrapper blue darken-3">
                            <a href="#" data-activates="mobile-demo" class="button-collapse">
                                <i class="material-icons">&#9776;</i>
                            </a>
                            <ul class="right hide-on-med-and-down">
                                <li><a href="/">Main page</a></li>
                            </ul>
                        </div>
                    </nav>
                </div>
            <ul class="side-nav" id="mobile-demo">
                <li><a href="/">Main page</a></li>
            </ul>
        </div>
                <table>
                    <thead>
                        <tr>
                            <th>Job created by user</th>
                            <th>Description</th>
                            <th>For</th>
                            <th>Created</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    `;

    dataDB.map((x, y) => {
        let status = 'Deleted';
        let jobStatusId = 'deleted';
        if (x.status === true) {
            status = 'In progress';
            jobStatusId = 'progress';
        } else if (x.status === false) {
            status = 'Done';
            jobStatusId = 'done';
        }
        return (html += `
                <div >
                <tr id = ${jobStatusId}>
                    <td>${x.created}</td>
                    <td>${x.description}</td>
                    <td>${x.for}</td>
                    <td>${x.date}</td>
                    <td>${status}
                </tr>
                </div> 
                `
        );
    });

    html += `
        <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/js/materialize.min.js"></script>
        <script type="text/javascript">
            $(document).ready(function () {
            $(".button-collapse").sideNav();
            })
        </script>
                </tbody>
            </table>
        </body>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
        </html>`;

    return {
        statusCode: 200,
        headers: {
            "Content-Type": "text/html"
        },
        body: `${html}`
    };
};
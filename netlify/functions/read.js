//import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
exports.handler = async function readFromDb(event, context) {
    const { identity, user } = context.clientContext;
    const supabaseKey = process.env.SUPABASE_KEY;
    const supabaseUrl = process.env.SUPABASE_URL;
    // Do stuff and return a response...
    
    

    if (user & supabaseKey & supabaseUrl) {
        //const _supabase = createClient(supabaseUrl, supabaseKey);
        var { data, error } = await _supabase.from('jobs').select();
        console.log(data);
        if (error) {
            console.log("Error due insert to DB: ", error);
        }
    }
    
    return {
        statusCode: 200,
        headers: {
            "Content-Type": "text/html"
        },
        body: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Chores!</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/css/materialize.min.css">
            <style>
                body {
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
                                <li><a href="/">Home</a></li>
                            </ul>
                        </div>
                    </nav>
                </div>
            <ul class="side-nav" id="mobile-demo">
                <li><a href="/">Home</a></li>
            </ul>
        </div>
                <table>
                    <thead>
                        <tr>
                            <th>Job created by</th>
                            <th>Description</th>
                            <th>For</th>
                            <th>Created</th>
                            <th>Status</th>
                        </tr>
                    </thead>

                    <tbody>
                        <div id=1>
                        <tr>
                            <td>created</td>
                            <td>description</td>
                            <td>for</td>
                            <td>created_at</td>
                            <td>status2</td>
                        </tr>
                        </div>
                    </tbody>
                </table>
            
                <script src="https://code.jquery.com/jquery-2.1.1.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/0.98.0/js/materialize.min.js"></script>
                <script type="text/javascript">
                    $(document).ready(function () {
                    $(".button-collapse").sideNav();
                    })
                </script>
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
        </html>
        ` };
};
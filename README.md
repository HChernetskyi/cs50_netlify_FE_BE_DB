# CS50-Chores
#### Video Demo:  <URL HERE>
#### Description:
Final project for CS50 which uses HTML, JS, Netlify Functions (aka AWS Lambda) and remote DB 

Main feautures:

1. Used technology stack:
  - HTML (for main page, like Single Page Application)
  - CSS (custom and provided by Bootstrap)
  - JavaScript (for main logic) 
  - Netlify Identity (for authorization)
  - Netlify Functions (for backend endpoint) 

2. User-friendly interface
  - Layout adopted for desktop and mobile view
  - Identification realized by Netlify Identity widget and email (might be changed to external providers, as Google, Facebook, etc.)

3. Remote DB
  - Postgre-based remote database - Supabase
  - CRUD functions by Supabase queries (simplified for this app)

Main idea.
  This is a new look on the classic TO-DO app. When you or anybody want to add some task for everyone who you want - just open a page, register in the system, and add new task. 
  Add description to your task which explains what to do, choose executor and save it. After that everyone can see these tasks and complete them. 
  When task will be done - close it or delete it under creators's account. You can edit your task if you remember something important and decide to add it to the task dscription.
  You might prefer work on the desktop site, but also you might use tablet, laptop or mobile phone to manage tasks. 
  Just add task during a day, and check then in yhe evening from any device which you use.

Main HTML file contains:
  - Menu for desktop and mobile versions
  - Authorization section provided by Netlify Identification module for better security

Main Javascript file contains:
  - function for create HTML layout for jobs in DB
  - Create/Read/Update/Delete functions to interacte with 'jobs'

CSS file contains:
  - custom CSS styles for visual design of page and elements
	
Netlify function file contains:
	- main logic on Javascript for fetch data from the database
	- html code for create response

List of used documentations:
  - CS50 lessons (https://cs50.harvard.edu/x/2023/project/)
  - Netlify Docs (https://docs.netlify.com/)
  - Supabase docs (https://docs.netlify.com/)
  - W3School Javascript docs (https://www.w3schools.com/js/default.asp)
  - W3School HTML docs (https://www.w3schools.com/html/default.asp)
  - W3Scjool CSS docs (https://www.w3schools.com/css/default.asp)
  - Bootstrap docs (https://getbootstrap.com/docs/5.2/examples/)
  - Freecodecamp docs (https://www.freecodecamp.org/news/learn-crud-operations-in-javascript-by-building-todo-app/) 

How it should work )
	You are not a registered user:
		- Go to the main page. Here you can see the list of previous added jobs. These 'tasks' are not completed yet. 
		- Go to the 'history' page. There are all completed tasks.
		- That's all. You only can view tasks, without do any interact with them. You might sign up/log in to interact with them

	You are registered user and you are logged in:
		- Go to the main page. Here you can see the list of previous added jobs. These 'tasks' are not completed yet. You can 'complete' some of them, edit or delete them.
		Also you can add new task.
		- Go to the 'history' page. Here you can see all completed tasks.

	There are two 'history' pages - realized as classic HTML page and as Netlify function (serverless backend endpoint). 
Netlify function uses secret environment variables for get access to the online based database.

This project is for educational purposes only! 

In this project, I used authorization widget by Netlify Identity, which provided Netlify platform, instead of identification provider by Supabase.
There is a limitation on the Netlify platform for languages, so I decided to use pure HTML, some CSS and Javascript for main logic. 
But I also used Netlify functions (aka AWS Lambda) for 'backend' part, which used protected variables for get access to the database.
In the Supabase DB, I used only one table, 'jobs', for simple CRUD operations, without any internal functions and procedures.
Main page layout supports mobile view, but user experience is better for desktop with wide screen.

This was CS50!

import { createClient } from '@supabase/supabase-js'
let tasks = document.getElementById("tasks");

let data = [{}];

let acceptData = () => {
    data.push({
        // text: textInput.value,
        // date: dateInput.value,
        //description: textarea.value,
    });
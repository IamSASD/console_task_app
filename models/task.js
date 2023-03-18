import pg from 'pg';
import {v4 as uuidv4} from 'uuid';
import { delete_task_prompt, mark_as_completed_prompt } from '../helpers/inquirer.js';

const {Pool} = pg;

const pool = new Pool({
    host: 'localhost',
    user: 'sasd',
    database: 'tasks_app',
    password: ''
})

export const create_task = async(description) => {
    const id = uuidv4();
    const values = [id,description];
    const consult = 'INSERT INTO tasks(id,task_description) VALUES($1,$2)';
    try {
        await pool.query(consult,values);
        return '\nTask created successfully'.green;
    } catch (error) {
        return error;
    }
    
}

export const list_tasks = async() => {
    const consult = 'SELECT * FROM tasks';
    const {rows} = await pool.query(consult);
    if(rows.length === 0){
        console.log("\nYou don't have any task".red);
        return true; 
    }
    console.log();
    rows.forEach((value, i) => {
        const counter = (i + 1).toString();
        const {task_description, completion_date} = value;
        console.log(`${completion_date ? counter.toString().green : counter.toString().red}. ${task_description} :::: ${completion_date ? 'Completed'.green : 'Pending'.red}`)
    });
}

export const list_completed_tasks = async() => {
    const consult = 'SELECT * FROM tasks WHERE completion_date IS DISTINCT FROM NULL';
    const {rows} = await pool.query(consult);
    if(rows.length === 0){
        console.log("\nYou don't have completed tasks".red);
        return true;
    }
    console.log();
    rows.forEach((value,i) => {
        const counter = (i+1).toString().green;
        const {task_description} = value;
        console.log(`${counter}. ${task_description}`);
    })
}

export const list_pending_tasks = async() => {
    const consult = 'SELECT * FROM tasks WHERE completion_date IS NOT DISTINCT FROM NULL';
    const {rows} = await pool.query(consult);
    if(rows.length === 0){
        console.log("\nYou don't have pending tasks".red);
        return true;
    }
    console.log();
    rows.forEach((value,i) => {
        const counter = (i+1).toString().red;
        const {task_description} = value;
        console.log(`${counter}. ${task_description}`);
    })
}

export const mark_as_completed = async() => {
    const consult = 'SELECT * FROM tasks WHERE completion_date IS NOT DISTINCT FROM NULL';
    const {rows} = await pool.query(consult);
    if(rows.length === 0){
        console.log("\nYou don't have pending tasks".red);
        return true;
    }
    console.log();
    let choices_data = [];
    rows.forEach((value) => {
        const {id,task_description} = value;
        choices_data.push({value: id, name: task_description})
    });
    let ids = [];
    await mark_as_completed_prompt(choices_data)
        .then(res => ids = res);
    for(let i = 0; i < ids.length; i++) {
        await pool.query('UPDATE tasks SET completion_date = now() WHERE id = $1', [ids[i]]);
    }
    console.log('\nTask checked as completed successfully'.green);
}

export const delete_task = async() => {
    const {rows} = await pool.query('SELECT id, task_description FROM tasks');
    let choices_data = [];
    rows.forEach((value) => {
        const {id,task_description} = value;
        choices_data.push({value: id, name: task_description})
    });
    let ids;
    await delete_task_prompt(choices_data)
        .then(res => ids = res);
    for(let i = 0; i < ids.length; i++) {
        await pool.query('DELETE FROM tasks WHERE id = $1', [ids[i]]);
    }
    console.log('\nTask deleted successfully'.green);
}
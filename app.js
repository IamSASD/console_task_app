import colors from 'colors';
import { input_description, inquirer_menu, pause } from './helpers/inquirer.js';
import { create_task, delete_task, list_completed_tasks, list_pending_tasks, list_tasks, mark_as_completed } from './models/task.js';

console.clear();

const main = async() => {
    let opt = '';
    do {
        opt = await inquirer_menu();

        switch(opt){
            case '1':
                const description = await input_description('Description: ');
                await create_task(description)
                    .then(res => console.log(res))
                    .catch(err => console.log(err));
            break;
            case '2':
                await list_tasks();
            break;
            case '3':
                await list_completed_tasks();
            break;
            case '4':
                await list_pending_tasks();
            break;
            case '5':
                await mark_as_completed();
            break;
            case '6':
                await delete_task();
            break;
        }

        opt !== '0' ? await pause() : '';
    } while (opt !== '0');
}

main();
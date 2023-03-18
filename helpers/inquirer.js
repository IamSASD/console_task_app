import colors from 'colors';
import inquirer from 'inquirer';

const questions = [
    {
        type: 'list',
        name: 'option',
        message: 'Choose an option',
        choices: [
                    {
                        value: '1',
                        name: `${'1. '.green}Create task`
                    },
                    {
                        value: '2',
                        name: `${'2. '.green}List tasks`
                    },
                    {
                        value: '3',
                        name: `${'3. '.green}List completed tasks`
                    },
                    {
                        value: '4',
                        name: `${'4. '.green}List pending tasks`
                    },
                    {
                        value: '5',
                        name: `${'5. '.green}Mark task as completed`
                    },
                    {
                        value: '6',
                        name: `${'6. '.green}Delete task`
                    },
                    {
                        value: '0',
                        name: `${'0. '.green}Exit`
                    }
                ]
    }
];

export const inquirer_menu = async() => {
    console.clear();
    console.log('======================='.cyan);
    console.log('   Choose an option    '.green)
    console.log('=======================\n'.cyan);

    const {option} = await inquirer.prompt(questions)
    return option;
}

export const input_description = async(message) => {
    const {description} = await inquirer.prompt([{
        type: 'input',
        name: 'description',
        message,
        validate(value) {
            if(value.length === 0) {return "Please write a description"} 
            return true;
        }
    }]);
    return description;
}

export const mark_as_completed_prompt = async(choices) => {
    const {completed} = await inquirer.prompt([{
        type: 'checkbox',
        name: 'completed',
        message: 'Mark as completed: ',
        choices
    }]);
    return completed;
}

export const delete_task_prompt = async(choices) => {
    const {remove} = await inquirer.prompt([{
        type: 'checkbox',
        name: 'remove',
        message: 'Delete task(s): ',
        choices
    }]);
    return remove;
}

export const pause = async() => {
    console.log('\n')
    await inquirer.prompt([
        {
            type: 'input',
            name: 'pause',
            message: `Press ${'ENTER'.green} to continue`
        }
    ]);
}

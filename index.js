// TODO: Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');
const generator = response => {
    const {
        gituser,
        title,
        toc,
        description,
        installation,
        usage,
        license,
        tests,
        constributors,
        email
    } = response
}

// TODO: Create an array of questions for user input
const questions = [
        {
            type: 'input',
            message: 'What is your GitHub username?',
            name: 'gituser'
        },

        {
            type: 'input',
            message: 'What is the title of the project?',
            name: 'title'
        },

        {
            type: 'checkbox',
            message: 'What should be in the Table of Contents?',
            name: 'toc',
            choices: ['Description', 'Installation', 'Usage', 'License', 'Tests', 'Contributors', 'Questions']
        },

        {
            type: 'input',
            message: 'What is the project description?',
            name: 'description'
        },

        {
            type: 'input',
            message: 'How should users install the application?',
            name: 'installation'
        },

        {
            type: 'input',
            message: 'How is the application used?',
            name: 'usage'
        },

        {
            type: 'list',
            message: 'What license should the project use?',
            name: 'license',
            choices: ['MIT', 'BSD', 'GPL', 'Apache']
        },

        {
            type: 'input',
            message: 'What are the testong procedures?',
            name: 'tests'
        },

        {
            type: 'input',
            message: 'Who are the contributors? (Please list the contributors GitHub usernames separated by commas)',
            name: 'contributors'
        },

        {
            type: 'input',
            message: 'Enter your email address so Users can reach you with questions.',
            name: 'email'
        }
    ];

// TODO: Create a function to write README file
function writeToFile(fileName, data) {
    let markText = `
    #${data.title}
    ${data.license}

    ##Description
    ${data.description}

    ##Table of Contents
    ${data.toc}

    ##Installation
    To install the required dependencies, run the following command:
    ${data.installation}

    ##Usage
    ${data.usage}

    ##License
    The project is licensed under the ${data.license} license.

    ##Tests
    Please run the following command to test:
    ${data.tests}

    ##Contributors
    ${data.contributors}

    ##Questions?
    Please email ${email} (link to email)[mailto:${email}] with any questions.
    (link to GitHub user)[https://github.com/${gituser}]
    `

}

// TODO: Create a function to initialize app
function init() { 
    inquirer
    .prompt(questions)
    .then((response) => {
        const fileName = writeToFile(response)
        fs.writeFile('ReadMe.md', fileName, (err) =>
            err ? console.error(err) : console.log('File created!'))
    });
}

// Function call to initialize app
init();

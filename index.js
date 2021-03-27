// TODO: Include packages needed for this application
const fs = require('fs');
const inquirer = require('inquirer');

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
        choices: ['MIT', 'GPL v2', 'GPL v3', 'Apache', 'None']
    },

    {
        type: 'input',
        message: 'What are the testing procedures?',
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

function tocRender(options) {
    let tocLinks = []
    for (var i = 0; i < options.length; i++) {
        switch (options[i]) {
            case 'Description':
                tocLinks.push(`\n * [Description](#description)`)
                break;

                case 'Installation':
                tocLinks.push(`\n * [Installation](#installation)`)
                break;

                case 'Usage':
                tocLinks.push(`\n * [Usage](#usage)`)
                break;

                case 'License':
                tocLinks.push(`\n * [License](#license)`)
                break;

                case 'Tests':
                tocLinks.push(`\n * [Tests](#tests)`)
                break;

                case 'Contributors':
                tocLinks.push(`\n * [Contributors](#contributors)`)
                break;

                case 'Questions':
                tocLinks.push(`\n * [Questions](#questions)`)
                break;

        }
    }
    return tocLinks.join('')
}

function renderLicense(license) {
    let renderBadge = ''
        switch (license) {
            case 'MIT':
            renderBadge = '![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)'
            break;

            case 'GPL v2':
            renderBadge = '![License: GPL v2](https://img.shields.io/badge/License-GPL%20v2-blue.svg)'
            break;

            case 'GPL v3':
            renderBadge = '![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)'
            break;

            case 'Apache':
            renderBadge = '![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)'
            break;

            case 'None':
            renderBadge = ''
            break;

        }
    return renderBadge
}

// TODO: Create a function to write README file
function writeToFile(data) {
    let badge = renderLicense(data.license)
let markText = `# ${data.title}
${badge}

## Table of Contents
${tocRender(data.toc)}

## Description
${data.description}

## Installation
To install the required dependencies, run the following command:
${data.installation}

## Usage
${data.usage}

## License
The project is licensed under the ${data.license} license.

## Tests
Please run the following command to test:
${data.tests}

## Contributors
${data.contributors}

## Questions?
Please email ${data.email} with any questions.
Visit me on GitHub at https://github.com/${data.gituser}
`
    return markText
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

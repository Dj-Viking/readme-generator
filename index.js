

// GIVEN a command-line application that accepts user input
// WHEN I am prompted for information about my application repository
// THEN a high-quality, professional README.md is generated with the title of my project and sections entitled Description, Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions
// WHEN I enter my project title
// THEN this is displayed as the title of the README
// WHEN I enter a description, installation instructions, usage information, contribution guidelines, and test instructions
// THEN this information is added to the sections of the README entitled Description, Installation, Usage, Contributing, and Tests
// WHEN I choose a license for my application from a list of options
// THEN a badge for that license is added near the top of the README and a notice is added to the section of the README entitled License that explains which license the application is covered under
// WHEN I enter my GitHub username
// THEN this is added to the section of the README entitled Questions, with a link to my GitHub profile
// WHEN I enter my email address
// THEN this is added to the section of the README entitled Questions, with instructions on how to reach me with additional questions
// WHEN I click on the links in the Table of Contents
// THEN I am taken to the corresponding section of the README



// // array of questions for user
// const questions = [

// ];

// // function to write README file
// function writeToFile(fileName, data) {
// }

// // function to initialize program
// function init() {

// }

// // function call to initialize program
// init();

const inquirer = require('inquirer');

promptUser = () => {
    console.log("~✨............................✨~");
    console.log("Welcome to Readme Generator 1.0.0!");
    console.log("~✨............................✨~");
    console.log("~✨............................✨~");
    console.log("~✨............................✨~");
    console.log("Answer some questions below about your project in order to begin Generation!")
    console.log("~*vvvvvvvvvvvvvvvvvvvvvvvvvvvvvv*~");
    return inquirer.prompt ([
        {
            type: 'input',
            name: 'name',
            message: 'What is your Project Title?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter a Project title.');
                    return false;
                }
            }
        }

    ])
}

promptUser()
.then(answers => {
    console.log(answers);
    return answers;
})
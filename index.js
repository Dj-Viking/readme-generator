

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
    console.log("Answer some questions below about your project in order to begin generating a Readme!")
    console.log("~*vvvvvvvvvvvvvvvvvvvvvvvvvvvvvv*~");
    return inquirer.prompt ([
        {
            type: 'input',
            name: 'title',
            message: 'What is your Project Title?',
            validate: nameInput => {
                if (nameInput) {
                    return true;
                } else {
                    console.log('Please enter a Project title.');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'description',
            message: 'Provide a Description of your Project:',
            validate: descInput => {
                if (descInput){
                    return true;
                } else {
                    console.log('Please enter a Description');
                }
            }
        },
        {
            type: 'input',
            name: 'installInstructions',
            message: 'Do you have any installation instructions (if any) for your Project? \nFeel free to copy plain text from another file:',
            default: false
        },
        {
            type: 'input',
            name: 'usageInstructions',
            message: 'Please provide a screenshot usage example \n(provide the relative path URL of where the image is located in your project directory):',
            default: false
        },
        {
            type: 'input',
            name: 'license',
            message: 'Which license would you like to add to this project?\n For info on a list of licenses go to this page -> \n https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/licensing-a-repository',
            default: false //for this condition create the license section anyway with the text "Need help choosing a license? check out this link for more information on which license to choose: (https://choosealicense.com/)"
            //if true create a badge with the license type at the top of the page.
        },
        {
            type: 'input',
            name: 'email',
            message: 'If any end-users of your application were to have any additional questions, which email should they contact? \n Please provide your email:',
            validate: emailInput => {
                if (emailInput){
                    return true;
                } else {
                    console.log("Please provide and email address.")
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'github',
            message: 'If any end-users wanted to ask questions on your github page \nwhere would they find your page? \n Please provide your github username:',
            validate: githubInput => {
                if (githubInput) {
                    return true;
                } else {
                    console.log("Please enter your github username.");
                    return false;
                }
            }
        },
    ])
}

promptContrib = readmeData => {
    if(!readmeData.contributors){
        readmeData.contributors = [];
    }
    console.log(`
=================
Add a contributor
=================
    `)
    return inquirer.prompt ([
        {
            type: 'input',
            name: 'contributors',
            message: 'Provide a contributor name to this project (if any) \n separating the contributor name in this current format - firstname lastname:',
            default: false
        },
        {
            type: 'confirm',
            name: 'confirmAddContrib',
            message: 'Do you have one other contributor?',
            default: false // if true create a separate prompt function to get more contributors
        }
    ])
    .then(contribData => {
        readmeData.contributors.push(contribData);
        if (contribData.confirmAddContrib) {
            return promptContrib(readmeData);//if confirmAddContrib is true recursively loop back through the function to add more contributors
        } else {// if false return the object as is.
            return readmeData;
        }
    });

}

promptUser()
.then(answers => {
    console.log(answers);
    return answers;
})
.then(promptContrib)
.then(contributors => {
    console.log(contributors);
})

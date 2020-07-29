

//***DONE GIVEN a command-line application that accepts user input
//***DONE WHEN I am prompted for information about my application repository
//SOON THEN a high-quality, professional README.md is generated with the title of my project and sections entitled Description, Table of Contents, Installation, Usage, License, Contributing, Tests, and Questions
//***DONE WHEN I enter my project title
//SOON THEN this is displayed as the title of the README
//***DONE WHEN I enter a description, installation instructions, usage information, contribution guidelines, and test instructions
//SOON THEN this information is added to the sections of the README entitled Description, Installation, Usage, Contributing, and Tests
//***DONE WHEN I choose a license for my application from a list of options
// THEN a badge for that license is added near the top of the README and a notice is added to the section of the README entitled License that explains which license the application is covered under
//***DONE WHEN I enter my GitHub username
//SOON THEN this is added to the section of the README entitled Questions, with a link to my GitHub profile
//DONE*** WHEN I enter my email address
//SOON THEN this is added to the section of the README entitled Questions, with instructions on how to reach me with additional questions
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
const licenseChoicesArray = ['MIT', 'ISC', 'Academic Free License v3.0', 'Apache license 2.0', 'Artistic license 2.0', 'Boost Software License 1.0', 'BSD 2-clause "Simplified" license', 'BSD 3-clause "New" or "Revised" license', 'Creative Commons license family', 'Creative Commons Zero v1.0 Universal', 'Creative Commons Attribution 4.0', 'Creative Commons Attribution Share Alike 4.0', 'Do What The F*** You Want To Public License', 'Educational Community License v2.0', 'Eclipse Public License 1.0', 'European Union Public License 1.1', 'European Union Public License 1.1', 'GNU General Public License family', 'GNU General Public License v2.0', 'GNU General Public License v3.0', 'GNU Lesser General Public License family', 'GNU Lesser General Public License v2.1', 'GNU Lesser General Public License v3.0', 'LaTeX Project Public License v1.3c', 'Microsoft Public License', 'Mozilla Public License 2.0', 'Open Software License 3.0', 'PostgreSQL License', 'SIL Open Font License 1.1', 'University of Illinois/NCSA Open Source License', 'The Unlicense', 'zLib License']
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
            name: 'email',
            message: 'If any end-users of your application were to have any additional questions, \nwhich email should they contact? \n Please provide your email:',
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
Add a Contributor
=================
    `)
    return inquirer.prompt ([
        {
            type: 'input',
            name: 'contributor',
            message: 'Provide a contributor name to this project (if any) \n separating the contributor name in this current format - firstname lastname: \n If you are the only contributor just put your name:',
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

//create function for asking user if they want a license or not. 
//if confirmed then let them choose which one
promptLicense = readmeData => {
    console.log(`
    =============
    Add a License
    =============
        `)
    if (!readmeData.licenseArray){
        readmeData.licenseArray = [];
        console.log(readmeData);
    }
    return inquirer.prompt ([
        {
            type: 'confirm',
            name: 'licenseConfirm',
            message: 'Would you like to add a license to your project?',
            validate: licenseConfirm => {
                if (licenseConfirm) {
                    return true;
                } else {
                    return false;//if this condition happens create the license section anyway and add the link to point user towards learning about which license to choose
                }
            }
        },  
        {
            type: 'checkbox',
            name: 'license',
            message: 'Which license would you like to add to this project?\n For info on which license to choose go to this page -> \n https://choosealicense.com/ \n Please keep in mind your readme will only reflect the FIRST choice you select',
            choices: licenseChoicesArray,
            when: ({licenseConfirm}) => licenseConfirm
            //if true create a badge with the license type at the top of the page.
        }

    ])
    .then(licenseData => {
        console.log(licenseData);
        readmeData.licenseArray.push(licenseData);
        return readmeData;
    });
}


promptUser()
.then(object1 => {
    console.log(object1);
    return object1;
})
.then(promptContrib)
.then(object2 => {
    console.log(object2);
    return object2;
})
.then(promptLicense)
.then(object3 => {
    console.log(object3);

})


// important to just put video for instructions on how to run the
// have a readme that is just for the challenge and for the generated one by the program

//youtube link to the generated one in the readme

//what command to run to start the program

//functioning table of contents

// can say most of the readme was generated with the program. but sample readme is
//  brought to by a link takes to the file in the repo



//***DONE GIVEN a command-line application that accepts user input
//***DONE WHEN I am prompted for information about my application repository
//***DONE THEN a high-quality, professional README.md is generated with the 
//***DONE title of my project and sections entitled: 
//***DONE Description, 
//***DONE Table of Contents, 
//***DONE Installation, 
//SOON Usage, 
//***DONE License, 
//***DONE Contributing Guidelines,
//***DONE Tests, and 
//***DONE Questions
//***DONE WHEN I enter my project title
//***DONE THEN this is displayed as the title of the README
//***DONE WHEN I enter a description, installation instructions, usage information, contribution guidelines, and test instructions
//***DONE THEN this information is added to the sections of the README entitled Description, Installation, Usage, Contributing, and Tests
//***DONE WHEN I choose a license for my application from a list of options
//***DONE THEN a badge for that license is added near the top of the README and a notice is added to the section of the README entitled License that explains which license the application is covered under
//***DONE WHEN I enter my GitHub username
//***DONE THEN this is added to the section of the README entitled Questions, with a link to my GitHub profile
//***DONE WHEN I enter my email address
//***DONE THEN this is added to the section of the README entitled Questions, with instructions on how to reach me with additional questions
//***DONE WHEN I click on the links in the Table of Contents
//***DONE THEN I am taken to the corresponding section of the README


// const licenseText = require('./utils/license-text.js');
//console.log(licenseText.licenseText.mit);
//checking how to reference the property inside the object we imported 
//which has an object inside it.
//name is empty be default until user enters their name it will
//  fill into the licenses that require a full name

//console.log(licenseChoices);

const emailRegex = /\w+@\w+\.(net|com|org)/;
const licenseChoices = require('./utils/license-choices.js');
const badgeColorList = require('./utils/badgeColorList.js');
const inquirer = require('inquirer');

const promptUser = () => {
    console.log("\x1b[35m", "Welcome to Readme Generator 1.0.1!", "\x1b[00m");
    console.log("\x1b[33m", "~✨..________________________..✨~", "\x1b[00m");
    console.log("\x1b[32m", "~✨....____________________....✨~", "\x1b[00m");
    console.log("\x1b[33m", "~✨......________________......✨~", "\x1b[00m");
    console.log("\x1b[32m", "~✨........____________........✨~", "\x1b[00m");
    console.log("\x1b[33m", "~✨..........________..........✨~", "\x1b[00m");
    console.log("Answer some questions below about your project in order to begin generating a Readme!")
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
            name: 'fullName',
            message: 'Please enter your full name - for end user contact purposes. \n   And should you choose a license that requires a name, it will be placed in the License automatically!',
            default: false
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
            message: 'Please provide a video or screenshot usage example \n(provide the youtube link or relative path URL of where the image is located in your project directory):',
            default: false
        },
        {
            type: 'input',
            name: 'testInstructions',
            message: 'Please provide the shell command that will test the program after installation:',
            default: false
        },
        {
            type: 'input',
            name: 'contributingGuidelines',
            message: 'Please give any contributing guidelines if other developers want to contribute to your project:'
        },
        {
            type: 'input',
            name: 'email',
            message: 'If any end-users of your application were to have any additional questions, \nwhich email should they contact? \n Please provide your valid email address in the format- something@mail.com:',
            validate: emailInput => {
                if (emailRegex.test(emailInput)){
                    return true;
                } else {
                    console.log("Please provide a valid email address.")
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
                }
            }
        },
    ])
    .catch(e => console.log(e));
}

const promptContrib = readmeData => {
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
            delete contribData.confirmAddContrib;
            return promptContrib(readmeData);//if confirmAddContrib is true recursively loop back through the function to add more contributors
        } else {// if false return the object as is.
            delete contribData.confirmAddContrib;
            return readmeData;
        }
    })
    .catch(e => console.log(e));
}

//prompt badges
const promptBadges = readmeData => {
    console.log(`
===============
   Add Badges
===============
            `);
    if (!readmeData.badgeNameArray && !readmeData.badgeColorArray) {
        readmeData.badgeNameArray = [];
        readmeData.badgeColorArray = [];
    }
    return inquirer.prompt ([
        {
            type: 'input',
            name: 'badgeName',
            message: 'Please type the text you want to be entered into the badge. \n Enter one word or two words separate by spaces'
        },
        {
            type: 'list',
            name: 'badgeColor',
            choices: badgeColorList,
            message: 'What color would you like this badge to be? Pick any from the list.'
        },
        {
            type: 'confirm',
            name: 'moreBadges',
            message: 'Do you want to add another badge?'
        }
    ])
    .then(badgeInfo => {
        readmeData.badgeNameArray.push(badgeInfo.badgeName);
        readmeData.badgeColorArray.push(badgeInfo.badgeColor);
        readmeData.badgeConfirm = badgeInfo.badgeConfirm;
        if (badgeInfo.moreBadges) {
            return promptBadges(readmeData);
        }
        return readmeData;
    })
    .catch(e => console.log(e));
}
//create function for asking user if they want a license or not. 
//if confirmed then let them choose which one
const promptLicense = readmeData => {
    //const licenseText = require('./utils/license-text.js');
    console.log(`
=============
Add a License
=============
        `)
    if (!readmeData.licenseArray && !readmeData.licensePropertyKey){
        readmeData.licenseArray = [];
        readmeData.licensePropertyKey = [];
        //console.log(readmeData);
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
            message: 'Which license would you like to add to this project? ✨ Please Select One License ✨ \n For info on which license to choose, go to this page ->https://choosealicense.com/licenses/\n',
            choices: licenseChoices.licenseChoicesArray,
            when: ({licenseConfirm}) => licenseConfirm,
            //if true create a badge with the license type at the top of the page.
            validate: license => {
                if (license.length === 1) {
                    return true;
                } else {
                    console.log("Please Select One Choice of License");
                }
            }
        }
    ])
    .then(licenseData => {
        if (!readmeData.licenseConfirmData){
            readmeData.licenseConfirmData = [];
        }
        console.log(licenseData);
        readmeData.licenseConfirmData.push(licenseData);
        //console.log(readmeData);
        if(readmeData.licenseConfirmData[0].licenseConfirm === false){
            module.exports = {
                title: readmeData.title,
                description: readmeData.description,
                fullName: readmeData.fullName,
                installInstructions: readmeData.installInstructions,
                usageInstructions: readmeData.usageInstructions,
                testInstructions: readmeData.testInstructions,
                contributingGuidelines: readmeData.contributingGuidelines,
                email: readmeData.email,
                github: readmeData.github,
                contributors: readmeData.contributors,
                licenseArray: readmeData.licenseArray,
                licenseConfirmData: readmeData.licenseConfirmData,
                licensePropertyKey: readmeData.licensePropertyKey,
                badgeNameArray: readmeData.badgeNameArray,
                badgeColorArray: readmeData.badgeColorArray
            };
            return readmeData;
        } else {
            let keyToPush;
            if (licenseData.license[0].includes("MIT")){
                keyToPush = "mit";
                readmeData.licensePropertyKey.push(keyToPush);
                module.exports = {
                    title: readmeData.title,
                    description: readmeData.description,
                    fullName: readmeData.fullName,
                    installInstructions: readmeData.installInstructions,
                    usageInstructions: readmeData.usageInstructions,
                    testInstructions: readmeData.testInstructions,
                    contributingGuidelines: readmeData.contributingGuidelines,
                    email: readmeData.email,
                    github: readmeData.github,
                    contributors: readmeData.contributors,
                    licenseArray: readmeData.licenseArray,
                    licenseConfirmData: readmeData.licenseConfirmData,
                    licensePropertyKey: readmeData.licensePropertyKey,
                    badgeNameArray: readmeData.badgeNameArray,
                    badgeColorArray: readmeData.badgeColorArray
                };
                const licenseText = require('./utils/license-text.js');
                //console.log(licenseText.licenseText.mit);
                const writeLicense = require('./utils/write-license-text.js');
                writeLicense.writeLicense(licenseText.licenseText.mit);
            }
            if (licenseData.license[0].includes("Creative")) {
                keyToPush = "cc";
                readmeData.licensePropertyKey.push(keyToPush);
                const licenseText = require('./utils/license-text.js');
                //console.log(licenseText.licenseText.mit);
                const writeLicense = require('./utils/write-license-text.js');
                writeLicense.writeLicense(licenseText.licenseText.cc);
            }
            if (licenseData.license[0].includes("Apache")){
                keyToPush = "apache";
                readmeData.licensePropertyKey.push(keyToPush);
                const licenseText = require('./utils/license-text.js');
                //console.log(licenseText.licenseText.mit);
                const writeLicense = require('./utils/write-license-text.js');
                writeLicense.writeLicense(licenseText.licenseText.apache);
            }
            if (licenseData.license[0].includes("Boost")){
                keyToPush = "boostSL";
                readmeData.licensePropertyKey.push(keyToPush);
                const licenseText = require('./utils/license-text.js');
                //console.log(licenseText.licenseText.mit);
                const writeLicense = require('./utils/write-license-text.js');
                writeLicense.writeLicense(licenseText.licenseText.boostSL);
            }
            if (licenseData.license[0].includes("Simplified")){
                keyToPush = "bsd2";
                readmeData.licensePropertyKey.push(keyToPush);
                module.exports = {
                    title: readmeData.title,
                    description: readmeData.description,
                    fullName: readmeData.fullName,
                    installInstructions: readmeData.installInstructions,
                    usageInstructions: readmeData.usageInstructions,
                    testInstructions: readmeData.testInstructions,
                    contributingGuidelines: readmeData.contributingGuidelines,
                    email: readmeData.email,
                    github: readmeData.github,
                    contributors: readmeData.contributors,
                    licenseArray: readmeData.licenseArray,
                    licenseConfirmData: readmeData.licenseConfirmData,
                    licensePropertyKey: readmeData.licensePropertyKey,
                    badgeNameArray: readmeData.badgeNameArray,
                    badgeColorArray: readmeData.badgeColorArray
                };
                const licenseText = require('./utils/license-text.js');
                //console.log(licenseText.licenseText.mit);
                const writeLicense = require('./utils/write-license-text.js');
                writeLicense.writeLicense(licenseText.licenseText.bsd2);
            }
            if (licenseData.license[0].includes("New")){
                keyToPush = "bsd3";
                readmeData.licensePropertyKey.push(keyToPush);
                module.exports = {
                    title: readmeData.title,
                    description: readmeData.description,
                    fullName: readmeData.fullName,
                    installInstructions: readmeData.installInstructions,
                    usageInstructions: readmeData.usageInstructions,
                    testInstructions: readmeData.testInstructions,
                    contributingGuidelines: readmeData.contributingGuidelines,
                    email: readmeData.email,
                    github: readmeData.github,
                    contributors: readmeData.contributors,
                    licenseArray: readmeData.licenseArray,
                    licenseConfirmData: readmeData.licenseConfirmData,
                    licensePropertyKey: readmeData.licensePropertyKey,
                    badgeNameArray: readmeData.badgeNameArray,
                    badgeColorArray: readmeData.badgeColorArray
                };
                const licenseText = require('./utils/license-text.js');
                //console.log(licenseText.licenseText.mit);
                const writeLicense = require('./utils/write-license-text.js');
                writeLicense.writeLicense(licenseText.licenseText.bsd3);
            }
            if (licenseData.license[0].includes("Mozilla")){
                keyToPush = "mozPL";
                readmeData.licensePropertyKey.push(keyToPush);
                const licenseText = require('./utils/license-text.js');
                //console.log(licenseText.licenseText.mit);
                const writeLicense = require('./utils/write-license-text.js');
                writeLicense.writeLicense(licenseText.licenseText.mozPL);
            }
            if (licenseData.license[0].includes("v2.0")){
                keyToPush = "gnuGPL2";
                readmeData.licensePropertyKey.push(keyToPush);
                const licenseText = require('./utils/license-text.js');
                //console.log(licenseText.licenseText.mit);
                const writeLicense = require('./utils/write-license-text.js');
                writeLicense.writeLicense(licenseText.licenseText.gnuGPL2);
            }
            if (licenseData.license[0].includes("GNU General Public License v3.0")){
                keyToPush = "gnuGPL3";
                readmeData.licensePropertyKey.push(keyToPush);
                const licenseText = require('./utils/license-text.js');
                //console.log(licenseText.licenseText.mit);
                const writeLicense = require('./utils/write-license-text.js');
                writeLicense.writeLicense(licenseText.licenseText.gnuGPL3);
            }
            if (licenseData.license[0].includes("Affero")){
                keyToPush = "gnuAGPL3";
                readmeData.licensePropertyKey.push(keyToPush);
                const licenseText = require('./utils/license-text.js');
                //console.log(licenseText.licenseText.mit);
                const writeLicense = require('./utils/write-license-text.js');
                writeLicense.writeLicense(licenseText.licenseText.gnuAGPL3);
            }
            //console.log(licenseData);
            readmeData.licenseArray.push(licenseData);
            module.exports = {
                title: readmeData.title,
                description: readmeData.description,
                fullName: readmeData.fullName,
                installInstructions: readmeData.installInstructions,
                usageInstructions: readmeData.usageInstructions,
                testInstructions: readmeData.testInstructions,
                contributingGuidelines: readmeData.contributingGuidelines,
                email: readmeData.email,
                github: readmeData.github,
                contributors: readmeData.contributors,
                licenseArray: readmeData.licenseArray,
                licenseConfirmData: readmeData.licenseConfirmData,
                licensePropertyKey: readmeData.licensePropertyKey,
                badgeNameArray: readmeData.badgeNameArray,
                badgeColorArray: readmeData.badgeColorArray
            };
        }
        return readmeData;
    })
    .catch(e => console.log(e));
}

promptUser()
.then(object1 => {
    console.log(object1);
    return object1;
})
.then(promptContrib)
.then(object2 => {
    //console.log(object2);
    return object2;
})
.then(promptBadges)
.then(object2a => {
    //console.log(object2a);
    return object2a;
})
.then(promptLicense)
.then(object3 => {
    //console.log(object3);
    // we have all the objects we need
    // now just need to pass the object to the generate functions
    return object3;
})
//generate and write the markdown file to root dir
.then(object4 => {
    console.log(object4);
    const generateMarkdown = require('./utils/generateMarkdown.js');
    //console.log(generateMarkdown);
    return generateMarkdown.generateFile(object4);
})
//write the markdown file to the main directory
.then(object5 => {
    //console.log(object5);
    const writeMarkdown = require('./utils/write-markdown.js');
    return writeMarkdown.writeFile(object5);
})
.then(writeFileResponse => {
    console.log(writeFileResponse);
    return writeFileResponse;
})
.catch(err => console.log(err));
const readmeData = require('../index.js');
//const { licensePropertyKey } = require('../index.js');
// const { contributors, licenseArray } = require('../index.js');


// function to generate markdown for README
generateFile = data => {
  // if (data.licenseArray.licenseConfirm === false){

  // }
  data = {
    title: readmeData.title,
    description: readmeData.description,
    fullName: readmeData.fullName,
    installInstructions: readmeData.installInstructions,
    usageInstructions: readmeData.usageInstructions,
    testInstructions: readmeData.testInstructions,
    email: readmeData.email,
    github: readmeData.github,
    contributors: readmeData.contributors,
    licenseArray: readmeData.licenseArray,
    licensePropertyKey: readmeData.licensePropertyKey
  }
console.log(data);

  return `

# ${data.title}

[![Selected License Badge](https://img.shields.io/badge/${data.licenseArray[0].license[0]}.svg)]

## ${data.description}

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Credits](#credits)
* [License](#license)

## Installation

${data.installInstructions}

## Usage

${data.usageInstructions}

## Credits

${data.contributors.forEach(async item =>{
  console.log(item);
  item;
})}

## License

${data.title} is licensed under the ${data.licenseArray[0].license[0]} license.

## Questions

If anybody has any questions please reach out to the creator of the project - ${data.fullName} via:
* Email ${data.email}
* GitHub (https://github.com/${data.github})
`;
}

module.exports = {generateFile}

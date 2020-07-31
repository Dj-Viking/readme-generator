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

displayContributors = () => {
  let contribString;
  let contribStringArray = [];
  for (let i = 0; i < data.contributors.length; i++) {
    contribString = Object.keys(data.contributors[i].contributor)
    .map(
      (key) => data.contributors[i].contributor[key]
    )
    .join('');
    //console.log(result);
    contribStringArray.push(contribString);

  }
  joinedArray = contribStringArray.join('\n* ');
  splitArray = joinedArray.split(', ');
  return `${splitArray}`
}
let licenseLink; 
licenseLinkGenerator = () => {
  if (data.licensePropertyKey[0] === "mit"){
    licenseLink = `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`
  }
  if (data.licensePropertyKey[0] === "cc"){
    licenseLink = `[![License: CC0-1.0](https://img.shields.io/badge/License-CC0%201.0-lightgrey.svg)](http://creativecommons.org/publicdomain/zero/1.0/)`
  }
  return licenseLink;
}

  return `

# ${data.title}

${licenseLinkGenerator()}

## Description 

${data.description}

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

* ${displayContributors()}

## License

${data.title} is licensed under the ${data.licenseArray[0].license[0]} license.

## Questions

If anybody has any questions please reach out to the creator of the project - ${data.fullName} via:
* Email ${data.email}
* GitHub (https://github.com/${data.github})
`;
}

module.exports = {generateFile}

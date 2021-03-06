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
    contributingGuidelines: readmeData.contributingGuidelines,
    email: readmeData.email,
    github: readmeData.github,
    contributors: readmeData.contributors,
    licenseArray: readmeData.licenseArray,
    licenseConfirmData: readmeData.licenseConfirmData,
    licensePropertyKey: readmeData.licensePropertyKey,
    badgeNameArray: readmeData.badgeNameArray,
    badgeColorArray: readmeData.badgeColorArray
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
      contribStringArray.push(contribString);
    }
    joinedArray = contribStringArray.join('\n* ');
    splitArray = joinedArray.split(', ');
    return `${splitArray}`
  }

  displayLicenseSection = () => {
    if (data.licenseConfirmData[0].licenseConfirm) {
      return `${data.title} is licensed under the ${data.licenseArray[0].license[0]} license.`
    } else {
      return `Need help choosing a license? Visit this link to learn more about which license works best for your project: https://choosealicense.com/licenses/`
    }
  }

  poweredBadgeGen = () => {
    let badgeMarkdown = '';
    for (let i = 0; i < data.badgeNameArray.length; i++) {
      /\w.+\s\w.+/.test(data.badgeNameArray[i])
      ? badgeMarkdown += `[![${data.badgeNameArray[i].split(' ')[0]}: ${data.badgeNameArray[i].split(' ')[1]}](https://img.shields.io/badge/${data.badgeNameArray[i].split(' ')[0]}-${data.badgeNameArray[i].split(' ')[1]}-${data.badgeColorArray[i]}.svg)]() `
      : badgeMarkdown += `[![${data.badgeNameArray[i]}](https://img.shields.io/badge/${data.badgeNameArray[i]}-${data.badgeColorArray[i]}.svg)]() `
    }
    return badgeMarkdown;
  }


  licenseBadgeGenerator = () => {
    let licenseLink; 
    if (data.licenseConfirmData[0].licenseConfirm){
      if (data.licensePropertyKey[0] === "mit"){
        licenseLink = `[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)`;
      }
      if (data.licensePropertyKey[0] === "cc"){
        licenseLink = `[![License: CC0-1.0](https://img.shields.io/badge/License-CC0%201.0-grey.svg)](http://creativecommons.org/publicdomain/zero/1.0/)`;
      }
      if (data.licensePropertyKey[0] === "apache"){
        licenseLink = `[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)`;
      }
      if (data.licensePropertyKey[0] === "boostSL"){
        licenseLink = `[![License](https://img.shields.io/badge/License-Boost%201.0-red.svg)](https://www.boost.org/LICENSE_1_0.txt)`;
      }
      if (data.licensePropertyKey[0] === "bsd2"){
        licenseLink = `[![License](https://img.shields.io/badge/License-BSD%202--Clause-orange.svg)](https://opensource.org/licenses/BSD-2-Clause)`;
      }
      if (data.licensePropertyKey[0] === "bsd3"){
        licenseLink = `[![License](https://img.shields.io/badge/License-BSD%203--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)`;
      }
      if (data.licensePropertyKey[0] === "mozPL"){
        licenseLink = `[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)`;
      }
      if (data.licensePropertyKey[0] === "gnuGPL2"){
        licenseLink = `[![License: GPL v2](https://img.shields.io/badge/License-GPL%20v2-blue.svg)](https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html)`;
      }
      if (data.licensePropertyKey[0] === "gnuGPL3"){
        licenseLink = `[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)`;
      }
      if (data.licensePropertyKey[0] === "gnuAGPL3"){
        licenseLink = `[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)`;
      }
      return licenseLink;
    } else {
      return ``;
    }
  }

  return `

# ${data.title}

${licenseBadgeGenerator()}

### Powered By

${poweredBadgeGen()}

## Description 

${data.description}

## Table of Contents
* [Installation](#Installation)
* [Usage](#Usage)
* [Testing](#Testing)
* [Credits](#Credits)
* [Contribute](#Contribute)
* [License](#License)
* [Questions](#Questions)

## Installation

${data.installInstructions}

## Usage

${data.usageInstructions}

## Testing

Once the program has the dependencies installed run this test script command to start the program:

<code>${data.testInstructions}</code>

## Credits

* ${displayContributors()}

## Contribute

${data.contributingGuidelines}

## License

${displayLicenseSection()}

## Questions

If anybody has any questions please reach out to the creator of the project - ${data.fullName} via:
* Email: ${data.email}
* GitHub: (https://github.com/${data.github})
`;
}

module.exports = {generateFile}

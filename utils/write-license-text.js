const fs = require('fs');
const readmeData = require('../index.js');
const licenseText = require('./license-text.js');

writeLicense = data, license => {

    license = {
        licenseText: licenseText.licenseText
    }

    return new Promise((resolve, reject) =>{
        fs.writeFile('./LICENSE', `${data.licenseArray[0].licenseText}`, err =>{
            if (err) {
                reject(err);
                return;
            } else {
                resolve({
                    ok: true,
                    message: 'LICENSE file created!'
                });
            }
        });
    });
}

module.exports = {writeLicense};
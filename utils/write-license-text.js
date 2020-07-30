const fs = require('fs');

writeLicense = data => {
    return new Promise((resolve, reject) =>{
        fs.writeFile('./LICENSE', data.licenseArray.licenseText[0], err =>{
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
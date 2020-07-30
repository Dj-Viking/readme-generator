const fs = require('fs');

writeFile = markdownFile => {
    return new Promise((resolve, reject) =>{
        fs.writeFile('./README.md', markdownFile, err =>{
            if (err) {
                reject(err);
                return;
            } else {
                resolve({
                    ok: true,
                    message: 'Markdown file created!'
                });
            }
        });
    });
}

module.exports = {writeFile};
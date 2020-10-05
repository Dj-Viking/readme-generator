const fs = require('fs');
const readmeData = require('../index.js')

writeFile = markdownFile => {
    return new Promise((resolve, reject) =>{
        fs.writeFile(`./dist/${readmeData.title}.md`, markdownFile, err =>{
            if (err) {
                reject(err);
                return;
            } else {
                resolve(
                    {
                        ok: true,
                        message: 'Markdown file created! File written into the new ./dist directory!'
                    }
                );
            }
        });
    });
}

module.exports = {writeFile};
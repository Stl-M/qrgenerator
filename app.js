import fs, { createWriteStream } from 'fs';
import inquirer from 'inquirer';
import qr from 'qr-image';

inquirer.prompt([
    {
        message: 'Type in your LinkedIn URL',
        name: 'URL',
    },
])
.then((answers) => {
    const url = answers.URL;
    var qr_svg = qr.image(url);
    qr_svg.pipe(fs.createWriteStream('qr_image.png'));

    fs.writeFile('URL.txt', url, (err) =>{
        if (err) throw err;
        console.log('The file has been saved!');
    });
})
.catch((err) =>{
    if(err.isTtyError) {
        console.log('Service unavailable');
    } else {
        console.log('The Server is not responding');
    }
});

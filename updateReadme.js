const fs = require('fs');
const path = require('path');

const readmePath = path.join(__dirname, 'README.md');

function formatDate(date) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
}

function addRow(name) {
    const currentDate = formatDate(new Date());
    const data = currentDate;

    fs.readFile(readmePath, 'utf8', (err, content) => {
        if (err) {
            console.error('Error reading the file:', err);
            return;
        }

        const tableStart = content.indexOf('| Name | Date |');
        const separatorIndex = content.indexOf('\n', tableStart + 1);
        const newRow = `\n| ${name} | ${data} |`;

        const nextRowIndex = content.indexOf('\n', separatorIndex + 1);

        let updatedData;
        if (nextRowIndex !== -1) {
            updatedData = content.slice(0, nextRowIndex) + newRow + content.slice(nextRowIndex);
        } else {
            updatedData = content + newRow;
        }

        fs.writeFile(readmePath, updatedData, 'utf8', (err) => {
            if (err) {
                console.error('Error writing to the file:', err);
            } else {
                console.log('Row added successfully!');
            }
        });
    });
}

const name = process.argv[2];

if (name) {
    addRow(name);
} else {
    console.log('Usage: node updateReadme.js <Name>');
}

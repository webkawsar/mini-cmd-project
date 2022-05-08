const fs = require('fs');



// refined function
const refineData = (readFileName) => {
    const unRefinedData = fs.readFileSync(`./files/${readFileName}`, 'utf-8').toLowerCase().split(',');
    const refinedData = [...new Set(unRefinedData)];
    return {
        total: unRefinedData.length,
        unique: refinedData.length,
        data: refinedData
    }
}

// create file
const writeNewFile = (writeFileName, data) => {
    fs.writeFileSync(`./files/${writeFileName}`, data.join(','));
    return true;
}

// find abandoned item
const abandonedItems = (sourceFile, fileToMatch) => {

    const sourceFileItems = fs.readFileSync(`./files/${sourceFile}`, 'utf-8').toLowerCase().split(',');
    const fileToMatchItems = fs.readFileSync(`./files/${fileToMatch}`, 'utf-8').toLowerCase().split(',');
    const abandonedItems = sourceFileItems.filter(item => !fileToMatchItems.includes(item));
    return {
        total: sourceFileItems.length,
        abandonedItems: abandonedItems.length,
        data: abandonedItems
    }
}

const refinedData = refineData('emails.txt');
writeNewFile('uniqueEmails.txt', refinedData.data);
const result = abandonedItems('uniqueEmails.txt', 'optedEmails.txt');
console.log(result, 'result');


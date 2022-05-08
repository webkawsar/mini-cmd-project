const fs = require('fs');
const readlineSync = require('readline-sync');

// refined function
const refineData = (readFileName) => {
    const unRefinedData = fs
        .readFileSync(`./files/${readFileName}`, 'utf-8')
        .toLowerCase()
        .split(',');
    const refinedData = [...new Set(unRefinedData)];
    return {
        total: unRefinedData.length,
        unique: refinedData.length,
        data: refinedData,
    };
};

// create file
const writeToNewFile = (writeFileName, data) => {
    fs.writeFileSync(`./files/${writeFileName}`, data.join(','));
    return true;
};

// find abandoned item
const abandonItems = (sourceFile, fileToMatch) => {
    const sourceFileItems = fs
        .readFileSync(`./files/${sourceFile}`, 'utf-8')
        .toLowerCase()
        .split(',');

    const fileToMatchItems = fs
        .readFileSync(`./files/${fileToMatch}`, 'utf-8')
        .toLowerCase()
        .split(',');
    const abandonedItems = sourceFileItems.filter((item) => !fileToMatchItems.includes(item));
    return {
        total: sourceFileItems.length,
        abandonedItems: abandonedItems.length,
        data: abandonedItems,
    };
};

// const refinedData = refineData('emails.txt');
// writeToNewFile('uniqueEmails.txt', refinedData.data);
// const result = abandonItems('uniqueEmails.txt', 'optedEmails.txt');
// console.log(result, 'result');
const userName = readlineSync.question('Write your full name: ');
const menu = ['Refine Unique Items in Same File', 'Find Abandoned Items Between Two Files'];
const menuIndex = readlineSync.keyInSelect(menu, 'Choose your option: ');

if (menu[menuIndex] === 'Refine Unique Items in Same File') {
    const fileToRead = readlineSync.question('Write the file name to refine: ');
    const result = refineData(fileToRead);
    console.log(`Total ${result.total} items found. Unique items - ${result.unique}`);

    if (readlineSync.keyInYN('Do you want to write the unique items in a new file? ')) {
        const newFileName = readlineSync.question('Write the new file name: ');
        writeToNewFile(newFileName, result.data);
        console.log(`A new file called ${newFileName} with ${result.unique} items is written`);
        console.log(`Thank you Mr. ${userName}`);
    } else {
        console.log(`Thank you Mr. ${userName}`);
    }
} else {
    const sourceFile = readlineSync.question('Write the source file name: ');
    const fileToMatch = readlineSync.question('Write the file name to match data: ');

    const result = abandonItems(sourceFile, fileToMatch);
    console.log(`Total ${result.total} items found. Abandoned items - ${result.abandonedItems}`);

    if (readlineSync.keyInYN('Do you want to write the abandoned items in a new file? ')) {
        const newFileName = readlineSync.question('Write the new file name: ');
        writeToNewFile(newFileName, result.data);
        console.log(
            `A new file called ${newFileName} with ${result.abandonedItems} items is written`
        );
        console.log(`Thank you Mr. ${userName}`);
    } else {
        console.log(`Thank you Mr. ${userName}`);
    }
}

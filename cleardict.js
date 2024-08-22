const fs = require('fs');
const path = require('path');

function clearDirectory(directoryPath) {
    // Get the full path to the directory
    const fullPath = path.join(__dirname, directoryPath);

    // Ensure the directory exists, or create it
    if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath);
        console.log(`Directory ${directoryPath} created.`);
    } else {
        // If it exists, clear the contents
        const files = fs.readdirSync(fullPath);

        // Loop through and delete each file
        for (const file of files) {
            const filePath = path.join(fullPath, file);
            fs.unlinkSync(filePath); // Delete the file
        }

        console.log(`Directory ${directoryPath} has been cleared.`);
    }
}

// Check if a directory was passed as an argument
const directoryPath = process.argv[2]; // The third argument in the command line (0 = node, 1 = script name)
if (directoryPath) {
    clearDirectory(directoryPath);
}
//  else {
//     console.log('Please provide a directory path as an argument.');
// }

module.exports = { clearDirectory };

// Example usage
// clearDirectory('transparent_imgs');

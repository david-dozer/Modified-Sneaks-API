// Importing necessary modules
const { removeBackground } = require('@imgly/background-removal-node');
const fs = require('fs');
const path = require('path');

// Function to remove background from an image
async function removeImageBackground(imgSource) {
    try {
        // Removing background
        const blob = await removeBackground(imgSource);

        // Converting Blob to buffer and generating data URL
        const buffer = Buffer.from(await blob.arrayBuffer());
        return `data:image/png;base64,${buffer.toString("base64")}`;
    } catch (error) {
        // Handling errors
        throw new Error(`Error removing background: ${error.message}`);
    }
}

// // Example usage
// async function main() {
//     try {
//         // Path to the input image
//         const imgSource = 'https://images.stockx.com/images/Air-Jordan-4-Retro-White-Thunder-Product.jpg';

//         // Removing background from the input image
//         const resultDataURL = await removeImageBackground(imgSource);

//         // Extracting the file name without extension and creating the new file name
//         const outputFileName = path.basename(imgSource, path.extname(imgSource)) + '.png';

//         // Writing the result to a file with the new name
//         fs.writeFileSync(outputFileName, resultDataURL.split(';base64,').pop(), { encoding: 'base64' });

//         // Logging success message
//         console.log(`Background removed successfully. Saved as ${outputFileName}`);
//     } catch (error) {
//         // Logging error message
//         console.error('Error:', error.message);
//     }
// }

// main();

module.exports = {
    removeImageBackground
};
const fs = require('fs');
const SneaksAPI = require('sneaks-api');
const sharp = require('sharp'); // Import the Sharp library
const axios = require('axios');
const path = require('path');
// const { removeBackground } = require('@imgly/background-removal-node'); // Use require for CommonJS
const { removeImageBackground } = require('./frontend.js');
const sneaks = new SneaksAPI();

// sneaks.getProducts("Kobe", 24, function(err, products) {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log(products);
// });

// Product object includes styleID where you input it in the getProductPrices function
// getProductPrices(styleID, callback) takes in a style ID and returns sneaker info including a price map and more images of the product
// sneaks.getProductPrices("fv4921-600", function(err, product){
//     console.log(product)
// })

// getMostPopular(limit, callback) takes in a limit and returns an array of the current popular products curated by StockX
// sneaks.getMostPopular(8, function(err, products){
//     processThumbnails(products)
// });

// getMostPopular, but it transparifies each shoe thumbnail image
// Ensure the transparent_imgs directory exists
const outputDir = path.join(__dirname, 'transparent_imgs');
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

async function processThumbnails(products) {
    const thumbnails = products.map(product => {
        const url = product.thumbnail.split('.jpg')[0] + '.jpg';
        console.log('Thumbnail URL:', url); // Log URL to debug
        return url;
    });

    const promises = thumbnails.map(async (thumbnailUrl, i) => {
        try {
            console.log(`Processing: ${thumbnailUrl}`); // Log URL being processed

            // Remove the background from the image
            const resultDataURL = await removeImageBackground(thumbnailUrl);

            // Convert the data URL to a Buffer
            const buffer = Buffer.from(resultDataURL.split(';base64,').pop(), 'base64');

            // Save the resulting image with transparent background to a PNG file
            const originalFileName = path.basename(thumbnailUrl, path.extname(thumbnailUrl));
            const outputFileName = path.join(outputDir, `${originalFileName}.png`);
            fs.writeFileSync(outputFileName, buffer);

            console.log(`Processed ${outputFileName}`);
        } catch (err) {
            console.error('Error processing image:', err);
        }
    });

    await Promise.all(promises);

    // Save the cleaned thumbnails array to output.json
    try {
        const data = JSON.stringify(thumbnails, null, 2);
        await fs.promises.writeFile('output.json', data);
        console.log('Thumbnails successfully written to output.json');
    } catch (err) {
        console.error('Error writing to file', err);
    }
}

// Fetch the most popular products and process their thumbnails
sneaks.getMostPopular(8, function(err, products) {
    if (err) {
        console.error(err);
        return;
    }

    processThumbnails(products);
});
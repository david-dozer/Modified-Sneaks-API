const fs = require('fs');
const SneaksAPI = require('changed-sneaks-api');
const sneaks = new SneaksAPI();

sneaks.getProducts('tiffany',15000, function(err, products) {
    if (err) {
        console.error(err);
        return;
    }

    console.log(products[0]);

    // Extract the shoe names
    const shoeNames = products.map(product => product.shoeName);

    // Write to output.json
    fs.writeFile('output.json', JSON.stringify(shoeNames, null, 2), (err) => {
        if (err) {
            console.error('Error writing to file', err);
        } else {
            console.log('Shoe names successfully written to output.json');
        }
    });
});

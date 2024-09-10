DISCLAIMER: All credits go to Dhruv Patel(druv5319). A StockX API, FlightClub API, Goat API, and Stadium Goods API all in one. All I did was modify the API to only show shoes since all the resellers have more diverse collections.

Sneaks API is a sneaker API built using Node.JS, Express, and Got. The Sneaks API allows users to get essential sneaker content such as images, product links and even prices from resell sites while also collecting data and storing it within a database. This API mainly scrapes StockX for sneaker information and then asynchronously scrapes Stadium Goods, Goat, and Flight Club for additional sneaker information such as images and its respective resell price. It is being modified to get the sneaker information mainly from GOAT. This API outputs a sneaker object of the following variables:

**UPDATE 1.0.1**: Added a filter to not show (GS) shoes on getMostPopularProducts so the same make of shoe does not show up twice.

  - Sneaker Name
  - Colorway
  - Description
  - Release Date
  - Retail Price
  - Style ID
  - Image Links
  - Product links from each of the resell sites
  - Price map (of shoe size to price) from each of the resell sites
  - And more
  

## Technologies Used
  - Node.JS
  - Express
  - Got
  - Request
  - Mongoose
  

  
## Installation
To use this API you will need to have [node.js](https://nodejs.org/en/) installed.
Once installed, use this line on the terminal within your Node.js project directory
```
npm install changed-sneaks-api
```
and place this line at the top of your main file
```js
const SneaksAPI = require('changed-sneaks-api');
```
## How to Use
```js
const SneaksAPI = require('changed-sneaks-api');
const sneaks = new SneaksAPI();

//getProducts(keyword, limit, callback) takes in a keyword and limit and returns a product array 
sneaks.getProducts("Kobe", 10, function(err, products){
    console.log(products)
})

//Product object includes styleID where you input it in the getProductPrices function
//getProductPrices(styleID, callback) takes in a style ID and returns sneaker info including a price map and more images of the product
sneaks.getProductPrices("FY2903", function(err, product){
    console.log(product)
})
//getMostPopular(limit, callback) takes in a limit and returns an array of the current popular products curated by StockX
sneaks.getMostPopular(10, function(err, products){
    console.log(products)
})
```


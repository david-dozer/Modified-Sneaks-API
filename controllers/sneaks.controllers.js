const Sneaker = require('../models/Sneaker');
const stockXScraper = require('../scrapers/stockx-scraper');
const flightClubScraper = require('../scrapers/flightclub-scraper');
const goatScraper = require('../scrapers/goat-scraper');
const stadiumGoodsScraper = require('../scrapers/stadiumgoods-scraper');

module.exports = class Sneaks {
  async getProducts(keyword, count = 40, callback, filterGS = false) {
    var productCounter = 0;

    stockXScraper.getProductsAndInfo(keyword, count, function (error, products) {
      if (error) {
        callback(error, null);
        return;
      }

      if (filterGS) {
        products = products.filter(shoe => !shoe.shoeName.includes('(GS)'));
      }

      products.forEach(function (shoe) {
        var cbCounter = 0;
        flightClubScraper.getLink(shoe, function () {
          if (++cbCounter == 3) {
            if (productCounter++ + 1 == products.length) {
              callback(null, products);
            }
          }
        });

        stadiumGoodsScraper.getLink(shoe, function () {
          if (++cbCounter == 3) {
            if (productCounter++ + 1 == products.length) {
              callback(null, products);
            }
          }
        });

        goatScraper.getLink(shoe, function () {
          if (++cbCounter == 3) {
            if (productCounter++ + 1 == products.length) {
              callback(null, products);
            }
          }
        });
      });
    }, filterGS);
  }

  getProductPrices(shoeID, callback) {
    const getPrices = (shoe) => {
      var cbCounter = 0;
      stockXScraper.getPrices(shoe, function () {
        cbCounter++;
        if (cbCounter == 5) {
          callback(null, shoe);
        }
      });
      stadiumGoodsScraper.getPrices(shoe, function () {
        cbCounter++;
        if (cbCounter == 5) {
          callback(null, shoe);
        }
      });
      flightClubScraper.getPrices(shoe, function () {
        cbCounter++;
        if (cbCounter == 5) {
          callback(null, shoe);
        }
      });
      goatScraper.getPrices(shoe, function () {
        cbCounter++;
        if (cbCounter == 5) {
          callback(null, shoe);
        }
      });
      goatScraper.getPictures(shoe, function () {
        cbCounter++;
        if (cbCounter == 5) {
          callback(null, shoe);
        }
      });
    };

    this.getProducts(shoeID, 1, function (error, products) {
      if (error || products[0].styleID.toLowerCase() != shoeID.toLowerCase()) {
        console.log(new Error("No Products Found"));
        callback(new Error("No Products Found"), null);
        return;
      }
      getPrices(products[0]);
    });
  }

  getMostPopular(count, callback) {
    this.getProducts("", count, function (error, products) {
      if (error) {
        callback(error, null);
      } else {
        callback(null, products);
      }
    }, true); // Set filterGS to true for most popular products
  }
};

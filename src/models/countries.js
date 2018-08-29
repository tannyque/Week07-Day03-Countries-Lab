const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js');

const Countries = function () {
  this.name = null;
  this.region = null;
  this.flag = null;
};

Countries.prototype.getData = function () {
  const request = new Request('https://restcountries.eu/rest/v2/all');
  request.get((data) => {
    console.log(data[0].name);
  })
};

module.exports = Countries;

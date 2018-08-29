const PubSub = require('../helpers/pub_sub.js');
const Request = require('../helpers/request.js');

const Countries = function () {
  this.countries = null;
};

Countries.prototype.getData = function () {
  const request = new Request('https://restcountries.eu/rest/v2/all');
  request.get((data) => {
    this.countries = data;
    PubSub.publish('Countries:all-countries-ready', this.countries);

    PubSub.subscribe('SelectView:change', (event) => {
      const selectedIndex = event.detail;
      this.publishCountryDetail(selectedIndex)
    })
  })
};

Countries.prototype.publishCountryDetail = function (countryIndex) {
  const selectedCountry = this.countries[countryIndex];
  PubSub.publish('Countries:selected-country-ready', selectedCountry)
};

module.exports = Countries;

// import COUNTRIES from './data/countries';

export default function() {

  this.db.loadData({
    currencies: [
      { name: 'BTC', price: 9351 },
      { name: 'ETH', price: 753.49 },
      { name: 'XRP', price: 0.81 },
      { name: 'BCH', price: 1651.83 },
      { name: 'EOS', price: 17.93 },
      { name: 'LTC', price: 158.81 },
    ]
  });

  this.get('/currencies', (schema) => {
    let db = schema.db;
    let newCurrencies = db.currencies.map(c => {
      c.price = getPrice(c.price);
      return c;
    });
    db.emptyData();
    db.loadData({ currencies: newCurrencies });

    return db.currencies;
  });

  // this.get('/countries', (schema, request) => {
  //   let query = request.queryParams.query;
  //
  //   return COUNTRIES.filter(country => {
  //     return country.toLowerCase().indexOf(query) > -1;
  //   });
  // }, { timing: 1000 });

}

function getPrice(oldPrice, volatility = .004) {
  let rnd = Math.random(); // generate number, 0 <= x < 1.0
  let changePercent = 2 * volatility * rnd;
  if (changePercent > volatility) {
    changePercent -= (2 * volatility)
  }
  let changeAmount = oldPrice * changePercent;
  return oldPrice + changeAmount;
}

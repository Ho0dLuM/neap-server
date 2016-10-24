
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('coffee').del()
    .then(function () {
      return Promise.all([
        // Inserts seed entries
        knex('coffee').insert({
          name: 'JerkYouAwake',
          roaster: 'Jerks',
          origin: 'JerkTown',
          roast: 'Dark',
          caffeine: 100,
          decaf: false,
          price: 9.99,
          quantity: 400
        }),
        knex('coffee').insert({
          name: 'AwesomeBrew',
          roaster: 'A-Town Brews',
          origin: 'A-town',
          roast: 'Light',
          caffeine: 1000,
          decaf: false,
          price: 10.99,
          quantity: 300
        }),
        knex('coffee').insert({
          name: 'Ho0dLuMBReW',
          roaster: 'Ho0dLuM',
          origin: 'Siberia',
          roast: 'Ultra Dark',
          caffeine: 1500,
          decaf: false,
          price: 18.99,
          quantity: 1000
        }),
        knex('coffee').insert({
          name: 'GarbageBrew',
          roaster: 'GarbageMen',
          origin: 'G-Town',
          roast: 'Light',
          caffeine: '300',
          decaf: false,
          price: 9.99,
          quantity: 500
        }),
        knex('coffee').insert({
          name: 'StarShucks',
          roaster: 'Shucksington',
          origin: 'ShucksTown',
          roast: 'Medium',
          caffeine: 400,
          decaf: false,
          price: 7.99,
          quantity: 6000
        })
      ]);
    });
};

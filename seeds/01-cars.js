
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('cars')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cars').insert([
        {VIN: 'VIN1', make: 'Volkswagen', model: 'Golf GTI', mileage: '15750', price: '23450', available: true},
        {VIN: 'VIN2', make: 'Volkswagen', model: 'Jetta GLS', mileage: '22500', price: '19995', available: true},
        {VIN: 'VIN3', make: 'Volkswagen', model: 'Passat TDI', mileage: '45600', price: '17900', available: true}
      ]);
    });
};

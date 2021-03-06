const faker = require('faker');

const database = { products: [] };

// eslint-disable-next-line no-plusplus
for (let i = 1; i <= 50; i++) {
  database.products.push({
    id: i,
    name: faker.commerce.productName(),
    material: faker.commerce.productMaterial(),
    price: faker.commerce.price(),
    imageUrl: 'https://source.unsplash.com/1600x900/?product',
    quantity: faker.random.number(),

  });
}

// eslint-disable-next-line no-console
console.log(JSON.stringify(database));

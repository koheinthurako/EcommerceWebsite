import { createCard } from "./js/cart";

fetch('https://dummyjson.com/products')
  .then(res => res.json())
  .then(products => {
    const items = products.products;

    items.forEach(item => {
        createCard(item);
    });

    // items.forEach(item => {
    //   item.images.forEach(img => {
    //     createCard(img);
    //   })
    // })
  });

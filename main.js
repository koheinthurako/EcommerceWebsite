import { createCard } from "./js/cart";
import "./node_modules/bootstrap/dist/js/bootstrap.bundle";
export let allProducts;

fetch('https://dummyjson.com/products')
  .then(res => res.json())
  .then(products => {
    const items = products.products;
    allProducts = items;

    items.forEach(item => {
        createCard(item);
    });
  });



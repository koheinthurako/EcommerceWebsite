import { createCard } from "./js/cart";
import "./node_modules/bootstrap/dist/js/bootstrap.bundle";
export let allProducts;

const allCardBox = document.querySelector("#allCardBox");
const productCategories = document.querySelector("#productCategories");
export let items;

export const renderProductCard = (products) => {
  allCardBox.innerHTML = null;
  products.forEach(product => {
    allCardBox.append(createCard(product));
  });
}

fetch('https://dummyjson.com/products')
  .then(res => res.json())
  .then(products => {
    items = products.products;
    // allProducts = items;

    renderProductCard(items);

    // items.forEach(item => {
    //     allCardBox.append(createCard(item));
    // });
  });
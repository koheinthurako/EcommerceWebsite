import { createCard, showInfo } from "./js/cart";
import "./node_modules/bootstrap/dist/js/bootstrap.bundle";
// export let allProducts;

const allCardBox = document.querySelector("#allCardBox");
export let items;

export const renderProductCard = (products) => {
  allCardBox.innerHTML = null;
  products.forEach(product => {
    allCardBox.append(createCard(product));
  });
  const allCards = document.querySelectorAll(".itemCard");
  const lastCard = allCards[allCards.length - 1];

  lastCard.addEventListener('click', (event) => {
    if(event.target.closest(".itemCard")) {
      showInfo(event);
    };
  });

}

fetch('https://dummyjson.com/products')
  .then(res => res.json())
  .then(products => {
    items = products.products;
    renderProductCard(items);
});

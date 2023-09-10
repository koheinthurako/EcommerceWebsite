import { allProducts } from "../main";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";

const allCardBox = document.querySelector("#allCardBox");
const productDetailModal = new bootstrap.Modal("#productDetailModal");





const stars = (no) => { // function expression
  let star = "";
  for(let i = 1; i <= 5; i++) {
      if(Math.ceil(no) <= i) {
        star += "<i class='bi bi-star'></i>"
      } else {
        star += "<i class='bi bi-star-fill'></i>"
      }
    }  
  return star;
}


// functions
function showInfo(card) {
  let currentCard = card.target.closest(".itemCard");
  // console.log(currentCard);
  const currentProductId = currentCard.getAttribute("itemId")
  const currentProduct = allProducts.find((product => product.id == currentProductId));

  productDetailModal.show();

}

function addToCart(btn) {
  console.log(btn.target);
}


export function createCard(items) {
    let div = document.createElement("div");
    div.classList.add("col-12", "col-md-6", "col-lg-4", "itemCard");
    div.setAttribute("itemId", items.id);
    div.innerHTML = `
      <div class="card border-0 shadow h-100">
        <div class="card-body d-flex flex-column justify-content-between">
          <div class="info mb-4">
            <img class="productCardImg mb-3 rounded-3" src="${items.thumbnail}" alt="">
            <h4 class="fw-bold">${items.brand}</h4>
            <p class="badge bg-secondary text-capitalize px-3 py-2">${items.category.replaceAll("-"," ")}</p>
            <p class="small text-muted">${items.description}</p>
          </div>

          <div class="d-flex justify-content-between">
            <div class="stars">
              ${stars(items.rating)}
            </div>  
            <p class="fw-bold mb-0">$ ${items.price}</p>
          </div>
          </div>
        <div class="card-footer bg-white py-3">
          <button class="btn btn-outline-dark w-100 addCartBtn">Add to cart</button>
        </div>
      </div>
    `;

    // console.log(items);

    allCardBox.append(div);



    const allCards = document.querySelectorAll(".itemCard");
    const addCartBtns = document.querySelectorAll(".card-footer .addCartBtn");

    allCards.forEach(card => {
      card.addEventListener('click', showInfo);
    })

    addCartBtns.forEach(btn => {
      btn.addEventListener('click', addToCart);
    })

}
import { items, renderProductCard } from "../main";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";

const productDetailModal = new bootstrap.Modal("#productDetailModal");
// const productCategories = document.querySelector("#productCategories");
const allBtn = document.querySelector("[cat='all']");


// Imperative thinking
// const categories = [];
// setTimeout(() => {
//   allProducts.forEach(product => {
//     if(!categories.includes(product.category)) {
//       categories.push(product.category);
//     }
//   });
// }, 2000);

// OR

// Declarative thinking
// setTimeout(() => {
//   const categories = [...new Set(allProducts.map((product) => product.category))];
  // console.log(categories);
//   categories.forEach(category => {
//     const btn = document.createElement("button");
//     productCategories.append();
//   });
// }, 1000)





// functions

const showCategory = (currentBtn, allBtns) => {
  allBtns.forEach(btn => {
    btn.classList.remove("active");
    if(!currentBtn.classList.contains("active")) {
      currentBtn.classList.add("active");
    }
  })

  // console.log(currentBtn.innerText);

  renderProductCard(
    items.filter(
      (product) => product.category === currentBtn.getAttribute("cat")
    ));
}

setTimeout(() => {
    const allCards = document.querySelectorAll("#allCardBox .card")
    const categories = [...new Set(items.map((product) => product.category))];
    categories.forEach(category => {
      productCategories.append(createCategoryBtn(category));
    });

    const categoryBtns = document.querySelectorAll("#productCategories .btn");
    categoryBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        showCategory(btn, categoryBtns);
      });
    });
}, 1000)

// carousel photo function
const createCategoryBtn = (name) => {
  const btn = document.createElement("button");
  btn.className = "btn btn-sm btn-outline-dark text-capitalize";
  btn.innerText = slugToText(name);
  btn.setAttribute("cat", name);
  return btn;
}

// turning star into UI
const stars = (no) => { 
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

// carousel indicator and slides control function
const productDetailCarouselItems = (arr) => {
  let slides = "";
  let indicators = "";
  arr.forEach((el, index) => {
    slides += ` 
    <div class="carousel-item ${index === 0 && 'active'}">
        <img src="${el}" class="d-block w-100 product-detail-img" alt="...">
    </div>
    `;

    indicators += `
      <button
        type="button"
        data-bs-target="#productDetailCarousel"
        data-bs-slide-to="${index}"
        class="${index === 0 && 'active'}"
        aria-current="true"
        aria-label="Slide 1">
      </button>
    `;
  });

  return {slides,indicators};
}

const slugToText = (slug) => {
  return slug.replaceAll("-", " ");
}

const renderProductDeatilModal = (currentCard) => {
  const currentProductId = currentCard.getAttribute("itemId")
  const currentProduct = items.find((product => product.id == currentProductId));

  // console.log(productDetailModal);
  // ဒီနေရာမှာ productDetailModal က DOM Element မဟုတ်ပါ "_element" ကမှ တကယ့် DOM Element ပါ 
  productDetailModal._element.querySelector(".modal-title").innerText = currentProduct.title;
  productDetailModal._element.querySelector(".modal-body").innerHTML = `
    <div id="carouselExampleIndicators" class="carousel slide">
      <div class="carousel-indicators">
        ${productDetailCarouselItems(currentProduct.images).indicators}
      </div>
      <div class="carousel-inner">
        ${productDetailCarouselItems(currentProduct.images).slides}
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
    <p class="mt-4 mb-5">An apple mobile which is nothing like apple</p>
    <div class="d-flex justify-content-between">
      <p class="fw-bold mb-0">$ ${currentProduct.price}</p>
      <div class="stars">
        ${stars(currentProduct.rating)}
      </div>  
    </div>
  `;

  productDetailModal.show();
}

// show card info function
function showInfo(card) {
  let currentCard = card.closest(".itemCard");
  if(currentCard) {
    renderProductDeatilModal(currentCard);
  }
}

function addToCart(btn) {
  console.log(btn.target);
}

// productDetailModal.show();


export function createCard(items) {
    let div = document.createElement("div");
    div.classList.add("col-12", "col-md-6", "col-lg-4", "itemCard", "animate__animated", "animate__bounceIn");
    div.setAttribute("itemId", items.id);
    div.innerHTML = `
      <div class="card border-0 shadow h-100">
        <div class="card-body d-flex flex-column justify-content-between">
          <div class="info mb-4">
            <img class="productCardImg mb-3 rounded-3" src="${items.thumbnail}" alt="">
            <h4 class="fw-bold">${items.title}</h4>
            <p class="badge bg-secondary text-capitalize px-3 py-2">${slugToText(items.category)}</p>
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

    const allCards = document.querySelectorAll(".itemCard");
    const addCartBtns = document.querySelectorAll(".card-footer .addCartBtn");

    allCards.forEach(card => {
      card.addEventListener('click', (event) => {
        if(event.target.closest(".itemCard")) {
          showInfo(event.target);
        };
      });

      // card.addEventListener('click', (event) => {
      //   if(event.target.classList.contains("cat")) {
      //     console.log("contain cat");
      //   };
      // });
    })

    addCartBtns.forEach(btn => {
      btn.addEventListener('click', addToCart);
    })
    
    return div;

}

const allCardBox = document.querySelector("#allCardBox");

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


export function createCard(items) {
    let div = document.createElement("div");
    div.classList.add("col-12", "col-md-6", "col-lg-4");
    div.innerHTML = `
      <div class="card border-0 shadow h-100">
        <div class="card-body d-flex flex-column justify-content-between">
          <div class="info">
            <img class="w-100 mb-3 rounded-3" src="${items.thumbnail}" alt="">
            <h4 class="fw-bold">${items.brand}</h4>
            <p class="badge bg-dark px-3 py-2">${items.category}</p>
            <p class="small text-muted">${items.description}</p>
          </div>

          <div class="d-flex justify-content-between">
            <div class="stars">
              ${stars(items.rating)}
            </div>  
            <p class="fw-bold mb-0">$ ${items.price}</p>
          </div>
          </div>
        <div class="card-footer py-3">
          <button class="btn btn-dark w-100">Add to cart</button>
        </div>
      </div>
    `;

    // console.log(items);

    allCardBox.append(div);
}
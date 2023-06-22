// // // const { response } = require("express");

// // async function FetchProducts() {
// //   let response = await fetch("http://localhost:3000/products");
// //   if (response.ok) {
// //     let products = await response.json();

// //     DisplayProducts(products);
// //   }
// // }
// // function DisplayProducts(products) {
// //   // Use for-of
// //   var divWrapper = document.getElementById("productList");

// //   for (let index = 0; index < products.length; index++) {
// //     divWrapper.innerHTML += CreateProductItem(products[index]);
// //   }
// // }

// // function CreateProductItem(theProduct) {
// //   return ` <div class="col-md-3" id="${theProduct.id}">
// //           <div class="card border border-3">
// //             <img
// //             height="250px"
// //             width="350px"
// //               src="${theProduct.imageUrl}"
// //               class="card-img-top"
// //               alt="${theProduct.title}"
// //             />
// //             <div class="card-body">
// //               <h5 class="card-title">${theProduct.title}</h5>
// //               <p class="card-text">${theProduct.price}</p>
// //               <p class="card-text">
// //                 <i class="bi bi-star-fill" style="color: orange"></i>
// //                 <i class="bi bi-star-fill" style="color: orange"></i>
// //                 <i class="bi bi-star-fill" style="color: orange"></i>
// //                 <i class="bi bi-star-fill" style="color: orange"></i>
// //               </p>
// //               <button class="btn btn-danger" onclick="DeleteAProduct(${theProduct.id})"><i class="fa-solid fa-trash"></i>Delete</button>
// //             </div>
// //           </div>
// //         </div>
// //     `;
// // }

// // async function AddNewProduct(e) {
// //   e.preventDefault(); // does not refresh the page
// //   let newProduct = {
// //     id: document.querySelector("#txtProductId").value,
// //     title: document.querySelector("#txtProductTitle").value,
// //     price: 5000,
// //     rating: 5,
// //     imageUrl:
// //       "https://media.istockphoto.com/id/1357365823/vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo.jpg?s=612x612&w=0&k=20&c=PM_optEhHBTZkuJQLlCjLz-v3zzxp-1mpNQZsdjrbns=",
// //     likes: 100,
// //   };
// //   // send data to /products/newproduct
// //   let response = await fetch("http://localhost:3000/products/newproduct", {
// //     method: "POST",
// //     headers: { "Content-Type": "application/json" },
// //     body: JSON.stringify(newProduct),
// //   });
// //   if (response.ok) {
// //     let message = await response.json();
// //     if (message.status == true) {
// //       var divWrapper = document.getElementById("productList");
// //       divWrapper.innerHTML += CreateProductItem(newProduct);
// //     }
// //   }
// // }

// // async function DeleteAProduct(id) {
// //   //console.log(id);
// //   let response = await fetch(
// //     `http://localhost:3000/products/deleteproduct/${id}`,
// //     {
// //       method: "DELETE",
// //     }
// //   );
// //   if (response.ok) {
// //     let message = await response.json();
// //     console.log(message);
// //   }
// // }

// window.addEventListener("DOMContentLoaded", FetchProducts);
async function FetchProducts() {
  let response = await fetch("http://localhost:3000/products");
  if (response.ok) {
    let products = await response.json();

    DisplayProducts(products);
  }
}
function DisplayProducts(products) {
  // Use for-of
  var divWrapper = document.getElementById("productList");

  for (let index = 0; index < products.length; index++) {
    divWrapper.innerHTML += CreateProductItem(products[index]);
  }
}

function CreateProductItem(theProduct) {
  return ` <div class="col-md-3" id=${theProduct.id}>
          <div class="card border border-3">
            <img
            height="250px"
            width="350px"
              src="${theProduct.imageUrl}"
              class="card-img-top"
              alt="${theProduct.title}"
            />
            <div class="card-body">
              <h5 class="card-title">${theProduct.title}</h5>
              <p class="card-text">${theProduct.price}</p>
              <p class="card-text">
              ${CreateRating(theProduct.rating)}
              </p>
              <button class="btn btn-danger" onclick="DeleteAProduct(${
                theProduct.id
              })">Delete<i class="fa-solid fa-trash"></i></button>
            </div>
          </div>
        </div>
    `;
}

function CreateRating(rating) {
  let pRatingContainer = "<p></p>";
  for (let index = 0; index < rating; index++) {
    pRatingContainer.innerHTML += `<i class="bi bi-star-fill" style="color: orange"></i>`;
  }
  return pRatingContainer;
}

async function AddNewProduct(e) {
  e.preventDefault(); // does not refresh the page
  let newProduct = {
    id: document.querySelector("#txtProductId").value,
    title: document.querySelector("#txtProductTitle").value,
    // price: 5000,
    // rating: 5,
    // imageUrl:
    //   "https://media.istockphoto.com/id/1357365823/vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo.jpg?s=612x612&w=0&k=20&c=PM_optEhHBTZkuJQLlCjLz-v3zzxp-1mpNQZsdjrbns=",
    // likes: 100,
    price: document.querySelector("#txtProductPrice").value,
    rating: document.querySelector("#txtProductRating").value,
    imageUrl: document.querySelector("#txtProductUrl").value,
  };
  // send data to /products/newproduct
  let response = await fetch("http://localhost:3000/products/newproduct", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newProduct),
  });
  if (response.ok) {
    let message = await response.json();
    if (message.status == true) {
      var divWrapper = document.getElementById("productList");
      divWrapper.innerHTML += CreateProductItem(newProduct);
      let modalTitle = document.querySelector(".modal-title");
      modalTitle.innerHTML = "Message";
      let modalBody = document.querySelector(".modal-body");
      modalBody.innerHTML = `<p>${message.msg}</p>`;

      var modal = new bootstrap.Modal(document.querySelector(".modal"));
      modal.show();
    }
  }
}

async function DeleteAProduct(id) {
  //console.log(id);
  let response = await fetch(
    `http://localhost:3000/products/deleteproduct/${id}`,
    {
      method: "DELETE",
    }
  );
  if (response.ok) {
    let message = await response.json();
    if (message.status == true) {
      //model
      document.getElementById(id).remove(); //id here is what gets passed in deleteAProduct fn.
    }
    // console.log(message);
  }
}

window.addEventListener("DOMContentLoaded", FetchProducts);

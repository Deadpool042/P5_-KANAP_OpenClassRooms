//Constantes pour cibler les éléments.
const ITEM_IMG = document.querySelector(".item__img");
const TITLE = document.getElementById("title");
const PRICE = document.getElementById("price");
const DESCRIPTION = document.getElementById("description");
const COLOR_SELECT = document.getElementById("colors");
const QUANTITY = document.getElementById("quantity");

//Récuperation de l'id du produit depuis l'URL
let params = new URL(document.location).searchParams;
let id = params.get("id");

showProduct();

//Récuperation des données du produit via l'id
function showProduct() {
  fetch("http://localhost:3000/api/products/" + id)
    .then((res) => {
      return res.json();
    })
    .then(async function (resultAPI) {
      products = await resultAPI;
      // console.table(products);
      displayDom(products);
    })
    .catch(function (error) {
      console.log("error :" + error);
    });
}

//Affichage sur le DOM

function displayDom(products) {
  ITEM_IMG.innerHTML = `<img src="${products.imageUrl}" alt="${products.altTxt}"></img>`;
  TITLE.innerHTML = `${products.name}`;
  PRICE.innerHTML = `${products.price} `;
  DESCRIPTION.innerHTML = `${products.description}`;
  for (color of products.colors) {
    COLOR_SELECT.innerHTML += `<option value=${color}>${color}</option>`;
  }
  btnAddToCart(products);
}

//Au clic sur le bouton, il demarre la fonction addCart
function btnAddToCart() {
  const ADD_TO_CART = document.getElementById("addToCart");
  ADD_TO_CART.addEventListener("click", addCart);
}
//addCart permet ,au clic,de creer un objet par produit avec les données issu de l'API
function addCart() {
  //Verifie que la quantité et la couleur soit correctement saisi
  if (QUANTITY.value == 0 || QUANTITY.value > 100) {
    alert("Veuillez selectionner une quantité entre 1 et 100");
  } else if (COLOR_SELECT.value === "") {
    alert("Veuillez choisir une couleur");
  } else {
    let productItem = {
      idProduct: id,
      colorProduct: COLOR_SELECT.value,
      quantityProduct: Number(QUANTITY.value),
      name: TITLE.innerText,
      price: PRICE.innerText,
      description: DESCRIPTION.innerText,
      image: document.querySelector(".item__img img").src,
      altImage: document.querySelector(".item__img img").alt,
    };

    //Gestion du localeStorage
    //Si le storage est vide alors push le 1er panier
    arrayToCart = JSON.parse(localStorage.getItem(productItem.name + " " + productItem.colorProduct));

    if (arrayToCart !== null) {
      // Si le storage n'est pas vide
      // Variable comprenant la condition de couleur et id identique
      let cartNotEmpty = arrayToCart.find((item) => item.idProduct === id && item.colorProduct === COLOR_SELECT.value);

      if (cartNotEmpty) {
        //Si condition true alors ajout de la quantité en plus dans le localStorage
        let addQuantity = productItem.quantityProduct + cartNotEmpty.quantityProduct;
        cartNotEmpty.quantityProduct = addQuantity;
        localStorage.setItem(productItem.name + " " + productItem.colorProduct, JSON.stringify(arrayToCart));
      }
    } else {
      let arrayToCart = [];
      arrayToCart.push(productItem);
      localStorage.setItem(productItem.name + " " + productItem.colorProduct, JSON.stringify(arrayToCart));
    }
  }
}

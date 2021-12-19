//Constante pour cibler les éléments
const CART__ITEMS = document.getElementById("cart__items");
const SELECT_ITEM = document.querySelector(".cart__item");
const TOTAL_QUANTITY = document.getElementById("totalQuantity");
const TOTAL_PRICE = document.getElementById("totalPrice");

let keysFromStorage = [];
let arrayToCart = [];
let getTotal = [];

getKeysFromStorage(); // Permet d'itérater le nom des clés du localStorage
concatKey(); // Permet de concatener les clés avec la fonction localStorage.getItem
displayCart(); // Affichage du panier dans le DOM

function getKeysFromStorage() {
  for (let i = 0; i < localStorage.length; i++) {
    let keys = localStorage.key(i);
    keysFromStorage.push(keys);
  }
}

function concatKey() {
  for (key of keysFromStorage) {
    // console.table(JSON.parse(localStorage.getItem(key)));
    arrayToCart.push(JSON.parse(localStorage.getItem(key)));
  }
}

//Affichage dans le dom
function displayCart() {
  arrayToCart.forEach((cartProduct) => {
    const productId = cartProduct[0].idProduct;
    const productColor = cartProduct[0].colorProduct;
    const productImage = cartProduct[0].image;
    const productName = cartProduct[0].name;
    const productPrice = cartProduct[0].price;
    let productQuantity = cartProduct[0].quantityProduct;

    // Pour chaque contenu du localStorage
    CART__ITEMS.innerHTML += `<article class="cart__item" data-id="${productId}" data-color="${productColor}">
    <div class="cart__item__img">
    <img src="${productImage}">
    </div>
                <div class="cart__item__content">
                <div class="cart__item__content__description">
                <h2>${productName}</h2>
                <p>${productColor}</p>
                <p>${productPrice}€</p>
                </div>
                <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                <p>Qté : </p>
                <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${productQuantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                <p class="deleteItem">Supprimer</p>
                </div>
                </div>
                </div>
                </article>`;
  });
}
const inputs = document.querySelectorAll('input[type="number"]');
addQty();
function addQty() {
  inputs.forEach((input, index) => {
    input.addEventListener("change", (e) => {
      let newValue;
      newValue = e.target.value; //Nouvelle valeur de la quantité

      //Recuperation du nom de la clé
      let keyNameLocalStorage = localStorage.key(index);

      let getItem = localStorage.getItem(keyNameLocalStorage);
      console.log(getItem);
      //---------------------------- Methode pour mettre à jour la quantité par produit -------------------------------------------------------------//
      // console.log(arrayToCart[0]);
      let getQuantity = arrayToCart;
      // console.log(getQuantity[index]);
      let qtyFromCart = arrayToCart[index][0].quantityProduct; //Retourne le quantity issue du panier
      //Cible le produit stocké dans le localStorage
      let newQty = []; //Creation d'un nouveau tableau pour le localStorage
      newQty.push(getQuantity[index].find((item) => item.quantityProduct == qtyFromCart));
      arrayToCart[index][0].quantityProduct = newValue; //Mets à jour la quantité

      localStorage.setItem(keyNameLocalStorage, JSON.stringify(newQty));
    });
  });
}
totalQty(); //fonction pour calculer la quantité total des produits du panier
function totalQty() {
  let qty = [1, 4, 2, 1]; // Inserer quantityProduct depuis le localStorage

  let result = qty.reduce((sum, current) => sum + current);

  // console.log(result);
}
//Fonctions pre-établies pour les calculs
totalPrice();
function totalPrice() {
  let qty = [4499, 1499, 1999, 1999]; // Inserer quantityProduct depuis le localStorage

  let result = qty.reduce((sum, current) => sum + current);

  // console.log(result);
}

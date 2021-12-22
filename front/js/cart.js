//Constante pour cibler les éléments
const CART__ITEMS = document.getElementById("cart__items");
const SELECT_ITEM = document.querySelector(".cart__item");
const TOTAL_QUANTITY = document.getElementById("totalQuantity");
const TOTAL_PRICE = document.getElementById("totalPrice");

let keysFromStorage = [];
let arrayToCart = [];
let productPrice = [];
let totalPrice = [0];
let result = []; //Pour afficher le prix initial

getKeysFromStorage(); // Permet d'itérer le nom des clés du localStorage
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
  //------------------ Calcul prix total panier ---------------------------------/

  // // console.log("resultat initial " + result);
}
const inputs = document.querySelectorAll('input[type="number"]');
addQty();

let newValue;
function addQty() {
  inputs.forEach((input, index) => {
    input.addEventListener("change", (e) => {
      let price = [];
      newValue = e.target.value; //Nouvelle valeur de la quantité

      //Recuperation du nom de la clé
      let keyNameLocalStorage = localStorage.key(index);

      //---------------------------- Methode pour mettre à jour la quantité par produit -------------------------------------------------------------//

      let getQuantity = arrayToCart;
      // console.log(getQuantity[index]);
      let qtyFromCart = arrayToCart[index][0].quantityProduct; //Retourne le quantity issue du panier
      //Cible le produit stocké dans le localStorage
      let newQty = []; //Creation d'un nouveau tableau pour le localStorage
      newQty.push(getQuantity[index].find((item) => item.quantityProduct == qtyFromCart));

      arrayToCart[index][0].quantityProduct = newValue; //Mets à jour la quantité

      localStorage.setItem(keyNameLocalStorage, JSON.stringify(newQty));
      //---------------------------- Methode pour mettre à jour le prix par produit -------------------------------------------------------------//
      for (i = 0; i < arrayToCart.length; i++) {
        price.push(Number(arrayToCart[i][0].price * Number(arrayToCart[i][0].quantityProduct)));
      }

      result = price.reduce((sum, current) => sum + current);

      TOTAL_PRICE.innerText = result;
    });
  });
  totalQty();
}
//Fonction pour modifier le prix en temps réel
calcPrice();
function calcPrice() {
  for (i = 0; i < arrayToCart.length; i++) {
    totalPrice.push(Number(arrayToCart[i][0].price * Number(arrayToCart[i][0].quantityProduct)));
  }
  if (arrayToCart !== null) {
    result = totalPrice.reduce((sum, current) => sum + current);
  } else {
    result = 0;
  }

  TOTAL_PRICE.innerText = result;
}

//fonction pour calculer la quantité total des produits du panier
function totalQty() {
  let totQty = [0];
  for (i = 0; i < arrayToCart.length; i++) {
    // console.log(arrayToCart[i][0].quantityProduct);
    totQty.push(Number(arrayToCart[i][0].quantityProduct));
  }

  //  Inserer quantityProduct depuis le localStorage

  let result = totQty.reduce((sum, current) => sum + current);

  if (arrayToCart !== null) {
    result = totQty.reduce((sum, current) => sum + current);
  } else {
    result = 0;
  }

  TOTAL_QUANTITY.innerText = result;
}

const DELETE_ITEMS = document.querySelectorAll(".deleteItem");

deleteItem();
function deleteItem() {
  DELETE_ITEMS.forEach((input, index) => {
    input.addEventListener("click", (e) => {
      let color = arrayToCart[index][0].colorProduct;
      let name = arrayToCart[index][0].name;
      localStorage.removeItem(name + " " + color);

      //Recharge la page pour reactualiser le panier
      location.reload();
    });
  });
}

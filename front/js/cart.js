//Constante pour cibler les éléments
const CART__ITEMS = document.getElementById("cart__items");
const SELECT_ITEM = document.querySelector(".cart__item");

let keysFromStorage = [];
let arrayToCart = [];

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
    console.log(arrayToCart);
    const productId = cartProduct[0].idProduct;
    const productColor = cartProduct[0].colorProduct;
    const productImage = cartProduct[0].image;
    const productName = cartProduct[0].name;
    const productPrice = cartProduct[0].price;
    const productQuantity = cartProduct[0].quantityProduct;

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
  const input = document.querySelector('input[type="number"]');
  let newQty;
  addQty();
  function addQty() {
    input.addEventListener("change", (e) => {
      console.log(e.target.value);
    });
  }
}

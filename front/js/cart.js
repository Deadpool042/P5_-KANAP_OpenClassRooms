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
addQty();

function addQty() {
  let newValue;
  const INPUTS = document.querySelectorAll('input[type="number"]');
  INPUTS.forEach((input, index) => {
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
deleteItem(); // Suppression élément du panier
function deleteItem() {
  const DELETE_ITEMS = document.querySelectorAll(".deleteItem");
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

//------------------------- GESTION DU FORMULAIRE ---------------------------//

// selectionne les inputs de type text ET de type password
const FORM_INPUTS = document.querySelectorAll('input[type="text"], input[type="email"]');

const FORM = document.querySelector("form");
//pour selectionner le formulaire afin de pouvoir l'envoyer

const REGEX_MAIL = /^[\w_-]+@[\w-]+\.[a-z]{2,4}$/i;
const REGEX_NAME = /^[a-z ,.'-]+$/i;
const REGEX_ADRESS = /^[a-zA-Z0-9\s\,\''\-]*$/i;
const REGEX_CITY = /^[[:alpha:]]([-' ]?[[:alpha:]])*$/i;

let firstName, lastName, adress, city, email; // pour stocker les valeurs des saisis

//Afin d'éviter de repeter le code:
// 3 parametres: -tag pour le champ (pseudo / email / password /confirm)
//-message pour le message d'erreur à afficher sous le champ
//-valid (boulean) pour le message à afficher sous le champ
//Affichage des messages d'erreurs
const ERROR_DISPLAY = (tag, message, valid) => {
  const ERROR = document.querySelector("#" + tag + "ErrorMsg");
  // ciblage dynamique des classes pour sélectionner la classe recherchée.
  // concatène pour avoir juste le tag appeler. Par ex en mettant firstName dans
  // le paramètre "tag", ca donnera "#firstNameErrorMsg"

  if (!valid) {
    ERROR.textContent = message; // si valid est false ajout du message renseigné dans le paramètre de la fonction ERROR_DISPLAY
    // "message" de la constante "errorDisplay"
  } else {
    //sinon
    ERROR.textContent = message; // si valid est false est true pas de message d'erreur
  }
};

//Vérification du prénom
const FIRSTNAME_CHECKER = (value) => {
  if (!value.match(REGEX_NAME)) {
    // verifie si le prénom est valide
    ERROR_DISPLAY("firstName", "Le prénom n'est pas valide");
    firstName = null;
  } else {
    ERROR_DISPLAY("firstName", "", true); //
    firstName = value;
  }
};
//Vérification du nom
const LASTNAME_CHECKER = (value) => {
  if (!value.match(REGEX_NAME)) {
    // verifie si le nom est valide
    ERROR_DISPLAY("lastName", "Le nom n'est pas valide");
    lastName = null;
  } else {
    ERROR_DISPLAY("lastName", "", true);
    lastName = value;
  }
};
//Vérification de l'adresse
const ADRESS_CHECKER = (value) => {
  if (!value.match(REGEX_ADRESS)) {
    // verifie si l'adresse est valide
    ERROR_DISPLAY("address", "L'adresse n'est pas valide");
    address = null;
  } else {
    ERROR_DISPLAY("address", "", true);
    address = value;
  }
};
//Vérification de la ville
const CITY_CHECKER = (value) => {
  if (!value.match(REGEX_NAME)) {
    // verifie si la ville est valide
    ERROR_DISPLAY("city", "La ville n'est pas valide");
    city = null;
  } else {
    ERROR_DISPLAY("city", "", true);
    city = value;
  }
};
//Vérification de l'email
const EMAIL_CHECKER = (value) => {
  if (!value.match(REGEX_MAIL)) {
    // verifie si l'email est valide
    ERROR_DISPLAY("email", "Le mail n'est pas valide");
    email = null;
  } else {
    ERROR_DISPLAY("email", "", true);
    email = value;
  }
};

//For chaque actions sur les inputs , il renvoit la valeur l'input sur l'id qui est concerné.
FORM_INPUTS.forEach((input) => {
  input.addEventListener("input", (e) => {
    switch (e.target.id) {
      case "firstName":
        FIRSTNAME_CHECKER(e.target.value); //e.target.value permet de recuperer les valeurs entrées dans l'input
        break;

      case "lastName":
        LASTNAME_CHECKER(e.target.value); //e.target.value permet de recuperer les valeurs entrées dans l'input
        break;

      case "address":
        ADRESS_CHECKER(e.target.value); //e.target.value permet de recuperer les valeurs entrées dans l'input
        break;

      case "city":
        CITY_CHECKER(e.target.value); //e.target.value permet de recuperer les valeurs entrées dans l'input
        break;
      case "email":
        EMAIL_CHECKER(e.target.value); //e.target.value permet de recuperer les valeurs entrées dans l'input
        break;
      default:
        null;
    }
  });
});

//---------------- Envoi du formulaire ------------------//
//vérification du remplissage du formulaire

/**
 *
 * Expects request to contain:
 * contact: {
 *   firstName: string,
 *   lastName: string,
 *   address: string,
 *   city: string,
 *   email: string
 * }
 * products: [string] <-- array of product _id
 *
 */
// products: [string] <-- array of product _id

//Envoi de la requete
//Creation du tableau par ID
console.log(keysFromStorage.length);
console.log(keysFromStorage);
function sendForm() {
  FORM.addEventListener("submit", (e) => {
    e.preventDefault();

    //Stockage des infos clients
    let contact = {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      email: email,
    };
    //Vérification de la saisie du formulaire avant d'envoyer
    if (firstName == null || lastName == null || address == null || city == null || email == null) {
      window.confirm("Veuillez renseigner les champs manquants");
      window.onbeforeunload; //Empeche le rechargement de la page
    } else if (keysFromStorage.length === 0) {
      // Si le panier est vide alors un message d'erreur est affiché
      let container = document.createElement("span");
      let errorMsg = document.createTextNode("Panier vide ! Veuillez ajouter des articles");
      CART__ITEMS.prepend(container);
      CART__ITEMS.append(errorMsg);
    } else {
      //Création d'un tableau pour l'envoi
      let products = [];
      for (id of arrayToCart) {
        products.push(id[0].idProduct);
      }

      let articleOrder = { contact, products };

      fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(articleOrder),
      })
        //Reponse depuis l'API
        .then((response) => {
          return response.json();
        })
        //Recuperation des données,affichage des données et redirection vers page confiramtion
        .then((data) => {
          document.location.href = `confirmation.html?orderId=${data.orderId}`;

          //Effacement du localStorage
          localStorage.clear();
        })
        .catch((error) => {
          console.log(error);
        });

      FORM_INPUTS.forEach((input) => (input.value = "")); //Remise à zéro des champs
    }
  });
}
sendForm();

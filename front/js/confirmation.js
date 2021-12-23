//Récupération de l'id présente dans l'URL
let idUrl = new URL(document.location).searchParams;
let idConfirmation = idUrl.get("orderId");

//On affiche l'id dans le DOM
document.getElementById("orderId").innerText = idConfirmation;

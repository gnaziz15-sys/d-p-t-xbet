// ====== TES RÉGLAGES (tu peux les modifier) ======

// Taux : 220000 Kwanza = 101000 FCFA
const KWANZA_RECU = 220000;
const FCFA_DONNE = 101000;

// Ton numéro WhatsApp, sans le + et sans espaces
const NUMERO_WHATSAPP = "244932926389";

// ====== LE CODE (ne touche pas en dessous au début) ======

const TAUX = FCFA_DONNE / KWANZA_RECU;

const champKwanza = document.getElementById("kwanza");
const champFcfa = document.getElementById("fcfa");
const champId = document.getElementById("idxbet");
const bouton = document.getElementById("bouton");
const erreur = document.getElementById("erreur");

function calculerFcfa(kwanza) {
  return Math.floor(kwanza * TAUX);
}

function formater(nombre) {
  return nombre.toLocaleString("fr-FR");
}

// Le montant FCFA s'affiche pendant que le client tape
champKwanza.addEventListener("input", function () {
  const kwanza = Number(champKwanza.value);
  champFcfa.textContent = formater(calculerFcfa(kwanza)) + " FCFA";
});

// Au clic, on ouvre WhatsApp avec le message déjà écrit
bouton.addEventListener("click", function () {
  const kwanza = Number(champKwanza.value);
  const idXbet = champId.value.trim();

  if (kwanza <= 0) {
    erreur.textContent = "Entre un montant en Kwanza.";
    return;
  }
  if (idXbet === "") {
    erreur.textContent = "Entre ton ID XBET.";
    return;
  }
  erreur.textContent = "";

  const fcfa = calculerFcfa(kwanza);

  const message =
    "Nouvelle demande de dépôt XBET\n" +
    "Montant envoyé : " + formater(kwanza) + " Kwanza\n" +
    "Montant à recevoir : " + formater(fcfa) + " FCFA\n" +
    "ID XBET : " + idXbet;

  const lien =
    "https://wa.me/" + NUMERO_WHATSAPP + "?text=" + encodeURIComponent(message);

  window.open(lien, "_blank");
});

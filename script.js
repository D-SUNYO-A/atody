// Récupérer les éléments HTML
const recetteSelect = document.getElementById("recette");
const nomRecette = document.getElementById("nom");
const etapes = document.getElementById("etapes");
const precedentBtn = document.getElementById("precedent");
const suivantBtn = document.getElementById("suivant");
const etatNums = document.getElementsByClassName("etatNum");
const numTotal = document.getElementById("total");

// Définition des recettes sous forme d'un tableau d'objets
const recettes = [
  {
    nom: "Omelette",
    description: "Une délicieuse omelette classique.",
    etapes: [
      "Casser les œufs dans un bol.",
      "Battre les œufs vigoureusement avec une fourchette jusqu'à ce qu'ils soient bien mélangés.",
      "Faire chauffer une poêle antiadhésive à feu moyen et ajouter une petite quantité de beurre ou d'huile.",
      "Verser les œufs battus dans la poêle et cuire pendant environ 2 minutes jusqu'à ce que les bords soient pris.",
      "Ajouter des garnitures comme du fromage râpé, des légumes ou du jambon sur la moitié des œufs.",
      "Plier l'autre moitié par-dessus pour former une demi-lune.",
      "Continuer à cuire pendant environ 1 à 2 minutes jusqu'à ce que l'omelette soit bien cuite mais encore moelleuse à l'intérieur.",
      "Glisser l'omelette sur une assiette et servir immédiatement.",
    ],
  },
  {
    nom: "Œufs brouillés",
    description: "Des œufs brouillés crémeux et délicieux.",
    etapes: [
      "Casser les œufs dans un bol.",
      "Ajouter une pincée de sel et de poivre aux œufs.",
      "Fouetter les œufs vigoureusement jusqu'à ce qu'ils soient bien mélangés.",
      "Faire fondre une petite quantité de beurre dans une poêle à feu moyen-doux.",
      "Verser les œufs battus dans la poêle chauffée.",
      "Remuer doucement et continuellement avec une spatule en caoutchouc.",
      "Cuire les œufs en remuant jusqu'à ce qu'ils soient brouillés et crémeux, mais encore légèrement humides.",
      "Retirer de la poêle et servir immédiatement.",
    ],
  },
  {
    nom: "Œufs au plat",
    description: "Des œufs au plat simples et délicieux.",
    etapes: [
      "Faire chauffer une petite quantité de beurre ou d'huile dans une poêle à feu moyen.",
      "Casser un œuf dans un bol et le verser délicatement dans la poêle chauffée.",
      "Cuire l'œuf sans le retourner jusqu'à ce que les blancs soient pris.",
      "À l'aide d'une spatule, déposer l'œuf sur une assiette, en veillant à ne pas percer le jaune.",
      "Saupoudrer d'une pincée de sel et de poivre selon votre goût.",
      "Servir immédiatement.",
    ],
  },
  {
    nom: "Œufs pochés",
    description: "Des œufs pochés délicats et parfaits.",
    etapes: [
      "Faire bouillir de l'eau dans une casserole profonde.",
      "Casser un œuf dans un petit bol.",
      "Créer un tourbillon dans l'eau bouillante en remuant doucement avec une cuillère en bois.",
      "Déposer l'œuf délicatement au centre du tourbillon.",
      "Cuire pendant 3 à 4 minutes jusqu'à ce que le blanc soit pris mais que le jaune reste liquide.",
      "Utiliser une écumoire pour retirer l'œuf de l'eau.",
      "Égoutter l'excès d'eau et servir.",
    ],
  },
  {
    nom: "Œufs à la coque",
    description: "Des œufs à la coque avec un jaune liquide.",
    etapes: [
      "Faire bouillir de l'eau dans une casserole.",
      "Plonger les œufs dans l'eau bouillante à l'aide d'une cuillère.",
      "Cuire pendant 4 à 5 minutes pour des œufs à la coque avec un jaune liquide, ou plus longtemps selon votre préférence.",
    ],
  },
];

let recetteSelectionnee = null;
let etapeActuelle = 0;

// Fonction pour mettre à jour le nombre d'etape actuelle
const mettreAJourNombreEtapeActuelle = () => {
  for (i = 0; i < etatNums.length; i++) {
    etatNums[i].textContent = etapeActuelle + 1;
  }
};

// Fonction pour mettre à jour le nombre total d'étapes
const mettreAJourNombreTotalEtapes = () => {
  const recette = recettes.find((r) => r.nom === recetteSelectionnee);
  if (recette) {
    const nombreTotalEtapes = recette.etapes.length;
    numTotal.textContent = nombreTotalEtapes;
  } else {
    numTotal.textContent = "";
  }
};

// Générer dynamiquement les options de recettes à partir du tableau d'objets recettes
recettes.forEach((recette) => {
  const option = document.createElement("option");
  option.value = recette.nom;
  option.textContent = recette.nom;
  recetteSelect.appendChild(option);
});

// Fonction pour afficher les étapes de la recette sélectionnée
const afficherEtapes = () => {
  etapes.innerHTML = "";
  const recette = recettes.find((r) => r.nom === recetteSelectionnee);
  if (recette) {
    const etape = recette.etapes[etapeActuelle];
    const paragraphe = document.createElement("p");
    paragraphe.textContent = etape;
    etapes.appendChild(paragraphe);
  }
};

// Gérer la sélection de la recette
recetteSelect.addEventListener("change", () => {
  recetteSelectionnee = recetteSelect.value;
  nomRecette.innerText = recetteSelectionnee;
  etapeActuelle = 0;
  afficherEtapes();
  mettreAJourNombreTotalEtapes();
});

// Gérer les boutons "Étape précédente" et "Étape suivante"
precedentBtn.addEventListener("click", () => {
  if (etapeActuelle > 0) {
    etapeActuelle--;
  }
  afficherEtapes();
  mettreAJourNombreEtapeActuelle();
});

suivantBtn.addEventListener("click", () => {
  const recette = recettes.find((r) => r.nom === recetteSelectionnee);
  if (etapeActuelle < recette.etapes.length - 1) {
    etapeActuelle++;
  }
  afficherEtapes();
  mettreAJourNombreEtapeActuelle();
});

// Par défaut, afficher les étapes de la première recette
for (i = 0; i < etatNums.length; i++) {
  etatNums[i].textContent = etapeActuelle + 1;
}
recetteSelect.value = recettes[0].nom;
recetteSelectionnee = recetteSelect.value;
nomRecette.innerText = recetteSelectionnee;
mettreAJourNombreTotalEtapes();

afficherEtapes();

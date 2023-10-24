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

// Générer dynamiquement les options de recettes à partir du tableau d'objets recettes
recettes.forEach(recette => {
  const option = document.createElement("option");
  option.value = recette.nom;
  option.textContent = recette.nom;
  recetteSelect.appendChild(option);
});

let recetteSelectionnee = recetteSelect.value;
let etapeActuelle = 0;

// Gérer la sélection de la recette
recetteSelect.addEventListener("change", () => {
  recetteSelectionnee = recetteSelect.value;
  nomRecette.innerText = recetteSelectionnee;
  etapeActuelle = 0;
  mettreAJourNumeroEtapeActuelle();
  mettreAJourNombreTotalEtapes();
  afficherEtapes();
});

// Gérer les boutons "Étape précédente" et "Étape suivante"
precedentBtn.addEventListener("click", () => {
  if (etapeActuelle > 0) {
    etapeActuelle--;
  }
  afficherEtapes();
  mettreAJourNumeroEtapeActuelle();
});

suivantBtn.addEventListener("click", () => {
  const recette = recetteActuelle();
  if (etapeActuelle < recette.etapes.length - 1) {
    etapeActuelle++;
  }
  afficherEtapes();
  mettreAJourNumeroEtapeActuelle();
});

// Pour trouver la recette actuel 
const recetteActuelle = () => {
  const recette = recettes.find((r) => r.nom === recetteSelectionnee);
  return recette
}

// Pour faire le total des etapes de la recette actuelle 
const totalEtapeRecetteActuelle = () => {
  return recetteActuelle().etapes.length;
}

// Pour mettre à jour le nombre total des étapes
const mettreAJourNombreTotalEtapes = () => {
    const nombreTotalEtapes = totalEtapeRecetteActuelle();
    numTotal.textContent = nombreTotalEtapes;
};

// Pour mettre à jour le numéro d'etape actuelle
const mettreAJourNumeroEtapeActuelle = () => {
  for (let etatNum of etatNums) {
    // Mis à jour le numéro d'etape actuelle
    etatNum.textContent = etapeActuelle + 1;

    // Caster "etatNum.textContent" (string) en un entier (int)
    let numActuelle = parseInt(etatNum.textContent);
    
    // Mettre à jour le style du bouton Précédent 
    numActuelle === 1 
      ? 
        (
          precedentBtn.disabled  = true ,
          precedentBtn.style.cursor  = 'not-allowed',
          precedentBtn.style.opacity  = '50%' 
        )
      : 
        (
          precedentBtn.disabled  = false,
          precedentBtn.style.cursor  = 'pointer',
          precedentBtn.style.opacity  = '100%' 
        )
    
    // Mettre à jour le style du bouton Suivant 
    numActuelle === totalEtapeRecetteActuelle()
    ? 
      (
        suivantBtn.disabled  = true ,
        suivantBtn.style.cursor  = 'not-allowed',
        suivantBtn.style.opacity  = '50%' 
      )
    : 
      (
        suivantBtn.disabled  = false,
        suivantBtn.style.cursor  = 'pointer',
        suivantBtn.style.opacity  = '100%' 
      )
  }
};

// Pour afficher les étapes de la recette sélectionnée
const afficherEtapes = () => {
  etapes.innerHTML = "";
  const recette = recetteActuelle(); 
  const etape = recette.etapes[etapeActuelle];
  const paragraphe = document.createElement("p");
  paragraphe.textContent = etape;
  etapes.appendChild(paragraphe);
};

// Par défaut, afficher les étapes de la première recette
recetteSelect.value = recettes[0].nom;
nomRecette.innerText = recetteSelectionnee;

mettreAJourNombreTotalEtapes();
mettreAJourNumeroEtapeActuelle();
afficherEtapes();
let userData = [];

const fetchUser = async () => {
  await fetch("./json/automobile.json")
    .then((res) => res.json())
    .then((data) => (userData = data.general));

  console.log(userData);

  //appele du fichier json isolation de la pormesse data dans userData
};

const userCard = async () => {
  await fetchUser();
  const card = document.querySelectorAll(".auto-card");

  for (i = 0; i < card.length; i++) {
    card[i].querySelector(".card-header").textContent =
      userData["catégorie-nom-slogan"].fr["catégorie"];

    card[i].querySelector(".card-title").textContent =
      userData["catégorie-nom-slogan"].fr.nom;

    card[i].querySelector(".card-text").textContent =
      userData["catégorie-nom-slogan"].fr.slogan;

    //methode pour aller chercher les info dans l'API
  }
};

//function pour le questionaire automobile débutant

let indicequestion = 0;
const suivant = document.getElementById("suivant");

const userModal = async () => {
  await userCard();

  let questQd = userData.quizz.fr["débutant"];
  let questQc = userData.quizz.fr["confirmé"];
  let questQe = userData.quizz.fr.expert;

  console.log(questQc);

  for (let i = 0; i < questQd.length; i++) {
    let anec = (document.getElementById("anecdote").textContent =
      questQd[(i, indicequestion)].anecdote);

    let quest = (document.getElementById("question").textContent =
      questQd[(i, indicequestion)].question);

    let f = (document.getElementById("f").textContent =
      questQd[(i, indicequestion)].propositions[3]);

    let b = (document.getElementById("b").textContent =
      questQd[(i, indicequestion)].propositions[1]);

    let s = (document.getElementById("s").textContent =
      questQd[(i, indicequestion)].propositions[2]);

    let pb = (document.getElementById("pb").textContent =
      questQd[(i, indicequestion)].propositions[0]);

    // function pour le questionaire confirmer

    let anec2 = (document.getElementById("anecdote2").textContent =
      questQc[(i, indicequestion)].anecdote);
  }
};

userModal();

suivant.addEventListener("click", () => {
  indicequestion++;
  userModal();
});

//  partie modal

const myModal = document.querySelector("#myModal");

myModal.addEventListener("show.bs.modal", (event) => {
  if (!data) {
    return event.preventDefault(); // stops modal from being shown
  }
});

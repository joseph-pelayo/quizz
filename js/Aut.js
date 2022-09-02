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
  }
};

userModal();

suivant.addEventListener("click", () => {
  indicequestion++;
  userModal();
});

// partie modal

let modalWrap = null;
const showModal = () => {
  anecdote, question;
  //do not create multiple modal boxes
  if (modalWrap !== null) {
    modalWrap.remove();
  }
  modalWrap = document.createElement("div");
  modalWrap.innerHTML = `
                
                <div class="modal fade"
                  id="staticBackdrop"
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabindex="-1"
                  aria-labelledby="staticBackdropLabel"
                  aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <button type="button"
                          class="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"></button>
                      </div>

                    

                      <div class="modal-body">
                        <h4 class="anec"
                          id="anecdote">${userData}</h4>
                        <p class="quest"
                          id="question">${question}</p>

                        <div class="containerl">

                          <ul class="propo">
                            <li id="f"></li>
                            <li id="b"></li>
                          </ul>

                          <ul class="propo">
                            <li id="s"></li>
                            <li id="pb"></li>
                          </ul>

                        </div>

                      </div>
                      <div class="modal-footer">
                        <button type="button"
                          class="btn btn-primary">Valider</button>
                        <button type="button"
                          class="btn btn-primary"
                          id="suivant">Suivant</button>
                      </div>
                    </div>
                  </div>
                </div>

`;

  document.body.append(modalWrap);
  let modal = new bootstrap.Modal(modalWrap.querySelector(".modal")); //provided by bootstrap 5
  modal.show();
};

// <!-- Button trigger modal -->
//                 <button type="button"
//                   class="btn btn-primary"
//                   data-bs-toggle="modal"
//                   data-bs-target="#staticBackdrop">
//                   Commencer le quizz
//                 </button>

//                 <!-- Modal -->
//                 <div class="modal fade"
//                   id="staticBackdrop"
//                   data-bs-backdrop="static"
//                   data-bs-keyboard="false"
//                   tabindex="-1"
//                   aria-labelledby="staticBackdropLabel"
//                   aria-hidden="true">
//                   <div class="modal-dialog">
//                     <div class="modal-content">
//                       <div class="modal-header">
//                         <button type="button"
//                           class="btn-close"
//                           data-bs-dismiss="modal"
//                           aria-label="Close"></button>
//                       </div>
//                       <div class="modal-body">
//                         <h4 class="anec"
//                           id="anecdote"></h4>
//                         <p class="quest"
//                           id="question"></p>

//                         <div class="containerl">

//                           <ul class="propo">
//                             <li id="f"></li>
//                             <li id="b"></li>
//                           </ul>

//                           <ul class="propo">
//                             <li id="s"></li>
//                             <li id="pb"></li>
//                           </ul>

//                         </div>

//                       </div>
//                       <div class="modal-footer">
//                         <button type="button"
//                           class="btn btn-primary">Valider</button>
//                         <button type="button"
//                           class="btn btn-primary"
//                           id="suivant">Suivant</button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

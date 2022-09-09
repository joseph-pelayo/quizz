
// Call the function when the whole DOM content is loaded
// document.addEventListener('DOMContentLoaded', () => {


    /* ========================================================================== */
    /* ================================ MAIN ==================================== */
    /* ========================================================================== */

    // Declaring global variables
    const jsonFilename = ["marvel","automobile","fourmis","histoire-de-france"];
    const jsonSourcePath = "./json/"
    let htmlCardContent = "";
    let modalHtmlPopup = "";


    // Selecting all required HTML elements
    // const popupQuizz = document.getElementById('modal-popup');



    // Retrieving data for each JSON file specified in the array
    jsonFilename.map((jsonFilename) => {

        url = jsonSourcePath + jsonFilename + '.json';
        data = getData(url);
        generateCard(data, jsonFilename);

    });





    /* ========================================================================== */
    /* ================================ FUNCTIONS =============================== */
    /* ========================================================================== */


    // Fetching a json ressource from the server 
    async function getData(pathRessource) {

        // Code to be tested for errors while it's being executed
        try {

            // Fetch GET request with error handling
            const response = await fetch(pathRessource);

            if (!response.ok) {

                // The handler throws a custor error (exception) if the request did not succeed.
                throw new Error('HTTP error ' + response.status + ': Sorry! The ressource ' + response.url + ' could not be found on the server !')

            }

            // File is correctly found (Server status == 200)
            // and store data in form of JSON
            return await response.json();

        // Catch any errors that might occur in the try block and execute the following code
        } catch (err) {

            console.error(err.message);

        }

    }


    // Generate cards and fill data from JSON file for each card
    function generateCard(data, fileSource) {

        data.then(dataCard => {

            let cardInfo = dataCard['catégorie-nom-slogan'].fr
            let levelQuizz = dataCard.quizz.fr;

            // For each quizz level, create a new card
            // and add data attributes per card
            Object.keys(levelQuizz).forEach(level => {

                htmlCardContent += `
                    <li class="card" data-card-image="${levelQuizz[level].image.filename}" data-card-source=${fileSource} data-card-level=${level} data-card-volume=${levelQuizz[level].questionnaire.length}>
                        <div class="card-img">
                            <img src="${levelQuizz[level].image.source}" class="img-fluid" alt="${levelQuizz[level].image.alternative}">
                        </div>
                        <div class="card-header text-center">
                            <p class="outflow">${cardInfo.domaine}</p>
                            <p>${cardInfo.catégorie}</p>
                        </div>
                        <div class="card-body">
                            <h5 class="card-title text-center">${cardInfo.nom}</h5>
                            <p class="card-text text-center">${cardInfo.slogan}</p>
                        </div>
                        <div class="card-footer d-flex justify-content-between">
                            <p class="card-volume">${levelQuizz[level].questionnaire.length} questions</p>
                            <p class="card-level">Niveau ${level}</p>
                        </div>
                    </li>
                    `; 

            });

            document.getElementById('quizz-content').innerHTML= htmlCardContent;

            defineClickListenerOnCard();
            
        });

    }


    // Define an Event Listener for each card
    function defineClickListenerOnCard() {

        const quizzCards = document.querySelectorAll('.card');

        // When the user clicks on a card, open the modal popup
        // and set the card as selected with a new class
        quizzCards.forEach(card => {

            card.addEventListener('click', () => {

                // create modal window after get data from the selected card's data attributes
                createPopup(card.dataset.cardSource, card.dataset.cardLevel, card.dataset.cardVolume, card.dataset.cardImage);
                
            });

        });

    }


    // Create a popup window and load data from JSON file and data attributes
    function createPopup(sourceData, levelQuestion, volumeQuestion, nomImage) {

        const pathSourceFile = jsonSourcePath + sourceData + '.json';

        getData(pathSourceFile).then(dataPopup => {

            const popupInfo = dataPopup['catégorie-nom-slogan'].fr;
            const cardList = document.getElementById('cards-list');

            if ((document.getElementById('modal-popup') !== null) && (document.getElementById('backdrop') !== null)) {
    
                cardList.removeChild(document.getElementById('modal-popup'));
                cardList.removeChild(document.getElementById('backdrop'));
    
            }
    
            modalHtmlPopup = `
            <div id="modal-popup" class="modal fade" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-modal="true" data-json-source="${sourceData}" data-level-quizz="${levelQuestion}">
                <div class="modal-dialog modal-lg modal-dialog-centered">
                    <div class="modal-content" style="background-image: url('../img/${nomImage}.jpg');">
    
                        <!-- Modal Header -->
                        <div class="modal-header text-white">
                            <div class="modal-domain d-flex align-items-center">
                                <i class="fa-solid fa-circle-question"></i>
                                <span>${popupInfo.domaine}</span>
                            </div>
                            <div class="modal-logo">
                                <img class="img-fluid" src="./img/logo-kwiz974.png" alt="Logo popup">
                            </div>
                            <p class="text-center outflow">${popupInfo.catégorie}</p>
                            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"</button>
                        </div>
    
                        <!-- Modal Body -->
                        <div class="modal-body text-center">
                            <p>${popupInfo.nom}</p>
                            <div id="body-quizz" class="body-quizz">
                                <div id="quizz-zone" class="quizz-zone position-relative">
                                    <form>
                                        <fieldset>
                                            <legend class="question-index">Question 1 / 10</legend>
                                            <p class="quizz-question p-2">Dans quelles aventures retrouve-t-on les personnages de Loïs et Clark ?</p>
                                            <ul class="quizz-choice-list input-group justify-content-around mb-4">
                                                <li class="form-check">
                                                    <input class="quizz-check-input form-check-input" type="radio" name="quizz-response" id="quizz-response-1" value="">
                                                    <label class="quizz-check-label form-check-label text-start d-flex align-items-center" for="quizz-response-1"><span class="icon-answer"><i class="fa-solid fa-a"></i></span><p class="quizz-answer"></p></label>
                                                </li>
                                                <li class="form-check">
                                                    <input class="quizz-check-input form-check-input" type="radio" name="quizz-response" id="quizz-response-2" value="">
                                                    <label class="quizz-check-label form-check-label text-start d-flex align-items-center" for="quizz-response-2"><span class="icon-answer"><i class="fa-solid fa-b"></i></span><p class="quizz-answer"></p></label>
                                                </li>
                                                <li class="form-check">
                                                    <input class="quizz-check-input form-check-input" type="radio" name="quizz-response" id="quizz-response-3" value="">
                                                    <label class="quizz-check-label form-check-label text-start d-flex align-items-center" for="quizz-response-3"><span class="icon-answer"><i class="fa-solid fa-c"></i></span><p class="quizz-answer"></p></label>
                                                </li>
                                                <li class="form-check">
                                                    <input class="quizz-check-input form-check-input" type="radio" name="quizz-response" id="quizz-response-4" value="">
                                                    <label class="quizz-check-label form-check-label text-start d-flex align-items-center" for="quizz-response-4"><span class="icon-answer"><i class="fa-solid fa-d"></i></span><p class="quizz-answer"></p></label>
                                                </li>
                                            </ul>
                                        </fieldset>
                                    </form>
                                </div>
                            </div>
                            <div class="quizz-buttons">
                                <button type="button" id="validate-btn" class="btn btn-outline-info btn-lg quizz-btn">Valider</button>
                                <button type="button" id="nextquestion-btn" class="btn btn-outline-info btn-lg quizz-btn">Suivant</button>
                            </div>
                            <button type="button" id="launch-btn" class="btn btn-secondary btn-sm" title="It's time to play !">Lançer le quizz</button>
                        </div>
    
                        <!-- Modal Footer -->
                        <div class="modal-footer justify-content-between text-center">
                            <div class="bar left-bar position-relative">
                                <p>${volumeQuestion} questions</p>
                            </div>
                            <div class="bar right-bar position-relative">
                                <p>Niveau ${levelQuestion}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-backdrop fade show" id="backdrop" style="display: none;"></div>
            `;
    
            cardList.insertAdjacentHTML('beforeend', modalHtmlPopup);

            displayPopup();

        })
  
    }

    // Show the popup windows
    function displayPopup() {

        // Provided by Bootstrap documentation
        const modalWindow = new bootstrap.Modal(document.getElementById('modal-popup'), {
            keyboard: true,
            focus: true,
            backdrop: 'static'
        });

        modalWindow.show();

        const popupQuizz = document.getElementById('modal-popup');
        const quizzLauncher = popupQuizz.querySelector('#launch-btn');

        // Controls if the modal has been made visible to the user and complete CSS transitions
        popupQuizz.addEventListener('shown.bs.modal', event => {
                
            popupQuizz.querySelectorAll('.bar').forEach(bar => {

                toggleClass(bar, 'enabled');

            });

            toggleClass(quizzLauncher, 'enabled');
            
        });

        quizzLauncher.addEventListener('click', () => {

            let questionCounter = 0;
   
            // Enable the quizz zone
            toggleClass(popupQuizz.querySelector('#quizz-zone'), 'active');
    
            // Disable information bars in the footer
            popupQuizz.querySelectorAll('.bar').forEach(bar => {
    
                toggleClass(bar, 'enabled');
    
            });
            
            // Disable the launcher button
            toggleClass(quizzLauncher, 'enabled');
    
            // Enable the user validation button
            toggleClass(popupQuizz.querySelector('#validate-btn'), 'visible');
            popupQuizz.querySelector('#validate-btn').style.transition = "2s opacity ease-in-out 3s"
            document.querySelector('#validate-btn').style.zIndex = "999"

                        // Populating the quizz with the first question and possible options
                        showQuestion(questionCounter);
            
        })

    }


    // Enables / Disables a HTML class
    function toggleClass(elementQuizz, strClass) {

        elementQuizz.classList.toggle(strClass);

    }


    // Display question and options for the quizz
    function showQuestion(indexQuestion) {


        getData(`${jsonSourcePath}${document.getElementById('modal-popup').dataset.jsonSource}.json`)
            .then(dataQA => {

            const listQuestions = dataQA.quizz.fr[`${document.getElementById('modal-popup').dataset.levelQuizz}`].questionnaire;
            const quizzInputRadios = document.querySelectorAll('.quizz-check-input');
            const quizzLabelPropositions = document.querySelectorAll('.quizz-check-label .quizz-answer');
            let currentQuestion;


            // if (isEnded(indexQuestion, listQuestions.length)) {

            //     showScores();
    
            // } else {

            // while (isEnded(indexQuestion, listQuestions.length) == false)
            while (indexQuestion <= listQuestions.length) {

                const listPropositions = listQuestions[indexQuestion].propositions;
                const quizzResponse = listQuestions[indexQuestion].réponse;
                const quizzAnecdote = listQuestions[indexQuestion].anecdote;

                console.log(`Question : ${indexQuestion}`);

                // Show index
                currentQuestion = indexQuestion + 1;
                document.querySelector('.question-index').textContent = `Question ${currentQuestion} / ${listQuestions.length}`;
    
                // Show question
                document.querySelector('.quizz-question').textContent = `${listQuestions[indexQuestion].question}`;

                // Show options
                listPropositions.map((item, index) => {

                    quizzInputRadios[index].value = item;
                    quizzLabelPropositions[index].textContent = item;
    
                });


                document.getElementById('validate-btn').addEventListener('click', () => {

                    const checkedRadioInput = document.querySelector('input[name="quizz-response"]:checked');
                    const checkedLabelInput = document.querySelector('input[name="quizz-response"]:checked + label');
                    
                    // Display the anecdote 

                    // Manage buttons and anecdote with a setimeout
                    // Disable the user validation button
                    toggleClass(document.querySelector('#validate-btn'), 'visible');
                    document.querySelector('#validate-btn').style.transition = "1s opacity linear"
                    document.querySelector('#validate-btn').style.zIndex = "998"


                    // Enable the next question button
                    toggleClass(document.querySelector('#nextquestion-btn'), 'visible');
                    document.querySelector('#nextquestion-btn').style.transition = "1s opacity linear"
                    document.querySelector('#nextquestion-btn').style.zIndex = "999"

                    // Control the answer of the user
                    // if (isCorrectAnswer(checkedRadioInput.value, quizzResponse)) {

                    //     checkedLabelInput.style.backgroundColor = 'green';

                    //     alert("Bonne réponse");

                    // } else {

                    //     checkedLabelInput.style.backgroundColor = 'red';
                    //     alert("Mauvaise réponse");
                    // }

                });

                document.getElementById('nextquestion-btn').addEventListener('click', () => {


                    alert('Je passe à la question suivante');
                    indexQuestion++;

                })

                // setTimeout(() => {

                    

                // }, "4000");

                
                

            }   
   
        })

    };


    // Test the end of the quizz
    function isEnded(indexArray, lengthArray) {

        let endQuizz = indexArray === lengthArray ? true : false;
        return endQuizz;

    }


    // Control the answer of the user
    function isCorrectAnswer(userResponse, quizzAnswer) {

        let correctAnswer = userResponse === quizzAnswer ? true : false;
        return correctAnswer;

    }


        // // Controls if the modal has finished being hidden from the user
        // // and complete CSS transitions
        // popupQuizz.addEventListener('hidden.bs.modal', event => {

        //     // enabling information bars in the footer
        //     popupQuizz.querySelectorAll('.bar').forEach(bar => {

        //         toggleClass(bar, 'enabled');

        //     });

        //     // toggleClass(popupQuizz.querySelector('#quizz-zone'), 'active');
            
        // });





    /* ========================================================================== */
    /* =========================== END FUNCTIONS ================================ */
    /* ========================================================================== */



// });

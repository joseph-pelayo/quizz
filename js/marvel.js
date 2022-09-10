
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
                                <div id="quizz-zone" class="quizz-slider position-relative">

                                </div>
                            </div>
                            <div class="quizz-buttons">
                                <button type="button" id="validate-btn" class="btn btn-lg btn-primary me-3 quizz-btn">Valider</button>
                                <button type="button" id="nextquestion-btn" class="btn btn-lg btn-primary quizz-btn">Suivant</button>
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

            // displayPopup();
            loadQuestions();

        })
  
    }


    // Generate quizz slides with available questions
    function loadQuestions() {

        const modalPopup = document.getElementById('modal-popup');
        const urlQuizz = `${jsonSourcePath}${modalPopup.dataset.jsonSource}.json`

        getData(urlQuizz).then(dataQuizz => {

            const quizzSlider = document.getElementById('quizz-zone');
            const availableQuestions = dataQuizz.quizz.fr[`${modalPopup.dataset.levelQuizz}`].questionnaire;

            let slideItem = "";

            availableQuestions.map((item, index) => {

                const availablePropositions = availableQuestions[index].propositions;
                let listPropositions = loadPropositions(availablePropositions, item.id);
                let legendIndex = index + 1;

                // Load one question and his index for each slide
                slideItem += `
                    <div class="quizz-slide">
                        <form>
                            <fieldset>
                                <legend class="question-index">Question ${legendIndex} / ${availableQuestions.length}</legend>
                                <p class="quizz-question p-4">${item.question}</p>
                                <ul id="quizz-propositions" class="quizz-choice-list input-group justify-content-around mb-4">${listPropositions}</ul>
                            </fieldset>
                        </form>
                    </div>`;
                
            });

            quizzSlider.innerHTML = slideItem;

            displayPopup();

        });

    };

    // Complete quizz slides with available propositions per question
    function loadPropositions(arrayPropositions, idQuestion) {

        let htmlQuizzPropositions ="";
        const iconAlphabet = ["a","b","c","d"];

        arrayPropositions.map((proposition, index) => {

            let numQuestion = index + 1;

            htmlQuizzPropositions += `
                <li class="form-check">
                    <input class="quizz-check-input form-check-input" type="radio" name="q${idQuestion}" id="q${idQuestion}-response${numQuestion}" value="${proposition}">
                    <label class="quizz-check-label form-check-label text-start d-flex align-items-center" for="q${idQuestion}-response${numQuestion}"><span class="icon-answer"><i class="fa-solid fa-${iconAlphabet[index]}"></i></span><p class="quizz-answer">${proposition}</p></label>
                </li>`;

        })

        return htmlQuizzPropositions;

    }


    // Show the popup windows
    function displayPopup() {

        let currentSlide = 0;

        // Provided by Bootstrap documentation
        const modalWindow = new bootstrap.Modal(document.getElementById('modal-popup'), {
            keyboard: true,
            focus: true,
            backdrop: 'static'
        });

        modalWindow.show();

        const popupQuizz = document.getElementById('modal-popup');
        const quizzLauncher = popupQuizz.querySelector('#launch-btn');
        const quizzButtons = popupQuizz.querySelectorAll('.quizz-btn');

        // Controls if the modal has been made visible to the user and complete CSS transitions
        popupQuizz.addEventListener('shown.bs.modal', event => {
                
            popupQuizz.querySelectorAll('.bar').forEach(bar => {

                toggleClass(bar, 'enabled');

            });

            toggleClass(quizzLauncher, 'enabled');
            
        });

        quizzLauncher.addEventListener('click', () => {
   
            // Enable the quizz slider
            toggleClass(popupQuizz.querySelector('#quizz-zone'), 'active');
    
            // Disable information bars in the footer
            popupQuizz.querySelectorAll('.bar').forEach(bar => {
    
                toggleClass(bar, 'enabled');
    
            });
            
            // Disable the launcher button
            toggleClass(quizzLauncher, 'enabled');

            // Activate the first slide
            toggleClass(document.querySelectorAll('.quizz-slide')[currentSlide], 'is_active');
    
            // Enable the user buttons
            quizzButtons.forEach(itmButton => {

                toggleClass(itmButton, 'visible');
                itmButton.style.transition = "2s opacity ease-in-out 3s";
            })

            // Disable the next question button
            toggleClass(document.getElementById('nextquestion-btn'), 'disabled');
            
        })

        document.getElementById('validate-btn').addEventListener('click', () => {

            const activeSlide = document.querySelector('.quizz-slide.is_active');
            const checkedRadioInputs = activeSlide.querySelectorAll('.quizz-check-input:checked');
            // const checkedLabelInput = document.querySelector('input[name="quizz-response"]:checked + label');

            console.log(isChecked(checkedRadioInputs))

            switch (isChecked(checkedRadioInputs)) {

                case false:

                    // display message
                    alert("Merci de sélectionner une réponse");
                    break;

                default:

                    // Display the anecdote

                    // Disable the user validation button
                    toggleClass(document.getElementById('validate-btn'), 'disabled');

                    // Enable the next question button
                    toggleClass(document.getElementById('nextquestion-btn'), 'disabled');

            }

        });

        document.getElementById('nextquestion-btn').addEventListener('click', () => {

            // Disable the current slide
            toggleClass(document.querySelectorAll('.quizz-slide')[currentSlide], 'is_active');

            currentSlide += 1;

            // Enable the next slide
            toggleClass(document.querySelectorAll('.quizz-slide')[currentSlide], 'is_active');

            // Enable the user validation button
            toggleClass(document.getElementById('validate-btn'), 'disabled');

            // Disable the next question button
            toggleClass(document.getElementById('nextquestion-btn'), 'disabled');

        })

    }


    // Enable / Disable a HTML class
    function toggleClass(elementQuizz, strClass) {

        elementQuizz.classList.toggle(strClass);

    }

    // Control if the user has selected a response
    function isChecked(listCheckedInputs) {

        let selectedInput = listCheckedInputs.length !== 0 ? true : false;
        return selectedInput;

    }

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

    // const quizzResponse = availableQuestions[indexQuestionnaire].réponse;
    // const quizzAnecdote = availableQuestions[indexQuestionnaire].anecdote;

    // if (isEnded(indexQuestion, availableQuestions.length)) {

    //     showScores();

    // } else {

    // while (isEnded(indexQuestion, availableQuestions.length) == false) {

    // }


    // Control the answer of the user
    // if (isCorrectAnswer(checkedRadioInput.value, quizzResponse)) {

    //     checkedLabelInput.style.backgroundColor = 'green';

    //     alert("Bonne réponse");

    // } else {

    //     checkedLabelInput.style.backgroundColor = 'red';
    //     alert("Mauvaise réponse");
    // }


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

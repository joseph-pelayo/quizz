

// Call the function when the whole DOM content is loaded
// document.addEventListener('DOMContentLoaded', () => {


    /* ========================================================================== */
    /* ================================ FUNCTIONS =============================== */
    /* ========================================================================== */



    // Populate the quizz
    function populateQuizz(dataQA) {

        console.log(dataQA);

    }


    // Enables / Disables a HTML class
    function toggleClass(elementQuizz, strClass) {

        elementQuizz.classList.toggle(strClass);

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

        // Controls if the modal has been made visible to the user and complete CSS transitions
        popupQuizz.addEventListener('shown.bs.modal', event => {
                
            popupQuizz.querySelectorAll('.bar').forEach(bar => {

                toggleClass(bar, 'enabled');

            });
            
        });

        popupQuizz.querySelector('#launch-btn').addEventListener('click', () => {

            // populating the quizz
            // populateQuizz(data);
    
            // enabling the quizz zone
            // toggleClass(popupQuizz.querySelector('#quizz-zone'), 'active');
    
            // disabling information bars in the footer
            popupQuizz.querySelectorAll('.bar').forEach(bar => {
    
                toggleClass(bar, 'enabled');
    
            });
    
            // disabling the launch button
            popupQuizz.querySelector('#launch-btn').style.display = 'none';
    
        })

        // Controls if the modal has finished being hidden from the user
        // and complete CSS transitions
        popupQuizz.addEventListener('hidden.bs.modal', event => {

            // enabling information bars in the footer
            popupQuizz.querySelectorAll('.bar').forEach(bar => {

                toggleClass(bar, 'enabled');

            });

            // toggleClass(popupQuizz.querySelector('#quizz-zone'), 'active');
            
        });

    }


    // Create a popup window and load data from JSON file and data attributes
    function createPopup(sourceData, levelQuestion, volumeQuestion) {

        const pathSourceFile = jsonSourcePath + sourceData + '.json';

        getData(pathSourceFile).then(dataPopup => {

            const popupInfo = dataPopup['catégorie-nom-slogan'].fr;

            if ((document.getElementById('modal-popup') !== null) && (document.getElementById('backdrop') !== null)) {

                const cardList = document.getElementById('cards-list');
    
                cardList.removeChild(document.getElementById('modal-popup'));
                cardList.removeChild(document.getElementById('backdrop'));
    
            }
    
            modalHtmlPopup = `
            <div id="modal-popup" class="modal fade" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-modal="true"">
                <div class="modal-dialog modal-lg modal-dialog-centered">
                    <div class="modal-content">
    
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
                            <div class="body-quizz">
                                <div id="quizz-zone" autocomplete="off" class="quizz-zone position-relative"></div>
                                <button type="button" id="validate-btn" class="btn btn-outline-info btn-lg">Valider</button>
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
    
            document.getElementById('cards-list').insertAdjacentHTML('beforeend', modalHtmlPopup);

            displayPopup();

        })
  
    }


    // Define an Event Listener for each card
    function defineClickListenerOnCard() {

        const quizzCards = document.querySelectorAll('.card');

        // When the user clicks on a card, open the modal popup
        // and set the card as selected with a new class
        quizzCards.forEach(card => {

            card.addEventListener('click', () => {

                // create modal window after get data from the selected card's data attributes
                createPopup(card.dataset.cardSource, card.dataset.cardLevel, card.dataset.cardVolume);
                
            });

        });

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
                    <li class="card" data-card-image="marvel-card-1" data-card-source=${fileSource} data-card-level=${level} data-card-volume=${levelQuizz[level].length}>
                        <div class="card-img">
                            <img src="./img/marvel-card-1.jpg" class="img-fluid" alt="Marvel heroes">
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
                            <p class="card-volume">${levelQuizz[level].length} questions</p>
                            <p class="card-level">Niveau ${level}</p>
                        </div>
                    </li>
                    `; 

            });

            document.getElementById('quizz-content').innerHTML= htmlCardContent;

            defineClickListenerOnCard();
            
        });

    }


    async function getData(pathFile) {

        // Fetch GET request with error handling
        const response = await fetch(pathFile);

        if (response.ok) {

            // File is correctly found (Server status == 200)
            // and store data in form of JSON
            const donneesJson = await response.json();
            return donneesJson;

        } else {

            // File not found : return a 404 error from the server
            console.error('Retour du serveur :', response.status)

        }

    }


    /* ========================================================================== */
    /* =========================== END FUNCTIONS ================================ */
    /* ========================================================================== */

    /* ========================================================================== */
    /* ================================ MAIN ==================================== */
    /* ========================================================================== */


    // Begin

    // Global variables
    const jsonFilename = ["marvel","automobile","fourmis","histoire-de-france"];
    const jsonSourcePath = "./json/"
    const imagePath = "../img/";
    const extensionImage = ".jpg";
    let htmlCardContent = "";
    let modalHtmlPopup = "";

    // Retrieve data for each JSON file specified in the url
    jsonFilename.map((jsonFilename) => {

        url = jsonSourcePath + jsonFilename + '.json';
        data = getData(url);
        generateCard(data, jsonFilename);
    });

    











// });

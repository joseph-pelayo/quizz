/* ========================================================================== */
/* ================================ FUNCTIONS =============================== */
/* ========================================================================== */

// Call the function when the whole DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {


    // Fill data from JSON file and add data attributes for each card
    function fillCard(data) {

        data.then(dataQuizz => {

            let j = 0;
            let levelQuizz = dataQuizz.quizz.fr;
        
            // Filter cards according to the theme contents
            switch (dataQuizz['catégorie-nom-slogan'].fr.nom) {
        
                case 'Héros Marvel':
                    quizzCards = document.querySelectorAll('.card.marvel-card');
                    break;
                case 'Automobile':
                    quizzCards = document.querySelectorAll('.card.automotive-card');
                    break;
                case 'Fourmis':
                    quizzCards = document.querySelectorAll('.card.ants-card');
                    break;
                default:
                    quizzCards = document.querySelectorAll('.card.history-card');
            }
        
            for (i=0; i < quizzCards.length; i++) {
        
                quizzCards[i].querySelector('.card-header').firstElementChild.textContent = dataQuizz['catégorie-nom-slogan'].fr['domaine'];
                quizzCards[i].setAttribute('data-card-domain', dataQuizz['catégorie-nom-slogan'].fr['domaine']);
                quizzCards[i].querySelector('.card-header').lastElementChild.textContent = dataQuizz['catégorie-nom-slogan'].fr['catégorie'];
                quizzCards[i].setAttribute('data-card-category', dataQuizz['catégorie-nom-slogan'].fr['catégorie']);
                quizzCards[i].querySelector('.card-title').textContent = dataQuizz['catégorie-nom-slogan'].fr.nom;
                quizzCards[i].setAttribute('data-card-name', dataQuizz['catégorie-nom-slogan'].fr.nom);
                quizzCards[i].querySelector('.card-text').textContent = dataQuizz['catégorie-nom-slogan'].fr.slogan;

            }
        
            // Fill data for the footer HTML elements in each card
            Object.keys(levelQuizz).forEach(level => {
        
                quizzCards[j].querySelector('.card-level').textContent = `Niveau ${level}`;
                quizzCards[j].querySelector('.card-volume').textContent = `${levelQuizz[level].length} questions`;
                quizzCards[j].setAttribute('data-card-level', level);
                quizzCards[j].setAttribute('data-card-volume', levelQuizz[level].length);
                j++;
                
            });

        })
        
    }

    // Load data in the popup from the selected card's data attributes
    function getDataAttributes(selectedCard) {

        const popup = document.getElementById('modal-popup');

        let urlImage = imagePath + selectedCard.dataset.cardImage + extensionImage;
        popup.querySelector('.modal-content').style.backgroundImage = `url(${urlImage})`;
        popup.querySelector('.modal-domain span').textContent = selectedCard.dataset.cardDomain;
        popup.querySelector('.modal-header p').textContent = selectedCard.dataset.cardCategory;
        popup.querySelector('.modal-body p').textContent = selectedCard.dataset.cardName;
        popup.querySelector('.left-bar p').textContent = `${selectedCard.dataset.cardVolume} questions`;
        popup.querySelector('.right-bar p').textContent = `Niveau ${selectedCard.dataset.cardLevel}`;

    }

    // Enables / Disables a HTML class
    function toggleClass(elementQuizz, strClass) {

        elementQuizz.classList.toggle(strClass);

    }

    function defineClickListenerOnCard() {

        const quizzCards = document.querySelectorAll('.card');

        // When the user clicks on a card, open the modal popup
        // and set the card as selected with a new class
        quizzCards.forEach(card => {

            card.addEventListener('click', () => {

                console.log("Clock OK")
                getDataAttributes(card);
                modalWindow.show();

                // Controls if the modal has been made visible to the user and complete CSS transitions
                popupQuizz.addEventListener('shown.bs.modal', event => {
                        
                    popupQuizz.querySelectorAll('.bar').forEach(bar => {

                        toggleClass(bar, 'enabled');

                    });
                    
                });
                
            });

        });

    }


    async function getData(pathFile) {

        // fetching a JSON file
        const response = await fetch(pathFile);

        if (response.ok) {

            // File is correctly found (Server status == 200)
            // and store data in form of JSON
            const json = await response.json();
            return json;

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
    let url = ["./json/marvel.json","./json/automobile.json","./json/fourmis.json","./json/histoire-de-france.json"];
    const imagePath = "../img/";
    const extensionImage = ".jpg";

    // Provided by Bootstrap documentation
    const modalWindow = new bootstrap.Modal(document.getElementById('modal-popup'), {
        keyboard: true,
        focus: true,
        backdrop: 'static'
    });

    // Popup
    const popupQuizz = document.getElementById('modal-popup');

    url.forEach(url => {

        data = getData(url);
        fillCard(data);

    })

    defineClickListenerOnCard();

    popupQuizz.querySelector('#launch-btn').addEventListener('click', () => {

        // enabling the quizz zone
        toggleClass(popupQuizz.querySelector('#quizz-zone'), 'active');

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


});






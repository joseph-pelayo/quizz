// Global variables
let url = ["./json/marvel.json","./json/automobile.json","./json/fourmis.json","./json/histoire-de-france.json"];


/* ========================================================================== */
/* ================================ FUNCTIONS =============================== */
/* ========================================================================== */


function fillCard(dataQuizz) {

    let quizzCards;
    let j = 0;
    let levelQuizz = dataQuizz.quizz.fr;

    // Filter cards according to the theme contents
    switch (dataQuizz['catégorie-nom-slogan'].fr.nom) {

        case 'Héros Marvel':
            quizzCards = document.querySelectorAll('.card.marvel-card');
            break;
        case 'Automobile':
            quizzCards = document.querySelectorAll('.automotive-card');
            break;
        case 'Fourmis':
            quizzCards = document.querySelectorAll('.ants-card');
            break;
        default:
            quizzCards = document.querySelectorAll('.history-card');
    }

    // Fill data for the header and body HTML elements in each card
    for (i=0; i < quizzCards.length; i++) {

        quizzCards[i].querySelector('.card-header').lastElementChild.textContent = dataQuizz['catégorie-nom-slogan'].fr['catégorie'];
        quizzCards[i].querySelector('.card-title').textContent = dataQuizz['catégorie-nom-slogan'].fr.nom;
        quizzCards[i].querySelector('.card-text').textContent = dataQuizz['catégorie-nom-slogan'].fr.slogan;
    }

    // Fill data for the footer HTML elements in each card
    Object.keys(levelQuizz).forEach(level => {

        quizzCards[j].querySelector('.card-level').textContent = `Niveau ${level}`;
        quizzCards[j].querySelector('.card-volume').textContent = `${levelQuizz[level].length} questions`;
        j++;
        
    });

}

// Function for managing the popup window
// Opacity status ==> 0 : Hidden / 1 : Visible
function displayPopup(modalWindow, displayMode, displayStatus) {

    document.getElementById('backdrop').style.display = displayMode;
    document.getElementById(modalWindow).style.display = displayMode;
    (displayStatus == 0) ? document.getElementById(modalWindow).style.opacity = 0 : document.getElementById(modalWindow).style.opacity = 1;

}


function defineClickListenerOnCard() {

    const quizzCards = document.querySelectorAll('.card');

    // When the user clicks on a card, open the modal popup
    quizzCards.forEach(card => {

        card.addEventListener('click', () => {

            displayPopup('popup-quizz', 'block', 1 );

        });

    });

}


function main(dataQuizz) {
    
    defineClickListenerOnCard();

    fillCard(dataQuizz);

}


async function getData(pathFile) {

    // fetching a JSON file
    const response = await fetch(pathFile);

    if (response.ok) {

        // File is correctly found (Server status == 200)
        const data = await response.json();
        main(data);

    } else {

        // File not found : return a 404 error from the server
        console.error('Retour du serveur :', response.status)

    }
}

/* ========================================================================== */
/* =========================== END FUNCTIONS ================================ */
/* ========================================================================== */

// Begin
url.forEach(url => {
    getData(url)
})






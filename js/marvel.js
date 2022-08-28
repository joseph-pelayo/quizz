// Global variables
let url = ["./json/marvel.json","./json/automobile.json","./json/fourmis.json","./json/histoire-de-france.json"];

const imagePath = "../img/";
const extensionImage = ".jpg";


/* ========================================================================== */
/* ================================ FUNCTIONS =============================== */
/* ========================================================================== */

// Fill data from JSON file and add data attributes for each card
function fillCard(dataQuizz) {

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

}

function removeClass(strClass) {

    const quizzCards = document.querySelectorAll('.card');

    quizzCards.forEach(card => {

        card.classList.remove(strClass);

    })
}





// Function for managing the popup window
// Opacity status ==> 0 : Hidden / 1 : Visible
function displayPopup(modalWindow, displayMode, displayStatus) {

    document.getElementById('backdrop').style.display = displayMode;
    document.getElementById(modalWindow).style.display = displayMode;
    if( displayStatus) {
        document.getElementById(modalWindow).style.opacity = 1;
    } else {
        document.getElementById(modalWindow).style.opacity = 0;
        // document.querySelector('.card.selected').classList.toggle('selected');
        removeClass('selected');
    }

}

function getDataAttributes(selectedCard) {

    const popup = document.getElementById('popup-quizz');

    let urlImage = imagePath + selectedCard.dataset.cardImage + extensionImage;
    popup.querySelector('.modal-content').style.backgroundImage = `url(${urlImage})`;
    popup.querySelector('.modal-domain span').textContent = selectedCard.dataset.cardDomain;
    popup.querySelector('.modal-header p').textContent = selectedCard.dataset.cardCategory;
    popup.querySelector('.modal-body p').textContent = selectedCard.dataset.cardName;
    popup.querySelector('.left-bar p').textContent = `${selectedCard.dataset.cardVolume} questions`;
    popup.querySelector('.right-bar p').textContent = `Niveau ${selectedCard.dataset.cardLevel}`;

}

function defineClickListenerOnCard() {

    const quizzCards = document.querySelectorAll('.card');

    // When the user clicks on a card, open the modal popup
    // and set the card as selected with a new class
    quizzCards.forEach(card => {

        card.addEventListener('click', () => {

            // card.classList.toggle("selected");
            card.classList.add('selected');
            getDataAttributes(card);
            displayPopup('popup-quizz', 'block', true );

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
// Call the function when the whole DOM content is loaded
document.addEventListener("DOMContentLoaded", () => {

    url.forEach(url => {
        getData(url)
    })
    
});

// Call the function when the whole DOM content is loaded
// document.addEventListener("DOMContentLoaded", () => {

//     getData(url[0]);

// });





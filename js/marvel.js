// Global variables
let url ="./json/marvel.json";

const getData = async function (pathFile) {
    // Fetching a JSON file
    let response = await fetch(pathFile);
    // File is correctly found (Server status 200)
    if (response.ok) {
        let data = await response.json();
        callTreatment(data);
    } else {
        // File not found : return a 404 error from the server
        console.error('Retour du serveur :', response.status)
    }
}

// Function for managing the popup window
// Opacity status ==> 0 : Hidden / 1 : Visible
function managePopup(modalWindow, displayMode, displayStatus) {

    document.getElementById('backdrop').style.display = displayMode;
    document.getElementById(modalWindow).style.display = displayMode;
    (displayStatus == 0) ? document.getElementById(modalWindow).style.opacity = 0 : document.getElementById(modalWindow).style.opacity = 1;

}

function initModalPopup() {

    const quizzCards = document.querySelectorAll('.card');

    // When the user clicks on a card, open the modal popup
    quizzCards.forEach(card => {

        card.addEventListener('click', () => {

            card.classList.add('selected');
            managePopup('popup-quizz', 'block', 1 );

        });

    });

}
// Fill data for the header and body HTML elements in each card
function fillCard_HB (dataHBCard, listeCards) {

    for (i=0; i < listeCards.length; i++) {

        listeCards[i].querySelector('.card-header').lastElementChild.textContent=dataHBCard['catégorie-nom-slogan'].fr['catégorie'];
        listeCards[i].querySelector('.card-title').textContent=dataHBCard['catégorie-nom-slogan'].fr.nom;
        listeCards[i].querySelector('.card-text').textContent=dataHBCard['catégorie-nom-slogan'].fr.slogan;
    }

}

// Fill data for the footer HTML elements in each card
function fillCard_F (dataCardFooter, listeCards) {

    let j=0;

    Object.keys(dataCardFooter.quizz.fr).forEach(level => {
        listeCards[j].querySelector('.card-level').textContent='Niveau ' + level;
        listeCards[j].querySelector('.card-volume').textContent=(Object.keys((dataCardFooter.quizz.fr)[level]).length) + ' questions';
        j++;
    });

}

// General operations
function callTreatment(dataCard) {

    // Declare some local variables
    const lstCards = document.querySelectorAll('.marvel-card');

    initModalPopup();
    fillCard_HB(dataCard, lstCards);
    fillCard_F(dataCard, lstCards);

}

// Get data from JSON file;
getData(url);




// Adresse du fichier de données json
let url ="./json/marvel.json";

const getData = async function (pathFile) {
    // Fetching a JSON file
    let response = await fetch(pathFile);
    // File is correctly found (Server status 200)
    if (response.ok) {
        let data = await response.json();
        fillCard(data);
    } else {
        // File not found : return a 404 error from the server
        console.error('Retour du serveur :', response.status)
    }
}

function fillCard(dataCard) {

    const marvelCards = document.querySelectorAll('.marvel-card');

    for (i=0; i < marvelCards.length; i++) {
        const nbreQuestions = marvelCards[i].querySelector('.card-body p');
        const levelCard = marvelCards[i].querySelector('.card-link');
        marvelCards[i].querySelector('.card-header').lastElementChild.textContent=dataCard['catégorie-nom-slogan'].fr['catégorie'];
        marvelCards[i].querySelector('.card-title').textContent=dataCard['catégorie-nom-slogan'].fr.nom;
        marvelCards[i].querySelector('.card-text').textContent=dataCard['catégorie-nom-slogan'].fr.slogan;
    }

    console.log(dataCard.quizz.fr)

}



// Get data from JSON file;
getData(url);



// const marvelCards = document.querySelectorAll('.marvel-card');

// for (i=0; i < marvelCards.length; i++) {
    // marvelCards[i].querySelector('.card-header').lastElementChild.textContent=myData;
// }

// for (i=0; i < marvelCards.length; i++) {
//     const nbreQuestions = marvelCards[i].querySelector('.card-body p');
//     // const levelCard = marvelCards[i].querySelector('.card-link');
//     marvelCards[i].querySelector('.card-header').lastElementChild.textContent=data['catégorie-nom-slogan'].fr['catégorie'];
//     marvelCards[i].querySelector('.card-title').textContent=data['catégorie-nom-slogan'].fr.nom;
//     marvelCards[i].querySelector('.card-text').textContent=data['catégorie-nom-slogan'].fr.slogan;
// }


// // Déclaration d'un objet associé à la méthode fetch
// fetch(url)
//     .then(response => response.json()
//     .then(data => {
//         // console.log(data.quizz.fr);

        // const marvelCards = document.querySelectorAll('.marvel-card');

        // for (i=0; i < marvelCards.length; i++) {
        //     const nbreQuestions = marvelCards[i].querySelector('.card-body p');
        //     const levelCard = marvelCards[i].querySelector('.card-link');
        //     marvelCards[i].querySelector('.card-header').lastElementChild.textContent=data['catégorie-nom-slogan'].fr['catégorie'];
        //     marvelCards[i].querySelector('.card-title').textContent=data['catégorie-nom-slogan'].fr.nom;
        //     marvelCards[i].querySelector('.card-text').textContent=data['catégorie-nom-slogan'].fr.slogan;
        // }



    // console.log(data.quizz.fr['débutant'].length)

    // for (let levelCard in data.quizz.fr) {
    //     console.log(levelCard);
    //     // console.log(niveau.length);
    // }









// Adresse du fichier de données json
let url = "https://pierre-delaunay.fr/marvel.json";

async function getData() {
  // Déclaration d'un objet associé à la méthode fetch
  let response = await fetch(url);

  // Teste la réponse du serveur
  if (response.status === 200) {
    let data = await response.json();

    // console.log(data);
    // console.log(data.difficulté);
    // console.log(data.)

    console.log(data.quizz.fr.débutant[1].question);
  }
}

getData();

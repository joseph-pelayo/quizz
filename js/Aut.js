const title = document.querySelector(".auto");
const title1 = document.querySelector(".auto1");
const title2 = document.querySelector(".auto2");
const chaine = "sa me soule";

console.log(title);

fetch("./json/automobile.json")
  .then((res) => res.json())
  .then((data) => {
    title.textContent = data["catégorie-nom-slogan"].fr.catégorie;
    title1.textContent = data["catégorie-nom-slogan"].fr.catégorie;
    title2.textContent = data["catégorie-nom-slogan"].fr.catégorie;
  });

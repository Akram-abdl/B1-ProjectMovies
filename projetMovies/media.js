function traiterFilm(film) {
  if (film.title != undefined) {
    id("titre").innerHTML = "<h2>" + film.title + "</h2>" + "<hr>";
  } else {
    id("titre").innerText = film.original_name;
  }


  if (film.overview != undefined) {
    id("infos").innerText = film.overview
  }
}

function traiterSerie(serie) {
  id("titre").innerText = serie.name;
}

function transfer(resultat) {


  var genre = resultat.genres

  var creatediv = document.createElement("div");
  creatediv.id = "creatediv";
  id("infos").appendChild(creatediv);


  var img = document.createElement("img");
  img.id = "img";

  if (resultat.backdrop_path != undefined) {
    img.src = "https://image.tmdb.org/t/p/w780" + resultat.backdrop_path;
  }

  creatediv.appendChild(img);

  var informations = document.createElement("span");
  informations.id = "more";
  informations.innerText = "\n Genre: "
  creatediv.appendChild(informations);

  // console.log(resultat.popularity)
  // console.log(resultat.vote_count)

  for (let i = 0; i < genre.length; i++) {
    console.log(genre[i].name);
    informations.innerText += " / " + genre[i].name;
  }

  if (resultat.vote_count != undefined) {
    informations.innerHTML += "<br>" + "Votes : " + resultat.vote_count;
  }

  if (resultat.vote_average != undefined) {
    informations.innerHTML += "<br>" + "Moyenne des votes : " + resultat.vote_average;
  }

}

function chargerMedia() {
  // Il faut récupérer cette info de l'URL, si l'id est celui d'une série, ça ne fonctionnera pas
  var mediaType = "movie";
  var id = recupererParametre();
  if (id.length == 0) {
    alert("Il y a un souci dans l'URL !");
  } else {
    var tmdbUrl =
      "https://api.themoviedb.org/3/" +
      mediaType +
      "/" +
      id +
      "?api_key=97719463bea4bd4b5902c1a735c0556a&language=fr-FR";
    axios
      .get(tmdbUrl)
      .then(result =>
        mediaType == "movie"
          ? traiterFilm(result.data)
          : traiterSerie(result.data)
      );
    axios
      .get(tmdbUrl)
      .then(result => transfer(result.data));
  }
}

function recupererParametre() {
  // Spoiler : en modifiant légèrement cette fonction, elle pourrait aussi servir à récupérer le type de média
  var keyValues = document.location.search.replace("?", "").split("&");
  for (let i = 0; i < keyValues.length; i++) {
    const keyValue = keyValues[i].split("=");
    if (keyValue[0] == "id") {
      return keyValue[1];
    }
  }
  return "";
}

function id(id) {
  return document.getElementById(id);
}

function urlDuPoster(resultat) {
  return "https://image.tmdb.org/t/p/w780" + resultat.poster_path;
}
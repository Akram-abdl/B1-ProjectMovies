function traiterResultats(resultats) {
  viderListe();
  // A faire : mettre en forme la liste de résultats
  if (resultats.total_results > 0) {
    for (let i = 0; i < resultats.total_results; i++) {
      if (types(resultats.results[i].media_type) == true) {
        if (resultats.results[i].poster_path != undefined && (resultats.results[i].title != undefined || resultats.results[i].original_name != undefined)) {
          id("nbResultats").innerText = "Il y a " + resultats.total_results + " résultats !";
          // Attention au champ "media_type", il faut filtrer sur "movie" ou "tv" !
          // Les lignes suivantes afficheront une image cassée si le premier résultat est de type "person"
          var img = document.createElement("img");
          img.className = "poster"
          img.src = urlDuPoster(resultats.results[i]);

          var lien = document.createElement("a");
          lien.href =
            "media.html?id=" +
            resultats.results[i].id +
            "&type=" +
            resultats.results[i].media_type;
          lien.appendChild(img);

          var title = resultats.results[i].title;
          var originalname = resultats.results[i].original_name
          var mediatype = resultats.results[i].media_type;
          var language = resultats.results[i].original_language
          var date = resultats.results[i].release_date

          var numero = document.createElement("div");
          numero.className = "card"
          numero.id = i

          id("glo").appendChild(numero);

          var div_title = document.createElement("div");
          div_title.id = "title" + i
          if (title != undefined) {
            div_title.innerHTML = "<h2>" + title + "</h2>"
          } else {
            div_title.innerHTML = "<h2>" + originalname + "</h2>"
          }
          id(i).appendChild(div_title);


          var div_mediatype = document.createElement("div");
          div_mediatype.id = "mediatype" + i
          div_mediatype.className = "div_media_type"
          div_mediatype.innerHTML = mediatype

          var div_language = document.createElement("div");
          div_language.id = "language" + i
          div_language.className = "div_language"
          div_language.innerHTML = "Langage: " + language

          var div_release_date = document.createElement("div");
          div_language.id = "date" + i
          div_language.className = "div_release_date"
          div_language.innerHTML = "Date de sortie: " + date



          var div_listeResultats = document.createElement("div");
          div_listeResultats.id = "listeResultats" + i
          div_listeResultats.className = "div_poster"
          div_listeResultats.appendChild(lien);
          div_listeResultats.appendChild(div_mediatype);
          div_listeResultats.appendChild(div_language);
          div_listeResultats.appendChild(div_release_date);
          id(i).appendChild(div_listeResultats);
          console.log(resultats.results[i])
        }
      }
    }
  } else {
    id("nbResultats").innerText = "Pas de résultat !";
  }
}


function rechercher() {

  var motsRecherches = id("motsRecherches").value;
  axios
    .get(
      "https://api.themoviedb.org/3/search/multi?api_key=97719463bea4bd4b5902c1a735c0556a&language=fr-FR&query=" +
      motsRecherches
    )
    .then(result => traiterResultats(result.data))
    .catch(error => alert(error.message));
}

function urlDuPoster(resultat) {
  return "https://image.tmdb.org/t/p/w780" + resultat.poster_path;
}

function viderListe() {
  var liste = id("glo");
  while (liste.hasChildNodes()) {
    liste.removeChild(liste.lastChild);
  }
}

function id(id) {
  return document.getElementById(id);
}

function types(resultat) {
  if (document.getElementById("type").options[document.getElementById("type").selectedIndex].value == resultat || document.getElementById("type").options[document.getElementById("type").selectedIndex].value == "two") {
    return true
  } else {
    return false
  }
}
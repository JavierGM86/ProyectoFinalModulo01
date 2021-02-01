
// axios.get('https://www.amiiboapi.com/api/amiibo/')
if (localStorage.getItem("amiiboFavs")) { //al entrar en la página de favoritos automáticamente mostramos lo que hay en favs
    amiiboFavs = localStorage.getItem("amiiboFavs");
    amiiboFavs = JSON.parse(amiiboFavs);//aquí parseamos nuestro localStorage para que se pueda recorrer
    for (let i = 0; i < amiiboFavs.length; i++) {
        axios.get('https://www.amiiboapi.com/api/amiibo/?tail=' + amiiboFavs[i])//hacemos una llamada de la API pero especificando que esta vez queremos mostrar la tail (código hexadecimal que tienen todas las figuras amiibo) junto al ID que hemos metido anteriormente en Favs.
            .then(function (response) {
                if (response.status !== 200) {
                    alert("¡Hay demasiados aldeanos en tu aldea!")
                } else {
                    console.log(response)//al recorrerlo volvemos a pintar todo lo que teníamos en la página principal, excepto el botón fav que ya no lo necesitamos.
                    document.querySelector(".amiiboCardContainer").innerHTML += `<div class="amiiboCardFav">
                                <ul class="amiiboInfoList">
                                <li class="amiiboInfoCharacterName">${response.data.amiibo[0].character}</li>
                                <li class="amiiboInfoGameSeries">${response.data.amiibo[0].gameSeries}</li>
                                
                                <li class="amiiboInfoRelease">${response.data.amiibo[0].release.eu}
                                <li class="amiiboInfoQuitarFav"><button class="tailIdRem" tailIdRem="${response.data.amiibo[0].tail}" onclick="play()"><i class="far fa-frown"></i></button></li>
                                </ul>
                                <div class="amiiboInfoPicture"><img height=300 src=${response.data.amiibo[0]["image"]}></div>
                                </div>`;
                }

                let tailIdCategory = document.querySelectorAll(".tailIdRem");//todos los elementos de tailId
                for (let i = 0; i < tailIdCategory.length; i++) { //recorremos el bucle en el que iremos metiendo la categoría tailId
                    tailIdCategory[i].addEventListener("click", function () {
                        let tailIdRem = this.getAttribute("tailIdRem")
                        if (localStorage.getItem("amiiboFavs")) {
                            amiiboFavs = localStorage.getItem("amiiboFavs");
                            amiiboFavs = JSON.parse(amiiboFavs);//parseamos el array
                            if (amiiboFavs.includes(tailIdRem)) {
                                amiiboFavs.splice([i], 1);
                                alert("Removed from favourites!")
                                amiiboFavs = JSON.stringify(amiiboFavs);//guardemos el valor tailId y avisamos al usuario que lo ha añadido a favoritos
                                localStorage.setItem("amiiboFavs", amiiboFavs);
                                location.reload(); 
                            }
                        }
                    })

                }
            })
        }}
        function play() {
            var audio = document.getElementById("audio");
            audio.play();
        }


let data;
let arrayCategories = [];
let arrayFav = [];
axios.get('https://www.amiiboapi.com/api/amiibo/')//hacemos una llamada a la api
    .then(function (response) {
        data = response.data.amiibo;
        let select = document.querySelector("#select"); //aquí hacemos que el select de la categoría muestre el valor que tiene data[i].amiiboSeries que recorremos más tarde en el for
        for (let i = 0; i < data.length; i++) {
            if (i == 0) {
                arrayCategories.push(data[i].amiiboSeries);//si el valor de i es 0 meterá el primero en el array
            }
            else {
                if (arrayCategories.find(element => element == data[i].amiiboSeries) == undefined) {//aquí comparamos si el valor que queremos mostrar en el array ya está para que no lo vuelva a meter
                    arrayCategories.push(data[i].amiiboSeries);//si no está en el array, lo metemos.
                }
            }
        }
        arrayCategories.sort(); // aquí lo ordenamos alfabéticamente
        for (let j = 0; j < arrayCategories.length; j++) {//en este bucle for recorremos el arrayCategories (donde se encuentran las series de videojuegos) para que se muestren en el select
            let option = document.createElement("option");
            option.value = arrayCategories[j];
            option.innerHTML = arrayCategories[j]
            select.appendChild(option);
        }
        select.addEventListener("change", function () {//al elegir la categoría que queremos, se activará la función inferior
            amiiboDataCall(this.value);
        })
    })
function play() {
    var audio = document.getElementById("audio");
    audio.play();
}
function amiiboDataCall(selectedAmiibo) {
    axios.get('https://www.amiiboapi.com/api/amiibo/?amiiboSeries=' + selectedAmiibo)//hacemos una llamada a la API concretando que busque en amiiboSeries la categoría (selectedAmiibo) que la usuaria haya elegido.
        .then(function (response) {
            if (response.status !== 200) {
                alert("¡Hay demasiados aldeanos en tu aldea!")
            } else {
                document.querySelector(".amiiboCardContainer").innerHTML = "";
                let categoryData = response.data.amiibo;
                console.log(categoryData)
                for (let i = 0; i < categoryData.length; i++) {//recorremos el bucle para que vaya pintando cada una de las categorías que queremos mostrar excepto una que guardaremos para los favs
                    document.querySelector(".amiiboCardContainer").innerHTML += `<div class="amiiboCard">
                                <ul class="amiiboInfoList">
                                <li class="amiiboInfoCharacterName">${categoryData[i].character}</li>
                                <li class="amiiboInfoGameSeries">${categoryData[i].gameSeries}</li>
                                <li class="amiiboInfoFavText"><button class="tailId" tailId="${categoryData[i].tail}" onclick="play()"><i class="far fa-grin-beam"></i></button></li> 
                                </ul>
                                <div class="amiiboInfoPicture"><img height=300 src=${categoryData[i]["image"]}></div>
                                </div>`;
                    //la categoría tailId se mostrará como un botón fav y usaremos su valor para poder crear la página de favoritos
                }
            }
            let tailIdCategory = document.querySelectorAll(".tailId");//todos los elementos de tailId
            for (let i = 0; i < tailIdCategory.length; i++) { //recorremos el bucle en el que iremos metiendo la categoría tailId
                tailIdCategory[i].addEventListener("click", function () {
                    let tailIdFav = this.getAttribute("tailId")
                    let amiiboFavs = [];
                    if (localStorage.getItem("amiiboFavs")) {
                        amiiboFavs = localStorage.getItem("amiiboFavs");
                        amiiboFavs = JSON.parse(amiiboFavs);//parseamos el array
                        if (amiiboFavs.includes(tailIdFav)) {
                            alert("This amiibo is in your Favourites!")
                        } else if (!amiiboFavs.includes(tailIdFav)) {
                            amiiboFavs.push(tailIdFav);
                            alert("Added to favourites!")
                        } else {
                            amiiboFavs = [tailIdFav];
                        }
                    }
                    amiiboFavs = JSON.stringify(amiiboFavs);//guardemos el valor tailId y avisamos al usuario que lo ha añadido a favoritos
                    localStorage.setItem("amiiboFavs", amiiboFavs);

                })
            }
        })
}








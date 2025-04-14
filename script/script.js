const url = "https://dataportal.livsmedelsverket.se/livsmedel/api/v1/livsmedel?offset=0&limit=2532&sprak=1";
let allMat = []
const mat = document.getElementById("mat");





fetch(url)
.then(function (response) {
    return response.json();
}).then(function (data) {
    allMat = data.livsmedel;
    console.log(allMat);
    SearchFood("");
    
}).catch(function(error){
    console.error("Fel vid hämtning av data: ", error)
})

function SearchFood(matSök) 
{
    const textSearch = matSök.toLowerCase();
    mat.innerHTML = "";
    const filterData = allMat.filter(function(food){
        return food.namn.toLowerCase().includes(textSearch);
    });

    filterData.map(function(food){
        let card = document.createElement("div");
        card.setAttribute("class", "card");

        let title = document.createElement("h3");
        title.innerHTML = food.namn;

        let button = document.createElement("button");
        button.innerHTML = "Lägg till";
        button.onclick = function () {
            addToNyMåltid(food)
        };

        card.appendChild(title)
        card.appendChild(button)
        mat.appendChild(card)
    });
}

function addToNyMåltid(food)
{
    let savedItems = JSON.parse(localStorage.getItem("redigeraMat")) || [];
    savedItems.push(food);
    localStorage.setItem("redigeraMat", JSON.stringify(savedItems));
    alert(`${food.namn} har lagts till i din lista!`)
}


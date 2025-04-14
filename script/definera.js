let redigeraMat = JSON.parse(localStorage.getItem("redigeraMat")) || [];
let redigera = document.getElementById("redigera");
let list = []
RedigeraDinMåltid();







function RedigeraDinMåltid()
{
    redigeraMat.map(function(food) {

        let card = document.createElement("div")
        card.setAttribute("class", "card")

        let title = document.createElement("h3")
        title.innerHTML = food.namn;

        let range = document.createElement("input")
        range.setAttribute("class", "slider")
        range.type = "range";
        range.min = "1";
        range.max = "500";
        range.value = "100";
        range.oninput = function() {
            PortionsStorlek(this.value);
        }


        card.appendChild(title)
        card.appendChild(range)
        redigera.appendChild(card)



    })
}
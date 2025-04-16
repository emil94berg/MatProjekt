let mål = document.getElementById("dinaMål")
let färdigaMåltider = JSON.parse(localStorage.getItem("färdigaMåltider")) || [];


mapMål()

function mapMål()
{

    console.log(färdigaMåltider)
    färdigaMåltider.map(function(meal){

        let card = document.createElement("div")
        card.setAttribute("class", "card2")

        let p = document.createElement("li")
        p.innerHTML = meal

        card.appendChild(p)
        mål.appendChild(card)

    })
}
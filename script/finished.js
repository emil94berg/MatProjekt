let färdig = document.getElementById("färdig")
let färdigMat = JSON.parse(localStorage.getItem("finishedMeal")) || [];



mapFärdig()



function mapFärdig() 
{
    const regex = /Protein|Fett|Kolhydrater|Salt/i;

    let filteredFood = färdigMat.filter(item => {
        return Array.isArray(item.Näring) && item.Näring.some(näringsämne => regex.test(näringsämne.namn))
    });

    let info = document.createElement("h1")
    info.innerHTML = "Färdig Måltid" 
    färdig.appendChild(info)


    filteredFood.map(function(food){

        let portionSize = (food.Storlek / 100)

        let card1 = document.createElement("div");
        card1.setAttribute("class", "card");

        let title = document.createElement("h3");
        title.innerHTML = food.Namn;

        let vikt = document.createElement("p")
        vikt.setAttribute("class", "vikt")
        vikt.innerHTML = "Vikt: " + food.Storlek + " g";

        let näringsLista = document.createElement("ul")
        food.Näring.forEach(n => {
            if (regex.test(n.namn)) {
                let li = document.createElement("li");
                li.innerHTML = `${n.namn}: ${Math.round(n.varde * portionSize)} ${n.enhet}`;
                näringsLista.appendChild(li);
                
            }
        })

        let button = document.createElement("button")
        button.onclick = function () {
            TaBortKomponent(food)
        }
        button.innerHTML = "Ta bort komponent"

        
        card1.appendChild(title)
        card1.appendChild(vikt)
        card1.appendChild(näringsLista)
        card1.appendChild(button)
        färdig.appendChild(card1)


    })
}

function TaBortKomponent(food)
{
    let index = färdigMat.findIndex(item => item.Namn === food.Namn)
    
    färdigMat.splice(index, 1)

    localStorage.setItem("finishedMeal", JSON.stringify(färdigMat));

    färdig.innerHTML = "";

    mapFärdig();
}
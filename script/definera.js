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
        

        let rangeValue = document.createElement("span")
        rangeValue.textContent = range.value + " " + "g/ml"
        rangeValue.style.marginLeft = "10px"

        range.addEventListener("input", () => {
            rangeValue.textContent = range.value + " " + "g/ml";
        });

        


        
        

        let button = document.createElement("button")
        button.onclick = function() {
            PortionsStorlek(range.value, food)
        }
        button.innerHTML = "Lägg till"

        let button1 = document.createElement("button")
        button1.onclick = function () {
            TaBortKomponent(food) 
        }
        button1.innerHTML = "Ta bort komponent"

        
        
        card.appendChild(title)
        card.appendChild(rangeValue)
        card.appendChild(range)
        card.appendChild(button)
        card.appendChild(button1)
        redigera.appendChild(card)
    })
}

async function PortionsStorlek(storlek, food)
{
    console.log(storlek, food)
    const newurl = `https://dataportal.livsmedelsverket.se/livsmedel/api/v1/livsmedel/${food.nummer}/naringsvarden?sprak=1`;
    try {
        const response = await fetch(newurl);
        if(!response.ok)
        {
            throw new Error("Kunde inte hämta data för detta nummer")
        }
        else 
        {
            const data = await response.json(); 
            let newFood = { Namn: food.namn, Storlek: storlek, Näring: data }
            let savedMeal = JSON.parse(localStorage.getItem("finishedMeal")) || [];
            savedMeal.push(newFood)
            localStorage.setItem("finishedMeal", JSON.stringify(savedMeal))
            console.log(savedMeal)
            window.alert("Matkomponent: " + newFood.Namn + " tillagt!")
        }
    } catch (error) 
    {
        console.log(error)
    }
    
}

function TaBortKomponent(food) 
{
    let index = redigeraMat.findIndex(item => item.namn === food.namn)
    
    redigeraMat.splice(index, 1)

    localStorage.setItem("redigeraMat", JSON.stringify(redigeraMat));

    redigera.innerHTML = "";

    RedigeraDinMåltid();
}
let färdig = document.getElementById("färdig")
let färdigMat = JSON.parse(localStorage.getItem("finishedMeal")) || [];
let addFood = document.getElementById("addFood")
const regex = /^(Protein|Fett, totalt|Kolhydrater, tillgängliga|Salt, NaCl)$/i;


// let test = JSON.parse(localStorage.getItem(`${food.namn}`)) || [];



mapFärdig()



function mapFärdig() 
{
    

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
                console.log("Nu är vi här!!!!!" + n.namn)
                
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

    let addButton = document.createElement("button")
    addButton.innerHTML = "Lägg till måltid"
    addButton.onclick = function () {
        addFärdigMåltid(färdigMat)
    }
    färdig.appendChild(addButton)
}

function TaBortKomponent(food)
{
    let index = färdigMat.findIndex(item => item.Namn === food.Namn)
    
    färdigMat.splice(index, 1)

    localStorage.setItem("finishedMeal", JSON.stringify(färdigMat));

    färdig.innerHTML = "";

    mapFärdig();
}

function addFärdigMåltid(food)
{
    let now = new Date();
    let timeString = now.toLocaleTimeString();
    let regexProtein = /^(Protein)$/i;
    let regexKolhydrater = /^(Kolhydrater, tillgängliga)$/i;
    let regexSalt = /^(Salt, NaCl)$/i;
    let regexFett = /^(Fett, totalt)$/i;
    let totalProtein = sumByRegex(food, regexProtein)
    let totalKolhydrater = sumByRegex(food, regexKolhydrater)
    let totalSalt = sumByRegex(food, regexSalt)
    let totalFett = sumByRegex(food, regexFett)
    
    // let proteinString = 0;
    

    let mealString = now + timeString + ": "

    food.map(function(mat){
        // let stor = mat.Storlek
        // mat.Näring.forEach(n => {
        //     if (regexProtein.test(n.namn)) {
        //         proteinString += (Math.round(n.varde * (stor/100)))
        //     }
        // })


        
        mealString += mat.Namn + " " + mat.Storlek + " g/ml. | "
    })
    mealString += " mängd protein: " + totalProtein + " | " + " mängd kolhydrater: " + totalKolhydrater + " | " + " mängd salt: " +
    totalSalt + " | " + " mängd fett: " + totalFett 
    console.log(mealString)
    

    
}

function sumByRegex(fooditem, regex)
{
    let tomtalsum = 0;
    

    fooditem.map(function(mat){
        let stor = mat.Storlek;
        mat.Näring.forEach(n => {
            if (regex.test(n.namn)) {
                tomtalsum += (Math.round(n.varde * (stor/100)))
            }
        })

    })

    

    return tomtalsum;

}
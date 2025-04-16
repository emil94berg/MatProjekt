let färdig = document.getElementById("färdig")
let färdigMat = JSON.parse(localStorage.getItem("finishedMeal")) || [];
let addFood = document.getElementById("addFood")
const regex = /^(Protein|Fett, totalt|Kolhydrater, tillgängliga|Salt, NaCl)$/i;
let färdigaMåltider = JSON.parse(localStorage.getItem("färdigaMåltider")) || [];


// let test = JSON.parse(localStorage.getItem(`${food.namn}`)) || [];



mapFärdig()
footer()
console.log(färdigaMåltider)



function mapFärdig() 
{
    

    let filteredFood = färdigMat.filter(item => {
        return Array.isArray(item.Näring) && item.Näring.some(näringsämne => regex.test(näringsämne.namn))
    });

    let info = document.createElement("h1")
    info.innerHTML = "Färdig Måltid: " 
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
        if(färdigMat.length === 0)
        {
            window.alert("Lägg till mat först!")
        }
        else
        {
            addFärdigMåltid(färdigMat)
        }
        
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
    let dateOnly = now.toDateString();
    let timeString = now.toLocaleTimeString([],{hour: '2-digit', minute: '2-digit'} );
    let regexProtein = /^(Protein)$/i;
    let regexKolhydrater = /^(Kolhydrater, tillgängliga)$/i;
    let regexSalt = /^(Salt, NaCl)$/i;
    let regexFett = /^(Fett, totalt)$/i;
    let totalProtein = sumByRegex(food, regexProtein)
    let totalKolhydrater = sumByRegex(food, regexKolhydrater)
    let totalSalt = sumByRegex(food, regexSalt)
    let totalFett = sumByRegex(food, regexFett)
    
    // let proteinString = 0;
    

    let mealString = dateOnly + ", " + timeString + ": "

    food.map(function(mat){

        mealString += mat.Namn + " " + mat.Storlek + " g/ml. | "

    })
    mealString += " mängd protein: " + totalProtein + " | " + " mängd kolhydrater: " + totalKolhydrater + " | " + " mängd salt: " +
    totalSalt + " | " + " mängd fett: " + totalFett 
    

    färdigaMåltider.push(mealString)
    localStorage.setItem("färdigaMåltider", JSON.stringify(färdigaMåltider))
    
    localStorage.removeItem("finishedMeal");
    localStorage.removeItem("redigeraMat");
    
    
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

function footer()
{
    let regexProtein = /^(Protein)$/i;
    let regexKolhydrater = /^(Kolhydrater, tillgängliga)$/i;
    let regexSalt = /^(Salt, NaCl)$/i;
    let regexFett = /^(Fett, totalt)$/i;
    let totalProtein = sumByRegex(färdigMat, regexProtein)
    let totalKolhydrater = sumByRegex(färdigMat, regexKolhydrater)
    let totalSalt = sumByRegex(färdigMat, regexSalt)
    let totalFett = sumByRegex(färdigMat, regexFett)

    let footerString = "Totalt protein : " + totalProtein + " | totalt kolhydrater : " + totalKolhydrater + " | totalt salt : " + totalSalt + " | totalt fett: " + totalFett

    let foten = document.getElementById("foten")
    let fotenInfo = document.createElement("p")
    fotenInfo.setAttribute("class", "fotenTot")
    fotenInfo.innerHTML = footerString

    foten.appendChild(fotenInfo)
}
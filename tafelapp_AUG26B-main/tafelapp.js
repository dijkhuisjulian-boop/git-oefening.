let tafelinputObj = document.getElementById("inputTafel");
let tafeloutputObj = document.getElementById("outputTafel");

function showTafel() {
    // De waarde uit een invoerveld is altijd tekst, dus eerst omzetten naar een getal
    let tafel = Number(tafelinputObj.value);

    // Niets of geen geldig getal ingevuld? Dan een melding in plaats van "1 x  = 0"
    if (tafelinputObj.value === "" || isNaN(tafel)) {
        tafeloutputObj.innerHTML = "Vul eerst een getal in.";
        return;
    }

    let output = "";
    let uitkomst = 0;
    for (let teller = 1; teller < 11; teller++) {
        uitkomst = teller * tafel;
        output += teller + " x " + tafel + " = " + uitkomst + "<br>";
    }
    tafeloutputObj.innerHTML = output;
}

// Ook op Enter drukken in het invoerveld toont de tafel
tafelinputObj.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        showTafel();
    }
});

// ===== Tafeltoets =====
let vraagObj = document.getElementById("vraagToets");
let toetsinputObj = document.getElementById("inputToets");
let feedbackObj = document.getElementById("feedbackToets");
let scoreObj = document.getElementById("scoreToets");
let kiesTafelObj = document.getElementById("kiesTafel");

let getal1 = 0;
let getal2 = 0;
let aantalGoed = 0;
let aantalVragen = 0;

// Maakt een som uit de gekozen tafel, bijvoorbeeld 3 x 7
function nieuweVraag() {
    getal1 = Math.floor(Math.random() * 10) + 1; // willekeurig 1 t/m 10
    getal2 = Number(kiesTafelObj.value);         // de tafel die je zelf kiest
    vraagObj.innerHTML = getal1 + " x " + getal2 + " = ?";
    toetsinputObj.value = "";
    toetsinputObj.focus();
}

function checkAntwoord() {
    if (toetsinputObj.value === "") {
        feedbackObj.innerHTML = "Vul eerst een antwoord in.";
        feedbackObj.className = "card-text mt-3";
        return;
    }

    let antwoord = Number(toetsinputObj.value);
    let goedeUitkomst = getal1 * getal2;
    aantalVragen++;

    if (antwoord === goedeUitkomst) {
        aantalGoed++;
        feedbackObj.innerHTML = "Goed zo! " + getal1 + " x " + getal2 + " = " + goedeUitkomst;
        feedbackObj.className = "card-text mt-3 text-success fw-bold";
    } else {
        feedbackObj.innerHTML = "Helaas, " + getal1 + " x " + getal2 + " = " + goedeUitkomst;
        feedbackObj.className = "card-text mt-3 text-danger fw-bold";
    }

    scoreObj.innerHTML = "Score: " + aantalGoed + " van " + aantalVragen + " goed";
    nieuweVraag();
}

// Op Enter drukken in het antwoordveld checkt ook het antwoord
toetsinputObj.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        checkAntwoord();
    }
});

// Eerste vraag klaarzetten als de pagina laadt
nieuweVraag();

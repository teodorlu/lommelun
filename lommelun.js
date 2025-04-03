const canvaset = document.querySelector("canvas")
const ctx = canvaset.getContext("2d")

//////////////////////////
// Sørg for høy oppløsning

// Get the DPR and size of the canvaset
const dpr = window.devicePixelRatio;
const rect = canvaset.getBoundingClientRect();

// Set the "actual" size of the canvaset
canvaset.width = rect.width * dpr;
canvaset.height = rect.height * dpr;

// Scale the context to ensure correct drawing operations
ctx.scale(dpr, dpr);

// Set the "drawn" size of the canvaset
canvaset.style.width = `${rect.width}px`;
canvaset.style.height = `${rect.height}px`;

////////////////////////
// Tegn!
const width = canvaset.width;
const height = canvaset.height;

const colors = ["green", "orange", "blue", "pink", "magenta"]

const randomElement = (array) => {
    const index = Math.floor(Math.random() * array.length);
    return array[index];
}

// treight med   n = 10 000 000
// raskt nok med n =  1 000 000

const ps = width * 0.006;

const konfettimaskin = () => {
    for (var i = 1; i < 100000; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        ctx.fillStyle = randomElement(colors);
        ctx.beginPath();
        ctx.arc(x, y, ps, 0, 2 * Math.PI);
        ctx.fill();
    }
}

const debugIt = (o) => {
    document.querySelector("#debug").innerHTML = JSON.stringify(o);
} 

const ønskGodMorgen = (event) => {
    const pos = {
        x: event.clientX, y: event.clientY,
        offsetX: event.offsetX, offsetY: event.offsetY
    };

    ctx.fillStyle = "white"
    ctx.font = "48px serif";
    debugIt([width/2, width, canvaset.width]);
    ctx.fillStyle= hentFargen()
    ctx.fillText("GOD MORGEN", pos.offsetX, pos.offsetY);
}

const hentFargen = () => {
    return document.querySelector("input[type='color']").value;
}

const tegnSirkel = (event) => {
    const pos = {
        x: event.clientX, y: event.clientY,
        offsetX: event.offsetX, offsetY: event.offsetY
    };
    document.querySelector("#debug").innerHTML = JSON.stringify(pos);
    ctx.fillStyle = hentFargen() || "black"

    ctx.beginPath();
    ctx.arc(pos.offsetX, pos.offsetY, ps, 0, 2 * Math.PI);
    ctx.fill();

}

canvaset.onmousedown = tegnSirkel;

document.querySelector("#konfetti").onclick = konfettimaskin

document.querySelector("#tegnSirkler").onclick = () => { canvaset.onmousedown = tegnSirkel}
document.querySelector("#godMorgen").onclick = () => { canvaset.onmousedown = ønskGodMorgen}

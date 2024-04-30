// References to HTML elements STARTS
const form = document.querySelector(".pure-form")
const nameField = document.querySelector("#nimi")
const messageField = document.querySelector("#viesti")
const funFactField = document.querySelector("#fun-fact")
// References to HTML elements ENDS

// Add event listeners STARTS
form.addEventListener("submit", POSTform)
// Add event listeners ENDS


function POSTform(e) {
    window.alert("Lomake lähetty, tsekkaa vieraskirja!")
}
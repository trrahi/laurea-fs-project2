// References to HTML elements STARTS
const form = document.querySelector(".pure-form")
const nameField = document.querySelector("#nimi")
const messageField = document.querySelector("#viesti")
const funFactField = document.querySelector("#fun-fact")
const guestbookContainer = document.querySelector(".guestbook-container")
// References to HTML elements ENDS

// Add event listeners STARTS
form.addEventListener("submit", POSTform)
// Add event listeners ENDS


// Constructor for form data objects STARTS
function formDataObject(name, message, funFact){
    this.name = name;
    this.message = message;
    this.funFact = funFact;
}


// Create object from from form values and send data to server to be saved to the guestbook. Response sends guestbook contents and success message, display guest book contents below the form
function POSTform(e) {
    e.preventDefault()
    
    const formData = new formDataObject(nameField.value, messageField.value, funFactField.value)
    const XHR = new XMLHttpRequest()
    XHR.open("POST", "/ajaxmessage", true);
    XHR.setRequestHeader('Content-Type', 'application/json');
    XHR.send(JSON.stringify(formData))
    XHR.onreadystatechange = () => {
        if (XHR.readyState === 4 && XHR.status === 200) {
            const response = JSON.parse(XHR.responseText)
            // console.log(response);
            // console.log(response[2][0]);
            // console.log("moi");
            // console.log(XHR.status);
            for (let i = 0; i < response[1]; i++) {
                console.log(i);
                const guestbookItem = document.createElement("div")
                guestbookItem.classList.add("guestbook-item")
                guestbookItem.textContent = `Nimi: ${response[2][i].name} | Viesti: ${response[2][i].message} | Hauska fakta itsestäsi: ${response[2][i].funFact}`
                guestbookContainer.insertAdjacentElement("beforeend", guestbookItem)
            }
            window.alert(response[0])
        }
    }
    XHR.onerror = () => {
        console.error("Pyyntö epäonnistui!")
    }
}

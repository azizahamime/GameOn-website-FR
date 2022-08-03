// DOM Elements
const body = document.querySelector("body");
const modalbg = document.querySelector(".bground");
let modalBtn = document.querySelectorAll(".modal-btn");
let formData = document.querySelectorAll(".formData");
// Get close modal icon 
const closeModal = document.getElementById("close-modal");
// Get the form
let form = document.querySelector("#modalForm");
// get required form fields
let fields = document.querySelectorAll("input[required], input[minlength], input[pattern],input[nam=location]:checked");
let radios = document.querySelectorAll ("input[type = 'radio'");//get radio inputs
let buttonRadio = document.querySelector("input[type='radio']");
let radioMessage = document.createElement("div");


// mobile navbar function
function editNav() {
  var x = document.getElementById("myTopnav");
  (x.className === "topnav") ? x.className += " responsive" : x.className = "topnav";
}

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  body.style.overflowY ="hidden";
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Close Modal event
closeModal.addEventListener("click", closeM);

// close modal function 
function closeM(){
  modalbg.style.display = "none";
  body.style.overflowY ="auto";
}

//add event listener for a require fields
fields.forEach((field) =>{
  field.addEventListener('input',(e)=>{ removeMsg(field);validateField(field);});
});

// add event listener for radio buttons
radios.forEach((radio)=>{
  radio.addEventListener("change",(e)=>{
    if(checkRadio()){
       removeMsg(radio);
    }
  });
});

//form submit event
form.addEventListener("submit",(e)=>{
  e.preventDefault();
  // remove error message 
  fields.forEach((field) =>{ removeMsg(field)});
  let valid = true; 

  //check validity of required fields
  fields.forEach((field)=> {
    if(! validateField(field)){
      valid = false;
    }
  });
  
  if(! checkRadio()){
    valid = false;
    radioMessage.textContent = "Vous devez choisir un emplacement";
    radioMessage.classList.add("error");
    buttonRadio.parentNode.prepend(radioMessage); 
  };
 
  if (valid){
    validate();
  }
  
});

//validate fields
function validateField(field){
  if (field.checkValidity()){
    return true;   
  } else {
    valid = 0 ;
    let message = field.title ? field.title : field.validationMessage;
    let showMessage = document.createElement("div");
    showMessage.textContent = message;
    showMessage.classList.add("error");
    field.parentNode.appendChild(showMessage);    
    return false;
  }
}

//remove error msg if exist
function removeMsg(field){
  let msg = document.querySelectorAll(".error");
  msg.forEach((message) =>{
    if(message.parentNode === field.parentNode){
      field.parentNode.removeChild(message);
    }
  });
}

//check if bouton radio checked

function checkRadio(){
  let radioValid = false;
  radios.forEach((radio) =>  {
          
    if (radio.checked === true){
      radioValid = true;      
    } 
  });
  if(radioValid){
    return true;
   } else {
    return false;
   }
  
}

// validation message 

function validate(){

  let formModal = document.querySelector(".modal-body");
  let validationMsg = document.createElement("div");
  let fermerBtn = document.createElement ("button");
 
  form.style.display = "none";
  // add validation message
  validationMsg.classList.add("confirmation");
  validationMsg.innerHTML = "<span>Merci pour votre inscription</span>";
  formModal.appendChild(validationMsg);

  // add "fermer" button 
  fermerBtn.classList.add("modal-btn");
  fermerBtn.textContent = "Fermer";
  fermerBtn.setAttribute("onclick","closeM()");
  formModal.appendChild(fermerBtn);

}
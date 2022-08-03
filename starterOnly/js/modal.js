// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
// Get close modal icon 
const closeModal = document.getElementById("close-modal");
// Get the form
let form = document.querySelector("#modalForm");
// get required form fields
let fields = document.querySelectorAll("input[required], input[minlength], input[pattern],input[nam=location]:checked");

function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// close modal function 
function closeM(){
  modalbg.style.display = "none";
}

// Close Modal event
closeModal.addEventListener("click", closeM);

//add event listener for a require fields
fields.forEach((field) =>{
  field.addEventListener('input',(e)=>{ removeMsg(field);validateField(field);});
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
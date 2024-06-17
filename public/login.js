
function validationForm() {
    let x = document.forms["myForm"]["Email"].value;
    let y = document.forms["myForm"]["Password"].value;
    if (x == "" || y == "") {
      alert("Email and Password must be filled out");
      return false;
    }
}


  


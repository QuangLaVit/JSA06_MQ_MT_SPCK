window.onscroll = function() {myFunction()};

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky")
  } else {
    navbar.classList.remove("sticky");
  }
}
var myIndex = 0;
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  myIndex++;
  if (myIndex > x.length) {myIndex = 1}    
  x[myIndex-1].style.display = "block";  
  setTimeout(carousel, 5000);    
}
function validateForm() {
  let a = document.getElementById("name").value;
  let b = document.getElementById("email").value;
  let c = document.getElementById("age").value;
  let d = document.getElementById("number").value;
  if (a == "" || b == "" || c == "" || d == "") {
      alert("Your imformation must be filled out");
      return false;
}
}
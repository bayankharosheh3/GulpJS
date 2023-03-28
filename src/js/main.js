let toggle = document.getElementById("toggle-btn");
let navLinks = document.getElementById("nav-links");

toggle.addEventListener("click", () => {
  if (
    Array.from(navLinks.classList).find((class1) => class1 === "nav-links-none")
  ) {
    navLinks.classList.remove("nav-links-none");
  } else {
    navLinks.classList.add("nav-links-none");
  }
});

// stop refresh

window.addEventListener("load", function () {
  window.location.hash = "#home";
  fetch("home.html")
    .then((response) => response.text())
    .then((data) => {
      document.querySelector("#content").innerHTML = data;
      document.querySelector("#home").classList.add(active);
    })
    .catch((error) => console.log(error));
});

window.addEventListener("hashchange", function () {
  var hash = window.location.hash;
  //   console.log(hash);
  fetch(hash.slice(1) + ".html")
    .then((response) => response.text())
    .then((data) => {
      document.querySelector("#content").innerHTML = data;
      document.querySelector(hash).classList.add(active);
    })
    .catch((error) => console.log(error));
});

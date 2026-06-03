// =========================
// MOBILE MENU TOGGLE
// =========================
const SITE_VERSION = "1.0.1";
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if(menuToggle){
menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");

  const icon = menuToggle.querySelector("i");

  if (navLinks.classList.contains("active")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-xmark");
  } else {
    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
  }
});
}

// =========================
// CLOSE MENU AFTER CLICK
// =========================

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");

    const icon = menuToggle.querySelector("i");
    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
  });
});

// =========================
// STICKY NAVBAR
// =========================

window.addEventListener("scroll", () => {
  const header = document.querySelector("header");

  if (window.scrollY > 80) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }
});

// =========================
// SCROLL REVEAL ANIMATION
// =========================



// =========================
// SMOOTH SCROLL OFFSET
// =========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {

    const target = document.querySelector(
      this.getAttribute("href")
    );

    if (!target) return;

    e.preventDefault();

    window.scrollTo({
      top: target.offsetTop - 80,
      behavior: "smooth"
    });
  });
});

// =========================
// ACTIVE NAV LINK
// =========================

const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 150;

    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach(link => {
    link.classList.remove("active-link");

    if (
      link.getAttribute("href") === `#${current}`
    ) {
      link.classList.add("active-link");
    }
  });
});

// =========================
// YEAR AUTO UPDATE
// =========================

const copyright =
  document.querySelector(".copyright");

if (copyright) {
  copyright.innerHTML =
    `© ${new Date().getFullYear()} Tavya Foods. All Rights Reserved.`;
}

const faqQuestions =
document.querySelectorAll(".faq-question");

faqQuestions.forEach(question => {

question.addEventListener("click", () => {

const answer =
question.nextElementSibling;

if(answer.style.maxHeight){
answer.style.maxHeight = null;
}
else{
answer.style.maxHeight =
answer.scrollHeight + "px";
}

});

});

window.addEventListener("load",()=>{

const loader =
document.getElementById("loader");
  

loader.style.display="none";
  

});

function showUpdateToast(){

document
.getElementById("updateToast")
.classList.add("show");

}
document
.getElementById("updateNowBtn")
.addEventListener(
"click",
()=>{

window.location.reload(true);

}
);

window.addEventListener(
"load",
()=>{

const savedVersion =
localStorage.getItem(
"siteVersion"
);

if(savedVersion !== SITE_VERSION){

showUpdateToast();

}

});

document
.getElementById(
"updateNowBtn"
)
.addEventListener(
"click",
()=>{

localStorage.setItem(
"siteVersion",
SITE_VERSION
);

document
.getElementById(
"updateToast"
)
.classList.remove("show");

});


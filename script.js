/* ==========================
   MOBILE MENU
========================== */

const menuBtn = document.querySelector(".menu-btn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");

    const icon = menuBtn.querySelector("i");

    if (navLinks.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
    } else {
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
    }
});

/* ==========================
   CLOSE MENU ON LINK CLICK
========================== */

document.querySelectorAll(".nav-links a").forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");

        const icon = menuBtn.querySelector("i");
        icon.classList.remove("fa-times");
        icon.classList.add("fa-bars");
    });
});

/* ==========================
   NAVBAR SCROLL EFFECT
========================== */

window.addEventListener("scroll", () => {
    const header = document.querySelector("header");

    if (window.scrollY > 50) {
        header.style.background = "rgba(0,0,0,0.95)";
        header.style.boxShadow = "0 2px 15px rgba(0,0,0,0.4)";
    } else {
        header.style.background = "rgba(0,0,0,0.85)";
        header.style.boxShadow = "none";
    }
});

/* ==========================
   PRODUCT WHATSAPP BUTTONS
========================== */

const orderButtons = document.querySelectorAll(".order-btn");

orderButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        e.preventDefault();

        const product =
            button.parentElement.querySelector("h3").innerText;

        const phone = "916269847325"; // Replace with your number

        const message =
            `Hello Tavya Foods,%0A%0AI would like to order:%0A${product}`;

        window.open(
            `https://wa.me/${phone}?text=${message}`,
            "_blank"
        );
    });
});

/* ==========================
   SCROLL REVEAL ANIMATION
========================== */

const revealElements = document.querySelectorAll(
    ".feature-card, .product-card, .review-card"
);

function revealOnScroll() {
    revealElements.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
        }
    });
}

revealElements.forEach(element => {
    element.style.opacity = "0";
    element.style.transform = "translateY(40px)";
    element.style.transition =
        "all 0.7s ease";
});

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

/* ==========================
   HERO BUTTON ANIMATION
========================== */

const heroButtons = document.querySelectorAll(".btn");

heroButtons.forEach(btn => {
    btn.addEventListener("mouseenter", () => {
        btn.style.transform = "translateY(-4px)";
    });

    btn.addEventListener("mouseleave", () => {
        btn.style.transform = "translateY(0)";
    });
});

/* ==========================
   CURRENT YEAR IN FOOTER
========================== */

const footer = document.querySelector("footer p");

if (footer) {
    footer.innerHTML =
        `© ${new Date().getFullYear()} Tavya Foods. All Rights Reserved.`;
}
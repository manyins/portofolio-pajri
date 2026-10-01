const header = document.querySelector('.header');
const home = document.querySelector("#home");


let hideTimer;

function isOnHome() {
    const homeBottom = home.getBoundingClientRect().bottom;
    return homeBottom > 0;
}

function showNavbar() {
    header.classList.remove("hide");
    clearTimeout(hideTimer);
    
    if (isOnHome()) {
        return;
    }

    hideTimer = setTimeout(() => {
        const nav = document.querySelector(".navbar-nav");
        if (nav && nav.classList.contains("open")) return;
        header.classList.add("hide");
    }, 4000)
}

window.addEventListener("scroll", () => {
    showNavbar();
});



const cursorGlow = document.querySelector(".cursor-glow");

let mouseX = 0;
let mouseY = 0;
let glowX = 0;
let glowY = 0;

window.addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function animateCursorGlow() {
    glowX += (mouseX - glowX) * 0.18;
    glowY += (mouseY - glowY) * 0.18;

    cursorGlow.style.left = `${glowX}px`;
    cursorGlow.style.top = `${glowY}px`;

    requestAnimationFrame(animateCursorGlow);
}

animateCursorGlow();

// Mobile hamburger menu
const menuToggle = document.querySelector(".menu-toggle");
const navbarNav = document.querySelector(".navbar-nav");

function closeMobileMenu() {
    if (!menuToggle || !navbarNav) return;
    menuToggle.classList.remove("active");
    navbarNav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Buka menu");
}

if (menuToggle && navbarNav) {
    menuToggle.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = navbarNav.classList.toggle("open");
        menuToggle.classList.toggle("active", isOpen);
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute("aria-label", isOpen ? "Tutup menu" : "Buka menu");
    });

    navbarNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeMobileMenu);
    });

    document.addEventListener("click", (e) => {
        if (!navbarNav.contains(e.target) && !menuToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });

    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") closeMobileMenu();
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 600) closeMobileMenu();
    });
}


// Tahun otomatis di footer
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();


// ===== Animasi scroll: muncul saat masuk layar =====
document.querySelectorAll("[data-stagger]").forEach((parent) => {
    parent.querySelectorAll(":scope > .reveal").forEach((el, i) => {
        el.style.setProperty("--d", `${i * 0.1}s`);
    });
});

const revealEls = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("in");
                io.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

    revealEls.forEach((el) => io.observe(el));
} else {
    revealEls.forEach((el) => el.classList.add("in"));
}

// ===== Progress bar scroll + parallax dekorasi =====
const rootEl = document.documentElement;
let ticking = false;

function updateScroll() {
    const max = rootEl.scrollHeight - window.innerHeight;
    rootEl.style.setProperty("--p", max > 0 ? window.scrollY / max : 0);
    rootEl.style.setProperty("--sy", window.scrollY);
    ticking = false;
}

window.addEventListener("scroll", () => {
    if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
    }
}, { passive: true });

updateScroll();

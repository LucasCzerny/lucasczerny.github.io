const NR_OF_SECTIONS = 4;
let sectionHeights = [];

function setSectionHeights() {
    const sections = document.querySelectorAll("main, section");
    
    for (let i = 0; i < NR_OF_SECTIONS; i++) {
        const section = sections[i];
        sectionHeights[i] = section.offsetHeight;
    }
}

function changeActiveLink() {
    //                          Firefox                               Chrome/Chromium
    let currentScrollPosition = document.documentElement.scrollTop || document.body.scrollTop;
    let relativeHeight = currentScrollPosition;
    
    let navLinks = document.querySelectorAll(".nav-link");

    for (let i = 0; i < NR_OF_SECTIONS; i++) {
        let height = sectionHeights[i];

        if (relativeHeight <= height) {
            navLinks.forEach(function(link) {
                link.classList.remove("active");
            });

            navLinks[i].classList.add("active");

            return;
        }

        relativeHeight -= height;
    }
}

window.addEventListener("load", () => {
    setSectionHeights();
    changeActiveLink();
});

window.addEventListener("resize", setSectionHeights);
window.addEventListener("scroll", changeActiveLink);

const header = document.querySelector("nav");

header.addEventListener("show.bs.collapse", function () {
    header.classList.toggle("nav-expanded-style");
});

header.addEventListener("hide.bs.collapse", function () {
    setTimeout(function() {
        header.classList.toggle("nav-expanded-style");
    }, 225);
});

const navLinks = document.querySelectorAll(".nav-item");
const menuToggle = document.getElementById("navbarSupportedContent");
const bsCollapse = new bootstrap.Collapse(menuToggle, { toggle: false });

navLinks.forEach((link) => {
    link.addEventListener("click", function() {
        const navBarCollapse = document.querySelector(".navbar-collapse");

        if (navBarCollapse.classList.contains("show")) {
            bsCollapse.toggle();
        }
    })
});

document.addEventListener("click", function() {
    const navBarCollapse = document.querySelector(".navbar-collapse");

    if (navBarCollapse.classList.contains("show")) {
        bsCollapse.toggle();
    }
});
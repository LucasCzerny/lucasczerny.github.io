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
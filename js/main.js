let header = document.querySelector("nav");

header.addEventListener('show.bs.collapse', function () {
    header.classList.toggle("nav-expanded-style");
});

header.addEventListener('hide.bs.collapse', function () {
    setTimeout(function() {
        header.classList.toggle("nav-expanded-style");
    }, 225);
});
const navbar = document.querySelector("#siteHead");


function vhToPixels(vh) {
    return Math.round(window.innerHeight * (vh / 100));
}

const headerHeight = 20;

const pxHeight = vhToPixels(headerHeight);

function setNewHeights() {
    const institute = document.querySelector(".Institute_dropDown");
    const Academics = document.querySelector(".Academics_dropDown");
    const Admissions = document.querySelector(".Admissions_dropDown");


    institute.style.top = '9vh';
    institute.style.left = '7.5vw';

    Academics.style.top = '9vh';
    Academics.style.left = '7.5vw';

    Admissions.style.top = '9vh';
    Admissions.style.left = '31vw';
}

function removeNewHeight() {
    const institute = document.querySelector(".Institute_dropDown");
    const Academics = document.querySelector(".Academics_dropDown");
    const Admissions = document.querySelector(".Admissions_dropDown");


    institute.style.top = '19.5vh';
    institute.style.left = '0vw';

    Academics.style.top = '19.5vh';
    Academics.style.left = '0vw';

    Admissions.style.top = '19.5vh';
    Admissions.style.left = '27.5vw';
}

window.onscroll = () => {
    if (window.scrollY >= pxHeight) {
        // console.log("Detected");
        setNewHeights();
        navbar.removeAttribute("id");
        navbar.setAttribute("id", "site_head");
    } else {
        removeNewHeight();
        navbar.removeAttribute("id");
        navbar.setAttribute("id", "siteHead");
    }
} 
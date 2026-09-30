const slides = document.querySelectorAll(".slide");
const dotsContainer = document.querySelector(".dots");
const aboutImage = document.querySelector(".about-image");
const uniqueImage = document.querySelector(".unique-image");
const GOOGLE_FORM_BASE_URL = "https://docs.google.com/forms/d/e/1FAIpQLScaoLCTZePBlvy64jEUGseYvt2nfOqINWh_tEB9E649UC8GEA/viewform?usp=pp_url";
const GOOGLE_FORM_ENTRY_MAP = [
    ["name", "entry.2005620554"],
    ["email", "entry.1045781291"],
    ["phone", "entry.1166974658"],
    ["subject", "entry.1065046570"],
    ["message", "entry.839337160"]
];

function buildGoogleFormUrl(form) {
    const params = [];

    GOOGLE_FORM_ENTRY_MAP.forEach(([fieldName, entryId]) => {
        const target = form.querySelector(`[name="${fieldName}"]`);
        if (!target) return;

        const value = target.value.trim();
        if (value) {
            params.push(`${entryId}=${encodeURIComponent(value)}`);
        }
    });

    return params.length ? `${GOOGLE_FORM_BASE_URL}&${params.join("&")}` : GOOGLE_FORM_BASE_URL;
}

if (aboutImage) {
    const showAboutImage = () => aboutImage.classList.add("is-visible");

    if ("IntersectionObserver" in window) {
        const aboutImageObserver = new IntersectionObserver((entries, observer) => {
            if (entries[0].isIntersecting) {
                showAboutImage();
                observer.disconnect();
            }
        }, { threshold: 0.25 });

        aboutImageObserver.observe(aboutImage);
    } else {
        showAboutImage();
    }
}
if (uniqueImage) {
    const showUniqueImage = () => uniqueImage.classList.add("is-visible");

    if ("IntersectionObserver" in window) {
        const uniqueImageObserver = new IntersectionObserver((entries, observer) => {
            if (entries[0].isIntersecting) {
                showUniqueImage();
                observer.disconnect();
            }
        }, { threshold: 0.25 });

        uniqueImageObserver.observe(uniqueImage);
    } else {
        showUniqueImage();
    }
}

function applyProgramCardLayout() {
    const programGrid = document.querySelector(".beta-five-programs");
    if (!programGrid) return;

    const cards = programGrid.querySelectorAll(".card-prog");
    const isMobile = window.matchMedia("(max-width: 760px)").matches;

    if (isMobile) {
        programGrid.style.display = "flex";
        programGrid.style.flexDirection = "column";
        programGrid.style.gridTemplateColumns = "none";
        programGrid.style.width = "100%";
        programGrid.style.maxWidth = "none";

        cards.forEach((card) => {
            card.style.display = "block";
            card.style.width = "100%";
            card.style.maxWidth = "none";
            card.style.gridColumn = "auto";
            card.style.marginLeft = "0";
            card.style.transform = "none";
            card.style.flex = "0 0 100%";
        });
    } else {
        programGrid.style.display = "";
        programGrid.style.flexDirection = "";
        programGrid.style.gridTemplateColumns = "";
        programGrid.style.width = "";
        programGrid.style.maxWidth = "";

        cards.forEach((card) => {
            card.style.display = "";
            card.style.width = "";
            card.style.maxWidth = "";
            card.style.gridColumn = "";
            card.style.marginLeft = "";
            card.style.transform = "";
            card.style.flex = "";
        });
    }
}

function applyUniqueSectionMobileOrder() {
    const uniqueWrap = document.querySelector(".unique-sec .wrap");
    if (!uniqueWrap) return;

    const children = uniqueWrap.children;
    const isMobile = window.matchMedia("(max-width: 720px)").matches;

    if (isMobile) {
        uniqueWrap.style.display = "flex";
        uniqueWrap.style.flexDirection = "column";
        children[0].style.order = "1";
        children[1].style.order = "2";
    } else {
        uniqueWrap.style.display = "";
        uniqueWrap.style.flexDirection = "";
        children[0].style.order = "";
        children[1].style.order = "";
    }
}

window.addEventListener("resize", () => {
    applyProgramCardLayout();
    applyUniqueSectionMobileOrder();
});
window.addEventListener("load", () => {
    applyProgramCardLayout();
    applyUniqueSectionMobileOrder();
});
applyProgramCardLayout();
applyUniqueSectionMobileOrder();

document.querySelectorAll('form[data-enquiry]').forEach(function(form) {
    form.addEventListener('submit', function(event) {
        const note = form.querySelector('.form-note');
        const googleFormUrl = buildGoogleFormUrl(form);

        event.preventDefault();
        window.open(googleFormUrl, '_blank', 'noopener,noreferrer');

        if (note) note.textContent = 'Redirecting to Google Form...';
    });
});

if (slides.length && dotsContainer) {

let current = 0;
let interval;

slides.forEach((_, index) => {

    const dot = document.createElement("div");
    dot.classList.add("dot");

    if(index === 0){
        dot.classList.add("active");
    }

    dot.addEventListener("click", () => {
        goToSlide(index);
    });

    dotsContainer.appendChild(dot);

});

const dots = document.querySelectorAll(".dot");

function updateSlides(){

    slides.forEach(slide=>{
        slide.classList.remove("active");
    });

    dots.forEach(dot=>{
        dot.classList.remove("active");
    });

    slides[current].classList.add("active");
    dots[current].classList.add("active");
}

function goToSlide(index){
    current = index;
    updateSlides();
    restartAuto();
}

function nextSlide(){
    current++;

    if(current >= slides.length){
        current = 0;
    }

    updateSlides();
}

function prevSlide(){
    current--;

    if(current < 0){
        current = slides.length - 1;
    }

    updateSlides();
}

document.querySelector(".next").addEventListener("click",()=>{
    nextSlide();
    restartAuto();
});

document.querySelector(".prev").addEventListener("click",()=>{
    prevSlide();
    restartAuto();
});

function startAuto(){
    interval = setInterval(nextSlide, 5000);
}

function restartAuto(){
    clearInterval(interval);
    startAuto();
}

startAuto();

document.addEventListener("mousemove",(e)=>{

    const x = (window.innerWidth/2 - e.clientX)/40;
    const y = (window.innerHeight/2 - e.clientY)/40;

    document.querySelectorAll(".floating").forEach(item=>{
        item.style.transform =
        `translate(${x}px, ${y}px)`;
    });

});

}
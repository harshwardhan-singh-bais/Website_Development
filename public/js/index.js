const wrapper = document.querySelector(".researchSlider");
const carousel = document.querySelector(".research_list");
const arrowBtn = document.querySelectorAll(".researchSlider > i");
const cardWidth = document.querySelector(".research_list > .research_item").offsetWidth;
const carouselChildren = [...carousel.children];

//getting all the cards that can fit on the screen at a time
let cardPerView = Math.round(carousel.offsetWidth / cardWidth);

//insert copies of first few cards to beginning of cards for infinite scrolling
carouselChildren.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
})


carouselChildren.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
})


//Add event listener to carousel buttons to move them left or right
arrowBtn.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -cardWidth : cardWidth;
    })
})

let isDrag = false, startX, startScrollLeft;

const dragStart = (e) => {
    isDrag = true;
    carousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const drag = (e) => {
    if (!isDrag) return;
        carousel.scrollLeft = e.pageX;
    
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDrag = false;
    carousel.classList.remove("draggin");
}

const autoPlay = () => {
    timeoutId = setTimeout(() => carousel.scrollLeft += cardWidth, 1500);
}
autoPlay();

const infiniteScroll = () => {
    //if carousel at beginning, scroll to end
    if (carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }   
    // if carousel at end, scroll to beginning
    else if (Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }

    //clear existing timeout and restart carousel if mouse is not hovering
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", drag);
carousel.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll)

document.addEventListener("DOMContentLoaded", () => {
    const hoverItems = document.querySelectorAll(".hover-item");
    const displayImage = document.getElementById("display-image");
    const loadingLineImage = document.querySelector(".loading-line-image");

    hoverItems.forEach(item => {
        item.addEventListener("mouseover", () => {
            let newImage = item.getAttribute("data-img");
            let color = item.getAttribute("data-color");
            let loadingLine = item.querySelector(".loading-line");

            // Set loading color
            loadingLine.style.backgroundColor = color;
            loadingLineImage.style.backgroundColor = color;

            // Start loading animation for text
            loadingLine.style.width = "100%";
            setTimeout(() => {
                loadingLine.style.opacity = "0";
                setTimeout(() => {
                    loadingLine.style.width = "0%";
                    loadingLine.style.opacity = "1";
                }, 300); // Reset after fade-out
            }, 1000); // 1 sec load, then vanish

            // Start loading animation for image
            loadingLineImage.style.width = "100%";
            setTimeout(() => {
                displayImage.src = newImage; // Change image AFTER animation completes
                loadingLineImage.style.opacity = "0";
                setTimeout(() => {
                    loadingLineImage.style.width = "0%";
                    loadingLineImage.style.opacity = "1";
                }, 300);
            }, 1000);
        });
    });
});

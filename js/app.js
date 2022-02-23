// loader
window.addEventListener("load", () => {
    document.querySelector(".page_loader").classList.add("slide_out_right");
    setTimeout(() => {
        document.querySelector(".page_loader").style.display = "none";
    }, 1000);
});


// bg animation effect
function bgAnimationItems() {
    const row = 7, cols = 10;
    for(let i =0; i < row; i++) {
        for(let j = 0; j < cols; j++) {
            const div = document.createElement("div");
            div.className = `col-${j+1}`;
            document.querySelector(".bg_animation_effect").appendChild(div);
        }
    }
}
bgAnimationItems();


// toggle navbar
const navToggler = document.querySelector(".nav_toggle");
navToggler.addEventListener("click", toggleNavbar);

function toggleNavbar() {
    navToggler.classList.toggle("active");
    document.querySelector(".nav").classList.toggle("open");
    toggleOverlayEffect();
    toggleBodyScrolling();
}


// hide & show section
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("link_item") && e.target.hash !== ""){
        const hash = e.target.hash;
        if (e.target.classList.contains("nav_item")) {
            activeSection(hash);
            toggleNavbar();
        }
        else {
            toggleBodyScrolling();
            toggleOverlayEffect();
            document.querySelector(".nav_toggle").classList.add("toggle_hide");
            setTimeout(() => {
                activeSection(hash);
                toggleOverlayEffect();
                toggleBodyScrolling();
                document.querySelector(".nav_toggle").classList.remove("toggle_hide");
            }, 950);
        }
    }
});

function activeSection(sectionId){
    document.querySelector("section.active").classList.remove("active");
    document.querySelector(sectionId).classList.add("active");
    window.scrollTo(0,0);
}



// toggle overlay effect
function toggleOverlayEffect() {
    document.querySelector(".overlay_effect").classList.toggle("active");
}


// toggle body scrolling
function toggleBodyScrolling() {
    document.body.classList.toggle("hide_scrolling");
}


// filter portfolio items
const filterBtnsContainer = document.querySelector(".portfolio_filter");
let portfolioItems;
filterBtnsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("portfolio_filter_btn") && !e.target.classList.contains("active")) {
        filterBtnsContainer.querySelector(".active").classList.remove("active");
        e.target.classList.add("active");
        toggleBodyScrolling();
        document.querySelector(".filter_status").classList.add("active");
        document.querySelector(".filter_status p").innerHTML = `filtering <span>${e.target.innerHTML}</span> work`;
        setTimeout(() => {
            filterItems(e.target);
        },400);
        setTimeout(() => {
            document.querySelector(".filter_status").classList.remove("active");
            toggleBodyScrolling();
        },800);
    }
});

function filterItems(filterBtn) {
    const selectedCategory = filterBtn.getAttribute("data-filter")
    document.querySelectorAll(".portfolio_item").forEach((item) =>{
        const category = item.getAttribute("data-category").split(",");
        if(category.indexOf(selectedCategory) !== -1 || selectedCategory === "all") {
            item.classList.add("show");
        }
        else {
            item.classList.remove("show");
        }
    });
    portfolioItems = document.querySelectorAll(".portfolio_item.show");
}
// filter active category portfolio items
filterItems(document.querySelector(".portfolio_filter_btn.active"));


// portfolio item details popup
let portfolioItemIndex;
document.addEventListener("click", (e) => {
    if (e.target.closest(".portfolio_item")) {
        const currentItem = e.target.closest(".portfolio_item");
        portfolioItemIndex = Array.from(portfolioItems).indexOf(currentItem);
        togglePopup();
        portfolioItemDetails();
        updateNexPrevItem();
    }
});

function togglePopup() {
    document.querySelector(".portfolio_popup").classList.toggle("open");
    toggleBodyScrolling();
}
document.querySelector(".pp_close_btn").addEventListener("click", togglePopup);

function portfolioItemDetails() {
    document.querySelector(".pp_thumbnail img").src =
    portfolioItems[portfolioItemIndex].querySelector("img").src;

    document.querySelector(".pp_header h3").innerHTML =
    portfolioItems[portfolioItemIndex].querySelector(".portfolio_item_title").innerHTML;

    document.querySelector(".pp_body").innerHTML =
    portfolioItems[portfolioItemIndex].querySelector(".portfolio_item_details").innerHTML;

    document.querySelector(".pp_counter").innerHTML = `${portfolioItemIndex+1} of ${portfolioItems.length} ( <span title="category">${document.querySelector(".portfolio_filter_btn.active").innerHTML}</span> )`;
}

function updateNexPrevItem() {
    if(portfolioItemIndex !== 0) {
        document.querySelector(".pp_footer_left").classList.remove("hidden");
        document.querySelector(".pp_footer_left h3").innerHTML = portfolioItems[portfolioItemIndex-1].querySelector("h3").innerHTML;

        document.querySelector(".pp_footer_left img").src = portfolioItems[portfolioItemIndex-1].querySelector("img").src;
    }
    else {
        document.querySelector(".pp_footer_left").classList.add("hidden");
    }

    if(portfolioItemIndex !== portfolioItems.length-1) {
        document.querySelector(".pp_footer_right").classList.remove("hidden");
        document.querySelector(".pp_footer_right h3").innerHTML = portfolioItems[portfolioItemIndex+1].querySelector("h3").innerHTML;

        document.querySelector(".pp_footer_right img").src = portfolioItems[portfolioItemIndex+1].querySelector("img").src;
    }
    else {
        document.querySelector(".pp_footer_right").classList.add("hidden");
    }
}

document.querySelector(".pp_prev_btn").addEventListener("click", () =>{
    changePortfolioItem("prev");
});
document.querySelector(".pp_next_btn").addEventListener("click", () => {
    changePortfolioItem("next");
});

function changePortfolioItem(direction) {
    if(direction == "prev"){
        portfolioItemIndex--;
    }
    else{
        portfolioItemIndex++;
    }
    document.querySelector(".pp_overlay").classList.add(direction);
    setTimeout(() => {
        document.querySelector(".pp_inner").scrollTo(0,0);
        portfolioItemDetails();
        updateNexPrevItem();
    },400);
    setTimeout(() => {
        document.querySelector(".pp_overlay").classList.remove(direction);
    }, 1000);
}


// toggle contact form
document.addEventListener("click", (e) => {
    if (e.target.classList.contains("toggle_contact_form_btn")) {
        document.querySelector(".contact_form").classList.toggle("open");
        toggleBodyScrolling();
    }
});
var scrollVisible = true;
var meidShown = false;
function scrollFunction() {
    var scrollPos = window.scrollY;
    if (document.body.classList.contains("home")) {
        var sectionHeight = document.querySelector("section.fullscreen").clientHeight - 100;
        if (document.body.classList.contains("home")) {
            if (scrollPos > sectionHeight && !meidShown) {
                showMeid(true);
            }
            else if (scrollPos < sectionHeight && meidShown) {
                showMeid(false);
            }
        }
    }
    var siteHeight = document.body.clientHeight - window.innerHeight;
    if ((scrollPos / siteHeight) > 0.3 && scrollVisible) {
        document.querySelector("#backtotop").classList.add("showBackToTop");
        scrollVisible = false;
    }
    //Before 40% of the page, making sure with the bool scrollVisible, switch from scrollbacktotop to scrolldown
    else if ((scrollPos / siteHeight) < 0.3 && !scrollVisible) {
        document.querySelector("#backtotop").classList.remove("showBackToTop");
        scrollVisible = true;
    }
}

function showMeid(x) {
    var meid = document.querySelector(".home header a.meid");
    if (x) {
        meid.classList.add("show");
        meidShown = true;
    }
    else {
        meid.classList.remove("show");
        meidShown = false;
    }
}
window.addEventListener("scroll", scrollFunction);
scrollFunction();

function comparePriceReverse(b, a) {
    if (a.price < b.price) {
        return -1;
    }
    if (a.price > b.price) {
        return 1;
    }
    return 0;
}

function comparePrice(a, b) {
    if (a.price < b.price) {
        return -1;
    }
    if (a.price > b.price) {
        return 1;
    }
    return 0;
}

function compareNameReverse(b, a) {
    if (a.name < b.name) {
        return -1;
    }
    if (a.name > b.name) {
        return 1;
    }
    return 0;
}

function compareName(a, b) {
    if (a.name < b.name) {
        return -1;
    }
    if (a.name > b.name) {
        return 1;
    }
    return 0;
}

function sortProducts(el) {
    var allProducts = document.querySelectorAll(".productcard"),
        items = new Array(allProducts.length),
        i;
    for (i = 0; i < allProducts.length; i++) {
        items[i] = {
            name: allProducts[i].querySelector("h2").textContent,
            price: parseInt(allProducts[i].getAttribute("data-price"))
        };
    }
    if (el.value == "az") { items.sort(compareName); }
    else if (el.value == "za") { items.sort(compareNameReverse); }
    else if (el.value == "lowhigh") { items.sort(comparePrice); }
    else if (el.value == "highlow") { items.sort(comparePriceReverse); }

    for (i = 0; i < allProducts.length; i++) {
        var j;
        for (j = 0; j < items.length; j++) {
            if (allProducts[i].querySelector("h2").textContent == items[j].name) {
                allProducts[i].style = "order: " + j;
            }
        }
    }
}


function filterProducts(el) {
    var allProducts = document.querySelectorAll(".productcard"),
        i;
    for (i = 0; i < allProducts.length; i++) {
        allProducts[i].classList.add("displayNone");
        if(allProducts[i].getAttribute('data-category') == el.value.toLowerCase()) {
            allProducts[i].classList.remove("displayNone");
        }
        else if (el.value== "all") {
            allProducts[i].classList.remove("displayNone");
        }
    }

    var allMoods = document.querySelectorAll(".moodpicture");
    for(i=0; i< allMoods.length; i++) {
        allMoods[i].classList.add("displayNone");
        if (el.value== "all") {
            allMoods[i].classList.remove("displayNone");
        }
    }
}

if (document.body.classList.contains("webshop")) {
    document.querySelector("select#sort").addEventListener("change", function (e) { sortProducts(e.target) });
    document.querySelector("select#filter").addEventListener("change", function (e) { filterProducts(e.target) });
}

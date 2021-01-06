
var scrollVisible = true,
    meidShown = false;
function scrollFunction() {
    // This function fires on the window scroll event. It uses the variables that are declared above to check if the header image is scrolled down or not. 
    // Some if statements are mentioned before running most of the code to ensure parts of the function don't fire on webpages it doesn't have to, for performance. 

    var scrollPos = window.scrollY;
    if (document.body.classList.contains("home")) {
        // On the homepage, the header image must transform down after a bit has been scrolled.

        var sectionHeight = document.querySelector("section.fullscreen").clientHeight - 100;
        if (document.body.classList.contains("home")) {
            if (scrollPos > sectionHeight && !meidShown) {
                // showMeid is a function which adds a class to the anchor and changes the boolean meidShown depending of the parameter that is given.
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
    // x here is a boolean, given true or false.
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



// Sorting function for price high-low
function comparePriceReverse(b, a) {
    if (a.price < b.price) return -1;
    if (a.price > b.price) return 1;
    return 0;
}

// Sorting function for price low-high
function comparePrice(a, b) {
    if (a.price < b.price) return -1;
    if (a.price > b.price) return 1;
    return 0;
}

// Sorting function for name Z-A
function compareNameReverse(b, a) {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
}

// Sorting function for name A-Z
function compareName(a, b) {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
}

function sortProducts(el) {
    // sortProducts is built on the premise that every list item or 'productcard' has a 'data-price'. We pull the name from the .textContent. This function is called when a select is changed.
    // The select has one of four values, 'az', 'za', 'lowhigh' and 'highlow'.
    // First we set some variables and make an empty array with the length of the amount of products on the page. Then we make an object with the price and the name in there. 

    // We pull these objects through the sorting algorithms, then we loop through all the projects, make a variable 'j' and loop through all the items in the object. If the name of the object 
    // corresponds with the textContent of the product, we have found our match. In this match we find the order of the product, j, and we can add this style to the product.

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
    // filterProducts is built on the premise that every list item or 'productcard' has a 'data-category'.  This function is called when a select is changed.
    // The select has one of a few  values, namely the diffferent categories.

    // The function loops over all the products and sets them to display: none. 
    // Then we start looking for matches, if the 'data-category' matches the el.value these display:none's are removed.
    // Furthermore, if el.value = 'all', this means that we want every product to be shown, so we remove every product's 'displaynone;.


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

    // When filtered on category, moodpictures are removed. These are only visbile when all products are shown. 
    // This bit removes them all, and puts them back if el.value = 'all'. 

    var allMoods = document.querySelectorAll(".moodpicture");
    for(i=0; i< allMoods.length; i++) {
        allMoods[i].classList.add("displayNone");
        if (el.value== "all") {
            allMoods[i].classList.remove("displayNone");
        }
    }
}

// We only need these eventListeners on the shop page, so if the body has class webshop, add these.
if (document.body.classList.contains("webshop")) {
    document.querySelector("select#sort").addEventListener("change", function (e) { sortProducts(e.target) });
    document.querySelector("select#filter").addEventListener("change", function (e) { filterProducts(e.target) });
}

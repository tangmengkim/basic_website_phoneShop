
var categories = []
var products = []

// Accordion 
function navList(category) {
    console.log(category)
  var x = document.getElementById(`${category}`);
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else {
    x.className = x.className.replace(" w3-show", "");
  }
}

// Click on the "Jeans" link on page load to open the accordion for demo purposes
// document.getElementById("myBtn").click();


// Open and close sidebar
function w3_open() {
  document.getElementById("mySidebar").style.display = "block";
  document.getElementById("myOverlay").style.display = "block";
}
 
function w3_close() {
  document.getElementById("mySidebar").style.display = "none";
  document.getElementById("myOverlay").style.display = "none";
}

function renderSidebar() {
  const sidebar = document.getElementById('sidebar-links');
  sidebar.innerHTML = categories.map(data => `
    <a onclick="navList('nav-list-${data.category}')"  href="javascript:void(0)" class="w3-button w3-block w3-white w3-left-align">
      ${data.category} <i class="fa fa-caret-down"></i>
    </a>
    <div id="nav-list-${data.category}" class="w3-bar-block w3-hide w3-padding-large w3-medium">

        ${data.brand.map(element =>   `<a href="#${element}" class="w3-bar-item w3-button w3light-grey">
                <i class="fa fa-caret-right w3-margin-right"></i>${element} </a>`
                
            
        ).join('')}
    </div>
  `).join('');
}

async function getCategory(){
    await fetch('/data/categories.json')
    .then(res => res.json())
    .then(category => categories = category)
}

async function getProduct(){
    await fetch('/data/products.json')
    .then(res => res.json())
    .then(data => products = data)
}


function getCurrentCategory() {
  const path = window.location.hash.replace(/^\#|\/$/g, ''); // remove slashes
  console.log(path)
  return categories.includes(path) ? path : null;
}

function renderProducts(filteredProducts) {
  const grid = document.getElementById('product-grid');
  const count = document.getElementById('product-count');

  count.textContent = `${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''} found`;

  grid.innerHTML = filteredProducts.map(product => `
    <div class="w3-quarter w3-margin-bottom">
      <div class="w3-card-6">
        <div class="w3-container">
        <div class="w3-display-container">
          <img src="${product.image}" alt="${product.name}" style="width:100%">
          <div class="w3-display-middle w3-display-hover">
            <button class="w3-button w3-black">
              Buy Now <i class="fa fa-shopping-cart"></i>
            </button>
          </div>
        </div>
        </div>

        <div class="w3-container">
          <h5>${product.name}</h5>
          <p><strong>$${product.price.toFixed(2)}</strong></p>
        </div>
      </div>
    </div>
  `).join('');
}

function init(){}


// Main Execution
window.addEventListener('DOMContentLoaded', () => {
    getCategory().then(()=> renderSidebar());
    console.log(categories);
    //   renderSidebar();
    const currentCategory = getCurrentCategory();
    getProduct().then(()=>{
        const filteredProducts = currentCategory != null
          ? products.filter(p => p.category === currentCategory)
          : products;
       renderProducts(filteredProducts);
    });
  console.log(currentCategory)
});
// fetch("/products.json");
var productsData;
var filteredData;
var promise = fetch("./products.json");
promise
  .then(response => {
    return response.json();
  })
  .then(data => {
    productsData = data;
    ProductsArea(data);
  });

function openSearchBar() {
  document.getElementById("searchBar").innerHTML = "";
  var searchForm = document.createElement("form");
  searchForm.setAttribute("class", "searchBar");
  var searchBar = document.createElement("input");
  searchBar.setAttribute("placeholder", "Search ... ");
  searchBar.setAttribute("type", "text");
  searchBar.setAttribute("id", "searchBarInput");
  searchBar.setAttribute("onkeyup", "fillterdProducts()");
  searchForm.appendChild(searchBar);
  var searchSubmit = document.createElement("button");
  searchSubmit.setAttribute("type", "submit");
  searchSubmit.setAttribute("onclick", "fillterdProducts()");
  var searchSubmitIcon = document.createElement("i");
  searchSubmitIcon.setAttribute("class", "fa fa-search");
  searchSubmit.appendChild(searchSubmitIcon);
  searchForm.appendChild(searchSubmit);
  document.getElementById("searchBar").appendChild(searchForm);
}
function openFilterBar() {
  document.getElementById("filter-menu").style.display = "block";
  document.getElementById("filter-brand").style.display = "block";
  document.getElementById("filter-price").style.display = "block";
}

function ProductsArea(products) {
  document.getElementById("userName").value = localStorage.getItem("username");
  document.getElementById("userName").innerHTML = localStorage.getItem(
    "username"
  );
  document.getElementById("cart-counter").value = localStorage.getItem(
    document.getElementById("userName").value
  );
  document.getElementById("cart-counter").innerHTML = localStorage.getItem(
    document.getElementById("userName").value
  );
  console.log(document.getElementById("cart-counter").value);

  var productCatagoryArea = document.getElementById("product-area");
  productCatagoryArea.setAttribute("class", "products-catagories-area");
  var productsArea = document.createElement("div");
  productsArea.setAttribute("class", "container");

  for (product of products) {
    var singleProductsCatagory = document.createElement("div");
    singleProductsCatagory.setAttribute("id", product.product_id);
    singleProductsCatagory.setAttribute(
      "class",
      "single-products-catagory clearfix"
    );

    var productA = document.createElement("a");

    var productImg = document.createElement("img");
    productImg.setAttribute("src", product.product_img);
    productImg.setAttribute("class", "single-products-catagory a img");
    productA.appendChild(productImg);

    var productHover = document.createElement("div");
    productHover.setAttribute("class", "hover-content");

    var productLine = document.createElement("div");
    productLine.setAttribute("class", "line");
    productHover.appendChild(productLine);

    var productPrice = document.createElement("p");
    productPrice.setAttribute("class", "p");
    productPrice.innerHTML = "$" + product.product_price;
    productHover.appendChild(productPrice);

    var productTitle = document.createElement("h4");
    productTitle.setAttribute("class", "h4");
    productTitle.innerHTML = product.product_description;
    productHover.appendChild(productTitle);

    var addToCartButton = document.createElement("button");
    addToCartButton.setAttribute("class", "add-to-cart-button");

    var addToCartButtonText = document.createElement("span");
    addToCartButtonText.innerHTML = "Add to cart";
    addToCartButtonText.setAttribute("class", "span");
    addToCartButton.setAttribute("onclick", "incrementCartAmount()");
    addToCartButton.appendChild(addToCartButtonText);
    productHover.appendChild(addToCartButton);

    productA.appendChild(productImg);
    productA.appendChild(productHover);

    singleProductsCatagory.appendChild(productA);

    productsArea.appendChild(singleProductsCatagory);

    productCatagoryArea.appendChild(productsArea);
  }
}
function fillterdProducts() {
  var search_input = document.getElementById("searchBarInput").value;
  document.getElementById("product-area").innerHTML = "";
  if (search_input != undefined) {
    ProductsArea(
      productsData.filter(value => {
        var lowerCaseProduct = value.product_description.toLowerCase();
        return lowerCaseProduct.includes(search_input);
      })
    );
  }
}
function incrementCartAmount() {
  var currentUser = document.getElementById("userName").value;
  var currentCount = document.getElementById("cart-counter");
  var currentCountParsed = parseInt(currentCount.textContent);
  var NewCount = counter(currentCountParsed);
  currentCount.innerHTML = NewCount;
  localStorage.setItem(currentUser, NewCount);
}
function counter(counter) {
  return counter + 1;
}

function filterByBrand() {
  var isBrandFilter = false;
  document.getElementById("product-area").innerHTML = "";
  if (document.getElementById("brandTH").checked == true) {
    isBrandFilter = true;
    ProductsArea(
      productsData.filter(value => {
        return value.product_brand == "Tommy Hilfiger";
      })
    );
  }
  if (document.getElementById("brandKN").checked == true) {
    isBrandFilter = true;
    ProductsArea(
      productsData.filter(value => {
        return value.product_brand == "Kook N Keech";
      })
    );
  }
  if (document.getElementById("brandMH").checked == true) {
    isBrandFilter = true;
    ProductsArea(
      productsData.filter(value => {
        return value.product_brand == "Mast & Harbour";
      })
    );
  }
  if (
    document.getElementById("brandMH").checked == false &&
    document.getElementById("brandKN").checked == false &&
    document.getElementById("brandTH").checked == false
  ) {
    ProductsArea(productsData);
  }
}

function filterByColor() {
  document.getElementById("product-area").innerHTML = "";
  if (document.getElementById("color_white").checked == true) {
    ProductsArea(
      productsData.filter(value => {
        return value.product_color === "white";
      })
    );
  }
  if (document.getElementById("color_blue").checked == true) {
    isBrandFilter = true;
    ProductsArea(
      productsData.filter(value => {
        return value.product_color === "blue";
      })
    );
  }
  if (document.getElementById("color_black").checked == true) {
    isBrandFilter = true;
    ProductsArea(
      productsData.filter(value => {
        return value.product_color === "black";
      })
    );
  }
  if (
    document.getElementById("color_white").checked == false &&
    document.getElementById("color_blue").checked == false &&
    document.getElementById("color_black").checked == false
  ) {
    ProductsArea(productsData);
  }
}
function filterByPrice() {
  var price_radio = document.getElementsByName("price_radio");
  var isBrandFilter = false;
  document.getElementById("product-area").innerHTML = "";
  if (document.getElementById("price_range1").checked == true) {
    isBrandFilter = true;
    ProductsArea(
      productsData.filter(value => {
        return value.product_price > 0 && value.product_price <= 30;
      })
    );
  }
  if (document.getElementById("price_range2").checked == true) {
    isBrandFilter = true;
    ProductsArea(
      productsData.filter(value => {
        return value.product_price > 30 && value.product_price <= 60;
      })
    );
  }
  if (document.getElementById("price_range3").checked == true) {
    isBrandFilter = true;
    ProductsArea(
      productsData.filter(value => {
        return value.product_price > 60 && value.product_price <= 100;
      })
    );
  }
  if (document.getElementById("price_range4").checked == true) {
    isBrandFilter = true;
    ProductsArea(
      productsData.filter(value => {
        return value.product_price > 100 && value.product_price <= 150;
      })
    );
  }
  if (document.getElementById("price_range0").checked) {
    ProductsArea(productsData);
  }
}

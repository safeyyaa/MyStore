// fetch("/products.json");
function openSearchBar() {
  document.getElementById("searchBar").innerHTML = "";
  var searchForm = document.createElement("form");
  searchForm.setAttribute("class", "searchBar");
  var searchBar = document.createElement("input");
  searchBar.setAttribute("placeholder", "Search ... ");
  searchBar.setAttribute("type", "text");
  searchBar.setAttribute("name", "searchBar");
  searchForm.appendChild(searchBar);
  var searchSubmit = document.createElement("button");
  searchSubmit.setAttribute("type", "submit");
  var searchSubmitIcon = document.createElement("i");
  searchSubmitIcon.setAttribute("class", "fa fa-search");
  searchSubmit.appendChild(searchSubmitIcon);
  searchForm.appendChild(searchSubmit);
  document.getElementById("searchBar").appendChild(searchForm);
}
function openFilterBar() {
  document.getElementById("filter-menu").style.display = "block";
  document.getElementById("filter-brand").style.display = "block";
  document.getElementById("filter-gender").style.display = "block";
  document.getElementById("filter-price").style.display = "block";
}
var promise = fetch("./products.json");
promise
  .then(response => {
    return response.json();
  })
  .then(data => {
    empData = data;
    fetchData(data);
  });

function fetchData(records) {
  var productsAreaDiv = document.createElement("div");
  productsAreaDiv.setAttribute("border", 1);
  productsAreaDiv.appendChild(createHeading(records[0]));
  for (let record of records) {
    table.appendChild(createRow(record));
  }
  document.getElementById("container").appendChild(table);
}

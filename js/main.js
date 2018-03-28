var searchInput = document.getElementById('searchInput');
var searchOption = document.getElementById('searchOption');
var searchCategory = document.getElementById('searchCategory');



document.getElementById("searchTracksButton").addEventListener("click", searchResult);

function searchResult() {
  console.log(searchInput);
  console.log(searchOption);
  console.log(searchCategory);
  fetch(`https://folksa.ga/api/${searchCategory.value}?${searchOption.value}=${searchInput.value}&key=flat_eric`)
  .then((response) => response.json())
  .then((trackss) => {
    console.log(trackss);
    alert("hej");
  })
  .catch((error) => {
    console.log(error);
    alert('error');
  });
}

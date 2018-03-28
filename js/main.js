//var searchInputTrack = getElementsById('searchTrack');
//var searchTracksButton = document.getElementById('searchTracksButton');

document.getElementById("searchTracksButton").addEventListener("click", Tracks);

function Tracks() {
  fetch('https://folksa.ga/api/tracks?key=flat_eric')
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

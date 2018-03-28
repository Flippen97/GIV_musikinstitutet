//var searchInputTrack = getElementsById('searchTrack');
//var searchTracksButton = document.getElementById('searchTracksButton');

document.getElementById("searchTracksButton").addEventListener("click", Tracks);

function Tracks(){
  fetch('https://folksa.ga/api/tracks?key=flat_eric')
  .then((response) => response.json())
  .then((tracks) => {
    console.log(tracks);
  })
  .catch((error) => {
    console.log(error);
  });
}

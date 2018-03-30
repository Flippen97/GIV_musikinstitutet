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

//Code for adding new content below

document.getElementById("addButton").addEventListener("click", addTrack);

function addTrack() {
	let title = document.getElementById('title');
	let artist = document.getElementById('artist');
	let album = document.getElementById('album');
	let genre = document.getElementById('genre');

	var track = {
		title: title.value,
		artists: artist.value,
		album: album.value,
		genres: genre.value
	}
	
	console.log(track);
	
	var postOptions = {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(track)
		};
	console.log(postOptions);

	fetch('https://folksa.ga/api/tracks?key=flat_eric', postOptions)
	.then((response) => response.json())
  .then((postedTrack) => {
    console.log(postedTrack);
  })
	.catch(function (error) {  
    console.log('Request failed', error);  
  });
}
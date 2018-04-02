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

document.getElementById('addCategory').addEventListener('change', function (){
	formInputFields();
	inputFields.title.style.display = 'none';
	inputFields.name.style.display = 'none';
	inputFields.artist.style.display = 'none';
	inputFields.album.style.display = 'none';
	inputFields.genre.style.display = 'none';
})

let addCategory = document.getElementById('addCategory');
addCategory.addEventListener('click', showForm);

function showForm() {
	formInputFields()
	switch (addCategory.value) {
		case 'Track':
			inputFields.title.style.display = 'inline-block';
			inputFields.artist.style.display = 'inline-block';
			inputFields.album.style.display = 'inline-block';
			inputFields.genre.style.display = 'inline-block';
			break;
		case 'Artist':
			inputFields.name.style.display = 'inline-block';
			inputFields.genre.style.display = 'inline-block';
			break;
		case 'Album':
			inputFields.title.style.display = 'inline-block';
			inputFields.artist.style.display = 'inline-block';
			inputFields.genre.style.display = 'inline-block';
			break;
		case 'Playlist':
			inputFields.title.style.display = 'inline-block';
			break;
	}

}

function formInputFields() {
	return inputFields = {
		title: document.getElementById('title'),
		name: document.getElementById('name'),
		artist: document.getElementById('artist'),
		album: document.getElementById('album'),
		genre: document.getElementById('genre')
	}
}

document.getElementById('addButton').addEventListener('click', addTrack);

function addTrack() {
	/*var track = {
		title: title.value,
		artists: artist.value,
		album: album.value,
		genres: genre.value
	}*/

	var artistInfo = {
		name: name.value,
		genres: genre.value
	}

	console.log(artistInfo);

	var postOptions = {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(artistInfo)
	};
	console.log(postOptions);

	fetch('https://folksa.ga/api/artists?key=flat_eric', postOptions)
		.then((response) => response.json())
		.then((postedTrack) => {
			console.log(postedTrack);
		})
		.catch((error) => {
			console.log('Request failed: ', error);
		});
}
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

document.getElementById('addCategory').addEventListener('change', function () {
	formInputFields();
	inputFields.title.style.display = 'none';
	inputFields.name.style.display = 'none';
	inputFields.artist.style.display = 'none';
	inputFields.album.style.display = 'none';
	inputFields.genre.style.display = 'none';
	inputFields.createdBy.style.display = 'none';
	inputFields.addButton.style.display = 'none';
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
			inputFields.addButton.style.display = 'inline-block';
			break;
		case 'Artist':
			inputFields.name.style.display = 'inline-block';
			inputFields.genre.style.display = 'inline-block';
			inputFields.addButton.style.display = 'inline-block';
			break;
		case 'Album':
			inputFields.title.style.display = 'inline-block';
			inputFields.artist.style.display = 'inline-block';
			inputFields.genre.style.display = 'inline-block';
			inputFields.addButton.style.display = 'inline-block';
			break;
		case 'Playlist':
			inputFields.title.style.display = 'inline-block';
			inputFields.createdBy.style.display = 'inline-block';
			inputFields.addButton.style.display = 'inline-block';
			break;
	}
}

function formInputFields() {
	return inputFields = {
		title: document.getElementById('title'),
		name: document.getElementById('name'),
		artist: document.getElementById('artist'),
		album: document.getElementById('album'),
		genre: document.getElementById('genre'),
		createdBy: document.getElementById('createdBy'),
		addButton: document.getElementById('addButton')
	}
}

document.getElementById('addButton').addEventListener('click', function () {
	switch (addCategory.value) {
		case 'Artist':
			addArtist();
			break;
		case 'Album':
			addArtist().then(addAlbum);
			break;
		case 'Track':
			addArtist().then(addAlbum).then(addTrack);
			break;
		case 'Playlist':
			addPlaylist();
			break;
	}
});

function addArtist() {
	var artistInfo = {
		name: document.querySelector('#name input').value,
		genres: document.querySelector('#genre input').value,
	}

	var postOptions = {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(artistInfo)
	};

	return fetch('https://folksa.ga/api/artists?key=flat_eric', postOptions)
		.then((response) => response.json())
		.then((postedArtist) => {
			var newArtist = postedArtist;
			return newArtist;
		})
		.catch((error) => {
			console.log('Request failed: ', error);
		});
}

function addAlbum(newArtist) {
	var albumInfo = {
		title: document.querySelector('#title input').value,
		artists: newArtist._id,
		genres: document.querySelector('#genre input').value
	}

	var postOptions = {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(albumInfo)
	};

	return fetch('https://folksa.ga/api/albums?key=flat_eric', postOptions)
		.then((response) => response.json())
		.then((postedAlbum) => {
			var newAlbum = postedAlbum;
			return newAlbum;
		})
		.catch((error) => {
			console.log('Request failed: ', error);
		});
}

function addTrack(newAlbum) {
	console.log(newAlbum);
	var trackInfo = {
		title: document.querySelector('#title input').value,
		artists: newAlbum.artists.join(','),
		album: newAlbum._id,
		genres: document.querySelector('#genre input').value
	}

	console.log(trackInfo);
	var postOptions = {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(trackInfo)
	};

	console.log(postOptions);

	fetch('https://folksa.ga/api/tracks?key=flat_eric', postOptions)
		.then((response) => response.json())
		.then((postedTrack) => {
		console.log(postedTrack);
		})
		.catch((error) => {
			console.log('Request failed: ', error);
		});
}

function addPlaylist() {
	var PlaylistInfo = {
		title: document.querySelector('#title input').value,
		createdBy: document.querySelector('#createdBy input').value
	}
	var postOptions = {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(PlaylistInfo)
	};

fetch('https://folksa.ga/api/playlists?key=flat_eric', postOptions)
		.then((response) => response.json())
		.then((postedPlaylist) => {
			console.log(postedPlaylist);
		})
		.catch((error) => {
			console.log('Request failed: ', error);
		});
}
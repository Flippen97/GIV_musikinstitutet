({
	"plugins": ["jsdom-quokka-plugin"]
})
//Parameters for search menu

var searchInput = document.getElementById('searchInput');
var searchOption = document.getElementById('searchOption');
var searchCategory = document.getElementById('searchCategory');
const searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", searchResult);



//fetch all search results based on parameters
function searchResult() {

	fetch(`https://folksa.ga/api/${searchCategory.value}?${searchOption.value}=${searchInput.value}&populateArtists=true&key=flat_eric`)
		.then((response) => response.json())
		.then((searchResult) => {
			if (searchCategory.value == "tracks") {
				alert("track")
				displayTrackSearch(searchResult);
			} else if (searchCategory.value == "artists") {
				alert("artists")
				displayArtistSearch(searchResult);
			} else if (searchCategory.value == "albums") {
				alert("albums")
				displayAlbumSearch(searchResult)
			} else if (searchCategory.value == "playlists") {
				alert("playlists")
				displayPlaylistSearch(searchResult)
			}
		})
		.catch((error) => {
			console.log(error);
			alert('error');
		});
}

function genres(input) {
	var genre = '';
	for (let i = 0; i < input.length; i++) {
		genre += `${input[i]} `;
	}
	return genre;
}

function artists(input) {
	var artist = '';
	for (let i = 0; i < input.length; i++) {
		artist += `${input[i].name} `;
	}
	return artist;
}

function displayArtistSearch(searchResult) {
	var resultList = document.getElementById('resultList');
	resultList.innerHTML = '';
	for (let i = 0; i < searchResult.length; i++) {

		var resultItem = document.createElement('li');
		resultItem.innerHTML =
			`<p>Name: ${searchResult[i].name}</p>
             <p>Genre: ${genres(searchResult[i].genres)}</p>
             <button class="delete" name="artists" id=${searchResult[i]._id}>Delete</button>
             `;
		resultList.appendChild(resultItem);
	}
	deleteButtons();
}

function displayTrackSearch(searchResult) {
	var resultList = document.getElementById('resultList');
	resultList.innerHTML = '';
	for (let i = 0; i < searchResult.length; i++) {
		var resultItem = document.createElement('li');
		resultItem.innerHTML =
			`<h3>Title: ${searchResult[i].title}</h3>
			<p>Artist: ${artists(searchResult[i].artists)}</p>
			<p>Genre: ${genres(searchResult[i].genres)}</p>
            <div class="hidden">
                <p>Album: ${searchResult[i].album.title}</p>
				<p>${searchResult[i].ratings}</p>
				<h4>Rate track</h4>
				<h4>Add to playlist</h4>
				<label for="addToPlaylist">Playlist name</label>
				<input type="text" id="addToPlaylist">
				<button>Submit</button>
            </div>
			<button class="show">Show more</button>
			<button class="delete" name="tracks" id=${searchResult[i]._id}>Delete track</button>`;
		resultItem.id = 
		resultList.appendChild(resultItem);
	}
	showMoreButtons();
	deleteButtons();
}

function displayPlaylistSearch(searchResult) {
	var resultList = document.getElementById('resultList');
	resultList.innerHTML = '';
	for (let i = 0; i < searchResult.length; i++) {

		var resultItem = document.createElement('li');
		resultItem.innerHTML =
			`<p>Playlist: ${searchResult[i].title}</p>
             <p>Genre: ${searchResult[i].genres}</p>
             <button class="delete" name="playlists" id=${searchResult[i]._id}>Delete</button>
            `;
		resultList.appendChild(resultItem);
	}
	showMoreButtons();
	deleteButtons();
}

function displayAlbumSearch(searchResult) {
	var resultList = document.getElementById('resultList');
	resultList.innerHTML = '';
	for (let i = 0; i < searchResult.length; i++) {

		var resultItem = document.createElement('li');
		resultItem.innerHTML =
			`<p>Album title: ${searchResult[i].title}</p>
      <p>Artist: ${artists(searchResult[i].artists)}</p>
      
      <div class="hidden">
          <h4>Rate track</h4>
          
      </div>
      <button class="show">Show more</button>
      <button class="delete" name="albums" id=${searchResult[i]._id}>Delete track</button>`;
		resultList.appendChild(resultItem);
	}
	showMoreButtons();
	deleteButtons();
}

//Show more button for every result item. It shows the content of a hidden div.

function showMoreButtons() {
	var showButtons = document.getElementsByClassName("show");
	for (button of showButtons) {
		button.addEventListener("click", function () {
			var hiddenDiv = this.previousElementSibling;
			hiddenDiv.classList.toggle("hidden");

			if (this.innerHTML == "Show more") {
				this.innerHTML = "Hide"
			} else if (this.innerHTML == "Hide") {
				this.innerHTML = "Show more";
			}
		})
	}

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
addCategory.addEventListener('change', showForm);

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

	var postOptions = {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(trackInfo)
	};

	fetch('https://folksa.ga/api/tracks?key=flat_eric', postOptions)
		.then((response) => response.json())
		.then((postedTrack) => {

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

		})
		.catch((error) => {
			console.log('Request failed: ', error);
		});
}

//Add comment to playlist
function addCommentPlaylist() {
	/*
	  let comment = {
	    playlist: "5aae312ee3534b03981f6521",
	    body: "Wow, great playlist!",
	    username: "The commenter"
	  }

	  fetch(`https://folksa.ga/api/playlists/5aae312ee3534b03981f6521/comments`,{
	        method: 'POST',
	        headers: {
	            'Accept': 'application/json',
	            'Content-Type': 'application/json'
	        },
	        body: JSON.stringify(comment)
	    })
	    .then((response) => response.json())
	    .then((playlist) => {
	    console.log(playlist);
	  });*/
}

//Vote on 
function vote() {
	fetch(`https://folksa.ga/api/${category}/${categoryID}/vote`, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				rating: 9
			})
		})
		.then((response) => response.json())
		.then((playlist) => {
			console.log(playlist);
		});
}

//Deletefunction
function deleteButtons() {
	var deleteButtons = document.getElementsByClassName("delete");
	var deleteOptions = {
		method: 'DELETE',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		}
	};

	for (let button of deleteButtons) {
		button.addEventListener("click", function () {
			var itemToDelete = this.id;
			fetch(`https://folksa.ga/api/${this.name}/${this.id}?key=flat_eric`, deleteOptions)
				.then((response) => response.json())
				.then((deletedItem) => {
					//console.log(deletedItem);
				});
			var listItemToDelete = this.parentElement;
		listItemToDelete.parentNode.removeChild(listItemToDelete);
		})
	}
}
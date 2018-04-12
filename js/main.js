({
	"plugins": ["jsdom-quokka-plugin"]
})
//Parameters for search menu

searchParameters()

function searchParameters() {
	var searchInput = document.getElementById('searchInput');
	var searchOption = document.getElementById('searchOption');
	var searchCategory = document.getElementById('searchCategory');
	const searchButton = document.getElementById("searchButton");

	searchButton.addEventListener("click", function () {

		if (searchCategory.value == "artists" && searchOption.value == "title") {
			var URL = `https://folksa.ga/api/${searchCategory.value}?name=${searchInput.value}&key=flat_eric`;
		} else if (searchCategory.value == "albums") {
			var URL = `https://folksa.ga/api/${searchCategory.value}?${searchOption.value}=${searchInput.value}&populateArtists=true&key=flat_eric`;
		} else {
			var URL = `https://folksa.ga/api/${searchCategory.value}?${searchOption.value}=${searchInput.value}&key=flat_eric`;
		}
		searchResult(URL);
	});

}
//fetch all search results based on parameters
function searchResult(URL) {
	fetch(URL)
		.then((response) => response.json())
		.then((searchResult) => {
			if (searchCategory.value == "tracks") {
				displayTrackSearch(searchResult);
			} else if (searchCategory.value == "artists") {
				displayArtistSearch(searchResult);
			} else if (searchCategory.value == "albums") {
				displayAlbumSearch(searchResult)
			} else if (searchCategory.value == "playlists") {
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
		if (i >= 1) {
			genre += `, `;
		}
		genre += `${input[i]}`;
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

function loopOption1To10() {
	var option = '';
	for (let i = 1; i <= 10; i++) {
		option += `
    <option id="${[i]}">${[i]}</option>
    `;
	}
	return option
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
				<div class="rate">
            <h4>Rate Track</h4>
            <select id="vote">
              ${loopOption1To10()}
            </select>
            <button class="vote" name="tracks" id=${searchResult[i]._id}>vote</button>
          </div>
				<h4>Add to playlist</h4>
				<label for="addToPlaylist">Playlist name</label>
				<input type="text" class="addToPlaylistName">
				<button class="addToPlaylist" id=${searchResult[i]._id}
>Submit</button>
            </div>
			<button class="show">Show more</button>

			<button class="delete" name="tracks" id=${searchResult[i]._id}>Delete track</button>`;
		resultItem.id =
			resultList.appendChild(resultItem);
	}
	showMoreButtons();
	deleteButtons();
	eventlistnerVote();
	addTrackToPlaylist();

}

function displayPlaylistSearch(searchResult) {
	var resultList = document.getElementById('resultList');
	resultList.innerHTML = '';
	for (let i = 0; i < searchResult.length; i++) {

		var resultItem = document.createElement('li');
		resultItem.innerHTML =
			` <p>Playlist: ${searchResult[i].title}</p>
        <p>Genre: ${searchResult[i].genres}</p>
        <div class="hidden">
          <div class="rate">
            <h4>Rate Playlist</h4>
            <select id="vote">
              ${loopOption1To10()}
            </select>
            <button class="vote" name="playlists" id=${searchResult[i]._id}>vote</button>
          </div>
          <div class="comment-section">
            <input type="text" id="commentUserName">
            <input type="text" id="commentContent">
            <button class="comment" id=${searchResult[i]._id}>Comment</button>
          </div>
        </div>
        <button class="show">Show more</button>
        <button class="delete" name="playlists" id=${searchResult[i]._id}>Delete</button>

            `;
		resultList.appendChild(resultItem);
	}
	showMoreButtons();
	deleteButtons();
	eventlistnerAddcommentPlaylist()
	eventlistnerVote()
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
        <div class="rate">
          <h4>Rate Album</h4>
          <select id="vote">
            ${loopOption1To10()}
          </select>
          <button class="vote" name="albums" id=${searchResult[i]._id}>vote</button>
        </div>
      </div>
      <button class="show">Show more</button>
      <button class="delete" name="albums" id=${searchResult[i]._id}>Delete track</button>`;
		resultList.appendChild(resultItem);
	}
	showMoreButtons();
	deleteButtons();
	eventlistnerVote()
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
			inputFields.artist.style.display = 'inline-block';
			inputFields.genre.style.display = 'inline-block';
			inputFields.addButton.style.display = 'inline-block';
			break;
		case 'Album':
			inputFields.album.style.display = 'inline-block';
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
			addArtist().then(clearInputFields);
			break;
		case 'Album':
			addArtist().then(addAlbum).then(clearInputFields);
			break;
		case 'Track':
			addArtist().then(addAlbum).then(addTrack).then(clearInputFields);
			break;
		case 'Playlist':
			addPlaylist().then(clearInputFields);
			break;
	}
});

function addArtist() {
	var artistInfo = {
		name: document.querySelector('#artist input').value,
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
		title: document.querySelector('#album input').value,
		artists: newArtist._id,
		genres: document.querySelector('#genre input').value
	}
	console.log(albumInfo);
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
			console.log(newAlbum);
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
		.then((postedTrack) => {})
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
		.then((postedPlaylist) => {})
		.catch((error) => {
			console.log('Request failed: ', error);
		});
}

function eventlistnerAddcommentPlaylist() {
	var commentButtons = document.getElementsByClassName("comment");
	for (let commentButton of commentButtons) {
		commentButton.addEventListener("click", function () {
			addCommentPlaylist(this);
		})
	}
}


//Add comment to playlist
function addCommentPlaylist(commentParameters) {
	let comment = {
		playlist: commentParameters.id,
		body: commentParameters.previousElementSibling.value,
		username: commentParameters.previousElementSibling.previousElementSibling.value
	}

	fetch(`https://folksa.ga/api/playlists/${commentParameters.id}/comments?key=flat_eric`, {
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
		});
}


function eventlistnerVote() {
	var votes = document.getElementsByClassName("vote");
	for (let vote of votes) {
		vote.addEventListener("click", function () {
			voting(this);
		})
	}
}

//Vote on 
function voting(voteParameters) {
	var category = voteParameters.name;
	var categoryId = voteParameters.id;
	var rating = voteParameters.previousElementSibling.value;

	fetch(`https://folksa.ga/api/${category}/${categoryId}/vote?key=flat_eric`, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				rating: rating
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
					succesMessage("Item was deleted");
				});
			var listItemToDelete = this.parentElement;
			listItemToDelete.parentNode.removeChild(listItemToDelete);
		})
	}
}

//Add track to playlist
function addTrackToPlaylist() {
	let addToPlaylistButtons = document.getElementsByClassName("addToPlaylist");
	let playlistId;
	var trackId;

	var postOptions = {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			tracks: trackId
		})
	};
	
	for (let button of addToPlaylistButtons) {
		button.addEventListener("click", function () {
			trackId = this.id;
			console.log(this.id);
			console.log(postOptions);
			findPlaylist().then(addToPlaylist);
		})
	}

	function findPlaylist() {
		let usersPlaylistInput = document.getElementsByClassName("addToPlaylistName");
		fetch('https://folksa.ga/api/playlists?key=flat_eric')
			.then((response) => response.json())
			.then((fetchedPlaylists) => {
				for (playlist of fetchedPlaylists)
					for (userInput of usersPlaylistInput) {
						if (playlist[title] == userInput.value) {
							playlistId = playlist._id;
						} else {
							continue
						};
					};
			console.log(playlistId);
			})
			.catch((error) => {
				console.log('Request failed: ', error);
			});
	}
	function addToPlaylist() {
	fetch(`https://folksa.ga/api/playlist/${playlistId}/${trackId}?key=flat_eric`, postOptions)
		.then((response) => response.json())
		.then((postedTrackToPlaylist) => {
		console.log(postedTrackToPlaylist);
	})
		.catch((error) => {
			console.log('Request failed: ', error);
		});
}
}

//Feedback messages
function errorMessage(errortext) {
	var error = document.getElementById('errormessage');
	error.style.display = 'block';
	error.classList.add('fadeIn');
	document.getElementById("errormessage").innerHTML = errortext;
	setTimeout(function () {
		error.classList.add('fadeOut');
		setTimeout(function () {
			error.style.display = 'none';
			error.classList.remove("fadeOut");
		}, 800);
	}, 2000);
}

function succesMessage(succestext) {

	var succes = document.getElementById('succesmessage');
	succes.style.display = 'block';
	succes.classList.add('fadeIn');
	document.getElementById("succesmessage").innerHTML = succestext;
	setTimeout(function () {
		succes.classList.add('fadeOut');
		setTimeout(function () {
			succes.style.display = 'none';
			succes.classList.remove("fadeOut");
		}, 800);
	}, 2000);
}

function clearInputFields() {
	var inputFields = document.querySelectorAll('.addNew input');
	for (let i = 0; i < inputFields.length; i++) {
		inputFields[i].value = '';
	}
}
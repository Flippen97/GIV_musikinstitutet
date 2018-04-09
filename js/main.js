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

fetch(`https://folksa.ga/api/${searchCategory.value}?${searchOption.value}=${searchInput.value}&key=flat_eric`)
		.then((response) => response.json())
		.then((searchResult) => {
            console.log(searchResult);
            displayPlaylistSearch(searchResult);
		})
		.catch((error) => {
			console.log(error);
			alert('error');
		});
}
 function genres(input){
        var genre = "";
        for (let i = 0; i < input.length; i++ ){
            genre += `${input[i]} `;
            
        }
        return genre;
    }
function displayArtistSearch(searchResult){
    var resultList = document.getElementById('resultList');
    for (let i = 0; i < searchResult.length; i++ ){

        var resultItem = document.createElement('li');
        resultItem.innerHTML = 
            `<p>Name: ${searchResult[i].name}</p>
             <p>Genre: ${genres(searchResult[i].genres)}</p>
             <button>Delete</button>
             `;
        
        resultList.appendChild(resultItem);
        console.log(searchResult[i]);
    }
}
function displaySearchResult(searchResult){
    var resultList = document.getElementById('resultList');
    for (let i = 0; i < searchResult.length; i++ ){

        var resultItem = document.createElement('li');
        resultItem.innerHTML = 
            `<p>${searchResult[i].title}</p>
            <track>
            <div class="hidden">
                <rating>
            </div>`;
        
        resultList.appendChild(resultItem);
        console.log(searchResult[i]);
    }
}
function displayPlaylistSearch(searchResult){
    var resultList = document.getElementById('resultList');
    for (let i = 0; i < searchResult.length; i++ ){

        var resultItem = document.createElement('li');
        resultItem.innerHTML = 
            `<p>Playlist: ${searchResult[i].title}</p>
             <p>Genre: ${searchResult[i].genres}</p>
             <buttons>Delete</button>
                <rating>
            </div>`;
        
        resultList.appendChild(resultItem);
        console.log(searchResult[i]);
    }
}
function displaySearchResult(searchResult){
    var resultList = document.getElementById('resultList');
    for (let i = 0; i < searchResult.length; i++ ){

        var resultItem = document.createElement('li');
        resultItem.innerHTML = 
            `<p>${searchResult[i].title}</p>
            <track>
            <div class="hidden">
                <rating>
            </div>`;
        
        resultList.appendChild(resultItem);
        console.log(searchResult[i]);
    }
}
function displaySearchResult(searchResult){
    var resultList = document.getElementById('resultList');
    for (let i = 0; i < searchResult.length; i++ ){

        var resultItem = document.createElement('li');
        resultItem.innerHTML = 
            `<p>${searchResult[i].title}</p>
            <track>
            <div class="hidden">
                <rating>
            </div>`;
        
        resultList.appendChild(resultItem);
        console.log(searchResult[i]);
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
function addCommentPlaylist(){
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
function vote(){
  fetch(`https://folksa.ga/api/${category}/${categoryID}/vote`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ rating: 9 })
    })
    .then((response) => response.json())
    .then((playlist) => {
        console.log(playlist);
    });
}

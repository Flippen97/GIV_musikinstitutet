class Controller {
  searchParameters() {
    //Parameters for search menu
    var searchInput = document.getElementById('searchInput');
    var searchOption = document.getElementById('searchOption');
    var searchCategory = document.getElementById('searchCategory');
    const searchButton = document.getElementById("searchButton");
    const message = new Utility();
    searchButton.addEventListener("click", function () {
      if (searchInput.value == "") {
        return message.errorMessage("Write something in the search field!");
      } else if (searchCategory.value == "artists" && searchOption.value == "title") {
        var URL = `https://folksa.ga/api/${searchCategory.value}?name=${searchInput.value}&key=flat_eric`;
      } else if (searchCategory.value == "albums") {
        var URL = `https://folksa.ga/api/${searchCategory.value}?${searchOption.value}=${searchInput.value}&populateArtists=true&key=flat_eric`;
      } else {
        var URL = `https://folksa.ga/api/${searchCategory.value}?${searchOption.value}=${searchInput.value}&key=flat_eric`;
      }
      const searchFetch = new Fetch();
      searchFetch.searchResult(URL);
    });
  }

  //Show more button for every result item. It shows the content of a hidden div.
  showMoreButtons() {
    var showButtons = document.getElementsByClassName("show");
    for (let button of showButtons) {
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

  eventlistenerButtons() {
    this.showMoreButtons();
    this.deleteButtons();
    this.eventlistenerVote();
  }

  addButtonEventlistener() {
    const addContent = new Fetch();
    const clearInput = new Utility();
    document.getElementById('addButton').addEventListener('click', function () {
      switch (addCategory.value) {
        case 'Artist':
          addContent.addArtist().then(clearInput.clearInputFields);
          break;
        case 'Album':
          addContent.addArtist().then(addContent.addAlbum).then(clearInput.clearInputFields);
          break;
        case 'Track':
          addContent.addArtist().then(addContent.addAlbum).then(addContent.addTrack).then(clearInput.clearInputFields);
          break;
        case 'Playlist':
          addContent.addPlaylist().then(clearInput.clearInputFields);
          break;
      }
    });
  }

  eventlistenerAddcommentPlaylist() {
    var commentButtons = document.getElementsByClassName("comment");
    for (let commentButton of commentButtons) {
      commentButton.addEventListener("click", function () {
        const addComment = new Fetch();
        addComment.addCommentPlaylist(this);
      })
    }
  }

  eventlistenerVote() {
    var votes = document.getElementsByClassName("vote");
    for (let vote of votes) {
      vote.addEventListener("click", function () {
        const addVote = new Fetch();
        addVote.voting(this);
      })
    }
  }
  deleteButtons() {
    var deleteButtons = document.getElementsByClassName("delete");
    for (let button of deleteButtons) {
      button.addEventListener("click", function () {
        const deleteFetch = new Fetch();
        deleteFetch.deleteItem(this, this.id)
      })
    }
  }

  deleteCommentButtons(input) {
    console.log(input);
    var deleteButton = document.getElementById(`delete${input}`);
    deleteButton.addEventListener("click", function () {
      const deleteFetch = new Fetch();
      deleteFetch.deleteItem(this, this.dataset.id)
    })
  }

}


class Fetch {
  constructor() {
    this.utility = new Utility();
  }
  //fetch all search results based on parameters
  searchResult(URL) {
    fetch(URL)
      .then((response) => response.json())
      .then((searchResult) => {
        console.log(searchResult)
        const displaySearchDOM = new DOM;
        if (searchResult.length == 0) {
          return this.utility.errorMessage("Could not find what you were looking for!!")
        } else if (searchCategory.value == "tracks") {
          displaySearchDOM.displayTrackSearch(searchResult);
          this.utility.succesMessage("You searched for track");

        } else if (searchCategory.value == "artists") {
          displaySearchDOM.displayArtistSearch(searchResult);
          this.utility.succesMessage("You searched for artist");

        } else if (searchCategory.value == "albums") {
          displaySearchDOM.displayAlbumSearch(searchResult)
          this.utility.succesMessage("You searched for album");

        } else if (searchCategory.value == "playlists") {
          displaySearchDOM.displayPlaylistSearch(searchResult)
          this.utility.succesMessage("You searched for playlist");
        }
      })
      .catch((error) => {
        console.log(error);
        this.utility.errorMessage(`Request failed: Could not fetch search`);
      });;
  }

  getCommentsPlaylist(playlistId) {
    var array = [];
    fetch(`https://folksa.ga/api/playlists/${playlistId}/comments?key=flat_eric`)
      .then((response) => response.json())
      .then((comments) => {
        const displayCommentsDOM = new DOM;
        displayCommentsDOM.listCommments(comments, playlistId)
      })
      .catch((error) => {
        console.log(error)
        this.utility.errorMessage(`Request failed: Could not fetch comments`);
      });
  }

  addArtist() {
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

    if (artistInfo.name == "" || artistInfo.genres == "") {
      alert("Fill in all the fields!");
      return this.utility.errorMessage(`Fill in all the fields!`);
    }

    return fetch('https://folksa.ga/api/artists?key=flat_eric', postOptions)
      .then((response) => response.json())
      .then((postedArtist) => {
        var newArtist = postedArtist;
        this.utility.succesMessage("Artist was added");
        return newArtist;
      })
      .catch((error) => {
        this.utility.errorMessage(`Request failed: Could not ad artist`);
      });
  }

  addAlbum(newArtist) {
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

    if (albumInfo.title == "" || albumInfo.artists == "" || albumInfo.genres == "") {
      alert("Fill in all the fields!");
      return this.utility.errorMessage(`Fill in all the fields!`);
    }

    return fetch('https://folksa.ga/api/albums?key=flat_eric', postOptions)
      .then((response) => response.json())
      .then((postedAlbum) => {
        var newAlbum = postedAlbum;
        console.log(newAlbum);
        this.utility.succesMessage("Album was added");
        return newAlbum;
      })
      .catch((error) => {
        this.utility.errorMessage(`Request failed: Could not ad album`);
      });
  }

  addTrack(newAlbum) {
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

    if (trackInfo.title == "" || trackInfo.artists == "" || trackInfo.album == "" || trackInfo.genres == "") {
      alert("Fill in all the fields!");
      return this.utility.errorMessage(`Fill in all the fields!`);
    }

    fetch('https://folksa.ga/api/tracks?key=flat_eric', postOptions)
      .then((response) => response.json())
      .then((postedTrack) => {
        this.utility.succesMessage("Track was added");
      })
      .catch((error) => {
        this.utility.errorMessage(`Request failed: Could not ad track`);
      });
  }

  addPlaylist() {
    var playlistInfo = {
      title: document.querySelector('#title input').value,
      createdBy: document.querySelector('#createdBy input').value
    }
    var postOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(playlistInfo)
    };

    if (playlistInfo.title == "" || playlistInfo.createdBy == "") {
      alert("Fill in all the fields!");
      return this.utility.errorMessage(`Fill in all the fields!`);
    }

    fetch('https://folksa.ga/api/playlists?key=flat_eric', postOptions)
      .then((response) => response.json())
      .then((postedPlaylist) => {
        this.utility.succesMessage("Playlist was added");
      })
      .catch((error) => {
        this.utility.errorMessage(`Request failed: Could not ad playlist`);
      });
  }


  addCommentPlaylist(commentParameters) {
    let comment = {
      playlist: commentParameters.id,
      body: commentParameters.previousElementSibling.value,
      username: commentParameters.previousElementSibling.previousElementSibling.previousElementSibling.value
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
        this.utility.succesMessage("Comment was added");
      })
      .catch((error) => {
        this.utility.errorMessage(`Request failed: Could not ad comment`);
      });
  }

  voting(voteParameters) {
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
        this.utility.succesMessage("Vote has been added");
      })
      .catch((error) => {
        this.utility.errorMessage(`Request failed: Could not add vote`);
      });
  }

  fetchTopList(category) {
    fetch(`https://folksa.ga/api/${category}?limit=999&key=flat_eric`)
      .then((response) => response.json())
      .then((categoryTopList) => {
        var topListarray = [];
        const theMean = new Utility;
        for (let i = 0; i < categoryTopList.length; i++) {
          var rating = categoryTopList[i].ratings;
          if (rating.length) {
            var obj = {
              title: categoryTopList[i].title,
              rating: theMean.calculateMeanRating(rating),
            };
            topListarray.push(obj)
          }
        }
        topListarray.sort(function (a, b) {
          return b.rating - a.rating;
        });
        const listTopFive = new DOM;
        listTopFive.listTopLists(topListarray, category);
      });
  }

  deleteItem(button, deleteId) {
    var deleteOptions = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    };
    fetch(`https://folksa.ga/api/${button.name}/${deleteId}?key=flat_eric`, deleteOptions)
      .then((response) => response.json())
      .then((deletedItem) => {
        this.utility.succesMessage("Item was deleted");
      })
      .catch((error) => {
        console.log(error)
        this.utility.errorMessage(`Request failed: Could not delete object`);
      });
    var listItemToDelete = button.parentElement;
    listItemToDelete.parentNode.removeChild(listItemToDelete);
  }

}


class DOM {
  constructor() {
    this.utility = new Utility();
  }
  displayArtistSearch(searchResult) {
    var resultList = document.getElementById('resultList');
    resultList.innerHTML = '';
    for (let i = 0; i < searchResult.length; i++) {

      var resultItem = document.createElement('li');
      resultItem.innerHTML =
        `<p>Name: ${searchResult[i].name}</p>
               <p>Genre: ${this.utility.genres(searchResult[i].genres)}</p>
               <button class="delete" name="artists" id=${searchResult[i]._id}>Delete</button>
               `;

      resultList.appendChild(resultItem);
    }
    const deleteButton = new Controller();
    deleteButton.deleteButtons();
  }

  displayTrackSearch(searchResult) {
    var resultList = document.getElementById('resultList');
    resultList.innerHTML = '';
    for (let i = 0; i < searchResult.length; i++) {
      var resultItem = document.createElement('li');
      resultItem.innerHTML =
        `<h3>Title: ${searchResult[i].title}</h3>
        <p>Artist: ${this.utility.artists(searchResult[i].artists)}</p>
        <p>Genre: ${this.utility.genres(searchResult[i].genres)}</p>
        <div class="hidden">
          <p>Album: ${searchResult[i].album.title}</p>
          <p>Rating: ${this.utility.calculateMeanRating(searchResult[i].ratings)}</p>
          <div class="rate">
              <h4>Rate Track</h4>
              <select id="vote">
                ${this.utility.loopOption1To10()}
              </select>
              <button class="vote" name="tracks" id=${searchResult[i]._id}>vote</button>
            </div>
          <h4>Add to playlist</h4>
          <label for="addToPlaylist">Playlist name</label>
          <input type="text" id="addToPlaylist">
          <button id="addToPlaylistButton">Submit</button>
              </div>
        <button class="show">Show more</button>
  
        <button class="delete" name="tracks" id=${searchResult[i]._id}>Delete track</button>`;
      resultItem.id =
        resultList.appendChild(resultItem);
    }
    const eventlistenersButton = new Controller;
    eventlistenersButton.eventlistenerButtons();

  }

  displayPlaylistSearch(searchResult) {
    var resultList = document.getElementById('resultList');

    resultList.innerHTML = '';
    for (let i = 0; i < searchResult.length; i++) {
      var resultItem = document.createElement('li');
      resultItem.innerHTML =
        ` <p>Playlist: ${searchResult[i].title}</p>
          <p>Genre: ${this.utility.genres(searchResult[i].genres)}</p>
          <div class="hidden">
            <div class="list-tracks">
              ${this.utility.loopTracksPlaylist(searchResult[i].tracks)}
            </div>
            <div class="rate">
            <p>Rating: ${this.utility.calculateMeanRating(searchResult[i].ratings)}</p>
              <h4>Rate Playlist</h4>
              <select id="vote">
                ${this.utility.loopOption1To10()}
              </select>
              <button class="vote" name="playlists" id=${searchResult[i]._id}>vote</button>
            </div>
            <div class="comment-section">
              <div class="list-of-comments" id="comment${searchResult[i]._id}"></div>
              <h4>Comment Playlist</h4>
              <label for="commentUserName"> Name: </label>
              <input type="text" id="commentUserName">
              <label for="commentContent">Content:</label>
              <input type="text" id="commentContent">
              <button class="comment" id=${searchResult[i]._id}>Comment</button>
            </div>
          </div>
          <button class="show">Show more</button>
          <button class="delete" name="playlists" id=${searchResult[i]._id}>Delete</button>
  
              `;
      resultList.appendChild(resultItem);
      const fetchComments = new Fetch();
      fetchComments.getCommentsPlaylist(searchResult[i]._id)
    }
    const eventlistenersButton = new Controller();
    eventlistenersButton.eventlistenerButtons();
    eventlistenersButton.eventlistenerAddcommentPlaylist();

  }

  displayAlbumSearch(searchResult) {
    var resultList = document.getElementById('resultList');
    resultList.innerHTML = '';
    for (let i = 0; i < searchResult.length; i++) {
      var resultItem = document.createElement('li');
      resultItem.innerHTML =
        `<p>Album title: ${searchResult[i].title}</p>
        <p>Artist: ${this.utility.artists(searchResult[i].artists)}</p>
        
        <div class="hidden">
          <div class="rate">
          <p>Rating: ${this.utility.calculateMeanRating(searchResult[i].ratings)}</p>
            <h4>Rate Album</h4>
            <select id="vote">
              ${this.utility.loopOption1To10()}
            </select>
            <button class="vote" name="albums" id=${searchResult[i]._id}>vote</button>
          </div>
        </div>
        <button class="show">Show more</button>
        <button class="delete" name="albums" id=${searchResult[i]._id}>Delete Album</button>`;
      resultList.appendChild(resultItem);
    }
    const eventlistenersButton = new Controller;
    eventlistenersButton.eventlistenerButtons();
  }


  listCommments(comments, playlistId) {
    var listOfComments = document.getElementById(`comment${playlistId}`);

    var comment = '';
    for (let i = 0; i < comments.length; i++) {
      comment += `
        <div class="comment">
        <p>Username: ${comments[i].username}</p>
        <p>Content: ${comments[i].body}</p>
        <button class="delete" name="comments" data-id="${comments[i]._id}" id="delete${comments[i]._id}">Delete comment</button>
        </div>
        `;
    }
    listOfComments.innerHTML = comment;
    for (let i = 0; i < comments.length; i++) {
      const deletebutton = new Controller;
      deletebutton.deleteCommentButtons(comments[i]._id)
    }
  }

  listTopLists(topListarray, category) {

    var listOfTopList = "";
    for (let i = 0; i < 5; i++) {
      listOfTopList += `
      <li>
      <p>${[i + 1]}:  ${topListarray[i].title}</p>
      </li>
      `;
    }
    if (category == "playlists") {
      const topPlaylist = document.getElementById("topPlaylists");
      topPlaylist.innerHTML = listOfTopList;
    } else if (category == "albums") {
      const topAlbums = document.getElementById("topAlbums");
      topAlbums.innerHTML = listOfTopList;
    } else if (category == "tracks") {
      const topTracks = document.getElementById("topTracks");
      topTracks.innerHTML = listOfTopList;
    }

  }

}

class FormAddNew {

  hideShowInputField() {
    document.getElementById('addCategory').addEventListener('change', function () {
      const formInputField = new FormAddNew();
      var inputFields = formInputField.formInputFields();

      inputFields.title.style.display = 'none';
      inputFields.artist.style.display = 'none';
      inputFields.album.style.display = 'none';
      inputFields.genre.style.display = 'none';
      inputFields.createdBy.style.display = 'none';
      inputFields.addButton.style.display = 'none';
    })

    let addCategory = document.getElementById('addCategory');
    addCategory.addEventListener('change', function () {
      const showFormDOM = new FormAddNew();
      showFormDOM.showForm();
    });

  }

  formInputFields() {
    let inputFields = {
      title: document.getElementById('title'),
      artist: document.getElementById('artist'),
      album: document.getElementById('album'),
      genre: document.getElementById('genre'),
      createdBy: document.getElementById('createdBy'),
      addButton: document.getElementById('addButton')
    }
    return inputFields;
  }


  showForm() {
    var inputFields = this.formInputFields();
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
}

class Utility {
  calculateMeanRating(ratings) {
    if (ratings === undefined || ratings.length == 0) {
      return 0
    } else {
      var total = 0,
        i;
      for (i = 0; i < ratings.length; i += 1) {
        total += ratings[i];
      }
      var sum = total / ratings.length
      var twoDecimilSum = sum.toFixed(2);
      return twoDecimilSum;
    }
  }

  clearInputFields() {
    var inputFields = document.querySelectorAll('.addNew input');
    for (let i = 0; i < inputFields.length; i++) {
      inputFields[i].value = '';
    }
  }

  genres(input) {
    var genre = '';
    for (let i = 0; i < input.length; i++) {
      if (i >= 1) {
        genre += `, `;
      }
      genre += `${input[i]}`;
    }
    return genre;
  }
  artists(artists) {
    var artist = '';
    for (let i = 0; i < artists.length; i++) {
      artist += `${artists[i].name} `;
    }
    return artist;
  }

  loopOption1To10() {
    var option = '';
    for (let i = 1; i <= 10; i++) {
      option += `
      <option id="${[i]}">${[i]}</option>
      `;
    }
    return option
  }

  loopTracksPlaylist(tracks) {
    var track = '';
    for (let i = 0; i < tracks.length; i++) {
      track += `<p>Track${[i + 1]}: ${tracks[i].title}</p>`;
    }
    return track;
  }

  errorMessage(errortext) {
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

  succesMessage(succestext) {
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
}

const searchController = new Controller;
searchController.searchParameters();

const displayInputField = new FormAddNew;
displayInputField.hideShowInputField();

const addButton = new Controller;
addButton.addButtonEventlistener();

const fetchToplist = new Fetch();
fetchToplist.fetchTopList("playlists");
fetchToplist.fetchTopList("albums");
fetchToplist.fetchTopList("tracks");
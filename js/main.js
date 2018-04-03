({
  "plugins": ["jsdom-quokka-plugin"]
})
//Parameters for search menu



//fetch all search results based on parameters
function searchResult() {
  var searchInput = document.getElementById('searchInput');
  var searchOption = document.getElementById('searchOption');
  var searchCategory = document.getElementById('searchCategory');
  const searchButton = document.getElementById("searchButton");

  searchButton.addEventListener("click", searchResult);

  fetch(`https://folksa.ga/api/${searchCategory.value}?${searchOption.value}=${searchInput.value}&key=flat_eric`)
  .then((response) => response.json())
  .then((tracks) => {
    console.log(tracks);
    alert("hej");
  })
  .catch((error) => {
    console.log(error);
    alert('error');
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
//
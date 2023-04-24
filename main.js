// non-asynchronous fetch function goes here

async function getPosts() {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/posts?_limit=10'
  );
  const data = await response.json();
  showOutput(data);
  // const ids = data.map((data) => data.id);
  // const titles = data.title;

  // console.log(ids);
}

function showOutput(data) {
  const posts = data;
  // console.log(posts);
  let mainContainer = document.getElementById('data-div');
  let out = '';
  for (post of posts) {
    post.saved = false;
    out += `
    <div class="item" id="item">${post.userId}</div>
    <div class="item" id="item">${post.id}</div>
    <div class="item" id="item" onClick="savePost(${post.id}, '${post.title}')">${post.title}</div>
    <div class="item" id="item">${post.body}</div>
    <div class="item" id="item"><p id="saved">${post.saved}</p></div>
    `;
  }
  mainContainer.innerHTML = out;
}

getPosts();

function savePost(id, title) {
  let savedPost = {
    id: id,
    title: title,
    saved: true,
  };
  checkLocal(savedPost);
}

function getLocalPosts() {
  savedPostsJSON = localStorage.getItem('savedPosts');
  savedPosts = JSON.parse(savedPostsJSON);
}

function checkLocal(savedPost) {
  getLocalPosts();
  if (savedPosts == null) {
    savedPosts = [];
    savedPosts.push(savedPost);
    localStorage.setItem('savedPosts', JSON.stringify(savedPosts));
  } else {
    if (savedPosts.includes(savedPost) == false) {
      savedPosts.push(savedPost);
    }
    localStorage.setItem('savedPosts', JSON.stringify(savedPosts));
  }
}

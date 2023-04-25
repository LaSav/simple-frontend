// non-asynchronous fetch function goes here

async function getPosts() {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/posts?_limit=10'
  );
  const data = await response.json();
  showOutput(data);
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
    <div class="item" id="item" data-post-id="${post.id}" data-post-title="${post.title}">${post.title}</div>
    <div class="item" id="item">${post.body}</div>
    <div class="item" id="item"><p id="saved">${post.saved}</p></div>
    `;
  }
  mainContainer.innerHTML = out;

  const postElements = document.querySelectorAll('.item');
  postElements.forEach((postElement) => {
    postElement.addEventListener('click', (event) => {
      const postId = event.target.dataset.postId;
      const postTitle = event.target.dataset.postTitle;
      savePost(postId, postTitle);
    });
  });
}

getPosts();

function savePost(id, title) {
  let savedPost = {
    id: id,
    title: title,
    saved: true,
  };
  checkLocal(savedPost);
  console.log('saved posts', savedPosts);
  console.log('saved post', savedPost);
}

function getLocalPosts() {
  savedPostsJSON = localStorage.getItem('savedPosts');
  savedPosts = JSON.parse(savedPostsJSON);
}

function checkLocal(savedPost) {
  getLocalPosts();
  const index = savedPosts.findIndex((post) => post.id === savedPost.id);
  if (savedPosts == null) {
    savedPosts = [];
    savedPosts.push(savedPost);
    localStorage.setItem('savedPosts', JSON.stringify(savedPosts));
  } else {
    const exists = savedPosts.some(
      (post) => post.id === savedPost.id && post.title === savedPost.title
    );
    if (!exists) {
      savedPosts.push(savedPost);
      localStorage.setItem('savedPosts', JSON.stringify(savedPosts));
    }
    if (exists) {
      savedPosts.splice(index, 1);
      localStorage.setItem('savedPosts', JSON.stringify(savedPosts));
    }
  }
}

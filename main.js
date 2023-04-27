async function getPosts() {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/posts?_limit=10'
  );
  const data = await response.json();
  showOutput(data);
}

getLocalPosts();

function showOutput(data) {
  const posts = data;
  let mainContainer = document.getElementById('data-div');
  let out = '';
  for (post of posts) {
    post.saved = false;
    out += `
    <div class="item" id="item">${post.userId}</div>
    <div class="item" id="item">${post.id}</div>
    <div class="item-click" id="item" data-post-id="${post.id}" data-post-title="${post.title}">${post.title}</div>
    <div class="item" id="item">${post.body}</div>
    <div class="item" id="item"><p id="saved">${post.saved}</p></div>
    `;
  }
  mainContainer.innerHTML = out;

  const postElements = document.querySelectorAll('.item-click');

  // Set Event Listener on each HTML item
  postElements.forEach((postElement) => {
    const postElementId = postElement.dataset.postId;

    postElement.addEventListener('click', (event) => {
      const postId = event.target.dataset.postId;
      const postTitle = event.target.dataset.postTitle;
      savePost(postId, postTitle);
      // Toggle CSS class
      postElement.classList.toggle('selected');
    });

    postElement.addEventListener('mouseover', (event) => {
      console.log(postElementId);
    });

    // Compare Post elements to Local Storage Elements by id
    const exists = savedPosts.some((post) => post.id === postElementId);
    // Display selected Local Storage elements
    if (exists) {
      postElement.classList.toggle('selected');
    }
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
}

// Get Local Posts from Local Storage
function getLocalPosts() {
  savedPostsJSON = localStorage.getItem('savedPosts');
  savedPosts = JSON.parse(savedPostsJSON);
  if (savedPosts == null) {
    savedPosts = [];
    localStorage.setItem('savedPosts', JSON.stringify(savedPosts));
  }
}

function checkLocal(savedPost) {
  // Check for existing post in Local Storage
  const exists = savedPosts.some(
    (post) => post.id === savedPost.id && post.title === savedPost.title
  );
  // Add to Local Storage
  if (!exists) {
    savedPosts.push(savedPost);
    localStorage.setItem('savedPosts', JSON.stringify(savedPosts));
  }
  const index = savedPosts.findIndex((post) => post.id === savedPost.id);

  // Remove from Local Storage
  if (exists) {
    savedPosts.splice(index, 1);
    localStorage.setItem('savedPosts', JSON.stringify(savedPosts));
  }
}

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
    <div class="item">${post.userId}</div>
    <div class="item">${post.id}</div>
    <div class="item" onClick="save(${post.id}, '${post.title}')">${post.title}</div>
    <div class="item">${post.body}</div>
    <div class="item"><p id="saved">${post.saved}</p></div>
    `;
  }
  mainContainer.innerHTML = out;
}

getPosts();

let selectedPosts = [];

const savedPostsJSON = localStorage.getItem('savedPosts');
const savedPosts = JSON.parse(savedPostsJSON);
selectedPosts.push(savedPosts);

console.log('selected posts', selectedPosts);

function save(id, title) {
  let savedPost = {
    id: id,
    title: title,
    saved: true,
  };
  console.log(savedPost);

  if (selectedPosts.includes(savedPost) == false) {
    selectedPosts.push(savedPost);
  }

  localStorage.setItem('savedPosts', JSON.stringify(selectedPosts));
}

// console.log('parsed saved posts', savedPosts);

// for (savedPost of savedPosts) {
//   if (savedPost.saved === true) {
//     document.getElementById('saved').style.display = 'inline';
//   }
// }

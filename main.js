// non-asynchronous fetch function goes here

async function getPosts() {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/posts?_limit=10'
  );
  const data = await response.json();
  console.log(data);
  showOutput(data);
  // const ids = data.map((data) => data.id);
  // const titles = data.title;

  // console.log(ids);
}

function showOutput(data) {
  var mainContainer = document.getElementById('data-div');
  for (var i = 0; i < data.length; i++) {
    var div = document.createElement('div');
    div.innerHTML =
      'UserId: ' +
      ' ' +
      data[i].userId +
      ' ' +
      'id: ' +
      data[i].id +
      ' ' +
      'title: ' +
      ' ' +
      data[i].title +
      ' ' +
      'body: ' +
      data[i].body +
      `<button onClick="save(${data[i].id}, '${data[i].title}')">save</button>`;
    mainContainer.appendChild(div);
  }
}

getPosts();

let selectedPosts = [];

function save(id, title) {
  let savedPost = {
    id: id,
    title: title,
  };
  console.log(savedPost);

  selectedPosts.push(savedPost);

  localStorage.setItem('saved post', JSON.stringify(selectedPosts));
}

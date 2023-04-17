// non-asynchronous fetch function goes here

async function getPosts() {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/posts?_limit=10'
  );
  const data = await response.json();
  console.log(data);
  showOutput(data);
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
      data[i].body;
    mainContainer.appendChild(div);
  }
}

getPosts();

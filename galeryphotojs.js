const posts = [];
const images = [
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiCWt1hhRJECJeVpEuHijCPhdHuLQTxK9onwsOMP0nytezmQnDHZCP2lin6xrBsT2r7q-Aq7Dxnl6FlpO3Y3EfvlHH-mwCVT9Q5ZZnJcRqAYM9nKm_PP-P5Px9N452zruSt9opazK_CawZoLt-wz-X_Y6Eo-Z6-qwjrkh7ZyF_WBNEtUwZoEjq3esTQ/w353-h640/Genshin%20Impact,%20Xiao,%20Lumine.jpg',
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh_xYed_Co6C8GiDkoLc-sfgBjBZ6d7a6t-pXAYfrIjCllpufmSWKQNNKOaB-RZoqdc4ldQ86iikIK8ZMZOC6H6WOAeTuJAS5ab0AGHkaJOuK40V-gd-3BvtxGtBDTHyg8AXVVh9x5IpfzOzyvzxkb79uYv7CN-5n6b8jw3E55WSVOKy5pb5edPl321/w336-h640/klee.jpg',
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiuOmQLJOL9n1EQ9-txEOIE9DPB5igQNFSHc4p6EROdr-6--6Uazjmb3HSUmFAbbVnNMNrx54ngrnAXdsB-fZLGZd7szUUSn1P1sQugRmAfyRlexrPkKPecutWbiw5oL6FPSSrRU1YT8hWCrls05LCc1AnHN-1omTpKukY0l5kvqnvxhkcFWbc-tKkI/w396-h640/ganyu%20cute%20wallpaper.jpg',
  'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjCppXZNQprbzHQWkDLiGUO_beROd_4BODhP_AEoWSLldD0lbMToeyELw3dCYMaORboMSpyaoSsk8nq8AVFxW7eEJE4pVgKItBqH9Up0L9tkFoL41MrzgD2hYYXgPhTpLnS3drOHjAgSHwI8o7MDkMEIoL9K5PEj-AjHIGDu-sryok1bpF_vhkSVREX/w354-h640/ganyu%20wallpaper.jpg',
  'https://i.pinimg.com/474x/81/30/eb/8130eb00c3256ec7e001836b8671df5f.jpg',
  'https://i.pinimg.com/474x/23/b4/04/23b40489ada7f425975e7547b8787d21.jpg',
  'https://i.pinimg.com/474x/23/3e/87/233e87dc813f41d11e5be5128a881469.jpg',
  'https://i.pinimg.com/474x/db/73/29/db73295453e74be00132c983ca0a710f.jpg',
  'https://i.pinimg.com/474x/1b/39/da/1b39dafada167437638ac028d8ee94b7.jpg',
  'https://i.pinimg.com/474x/6d/93/b3/6d93b32c8fe8ba58b56cd5207f35bea4.jpg',
  'https://i.pinimg.com/474x/89/8a/36/898a360b7630c094420115da1f1547fb.jpg',
  'https://i.pinimg.com/474x/e8/3b/fa/e83bfa23df348d9cb78bfb0f788b480e.jpg',
  'https://i.pinimg.com/474x/5b/02/3b/5b023b9bec0909d96e33773bb6f82cf4.jpg',
];

let imageIndex = 0;

for (let i = 1; i <= 80; i++) {
  let item = {
    id: i,
    title: `Post ${i}`,
    image: images[imageIndex],
  };
  posts.push(item);
  imageIndex++;
  if (imageIndex > images.length - 1) imageIndex = 0;
}
const container = document.querySelector('.container');

function generateMasonryGrid(columns, posts) {
  container.innerHTML = '';

  //Store column arrays that contain relevant posts
  let columnWrappers = {};

  //Create column item array and  add this to column wrapper object
  for (let i = 0; i < columns; i++) {
    columnWrappers[`column${i}`] = [];
  }
  for (let i = 0; i < posts.length; i++) {
    const column = i % columns;
    columnWrappers[`column${column}`].push(posts[i]);
  }
  for (let i = 0; i < columns; i++) {
    let columnPosts = columnWrappers[`column${i}`];
    let column = document.createElement('div');
    column.classList.add('column');
    columnPosts.forEach((posts) => {
      let postDiv = document.createElement('div');
      postDiv.classList.add('post');
      let image = document.createElement('img');
      image.src = posts.image;
      let overlay = document.createElement('div');
      overlay.classList.add('overlay');
      let title = document.createElement('h3');
      title.innerText = posts.title;

      overlay.appendChild(title);
      postDiv.append(image, overlay);
      column.appendChild(postDiv);
    });
    container.appendChild(column);
  }
}

let previousScreenSize = innerWidth;
console.log(previousScreenSize);

window.addEventListener('resize', () => {
  imageIndex = 0;
  if (innerWidth < 600 && previousScreenSize >= 600) {
    generateMasonryGrid(1, posts);
  } else if (
    innerWidth >= 600 &&
    innerWidth < 1000 &&
    (previousScreenSize < 600 || previousScreenSize >= 1000)
  ) {
    generateMasonryGrid(2, posts);
  } else if (innerWidth >= 1000 && previousScreenSize < 1000) {
    generateMasonryGrid(4, posts);
  }
  previousScreenSize = innerWidth;
});

//Page Load
if (previousScreenSize < 600) {
  generateMasonryGrid(1, posts);
} else if (previousScreenSize >= 600 && previousScreenSize < 1000) {
  generateMasonryGrid(2, posts);
} else {
  generateMasonryGrid(4, posts);
}



const parent = document.querySelector('body');
const tag = document.createElement('div');
const tree = document.createElement('div');

tag.style.width = "100px";
tag.style.height = "100px";
tag.style.backgroundColor = 'black';
tag.style.borderRadius = "50%";
tag.style.position = "relative";
tag.style.top = "100px";
tag.style.left = "100px";

tree.style.width = '100px';
tree.style.height = '100px';
tree.style.backgroundColor = 'green';
tree.style.position = 'relative';
tree.style.top = "50px";
tree.style.left = "250px";


const move = (event) => {
  switch (event.key) {
    case 'ArrowUp':
      tag.style.top = "50px";
  }
};


parent.appendChild(tag);
// parent.appendChild(tree);
console.log(tag);
document.addEventListener('keydown', (event) => move(event));
const drawGrid = () => {
  for (let i = 0; i < 2500; i++) {
    const child = document.createElement('div');
    child.style.backgroundColor = 'yellow';
    // child.style.border = '1px solid black';
    child.id = `box${i}`;
    tag.append(child);
  }
};

const move = (event) => {
  switch (event.key) {
    case 'ArrowDown': return 50;
    case 'ArrowUp': return -50;
    case 'ArrowRight': return 1;
    case 'ArrowLeft': return -1;
  }
};

const generateNewTarget = (snake) => {
  let newTarget;
  do {
    newTarget = Math.floor(Math.random() * 2500);
  } while (snake.includes(newTarget)); // Ensure the target is not on the snake
  return newTarget;
};

const updateGrid = (position) => {
  for (let index = 0; index < 2500; index++) {
    const div = document.getElementById(`box${index}`);
    div.style.backgroundColor = position.includes(index) ? 'black' : 'yellow';
  }
};

const runGame = (position, step) => {
  const head = position.at(-1);
  const newHead = head + step;

  if (newHead === place) {
    position.push(newHead);
    place = generateNewTarget(position);
  } else {
    position.shift();
    position.push(newHead);
  }

  updateGrid(position);
  placeTarget();
};

const placeTarget = () => {
  const target = document.getElementById(`box${place}`);
  target.style.backgroundColor = 'red';
};

let place;
const main = () => {
  let step = 1;
  drawGrid();

  const position = [0, 1];
  place = generateNewTarget(position);

  document.addEventListener('keydown', (event) => {
    step = move(event);
  });

  setInterval(() => {
    runGame(position, step);
  }, 100);
};

const tag = document.createElement('div');
const parent = document.querySelector('body');
parent.style.backgroundColor = "rgb(0, 255, 0, 0.2)";

tag.style.width = "800px";
tag.style.height = "600px";
tag.style.display = "grid";
tag.style.gridTemplateColumns = "repeat(50, 1fr)";
tag.style.gridTemplateRows = "repeat(50, 1fr)";
tag.id = 'parent';
tag.style.margin = "100px 500px";
tag.style.border = "1px solid black";

parent.appendChild(tag);

main();
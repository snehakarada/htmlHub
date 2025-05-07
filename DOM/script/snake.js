const drawGrid = () => {
  for (let i = 0; i < 2500; i++) {
    const child = document.createElement('div');
    child.style.backgroundColor = 'yellow';
    const tag = document.getElementById("parent");
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

const runGame = (position, step, score, place) => {
  const head = position.at(-1);
  const newHead = head + step;
  let isGotPoint = false;

  if (newHead === place) {
    position.push(newHead);
    place = generateNewTarget(position);
    isGotPoint = true;

  } else {
    position.push(newHead);
    position.shift();
  }

  updateGrid(position);
  placeTarget(place);

  return isGotPoint ? score + 1 : score;
};

const placeTarget = (place) => {
  const target = document.getElementById(`box${place}`);
  target.style.backgroundColor = 'red';
};

const main = () => {
  let place;
  let step = 1;
  let score = 0;

  drawGrid();

  const position = [0, 1];
  place = generateNewTarget(position);

  document.addEventListener('keydown', (event) => {
    step = move(event);
  });

  setInterval(() => {
    score = runGame(position, step, score, place);
    const scoreCard = document.getElementById("score");
    scoreCard.textContent = `score : ${score}`;
  }, 100);
};

globalThis.onload = main;
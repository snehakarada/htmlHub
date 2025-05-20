const drawGrid = () => {
  for (let i = 0; i < 2500; i++) {
    const child = document.createElement('div');
    child.style.backgroundColor = 'yellow';
    child.style.border = '1px solid black';
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

const canMove = (newHead, snake, intervalId) => {
  console.log(newHead, snake.at(-2));
  const isOut = (newHead % 50) === 0 && snake.at(-2) === (newHead - 2);
  const vertical = newHead >= 2450 && newHead <= 2500 && snake.at(-2) === (newHead - 100);
  if (isOut || vertical || newHead < 0 || (newHead - 1) % 50 === 0) {
    console.log('out');
    clearInterval(intervalId);
  }
};

const runGame = (position, step, score, place, intervalId) => {
  const head = position.at(-1);
  const newHead = head + step;
  canMove(newHead, position, intervalId);
  let isGotPoint = false;
  let newTarget = place;

  if (newHead === place) {
    position.push(newHead);
    newTarget = generateNewTarget(position);
    isGotPoint = true;

  } else {
    position.push(newHead);
    position.shift();
  }

  updateGrid(position);
  placeTarget(newTarget);

  return [isGotPoint ? score + 1 : score, newTarget];
};

const placeTarget = (place) => {
  const target = document.getElementById(`box${place}`);
  target.style.backgroundColor = 'red';
};

const main = () => {
  let place;
  let step = 1;
  let score = 0;
  console.log('inside main on load');
  drawGrid();

  const position = [0, 1];
  place = generateNewTarget(position);

  document.body.addEventListener('keydown', (event) => {
    step = move(event);
  });



  const intervalId = setInterval(() => {
    [score, place] = runGame(position, step, score, place, intervalId);
    // clearInterval(intervalId);
    const scoreCard = document.getElementById("score");
    scoreCard.textContent = `score : ${score}`;
  }, 100);
};

globalThis.onload = main;
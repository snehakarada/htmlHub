
const randomPlace = () => {
  const colours = ['blue', 'navy', 'green', 'black', 'crimson', 'gold'];
  return {
    x: Math.floor(Math.random() * 600),
    y: Math.floor(Math.random() * 500),
    side: Math.floor(Math.random() * 20),
    color: colours[Math.floor(Math.random() * colours.length)]
  };
};

const square = () => {
  const shape = [{ x: 0, y: 0, side: 5 }];
  for (let i = 0; i < 100; i++) {
    let newOne = randomPlace();
    let flag = 'false';
    for (const dig of shape) {
      if (!(newOne.x > dig.x && newOne.x < dig.x + dig.side && newOne.y > dig.y && newOne.y < dig.y + dig.side)) {
        flag = 'true';
      }
    }
    if (flag) { shape.push(newOne); }
  }

  return shape;
};

const htmlCode = () => {
  const shapes = square();
  const code = [];
  for (const dig of shapes) {
    code.push(`<rect x="${dig.x}" y="${dig.y}" width="${dig.side}" height="${dig.side}" style="fill:${dig.color}"/>`);
  }

  return code;
};

console.log(htmlCode());

const parent = document.querySelector('svg');
// const c = document.querySelector('rect');
parent.innerHTML = htmlCode().join('');
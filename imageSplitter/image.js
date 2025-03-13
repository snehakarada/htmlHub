const parent = document.querySelector("body");
let selectedImg = null;
const url = [];

const readingRowsAndColumns = () => {
  const rows = document.getElementById("rows");
  const column = document.getElementById("column");

  return [rows.value, column.value];
};



const download = () => {
  if (url.length === 0) {
    alert("you did't split yet");
    return '';
  }

  const zip = new JSZip();

  url.forEach((dataUrl, index) => {
    const base64Data = dataUrl.split(',')[1];
    zip.file(`split_${index + 1}.png`, base64Data, { base64: true });
  });

  zip.generateAsync({ type: "blob" }).then((content) => {
    const link = document.createElement("a");
    link.href = URL.createObjectURL(content);
    link.download = "splits.zip";
    link.click();
  });
};

const createCanvas = () => {
  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  const width = selectedImg.naturalWidth;
  const height = selectedImg.naturalHeight;
  canvas.width = width;
  canvas.height = height;

  return [canvas, ctx, width, height];
};

const checkConstraints = (noOfRows, noOfColumns) => {
  if (!selectedImg) {
    alert('image not selected');
  }

  if ((!noOfRows || !noOfColumns) && selectedImg) {
    alert(`select rows and columns`);
  }
};

const split = () => {
  const [noOfRows, noOfColumns] = readingRowsAndColumns();
  checkConstraints(noOfRows, noOfColumns);
  const [canvas, ctx, width, height] = createCanvas();

  const blockHeight = height / noOfRows;
  const blockWidth = width / noOfColumns;

  for (let row = 0; row < height; row += blockHeight) {
    for (let col = 0; col < width; col += blockWidth) {
      ctx.drawImage(selectedImg, col, row, blockWidth, blockHeight, 0, 0, blockWidth, blockHeight);
      url.push(canvas.toDataURL("image/png"));
    }
  }

};

const display = (url) => {
  const image = document.createElement("img");
  image.src = url;
  parent.appendChild(image);
  image.style.display = "none";

  return image;
};

const preview = (file) => {
  const previewUrl = URL.createObjectURL(file);
  const parent = document.getElementById("userImg");
  parent.style.backgroundImage = `url(${previewUrl})`;

  selectedImg = display(previewUrl);
};

const selectFile = (fileInput) => {
  const file = fileInput.files[0];

  if (file) {
    preview(file);
  } else {
    console.log("No file selected");
  }

};

const main = () => {
  const fileInput = document.getElementById("fileName");
  fileInput.addEventListener("change", () => selectFile(fileInput));

  const submit = document.querySelector("#submit");

  submit.addEventListener("click", () => {
    split();
  });

  const button = document.getElementById("download");
  button.onclick = download;

};

main();

const getId = () => {
  const id = document.getElementById("idValue").value;
  console.log(id);
};



const insertData = (client, name, id) => {
  return client.queryObject("insert into customer(name, id) values($1, $2)", [name, id]);
};

const getDetails = () => {
  const name = document.getElementById("name").value;
  const id = document.getElementById("id").value;

  // console.log(name, id);
  connection(credentials, name, id);
};

const signUp = () => {
  console.log('hello signup');
  const parent = document.querySelector("body");
  const outer = document.createElement("div");

  outer.style.width = "30vw";
  outer.style.height = "40vh";
  outer.style.border = "1px solid black";
  outer.style.position = "absolute";
  outer.style.top = "1vh";
  outer.style.left = "0.5vw";
  outer.style.backgroundColor = "white";
  outer.style.textAlign = "center";

  outer.innerHTML =
    "<h1>SignUP</h1><input type='text' id = 'name' placeholder='name'><br/><br/><input type='text' id = 'id' placeholder='id'/><br><br><button onclick = 'getDetails()'>signup</button>";

  parent.appendChild(outer);
};
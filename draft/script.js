
const getId = () => {
  const id = document.getElementById("idValue").value;
  console.log(id);
};

const credentials = {
  user: "postgres",
  password: "kahensamma",
  database: "food",
  hostname: "localhost",
  port: 5432
};

const successMsg = () => {
  console.log('connected ✅');
};
const errorMsg = (error) => {
  console.log('not connected', error);
};

const connection = (credentials, name, id) => {
  const client = new Client(credentials);
  client.connect()
    .then(() => {
      successMsg();
      return insertData(client, name, id);
    })
    .catch(errorMsg)
    .finally(() => client.end());
};

const insertData = (client, name, id) => {
  return client.queryObject("insert into customer(name, id) values($1, ${2})", [name, id]);
};

const getDetails = () => {
  const name = document.getElementById("name").value;
  const id = document.getElementById("id").value;

  fetch("http://localhost:3000/insert", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, id }),
  })
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.error("Error:", error));
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














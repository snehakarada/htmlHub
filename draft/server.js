app.post("/insert", (req, res) => {
  const { name, id } = req.body; // Get data from request
  console.log(`Received: Name=${name}, ID=${id}`);
  res.send("Data received");
});
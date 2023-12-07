const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

let dataforme = [
  {
    id: 1,
    name: "Tonmoy",
    university: "RUET",
    district: "Rajshahi",
  },
];

app.get("/dataforme", (req, res) => {
  res.json(dataforme);
});

app.get("/dataforme/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const found = dataforme.find((item) => item.id === id);
  if (found) {
    res.json(found);
  } else {
    res.status(404).json({ message: "Data not available" });
  }
});
let newid = 2;
app.post("/dataforme", (req, res) => {
  const newData = req.body;
  newData.id = newid++;
  dataforme.push(newData);
  res.status(201).json(newData);
});

app.put("/dataforme/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const updateData = req.body; //updated data
  const foundIndex = dataforme.findIndex((item) => item.id === id);
  if (foundIndex !== -1) {
    dataforme[foundIndex].name = updateData.name || dataforme[foundIndex].name;
    dataforme[foundIndex].university =
      updateData.university || dataforme[foundIndex].university;
    dataforme[foundIndex].district =
      updateData.district || dataforme[foundIndex].district;
    res.json(dataforme[foundIndex]);
  } else {
    res.status(404).json({ message: "Information Not available" });
  }
});

app.delete("/dataforme/:id", (req, res) => {
  const id = parseInt(req.params.id);
  dataforme = dataforme.filter((item) => item.id !== id);
  res.json({ message: "Data deleted" });
});

const PORT = 1234;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

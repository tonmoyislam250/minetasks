const axios = require("axios");

// Create data
for (let i = 1; i <= 5; i++) {
  const newData = {
    name: `Data ${i}`,
    university: `University ${i}`,
    district: `District ${i}`,
  };
  axios.post("http://localhost:1234/dataforme", newData).then((response) => {
    console.log("Data created:", response.data);
  });
}

// Update data
const newData2 = {
  name: "Istiyak Hossain",
  university: "RUET",
  district: "Dinajpur",
};
axios.put("http://localhost:1234/dataforme/2", newData2).then((response) => {
  console.log("Data Updated:", response.data);
});

// Delete data
axios.delete("http://localhost:1234/dataforme/3").then((response) => {
  console.log("Data deleted:", response.data);
});

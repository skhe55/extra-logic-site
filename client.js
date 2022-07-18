const express = require("express");
const cors = require("cors");
const fs = require('fs');

const app = express();

app.use(express.static('public'));

app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

function getStaticPage(fileName = '', res) {
  try {
      fs.createReadStream(`${process.cwd()}/public/${fileName}`).pipe(res);
  } catch(error) {
      console.error(`getStaticPage: ${error}`);
  }
}

app.get('/', (req, res, next) => {
  getStaticPage('main.html', res);
});

// set port, listen for requests
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

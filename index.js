const express = require("express");
const nsj = require("node-salesforce-jwt");

const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;

function getToken({ isTest, clientId, privateKey, username }) {
  const options = {
    isTest: isTest, // is this a test instance?
    clientId: clientId, // SFDC `ConsumerKey` of Connected App
    privateKey: privateKey, // private key file as string
    user: username, // UserName of API user
  };

  return new Promise((resolve, reject) => {
    nsj.getToken(options, function (err, response) {
      if (err) reject(err);
      else resolve(response);
    });
  });
}

app.post("/", (req, res, next) => {
  try {
    req.body.privateKey = req.body.privateKey
      .replace(/(BEGIN .*-----)\s/, "$1\n")
      .replace(/\s(-----END .*)/, "\n$1");
    getToken(req.body)
      .then((resp) => {
        res.json(resp);
      })
      .catch((err) => {
        next(err);
      });
  } catch (err) {
    next(err);
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});

const express = require("express");
const app = express();
const port = 3000;
require("dotenv").config();
const { DefaultAzureCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");
const credential = new DefaultAzureCredential();
const client = new SecretClient(process.env.KEYVAULT_URI, credential);

app.get("/", (req, res) => {
 res.send("Hello World!");
});

app.get("/secret", (req, res) => {
 client
 .getSecret("testsecret")
 .then((data) => {
 res.send(data.value);
 })
 .catch((error) => {
 console.log(error);
 res.send(error);
 });
});

app.get("/multilinesecret", (req, res) => {
 client
 .getSecret("MultilineSecret")
 .then((data) => {
 const parsedSecret = JSON.parse(data.value);
 res.json(parsedSecret);
 })
 .catch((error) => {
 console.log(error);
 res.send(error);
 });
});

app.listen(port, () => {
 console.log(`Example app listening on port ${port}`);
});
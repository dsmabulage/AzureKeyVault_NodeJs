const express = require('express');
const app = express();
const port = 3000;
require('dotenv').config();
app.use(express.json());

const { DefaultAzureCredential } = require('@azure/identity');
const { SecretClient } = require('@azure/keyvault-secrets');

const credential = new DefaultAzureCredential();
const client = new SecretClient(process.env.KEY_VAULT_URI, credential);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/secret', async (req, res) => {
  try {
    const secret = await client.getSecret('testsecret');
    res.send(secret.value);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

app.get('/multilinesecret', async (req, res) => {
  try {
    const secret = await client.getSecret('MultilineSecret');
    const parsedSecret = JSON.parse(secret.value);
    res.json(parsedSecret);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

app.post('/secret', async (req, res) => {
  try {
    const { secretName, secretValue } = req.body;

    if (!secretName || !secretValue) {
      res.status(400).send('Please provide a secret name and value');
    }

    await client.setSecret(secretName, secretValue);
    res.send('Secret created');
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

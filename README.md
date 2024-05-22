# Access Azure KeyVault Secrets Through Nodejs Application

Azure Key Vault is a cloud-based service that allows users to securely store and manage sensitive information, such as passwords, keys, and certificates. This allows for a more secure and efficient way to manage and access sensitive information in a cloud environment.

In this article, we will discuss how to access these secrets through a Node.js application. We will cover how to set up an Azure Key Vault, how to authenticate with it, and how to retrieve and use the secrets in your application. By the end of this article, you will have a better understanding of how to use Azure Key Vault to secure and manage your application's sensitive information.

**Table of Contents**

1. [Create Nodejs server](#1-create-nodejs-server)
2. [Create Azure Key Vault](#2-create-azure-key-vault)
3. [Add secrets to key Vault](#3-add-secrets-to-key-vault)
4. [Add secrets from CLI](#4-add-secrets-from-cli)
5. [Register app in Azure Active Directory](5#-register-app-in-azure-active-directory)
6. [Add Access Policies to key Vault](#6-add-access-policies-to-key-vault)
7. [Reveal secrets in Nodejs application](#7-reveal-secrets-in-nodejs-application)

## 1. Create Nodejs server

1. Create the directory and run `npm init -y` in the command prompt
2. Open that directory in VSCode using typing `code .` in the command prompt
3. Open vs code terminal and install the following

```
npm install express --save 
npm install nodemon --save-dev
```

_Nodemon is a tool that automatically restarts a Node.js application when changes are made to the code. This can save developers time and effort by eliminating the need to manually stop and start the application each time a change is made._
4. Create an index.js file and paste the following code

```
const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
```

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vcyy2gy1hkiqr5nrsm16.png)

5. In your terminal (which should be in the project directory), type `nodemon index.js` and hit the Enter button.


![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/8scljtuw440uyq8imgbj.png)

5. Open a new tab in postman or any web browser and the address bar, type http://localhost:3000, and hit the Enter button



![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/nlydqm6jgona4sk0vdzs.png)


![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/qb5nsk0hzxyhp5ylxf1y.png)

Now the Node server is up and running...

## 2. Create Azure key vault

1. Sign in to the Azure portal at https://portal.azure.com
2. To set up a Key Vault in Azure:

1. Open the Azure portal and select "Create a resource" from the menu or Home page.
2. Search for "Key Vault" and select it from the results.
3. Click on "Create" in the Key Vault section.
4. In the "Create key vault" section, enter a unique name for the vault (e.g. "nodejsazurekeyvault") _A vault's name must be between 3-24 alphanumeric characters. The name must begin with a letter, end with a letter or digit, and not contain consecutive hyphens_, select a subscription and create a new resource group.
5. Pick a location and keep the other options unchanged.
6. Click on "Create" to finalize the setup.


![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/7k0618pvdy1vd0ojxx3l.png)

## 3. Add secrets to key Vault

1. Click secrets in the left panel
2. Click Generate/Import at top of the page
3. Add a secret name, and value
4. Toggle enables to yes
5. Click Create


![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ou8iae6r7bro7wyz6ogf.png)


![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/hz4w5tvy2cvicj1nwitz.png)


## 4. Add secrets from CLI

1. Install Azure CLI [Download](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli)
3. Run these commands in the PowerShell window

```
az login
```

```
az keyvault secret set --vault-name "<your-unique-keyvault-name>" --name "MultilineSecret" --file "secretfile.txt"
```

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/j9ajb8k2qqfex2s6nj7w.png)


![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/uuio7szqpw882r4girio.png)

## 5. Register the app in Azure Active Directory

1. Navigate to Azure Active Directory
2. Click App registrations on the left panel
3. Click New Registration
4. Enter the app name and platform to Web
5. Register

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/u10kkm1480vjznt2sy9q.png)


![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/gdn894zewkbeu5evjv5l.png)

6. Click certificates and secrets
7. New client's secret
8. Add a description and set the expiry date
9. Add
10. Copy the value and keep it for future


![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/77lzjhnyn3buzal9rjx9.png)


![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/w82rfpzcbc2b7m44jtvg.png)

## 6. Add app to key Vault

1. Navigate to Key Vault
2. Click Access Policies in the left panel
3. Create 
4. Select Secret Management from the template dropdown


![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/86dskparw5xvivtp27of.png)

5. Next
6. Select keyvaultapp


![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/szwe0s85g00mx30doz8d.png)

7. Next
8. Create

## 7. Reveal secrets in Nodejs application

1. Go to index.js
2. Open vs code terminal and install the following
```
npm install @azure/identity
npm install @azure/keyvault-secrets
npm install dotenv
```
3. Create a `.ENV` file and add the following code

```
KEYVAULT_URI=<"key vault URL">
AZURE_TENANT_ID=<"registered app in azure active directory">
AZURE_CLIENT_ID=<"registered app in azure active directory">
AZURE_CLIENT_SECRET=<"previously copied value">
```


![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/mpcbx2qjpdhcte0tww51.png)

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/mvm4as53x6bkg13cdgtt.png)


![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/tbfky9wxng65uymgcrt3.png)

4. Add this code to index.js

```
require("dotenv").config();
const { DefaultAzureCredential } = require("@azure/identity");
const { SecretClient } = require("@azure/keyvault-secrets");
const credential = new DefaultAzureCredential();
const client = new SecretClient(process.env.KEYVAULT_URI, credential);
```

5. Create a separate route and add this code (single line secret)

```
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
```

6. In your terminal (which should be in the project directory), type `nodemon index.js` and hit the Enter button.
7. Open a new tab in postman or any web browser and the address bar, type http://localhost:3000/secret, and hit the Enter button


![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vz7wgo1l20kz94mbsy0n.png)

![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/0ehuf72od1k9tf9fxxcp.png)

8. Create a separate route and add this code (multi-line secret)

```
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
```

9. In your terminal (which should be in the project directory), type `nodemon index.js` and hit the Enter button.

10. Open a new tab in postman or any web browser and the address bar, type http://localhost:3000/multilinesecret, and hit the Enter button


![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/vagvy9ca0id1vd9tbjh3.png)


![Image description](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/oytvhnxhkldbd97y57yv.png)


## Complete Code

```
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

```
## Source Code

[GitHub](https://github.com/DSmabulage/AzureKeyVault_NodeJs)

Thank you.

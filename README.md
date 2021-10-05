# Jayride-Coding-Challenge
Challenge done with express and node

### Task 1
The API should reply on the resource request to /candidate with the following information.

```bash
{
"name": “test”,
"phone": “test”
}
```

*Solved with a simple endpoint with express.*


### Task 2
The API should reply to the resource request /Location that takes the IP and returns the city location that
corresponds to this IP address.

*Solved with free IP/Location API https://ipstack.com/product to obtain the location of the client's ip.*

You need to use a API_KEY IPSTACK, adding a file .env where the key is declared.

### Task 3
The API should reply to the resource request /Listings that takes the number of passengers as a
parameter.

*Solved consulting the endpoint https://jayridechallengeapi.azurewebsites.net/api/QuoteRequest to get the data and then filtering and mapping the list with native javascript functions to manipulate arrays.*


## Quick Start

  First create the .env file from .env.example:

  Install dependencies:

```bash
$ npm install
```

  Run for development in Linux:

```bash
$ npm run dev
```

  Run for development in Windows:

```bash
$ npm run dev:windows
```

  Start the server:

```bash
$ npm start
```


  View the website at: http://localhost:3000 (3000 or the port you have placed in the .env file)

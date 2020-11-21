# EquityTrade

EquityTrade is a full stack single page stock trading application inspired by Robinhood. Logged in users can simulate trades and manage their portfolio using real-time data. Users can also search for and have access to real-time data of stocks across most U.S. stock exchanges.

### [Live Site](https://equitytrade.herokuapp.com)


## Table of Contents
* [Technologies](#technologies)
* [Features](#features)
  * [Sign Up / Log In](#sign-up-/-log-in)
  * [Dashboard](#dashboard)
  * [Individual Company Page](#individual-company-page)
  * [Transaction](#transaction)
  * [News](#news)
* [Future Features](#future-features)


## Technologies

### Stacks/Languages
* Ruby on Rails 5.2.4
* React.js 16.13.1
* Redux.js 4.0.5
* Rechart 1.8.5
* PostgreSQL 2.3.5
* JavaScript
* HTML
* CSS
* Webpack 4.44.2
* Heroku

### APIs and External Libraries
* IEX Cloud
* Rechart 1.8.5
* FontAwesome

## Features

### Sign Up / Log In

Users are able to create an account through the sign up page or log in to an existing account. A demo account is available for users who want to access features without signing up.

### Dynamic Dashboard

Users can see a real-time representation of their portfolio value based on the selected date range. The portfolio tab to the right includes all stocks currently owned by the logged user. The signature color alternates between green and red, depending on the return of the selected date range.

### Search Bar

Users can search via a company's ticker/name. The search results update at every input change.

### Individual Company Page

The company page displays the dashboard, description and key stats of the company. All data presented is in real-time and is updated on every state change.

### Transaction

Users can buy or sell stocks from the US stock exchanges. Error handling will prevent users from buying more than their current buying power and selling more than they own. Stocks not from the US stock exchanges will not be available for transactions. 

### News

Users can view 10 most recent news articles regarding the a specific company or the general market, depending on the URL they are currently in. 

## Future Features

* Develop a portfolio analytics feature so users can see their risk profile
* Create a watchlist so users can keep tabs on individual stocks






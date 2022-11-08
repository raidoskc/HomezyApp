# HomezyApp
Besic Real Estate Android App

## Εγκατάσταση των npm πακετων
npm i

## Run το API
npm start

## Basic Api Documentation

## Host the on Heroku.
### GET All Products
[GET](https://homeazy.herokuapp.com/Products?page=1)

### Get only one
https://homeazy.herokuapp.com/Products/:id

### Delete one
https://homeazy.herokuapp.com/Products/:id

### Update one product
https://homeazy.herokuapp.com/Products/:id

### Create new product
https://homeazy.herokuapp.com/Products

### Searth - Filters
https://homeazy.herokuapp.com/Search? {query params}

### Chatbot
https://homeazy.herokuapp.com/Chatbot

### User Login
https://homeazy.herokuapp.com/User/login

### User Register
https://homeazy.herokuapp.com/User/signup

#### Query params 
Name: String 
Description: String
Price: Int
Sale: Boolean
ZipCode: String
Region: String
Roof: Int
Area: Int
Bedrooms: Int

For min or max and [$gte] and [$lte]. 
e.g Price[$lte]=500

### For Refister and login in Post Body (JSON type)
email: String
password: String

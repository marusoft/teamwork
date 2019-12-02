[![Build Status](https://travis-ci.org/marusoft/teamwork.svg?branch=develop)](https://travis-ci.org/marusoft/teamwork)
[![Coverage Status](https://coveralls.io/repos/github/marusoft/teamwork/badge.svg?branch=develop)](https://coveralls.io/github/marusoft/teamwork?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/0e4a41f2688d3888090a/maintainability)](https://codeclimate.com/github/marusoft/teamwork/maintainability)


# teamwork
Teamwork is an ​ internal social network for employees of an organization. The goal of this application is to facilitate more interaction between colleagues and promote team bonding.

<br/><b> Heroku: </b> https://teamwork-capstone-project.herokuapp.com/api/v1
<br/><b> API documentation: </b> https://teamwork-capstone-project.herokuapp.com/api-docs/


## Table of Content

 [Features](#features)<br>
 [Technology](#technology)<br>
 [Installation](#installation)<br>
 [Testing](#testing)<br>
 [API End Points](#api-end-points)

## Features
Below are the teamwork features app
###  Admin/Employees

- Admin can create an employee user account. <br/>
- Admin/Employees can sign in.<br/>
- Employees can post gifs.<br/>
- Employees can write and post articles.<br/>
- Employees can edit their articles.<br/>
- Employees can delete their articles.<br/>
- Employees can delete their gifs post.<br/>
- Employees can comment on other colleagues' article post.<br/>
- Employees can comment on other colleagues' gif post.<br/>
- Employees can view all articles and gifs, showing the most recently posted articles or gifs
first.<br/>
- Employees can view a specific article.<br/>
- Employees can view a specific gif post.<br/>

## Optional Features
- Employees can view all articles that belong to a category (tag).<br/>
- Employees can flag a comment, article and/or gif as inappropriate.<br/>
- Admin can delete a comment, article and/or gif flagged as inappropriate.<br/>

## Technologies

Modern JavaScript technologies were adopted in this project

ES2015: Also known as ES6 or ECMASCRIPT 6, is a new and widely used version of Javascript
that makes it compete healthily with other languages. See [here](https://en.wikipedia.org/wiki/ECMAScript) for more infromation.

NodeJS: Node.js is an open-source, cross-platform JavaScript run-time environment which allows you enjoy the features of Javascript off the web browsers and implement server-side web development.
Visit [here](https://nodejs.org/en/) for more information.

ExressJS: This is the web application framework for Node.js
Visit [here](https://expressjs.com) for more information

Postgres Database: PostgreSQL is a powerful, open source object-relational database system with over 30 years of active development that has earned it a strong reputation for reliability, feature robustness, and performance.

Codes are written in accordance with Airbnb JavaScript style guide, see [here](https://github.com/airbnb/javascript) for details.

## Installation
1. Clone this repository into your local machine:
```
https://github.com/marusoft/teamwork
```
2. Navigate into the cloned repository in your machine:
```
cd teamwork
```
3. Install dependencies by running.
```
npm install
```
4. Create a .env file in the root directory and setup your database credentials and token key. Check `.env.example` for instruction.

5. Start the application by running
```
npm run start:dev
```
6. Install `postman` to test all endpoints

## Testing
- run test using `npm run test`    

## API Routes

<table>
<tr><th>HTTP VERB</th><th>ENDPOINT</th><th>FUNCTIONALITY</th></tr>

<tr><td>POST</td> <td>api/v1/auth/create-user</td>  <td>Create a user</td></tr>

<tr><td>POST</td> <td>api/v1/auth/signin</td>  <td>Login a user</td></tr>

<tr><td>POST</td> <td>api/v1/gifs</td>  <td>Employees can post gifs.</td></tr>

<tr><td>DELETE</td> <td>api/v1/gifs/<:gifId></td>  <td>Employees can delete their gifs post.</td></tr>

<tr><td>POST</td> <td>api/v1/gifs/<:gifId>/comment</td>  <td>Employees can comment on other colleagues' gif post.</td></tr>

<tr><td>GET</td> <td>api/v1/gifs/<:gifId></td>  <td>Employees can view a specific gif post.</td></tr>

<tr><td>POST</td> <td>api/v1/articles</td>  <td>Employees can write and post articles.</td></tr>

<tr><td>DELETE</td> <td>api/v1/articles/<:articleId></td>  <td>Employees can delete their articles.</td></tr>

<tr><td>POST</td> <td>api/v1/articles/<:articleId/comment</td>  <td>Employees can comment on other colleagues' article post.</td></tr>

<tr><td>GET</td> <td>api/v1/articles/<:articleId></td>  <td>Employees can view a specific article post.</td></tr>

<tr><td>PATCH</td> <td>api/v1/articles/<:articleId></td>  <td>Employees can edit their articles.</td></tr>

<tr><td>GET</td> <td>api/v1/articles?category=category></td>  <td>Employees can view all articles that belong to a category (tag).</td></tr>

<tr><td>GET</td> <td>api/v1/articles</td>  <td>Employees can view all articles.</td></tr>

<tr><td>GET</td> <td>api/v1/feed</td> <td>Employees can view all articles and gifs, showing the most recently posted articles or gifs first.</td></tr>
<table>

## Author

- Alimi Kehinde Morufudeen 
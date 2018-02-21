## Northcoders News API
### About
A RESTful API for Northcoders News. Built using Node.js (v8.9.1), Express.js (v4.16.2), MongoDB (v3.4.9) and Mongoose(v5.0.1).
 
This API has been deployed to Heroku [here](https://nc--news.herokuapp.com/).

Set Up

Check if `node.js` is already installed by typing the following command on your terminal:
```
node -v
```

> If you do not already have Node.js installed please follow the instructions on [this guide](https://nodejs.org/en/download/package-manager/).

Check if `npm` is already installed by typing the following command on your terminal:
```
npm -v
```
>If you do not have npm already installed please follow [this guide](https://www.npmjs.com/get-npm) to set it up.

Check if `git` is installed on your machine enter the following command on your terminal:
```
git --version
```
>If you do not already have git installed on your machine please follow [this guide](https://git-scm.com/).

Check if `MongoDB` is installed on your machine enter the following command on your terminal:
```
npm list mongoose
```

>If you do not have `MongoDB` already installed, please follow [this guide](https://docs.mongodb.com/manual/installation/).


### Installation

To run this project you will need to clone it onto your local machine and install all dependencies.

To do so use the command line to navigate to your preferred directory on your local machine and enter the following command on the terminal:
```
git clone https://github.com/SemraSh/BE-nc-news
```
Navigate inside the folder and install all dependencies by entering the following command on your terminal window:
```
npm install
```
Enter the following command in your terminal window to connect to the database and keep it running:
```
mongod
```
Open another terminal window, navigate inside the project folder and enter the following command to populate the database:
```
node seed/seed.js
```
Finally to run the server enter the following command in your terminal window:
```
npm start
```
This will run the server on port 3000. All endpoints can be found locally on http://localhost:3000 .

### Testing
To test the API navigate to the project directory and enter the following command
```
npm test
```
Testing was carried out using `Mocha`, `Chai` and `Supertest`

### API routes
-----

#### GET

```
/topics
```
Get all the topics

```
/topics/:topic/articles
```
Get article by topic name

```
/articles?page=1
```
Get first 10 articles. Increase the page number by 1 to get the next 10 articles

```
/articles/:article_id
```
Get article by article id.

```
/articles/:article_id/comments
```
Get all comments for one article.

```
/users
```
Get all the users

```
/users/:username
```
Get user by user name.

```
/comments
```
Get all the comments

```
/comments/:comment_id
```
Get one comment by comment id.

-----
#### POST
```
/topics/:topic/articles
```
Post a new article under the topic

```
/articles/:article_id/comments
```
Post new comment for the article.


-------
#### PUT
```
/articles/:article_id
```
Update vote for article.

```
/comments/:comment_id
```
Update vote of the comment.

-------
#### DELETE
```
/comments/:comment_id
```
Delete comment.


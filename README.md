# Tech Blog
![badge](https://img.shields.io/badge/MIT-License-blue.svg)

## Description

A blog site where developers can publish their blog posts and comment on other developer's posts as well. Developers who write about tech can use this blog site to publish articles, blog posts and their thougts and opinions about technical concepts, recent advancements and new technologies.

## Table of Contents 

- [Installation](#installation)
- [Usage](#usage)
- [Technologies used](#technologies-used)
- [License](#license)
- [Deployed Link](#deployed-link)
- [How to Contribute](#how-to-contribute)
- [Questions](#questions)

## Installation

This program can be run through a browser using the link to the deployed application. Alternatively, to run this application locally you will need to:

- Clone this repository to receive all of the files
- Set up your environment variables in a .env file

  `DB_NAME=blog_db`
  
  `DB_USER=<mysql username>`
  
  `DB_PASSWORD=<mysql password>`
- Run `npm install` in the command line of your terminal to set up all of the dependencies
- Initialize your database by running the `schema.sql` file inside "db" folder with MySQL
- Run `npm start` to start the application's connection
- Go to the url of the application (http//:localhost:3001) to begin using it

## Usage

Use the live Heroku URL to open the deployed application. You will be presented with a homepage which includes existing blog posts if any have been posted and also navigation links for the homepage and the dashboard and the option to log in. Clicking on the homepage option will take you to the homepage. 

![homepage](https://github.com/marycpriyanka/tech-blog/blob/main/images/screenshots/homepage.JPG)

If you click on any other links in the navigation, you will be taken to th login or signup page. 

![login](https://github.com/marycpriyanka/tech-blog/blob/main/images/screenshots/login.JPG)

If you are a new user, you can signup by entering your username, email and password. You will be signed in and taken to homepage. If you are a returning user, enter your email and password to login and you will be taken to homepage.

If you click on any existing blog in homepage, you will be presented with all the details of the blog post, all the comments and an option to enter a comment. 
If you enter a comment, the post will be updated to display the comment.

![comments](https://github.com/marycpriyanka/tech-blog/blob/main/images/screenshots/blogWithComments.JPG)

If you click on the dashboard option in the navigation, then you will be taken to dashboard and presented with any blog posts you have already created and an option to create a new blog post. 

![dashboard](https://github.com/marycpriyanka/tech-blog/blob/main/images/screenshots/dashboard.JPG)

If you click on the button to add new post, you will be prompted to enter the title and contents of the post. 

![create](https://github.com/marycpriyanka/tech-blog/blob/main/images/screenshots/create.JPG)

If you click on the create button, you will be taken to the updated dashboard with your new blog post. 

If you click on an existing post in the dashboard, then you have the option to edit or delete your post.

![update](https://github.com/marycpriyanka/tech-blog/blob/main/images/screenshots/update.JPG)

You can sign out of the site by clicking logout option in navigation.

##  Technologies used

Node.js, Express.js, Handlebars, MySQL2, Sequelize, dotenv package, bcrypt package, express-session, connect-session-sequelize packages, CSS, Heroku

## License

Tech Blog is available under the MIT License.

## Deployed link

https://blooming-hamlet-94670.herokuapp.com/

## How to Contribute

Contributions and ideas are welcome. Before submitting an issue, please take a moment to look over the contributing guidelines in https://www.contributor-covenant.org/ . Before submitting pull requests, ensure the following:

Fork the repo and create your branch from main.
Test your code.

## Questions

https://github.com/marycpriyanka

For any addditional questions, reach me at marycpriyanka@gmail.com.

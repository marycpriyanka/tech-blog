// Inport the required packages and dependencies
const path = require("path");
const express = require("express");
const exhbs = require("express-handlebars");
const session = require("express-session");
const routes = require("./controllers");
const sequelize = require("./config/connection");
const SequelieStore = require("connect-session-sequelize")(session.Store);
const helpers = require("./utils/helpers");

const app = express();
const PORT = process.env.PORT || 3001;

// Set up sessions
const sess = {
    secret: "Super blog secret",
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelieStore({
        db: sequelize
    })
};

app.use(session(sess));

// Set up Handlebars.js engine with custom helpers
const hbs = exhbs.create({ helpers });

// Inform Express.js on which template engine to use
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log("Now listening"));
});

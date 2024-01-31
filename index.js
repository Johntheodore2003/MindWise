import  express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

var userIsAuthorised = false;

app.use(bodyParser.urlencoded({ extended: false}));

app.use(express.static("public"));

function passwordCheck(req, res, next) {
    const email = req.body["Email"];    
    const password = req.body["Password"];

    if(email === "john" && password === "Hello@12"){
        userIsAuthorised = true;
    }
    next();
}

app.get("/", (req, res) => {
    res.render("index.ejs")
})

app.use(passwordCheck);

app.get("/login", (req, res) => {
    res.render("login.ejs");
})

app.get("/signup", (req,res) => {
    res.render("signup.ejs")
})

app.post("/home", (req,res) => {

    if (userIsAuthorised) {
        res.render("social.ejs");
      } 
      else {  
        res.render("login.ejs")
      }

    const name= "John Theodore";
    res.render("social.ejs", {name});
})


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
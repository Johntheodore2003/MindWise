import express from 'express';
import OpenAI from 'openai';
import bodyParser from 'body-parser';
import path from 'path';
import { createServer } from 'http';
import {Server as socketIO} from 'socket.io';

const app = express();
const port = 3000;
app.set('view engine', 'ejs');
2
const http = createServer(app);
const io = new socketIO(http);
const messages = [];
const openai = new OpenAI({
    apiKey: "API_KEY_HERE" 
});

let userIsAuthorised = false;

app.use(bodyParser.urlencoded({ extended: false }));
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
    res.render("index.ejs");
});

app.use(passwordCheck);

app.get("/login", (req, res) => {
    res.render("login.ejs");
});

app.get("/signup", (req,res) => {
    res.render("signup.ejs");
});

app.post("/home", (req,res) => {
    if (userIsAuthorised) {
        res.render("social.ejs");
    } else {  
        res.render("login.ejs");
    }

    const name = "John Theodore";
    res.render("social.ejs", { name });
});

app.get("/survey", (req, res) => {
    res.render("survey.ejs");
});

app.get("/explore", (req, res) => {
    res.render("explore.ejs");
});

app.get('/chats', (req, res) => {
    res.render("chats.ejs");
});

app.get('/analytics', (req, res) => {
    res.render("analytics.ejs");
});

io.on('connection', (socket) => {
    console.log('Connected...');
    socket.on('message', (msg) => {
        socket.broadcast.emit('message', msg);
    });
});

async function main(input) {
    messages.push(
        { role: 'user', content: "Arranged the names of doctors in list form at last of answer when asked and attach a chat button with each list item MindWise.com." },
        { role: 'user', content: "You are a chatbot specializing in psychology. Your goal is to provide informative responses to questions related to psychology topics. Your task is to recognize various psychology-related inquiries and provide accurate explanations or advice. If a user asks an unrelated question, politely decline to answer." },
      
      { role: 'user', content: "If the users chat inclues words like lonely, sad, depressed, anxious, stressed, tired, angry, frustrated, worried, or similar words, then your task is to suggest them practitioner doctors which includes Mr. Aditya Verma, Psychologist practitioner , Mr. Mohit Jain , Psychiatrist practitioner. Also tell them them that these are practitioner doctors not professional doctors but you can contact them as they are best suited for your current condition.Also Suggest them few communities which includes Be 10X Better, Wellness Waves, Uplift Unite also try to persue him to join these communities as it may help him come out of his current condition .If you want professional doctors list you can tell me and then suggest them professional doctors who include Dr. Shobit Sharma , Physcologist, Dr. Saumya Tyagi , Pyschiatrist. Do Not suggest any other doctors. " },
    { role: 'user', content: "If the users chat inclues serious words like i want to hurt myself, sucide, kill myself, or if you detect any excessive anger and hostilities or violence, then your task is to suggest them professional doctors which includes Dr. Shobit Sharma , Physcologist, Dr. Saumya Tyagi , Pyschiatrist. Also tell them them that these are professional doctors and try to convience the user to chat with them" },
    { role: 'user', content: input })
      ;
    console.log(messages);
    const chatCompletion = await openai.chat.completions.create({
        messages: messages,
        model: 'gpt-3.5-turbo',
    });
    return chatCompletion.choices[0]?.message?.content;
}

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/chatbot', (req, res) => {
    res.render("chatbot.ejs");
});

app.post('/api', async (req, res) => {
    console.log(req.body);
    const mes = await main(req.body.input);
    res.json({ success: true, message: mes });
});

http.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

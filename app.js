const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const collection = require('./collection')
const jwt = require('jsonwebtoken')
const course = require('./corse_collection')
const multer = require('multer')
const fs = require('fs')
const cors = require('cors')
const Authentication = require('./methods/authentication')
let token;

app.use(cors())
app.use(cookieParser())
app.use(bodyParser.json())
app.use(express.json());
app.use(
    express.urlencoded({
        extended: false,
    })
);

const uri = "mongodb+srv://Denis:denis123@cluster0.iaxba.mongodb.net/study_buddy?retryWrites=true&w=majority";

mongoose.connect(uri).then(() => {
    console.log("connection successfull...")
}).catch((err) => console.log("connection error : ", err))

app.post('/auth', async (req, res) => {
    if (req.body.token) {
        const token = req.body.token;
        const verifyToken = jwt.verify(token, "BearcatStudyBuddyProject")
        console.log(verifyToken);
        const verifyUser = await collection.findOne({ _id: verifyToken._id })
        if (verifyUser) {
            res.json({ success: 1, user: verifyUser })
        }
        else {
            res.json({ success: 0 })
        }
    } else {
        res.json({ success: 0 })
    }
})

app.post('/fetchData', async (req, res) => {
    try {
        const token = req.body.token;
        const verifyToken = jwt.verify(token, "BearcatStudyBuddyProject");
        const result = await course.findOne({ email: verifyToken.email })
        if (result) {
            const fileName = result.path;
            const Data = await fs.readFileSync(fileName, "utf-8")
            res.send(Data)
        } else {
            res.send()
        }
    } catch (err) {
        console.log(err)
    }
})

app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const result = await collection.findOne({ email: email })
        if (result) {
            const result1 = await bcrypt.compare(password, result.password)
            if (result1) {

                // we are genrating token
                token = jwt.sign({ _id: result._id, email: result.email }, "BearcatStudyBuddyProject");
                res.json({ success: 1, token: token })

            } else {
                res.json({ success: 0, error: "password or username is wrong" })
            }
        }
        else {
            res.json({ success: 0, error: "password or username is wrong" })
        }
    } catch (err) {
        console.log(err)
    }
})

app.post('/signup', async (req, res) => {
    try {
        const { fname, mname, lname, sid, email, mobile, bod, password } = req.body;
        const check = await collection.findOne({ email: email })
        if (check) {
            return res.json({ success: 0, error: "user is an already exist" })
        }
        hashPassword = await bcrypt.hash(password, 10); //10 is the number of rounds to use when generating a salt and 10 is a by default
        const result = new collection({
            fname,
            mname,
            lname,
            sid,
            email,
            mobile,
            bod,
            password: hashPassword
        });
        await result.save()
            .then(() => {
                console.log(result.email);
                const token = jwt.sign({ _id: result._id, email: result.email }, "BearcatStudyBuddyProject");
                // result.token = token;
                // await result.save();
                res.json({ success: 1, token: token });
            }).catch((err) => res.json({ success: 0, error: "Unsuccessfully registered" }))
    } catch (err) {
        res.status(400).send(err);
    }
})

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./storage/")
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "--" + file.originalname);
    }
})

const upload = multer({ storage: fileStorageEngine })

app.post("/course", upload.single("file"), async (req, res) => {
    try {
        console.log(req.file)
        const token = req.body.token;
        const verifyToken = jwt.verify(token, "BearcatStudyBuddyProject")
        const verifyUser = await collection.findOne({ _id: verifyToken._id })
        const filePath = './storage/' + req.file.filename;
        console.log(filePath);
        const checkUser = await course.findOne({ email: verifyUser.email })
        if (checkUser) {
            const result = await course.findOneAndUpdate({ email: verifyUser.email }, { path: filePath })
            await result.save()
        }
        else {
            const result = new course({ email: verifyUser.email, path: filePath })
            await result.save()
        }
        res.send({ success: 1 })
    } catch (err) {
        res.send({ success: 0, error: 'Database Error' })
    }
})

app.listen(process.env.PORT || 3300, console.log("server is ready to run..."))

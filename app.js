require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Student = require("./model/studentModel");
const app = express();
app.use(express.json());

const port = process.env.PORT || 5000;

//connect to mongodb

mongoose
    .connect(process.env.LINK, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("connected to mongodb");
    })
    .catch((err) => {
        console.log(err);
    });

app.get("/", async(req, res) => {
    res.send("Hello web hosting");
});

app.get("/get-student-data", async(req, res) => {
    try {
        const data = await Student.find();

        res.status(200).json({
            status: "ok",
            data: data,
        });
    } catch (err) {
        console.log(err);
    }
});

app.post("/create-student", async(req, res) => {
    try {
        const { name, age, contact } = req.body;

        const data = await Student.create({ name, age, contact });

        res.status(201).json({
            status: "ok",
            data: data,
        });
    } catch (error) {
        console.log(error);
    }
});

app.patch("/update-student/:id", async(req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;

        const result = await Student.findOneAndUpdate({ _id: id }, body, {
            new: true,
        });

        res.status(200).json({
            status: "ok",
            data: result,
        });
    } catch (error) {
        console.log(err);
    }
});

app.delete("/delete-student/:id", async(req, res) => {
    try {
        const id = req.params.id;
        const result = await Student.deleteOne({ _id: id });

        res.status(200).json({
            status: "ok",
            message: "Student has been deleted",
        });
    } catch (error) {
        console.log(error);
    }
});

app.listen(port, () => {
    console.log("server run at port " + port);
});
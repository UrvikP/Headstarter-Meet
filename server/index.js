import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import {config} from "dotenv";
config();

import Event from './models/Event.js'

import pkg from 'express';
const { Request, Response } = pkg;

const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cors({
    origin: '*',
}));

app.get("/events", async (req, res) => {
    const events = await Event.find();
    res.json(events);
});

app.post("/events", async (req, res) => {
    const newEvent = new Event({
        title: req.body.title,
        startYear: req.body.startYear,
        startMonth: req.body.startMonth,
        startDay: req.body.startDay,
        endYear: req.body.endYear,
        endMonth: req.body.endMonth,
        endDay: req.body.endDay,
        startHour: req.body.startHour,
        startMinute: req.body.startMinute,
        endHour: req.body.endHour,
        endMinute: req.body.endMinute
    });
    const createdEvent = await newEvent.save();
    res.json(createdEvent);
});

app.delete('/events/:id', async (req, res) => {
  const id = req.params.id;
  await Event.findByIdAndDelete(id);
  res.json({ message: 'Event deleted successfully' });
});

//Connecting the DB to the Server
mongoose.connect(process.env.DBURI ?? "").then(() => {
    console.log(`listening on port ${PORT}`);
    app.listen(PORT);
});
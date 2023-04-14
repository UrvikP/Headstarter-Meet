import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;

const EventSchema = new Schema({
  title: String,
  startYear: Number,
  startMonth: Number,
  startDay: Number,
  endYear: Number,
  endMonth: Number,
  endDay: Number,
  startHour: Number,
  startMinute: Number,
  endHour: Number,
  endMinute: Number,
  isMeeting: Boolean
});

const eventModel = mongoose.model('Events', EventSchema);

export default eventModel;
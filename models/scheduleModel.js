import mongoose from "../database.js";

const ScheduleSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  date: {
    type: Date,
    require: true,
  },
  time: {
    type: Date,
    require: true,
  },
});

const Schedule = mongoose.model("Schedule", ScheduleSchema);

export default Schedule;

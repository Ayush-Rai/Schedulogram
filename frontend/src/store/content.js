import { createSlice } from "@reduxjs/toolkit";

const attendanceActivity = {
  date: "",
  hour: "",
  minute: "",
  seconds: "",
  attendance: -1,
};

const item = {
  itemId: "first_col",
  title: "X",
  description: "",
  holiday: false,
  break_: false,
  attendanceActivities: [attendanceActivity]
};
const initialContent = {
  none: [item],
  monday: [item],
  tuesday: [item],
  wednesday: [item],
  thursday: [item],
  friday: [item],
  saturday: [item],
};

const contentSlice = createSlice({
  name: "content",
  initialState: initialContent,
  reducers: {
    replaceContent(state, action) {

      state.none = action.payload.none;
      state.monday = action.payload.monday;
      state.tuesday = action.payload.tuesday;
      state.wednesday = action.payload.wednesday;
      state.thursday = action.payload.thursday;
      state.friday = action.payload.friday;
      state.saturday = action.payload.saturday;
    },
    add(state, action) {
      console.log(state);
      const newAttendanceActivity = {
        date: "",
        hour: "",
        minute: "",
        seconds: "",
        attendance: -1,
      };
      const newField = {
        itemId: action.payload.id,
        title: action.payload.title,
        description: "",
        holiday: false,
        break_: false,
        attendanceActivities: [newAttendanceActivity],
      };
      const day = action.payload.day;
      let len = state[day].length;
      if (state[day][len - 1].holiday) newField.holiday = true;
      state[day].push(newField);
    },

    update(state, action) {
      state[action.payload.day].map((item) => {
        if (item.itemId === action.payload.id && action.payload.title === null) {
          item.description = action.payload.description;
        }
        else if (item.itemId === action.payload.id && action.payload.description === null) {
          item.title = action.payload.title;
        }
        return item;
      });
    },

    updateAttendance(state, action) {


      state[action.payload.day].map((item) => {
        if (item.itemId === action.payload.itemId) {



          const oldAttendanceActivities=item.attendanceActivities;
          oldAttendanceActivities.push(action.payload.attendanceActivity);
          item.attendanceActivities = oldAttendanceActivities;
        }
        return item;
      });
    },
    setDayAsHoliday(state, action) {
      state[action.payload.day].map((item) => {
        item.holiday = true;
        return item;
      });
    },
    setTimeRangeAsBreak(state, action) {
      const col = action.payload.col;

      const days = Object.keys(state);

      let val = true;
      days.filter((day) => (val &= state[day].length >= col));
      if (!val) return;
      days.map((day, i) => {
        const newAttendanceActivity = {
          date: "",
          hour: "",
          minute: "",
          seconds: "",
          attendance: 2,
        };
        const newField = {
          itemId: i + " item " + (col + 1),
          title: "-",
          description: "none",
          holiday: false,
          break_: true,
          attendanceActivities: [newAttendanceActivity],
        };
        const arrDay = state[day];
        if (day !== "none") {
          if (arrDay[0].holiday) newField.holiday = true;
          if (arrDay.length > col) {
            newField.itemId = i + " item " + col;
            arrDay[col] = newField;
          } else arrDay.push(newField);
        }
        state[day] = arrDay;
        return arrDay;
      });
    },
  },
});

export const contentActions = contentSlice.actions;
export const NONE_ITEM = Object.keys(initialContent)[0];

export default contentSlice.reducer;

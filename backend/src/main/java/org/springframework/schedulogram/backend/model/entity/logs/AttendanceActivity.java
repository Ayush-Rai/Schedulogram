package org.springframework.schedulogram.backend.model.entity.logs;

public class AttendanceActivity {
    private String  date;
    private String hour;
    private String minute;
    private String seconds;
    private Integer attendance;

    public AttendanceActivity(String date, String hour, String minute, String seconds, Integer attendance) {
        this.date = date;
        this.hour = hour;
        this.minute = minute;
        this.seconds = seconds;
        this.attendance = attendance;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getHour() {
        return hour;
    }

    public void setHour(String hour) {
        this.hour = hour;
    }

    public String getMinute() {
        return minute;
    }

    public void setMinute(String minute) {
        this.minute = minute;
    }

    public String getSeconds() {
        return seconds;
    }

    public void setSeconds(String seconds) {
        this.seconds = seconds;
    }

    public Integer getAttendance() {
        return attendance;
    }

    public void setAttendance(Integer attendance) {
        this.attendance = attendance;
    }

    @Override
    public String toString() {
        return "AttendanceActivity{" +
                "date=" + date +
                ", hour='" + hour + '\'' +
                ", minute='" + minute + '\'' +
                ", seconds='" + seconds + '\'' +
                ", attendance=" + attendance +
                '}';
    }
}

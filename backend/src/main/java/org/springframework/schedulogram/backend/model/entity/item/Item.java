package org.springframework.schedulogram.backend.model.entity.item;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.schedulogram.backend.model.entity.logs.AttendanceActivity;

import java.util.List;

public class Item {
    private String itemId;
    private String title;
    private String description;
    private Boolean holiday;
    private Boolean break_;
    private List<AttendanceActivity> attendanceActivities;



    public Item(String itemId, String title, String description, Boolean holiday, Boolean break_, List<AttendanceActivity> attendanceActivities) {
        this.itemId = itemId;
        this.title = title;
        this.description = description;
        this.holiday = holiday;
        this.break_ = break_;
        this.attendanceActivities = attendanceActivities;
    }

    public List<AttendanceActivity> getAttendanceActivities() {
        return attendanceActivities;
    }

    public void setAttendanceActivities(List<AttendanceActivity> attendanceActivities) {
        this.attendanceActivities = attendanceActivities;
    }

    public String getItemId() {
        return itemId;
    }

    public void setItemId(String itemId) {
        this.itemId = itemId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }



    public Boolean getHoliday() {
        return holiday;
    }

    public void setHoliday(Boolean holiday) {
        this.holiday = holiday;
    }

    public Boolean getBreak_() {
        return break_;
    }

    public void setBreak_(Boolean break_) {
        this.break_ = break_;
    }

    @Override
    public String toString() {
        return "Item{" +
                "itemId='" + itemId + '\'' +
                ", title='" + title + '\'' +
                ", description='" + description + '\'' +
                ", holiday=" + holiday +
                ", break_=" + break_ +
                ", attendanceActivities=" + attendanceActivities +
                '}';
    }
}

package org.springframework.schedulogram.backend.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.schedulogram.backend.model.entity.content.Content;
import org.springframework.schedulogram.backend.model.entity.item.Item;
import org.springframework.schedulogram.backend.model.entity.logs.AttendanceActivity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ContentService {

    @Autowired
    ContentRepository contentRepository;

    public boolean saveContent(Content content){
        try {
            contentRepository.save(content);
            return true;
        }
        catch (Exception e){
            System.out.println("ERROR -> "+e);
            return false;
        }
    }

    public List<Content> retrieveAllContents(){
        List<Content> contents = contentRepository.findAll();
        return contents;
    }

    public boolean updateContents(String id,Content content){
        Optional<Content> existingContent = contentRepository.findById(id);
        if(!existingContent.isPresent())    return false;

        Content finalContent=existingContent.get();

        List<Item> none =content.getNone();
        List<Item> monday = content.getMonday();
        List<Item> tuesday = content.getTuesday();
        List<Item> wednesday =content.getWednesday();
        List<Item> thursday = content.getThursday();
        List<Item> friday = content.getFriday();
        List<Item> saturday = content.getSaturday();

        finalContent.setNone(none);
        finalContent.setMonday(monday);
        finalContent.setTuesday(tuesday);
        finalContent.setWednesday(wednesday);
        finalContent.setThursday(thursday);
        finalContent.setFriday(friday);
        finalContent.setSaturday(saturday);

        contentRepository.save(finalContent);

        return true;
    }

    public boolean addAttendanceActivity(String id,String day,String itemId, AttendanceActivity attendanceActivity) {
        Optional<Content> existingContent = contentRepository.findById(id);
        if(!existingContent.isPresent())    return false;

        Content finalContent=existingContent.get();
        List<Item> dayContent=new ArrayList<>();

        if(day.equalsIgnoreCase("monday")){
            dayContent=finalContent.getMonday();
        }
        else if(day.equalsIgnoreCase("tuesday")){
            dayContent=finalContent.getTuesday();
        }
        else if(day.equalsIgnoreCase("wednesday")){
            dayContent=finalContent.getWednesday();
        }
        else if(day.equalsIgnoreCase("thursday")){
            dayContent=finalContent.getThursday();
        }
        else if(day.equalsIgnoreCase("friday")){
            dayContent=finalContent.getFriday();
        }
        else if(day.equalsIgnoreCase("saturday")){
            dayContent=finalContent.getSaturday();
        }

        for(Item item: dayContent){
            if(item.getItemId().equalsIgnoreCase(itemId)){
                List<AttendanceActivity> oldAttendanceActivities = item.getAttendanceActivities();
                oldAttendanceActivities.add(attendanceActivity);
                item.setAttendanceActivities(oldAttendanceActivities);
                break;
            }
        }

        if(day.equalsIgnoreCase("monday")){
            finalContent.setMonday(dayContent);
        }
        else if(day.equalsIgnoreCase("tuesday")){
            finalContent.setTuesday(dayContent);
        }
        else if(day.equalsIgnoreCase("wednesday")){
            finalContent.setWednesday(dayContent);
        }
        else if(day.equalsIgnoreCase("thursday")){
            finalContent.setThursday(dayContent);
        }
        else if(day.equalsIgnoreCase("friday")){
            finalContent.setFriday(dayContent);
        }
        else if(day.equalsIgnoreCase("saturday")){
            finalContent.setSaturday(dayContent);
        }

        contentRepository.save(finalContent);

        return true;

    }
}

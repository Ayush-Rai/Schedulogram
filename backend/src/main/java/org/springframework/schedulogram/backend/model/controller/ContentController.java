package org.springframework.schedulogram.backend.model.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.schedulogram.backend.model.entity.content.Content;
import org.springframework.schedulogram.backend.model.entity.logs.AttendanceActivity;
import org.springframework.schedulogram.backend.model.service.ContentService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/contents")
public class ContentController {

    @Autowired
    ContentService contentService;

    @GetMapping("/")
    public List<Content> getAllContents(){
        List<Content> contents = contentService.retrieveAllContents();
        return contents;

    }

    @PostMapping("/save")
    public ResponseEntity<Content> saveContent(@RequestBody Content content){
        boolean value = contentService.saveContent(content);
        if(value==true)   return new ResponseEntity<Content>(HttpStatus.CREATED);
        return new ResponseEntity<Content>(HttpStatus.BAD_REQUEST);
    }

    @PutMapping(value = "/update",consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Content> updateContents(@RequestParam(name="id") String id,@RequestBody Content content){
        boolean value = contentService.updateContents(id, content);

        if(value==true) return new ResponseEntity<Content>(HttpStatus.OK);

        return new ResponseEntity<Content>(HttpStatus.NO_CONTENT);
    }

    @PatchMapping(value = "/addAttendance",consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Content> updateAttendanceContents(@RequestParam(name="id") String id,
                                                            @RequestParam(name="itemId") String itemId,
                                                            @RequestParam(name="day") String day,
                                                            @RequestBody AttendanceActivity attendanceActivity){
        boolean value = contentService.addAttendanceActivity(id, day, itemId, attendanceActivity);
        if(value==true) return new ResponseEntity<Content>(HttpStatus.OK);

        return new ResponseEntity<Content>(HttpStatus.NO_CONTENT);
    }
}

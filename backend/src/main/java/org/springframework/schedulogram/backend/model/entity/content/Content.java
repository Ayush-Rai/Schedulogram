package org.springframework.schedulogram.backend.model.entity.content;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.schedulogram.backend.model.entity.item.Item;

import java.util.List;

@Document("contents")
public class Content {

    @Id
    private String id;

    private List<Item> none;
    private List<Item> monday;
    private List<Item> tuesday;
    private List<Item> wednesday;
    private List<Item> thursday;
    private List<Item> friday;
    private List<Item> saturday;

    public Content(List<Item> none, List<Item> monday, List<Item> tuesday, List<Item> wednesday, List<Item> thursday, List<Item> friday, List<Item> saturday) {
        this.none = none;
        this.monday = monday;
        this.tuesday = tuesday;
        this.wednesday = wednesday;
        this.thursday = thursday;
        this.friday = friday;
        this.saturday = saturday;
    }

    public String getId() {
        return id;
    }

    public List<Item> getNone() {
        return none;
    }

    public void setNone(List<Item> none) {
        this.none = none;
    }

    public List<Item> getMonday() {
        return monday;
    }

    public void setMonday(List<Item> monday) {
        this.monday = monday;
    }

    public List<Item> getTuesday() {
        return tuesday;
    }

    public void setTuesday(List<Item> tuesday) {
        this.tuesday = tuesday;
    }

    public List<Item> getWednesday() {
        return wednesday;
    }

    public void setWednesday(List<Item> wednesday) {
        this.wednesday = wednesday;
    }

    public List<Item> getThursday() {
        return thursday;
    }

    public void setThursday(List<Item> thursday) {
        this.thursday = thursday;
    }

    public List<Item> getFriday() {
        return friday;
    }

    public void setFriday(List<Item> friday) {
        this.friday = friday;
    }

    public List<Item> getSaturday() {
        return saturday;
    }

    public void setSaturday(List<Item> saturday) {
        this.saturday = saturday;
    }

    @Override
    public String toString() {
        return "Content{" +
                "id='" + id + '\'' +
                ", none=" + none +
                ", Monday=" + monday +
                ", Tuesday=" + tuesday +
                ", Wednesday=" + wednesday +
                ", Thursday=" + thursday +
                ", Friday=" + friday +
                ", Saturday=" + saturday +
                '}';
    }
}

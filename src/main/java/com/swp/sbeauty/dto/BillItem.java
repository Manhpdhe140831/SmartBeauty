package com.swp.sbeauty.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class BillItem<C, S> {
    private C course;
    private S service;

    public BillItem() {
    }

    public BillItem(C course, S service) {
        this.course = course;
        this.service = service;
    }

    public C getCourse() {
        return course;
    }

    public void setCourse(C course) {
        this.course = course;
    }

    public S getService() {
        return service;
    }

    public void setService(S service) {
        this.service = service;
    }
}

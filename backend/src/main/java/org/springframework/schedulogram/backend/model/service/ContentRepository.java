package org.springframework.schedulogram.backend.model.service;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.schedulogram.backend.model.entity.content.Content;

import java.util.Optional;

public interface ContentRepository extends MongoRepository<Content,String> {

    public Optional<Content> findById(String id);
}

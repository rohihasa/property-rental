package com.app.propertyrental.main.models;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.io.Serializable;


@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
@Document("File")
@JsonInclude(JsonInclude.Include.NON_NULL)
public class File implements Serializable {

    @Id
    private String id;
    private String filename;
    @JsonIgnore
    private double length;
    private Object metaData;
    @JsonIgnore
    private byte[] content;

}

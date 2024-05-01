package com.app.propertyrental.main.payload.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashMap;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class EmailRequest {
    HashMap<String, String> userMap;
    String message;
    String senderEmail;
    String senderName;
}

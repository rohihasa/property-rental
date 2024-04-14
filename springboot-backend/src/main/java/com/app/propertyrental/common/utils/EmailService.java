package com.app.propertyrental.common.utils;

import jakarta.mail.*;
import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.Map;
import java.util.Properties;


@Service
public class EmailService {
    private String emailTemplate;
    private Session session;
    private String senderEmail;
    private String senderName;
    public EmailService() {
        // default constructor
        try{

            String configFilePath = "src/main/resources/email-config.properties";
            File configFile= new File(configFilePath);
            Properties emailConfig = new Properties();
            if (!configFile.exists()) {
                return;
            }
            try (FileReader reader = new FileReader(configFile)) {
                emailConfig.load(reader);
            } catch (IOException e) {
                return;
            }

            String password=emailConfig.getProperty("email.password");
            String smtpHost = emailConfig.getProperty("smtp.host");
            int smtpPort = Integer.parseInt(emailConfig.getProperty("smtp.port"));
            String senderEmail = emailConfig.getProperty("sender.email");
            String senderName = emailConfig.getProperty("sender.name");
            String emailTemplate = loadEmailTemplate("src/main/resources/email_template.txt");

            Properties props = new Properties();
            props.put("mail.smtp.host", smtpHost);
            props.put("mail.smtp.port", smtpPort);
            props.put("mail.smtp.auth", "true");
            props.put("mail.smtp.starttls.enable", "true");


            Session session = Session.getInstance(props, new Authenticator() {
                protected PasswordAuthentication getPasswordAuthentication() {
                    return new PasswordAuthentication(senderEmail, password);
                }
            });

            this.emailTemplate= emailTemplate;
            this.senderEmail= senderEmail;
            this.senderName= senderName;
            this.session=session;

        }catch (Exception e){
            e.printStackTrace();
        }
    }

    public void sendEmails(Map<String, String> recipients,String personalMessage) {
        try{
            for(Map.Entry<String, String> entry : recipients.entrySet()) {
                String recipientEmail = entry.getKey();
                String recipientName = entry.getValue();

                String personalizedEmail = emailTemplate
                        .replace("{{sender_name}}", senderName)
                        .replace("{{sender_email}}", senderEmail)
                        .replace("{{recipient_name}}", recipientName)
                        .replace("{{recipient_email}}", recipientEmail)
                        .replace("{{message}}", personalMessage);


                // Create a new message
                Message message = new MimeMessage(session);
                message.setFrom(new InternetAddress(senderEmail, senderName));
                message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(recipientEmail));
                message.setSubject("Hello, " + recipientName);
//                message.setText(personalizedEmail);
                message.setContent(personalizedEmail, "text/html");

                Transport.send(message);
                System.out.println("Email sent to " + recipientName + " at " + recipientEmail);
                System.out.println(personalizedEmail);
            }


        }catch (Exception e){
            e.printStackTrace();
        }
    }

    static String loadEmailTemplate(String path)  throws IOException {
        StringBuilder template = new StringBuilder();
        try (BufferedReader reader = new BufferedReader(new FileReader(path))) {
            String line;
            while ((line = reader.readLine()) != null) {
                template.append(line).append("\n");
            }
        } catch (Exception e){
            e.printStackTrace();
        }
        return template.toString();
    }


}
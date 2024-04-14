package com.app.propertyrental.common.utils;

import com.app.propertyrental.common.security.services.UserDetailsImpl;
import org.bson.types.ObjectId;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;


@Service
public class CommonUtils {

//    get current user id
    public ObjectId getUserId(){
        String user_id= ((UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getId();
        return new ObjectId(user_id);
    }

    public String getEmail(){
        String email= ((UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getEmail();
        return email;
    }

    public String getRole(){
        String role= ((UserDetailsImpl) SecurityContextHolder.getContext().getAuthentication().getPrincipal()).getAuthorities().toString();
        System.out.println("roleeee:"+role);
        return role;
    }
}

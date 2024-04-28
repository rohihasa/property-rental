package com.app.propertyrental.main.payload.response;

import com.app.propertyrental.common.models.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AdminDashboardResponse {
    private int totalUsers;
    private double adminCommission;
    private List<User> allUsers;
}

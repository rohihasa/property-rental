import React from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';

function UsersPageForAdmin() {
  // Replace this with actual data
  const users = [
    { userId: 1, username: 'User1', email: 'user1@example.com', status: 'Pending' },
    // More users...
  ];

  return (
    <Box sx={{ margin: '20px', padding: '20px', border: '1px solid #000' }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>UserId</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.userId}>
                <TableCell>{user.userId}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell>
                  <Button style={{margin:"12px"}} variant="contained" color="primary">Accept</Button>
                  <Button variant="contained" color="secondary">Reject</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default UsersPageForAdmin;
import React, { useEffect } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import UserService from '../../services/UserService';

function UsersPageForAdmin() {
  // Replace this with actual data
  const [pendingOwners, setPendingOwners] = React.useState([]); // Replace this with actual data
  const users = [
    { userId: 1, username: 'User1', email: 'user1@example.com', status: 'Pending' },
    // More users...
  ];

  useEffect(() => {
    UserService.getPendingOwners().then((response) => {
      console.log(response);
      setPendingOwners(response.data);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  const handleApproveOrReject = (action,userId) => {
    UserService.approveOrRejectOwner(action,userId).then((response) => { // Replace this with actual function
      console.log(response);
      setPendingOwners(pendingOwners.filter((user) => user.id !== userId));
    }).catch((error) => {
      console.log(error);
    });
  }

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
            {pendingOwners&&pendingOwners.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>Pending</TableCell>
                <TableCell>
                  <Button onClick={()=>handleApproveOrReject("approve",user.id)} style={{margin:"12px"}} variant="contained" color="primary">Accept</Button>
                  <Button onClick={()=>handleApproveOrReject("reject",user.id)} variant="contained" color="secondary">Reject</Button>
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
import React from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

function ApplicationsPageForAdmin() {
  // Replace this with actual data
  const applications = [
    { propertyId: 1, startDate: '2022-01-01', endDate: '2022-12-31', username1: 'User1', username2: 'User2' },
    // More applications...
  ];

  return (
    <Box sx={{ margin: '20px', padding: '20px', border: '1px solid #000' }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>PropertyId</TableCell>
              <TableCell>Contract Start Date</TableCell>
              <TableCell>Contract End Date</TableCell>
              <TableCell>Username1</TableCell>
              <TableCell>Username2</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {applications.map((application) => (
              <TableRow key={application.propertyId}>
                <TableCell>{application.propertyId}</TableCell>
                <TableCell>{application.startDate}</TableCell>
                <TableCell>{application.endDate}</TableCell>
                <TableCell>{application.username1}</TableCell>
                <TableCell>{application.username2}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default ApplicationsPageForAdmin;
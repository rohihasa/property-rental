import React,{useEffect}from 'react';
import { Grid, Card, CardContent, Typography, Avatar, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Box } from '@mui/material';
import { AccountCircle, AttachMoney } from '@mui/icons-material';
import UserService from '../../services/UserService';

function AdminPanelPage() {
    const [users, setUsers] = React.useState([]);
    const [totalUsers, setTotalUsers] = React.useState(0);
    const [totalEarnings, setTotalEarnings] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    const [transactions, setTransactions] = React.useState([])

    useEffect(() => {
        setLoading(true);
        UserService.getUsers()
            .then((response) => {
                setUsers(response.data);
                setTotalUsers(response.data.length);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
            });
        UserService.getTransactions().then((response) => {
            setTransactions(response.data);
            let total = 0;
            response.data.forEach((transaction) => {
                total += transaction.amount;
            });
            setTotalEarnings(total);
        }).catch((error) => {});
    }, []);
  return (
    <div style={{marginLeft:"0px"}} className='admin-container'>
    <Grid sx={{marginTop:"10px"}} container spacing={1}>
      <Grid item xs={6}>
        <Card sx={{
            backgroundColor: '#ffc000',
            maxWidth: '60%',
            height: '140px'
        }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Users
            </Typography>
            <Typography variant="body2">
              {totalUsers}
            </Typography>
            <Avatar sx={{ float: 'right' }}>
              <AccountCircle />
            </Avatar>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={6}>
        <Card sx={{
             backgroundColor: '#ffc000',
            maxWidth: '60%',
            height: '140px'
        }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Earnings
            </Typography>
            <Typography variant="body2">
              {totalEarnings}
            </Typography>
            <Avatar sx={{ float: 'right' }}>
              <AttachMoney />
            </Avatar>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
    <Box sx={{ marginTop: '20px' }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {/* Add table headers here */}
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Add table rows here */}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  </div>
  )
}

export default AdminPanelPage
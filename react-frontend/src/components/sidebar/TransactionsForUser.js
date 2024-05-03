import React, { useEffect } from "react";
import UserService from "../../services/UserService";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
} from "@mui/material";

function TransactionsForUser() {
  const [transactions, setTransactions] = React.useState([]);
  useEffect(() => {
    UserService.getAllUserTransactions()
      .then((data) => {
        console.log(data);
        setTransactions(data.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div>
      <Box sx={{ marginTop: "20px" }}>
        <h4>Transactions</h4>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Property Id</TableCell>
                <TableCell>User Id</TableCell>
                <TableCell>Application Id</TableCell>
                <TableCell>Payment Method</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Commission</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions &&
                transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.propertyId}</TableCell>
                    <TableCell>{transaction.userId}</TableCell>
                    <TableCell>{transaction.applicationId}</TableCell>
                    <TableCell>{transaction.paymentMethod}</TableCell>
                    <TableCell>{transaction.paymentStatus}</TableCell>
                    <TableCell>{transaction.amount}</TableCell>
                    <TableCell>{transaction.paymentDate}</TableCell>
                    <TableCell>{transaction.adminCommission}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </div>
  );
}

export default TransactionsForUser;

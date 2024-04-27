import React from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Button } from '@mui/material';

function PropertiesPageForAdmin() {
  // Replace this with actual data
  const properties = [
    { id: 1, name: 'Property1', owner: 'Owner1', imageUrl: 'https://via.placeholder.com/200x400' },
    { id: 2, name: 'Property1', owner: 'Owner1', imageUrl: 'https://via.placeholder.com/200x400' },
    { id: 3, name: 'Property1', owner: 'Owner1', imageUrl: 'https://via.placeholder.com/200x400' },
    { id: 4, name: 'Property1', owner: 'Owner1', imageUrl: 'https://via.placeholder.com/200x400' },
]
  ;

  return (
    <Grid container spacing={2}>
      {properties.map((property) => (
        <Grid item xs={4} key={property.id}>
          <Card sx={{ width: '300px' }}>
            <CardMedia
              component="img"
              height="200"
              image={property.imageUrl}
              alt={property.name}
              sx={{ width: '150px' ,marginLeft:"80px",marginTop:"10px"}}
              
            />
            <CardContent>
              <Typography variant="h5" component="div">
                {property.name}
              </Typography>
              <Typography variant="body2">
                {property.owner}
              </Typography>
              <Button style={{margin:"10px"}} variant="contained" color="primary">Verify</Button>
              <Button variant="contained" color="secondary">Delete</Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

export default PropertiesPageForAdmin;
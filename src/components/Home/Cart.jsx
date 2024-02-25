import React from 'react';
import { useCart } from './CartContext';
import { Card, CardContent, CardMedia, Typography, Button } from '@mui/material';

const Cart = () => {
  const { state } = useCart();

  return (
    <div style={{ width: '400px', marginTop: '20px' }}> {/* Adjust the width and margin top values as needed */}
      <h2>Your Cart</h2>
      <div className="cart-items">
        {state.cartItems.map((item) => (
          <Card key={item.id} className="cart-item" style={{ marginBottom: '20px' }}> {/* Adjust the margin bottom value as needed */}
            <CardMedia
              component="img"
              height="140"
              image={`data:${item.Image.contentType};base64,${item.Image.data}`}
              alt="petImage"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {item.PetName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {item.Breed}
              </Typography>
            </CardContent>
            <Button variant="contained" color="primary" fullWidth>
        Buy
      </Button>
          </Card>
        ))}
      </div>
      
    </div>
  );
};

export default Cart;

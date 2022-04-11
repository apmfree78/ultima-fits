export default function calcTotalPrice(cart) {
  return cart.reduce((tally, cartItem) => {
    if (!cartItem.product) return tally; // products can be delete but can still be in the cart
    return tally + cartItem.quantity * cartItem.product.price;
  }, 0);
}

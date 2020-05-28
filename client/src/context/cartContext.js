import React from "react";

export const CartContext = React.createContext();

export default class CartProvider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cart: [ {
      brand: "Michael Jordan shoe",
      img: "https://dyn1.heritagestatic.com/lf?set=path%5B1%2F1%2F2%2F4%2F1%2F11241871%5D&call=url%5Bfile%3Aproduct.chain%5D",
      items: [{size: 43, quantity: 2}],
      price: 399,
      _id: "5ece4db80f1af97f08f1308d", 
    }],
    totalPrice: 0
    };

    
    // this.addToCart = this.addToCart.bind(this);
  }

    componentDidMount() {
     this.getTotal()
    } 

  addToCart = (productId, brand, price, img, size, quantity) => {
    const isInCart = this.state.cart.some(element => element._id === productId);
    const clonedCart = Object.assign([], this.state.cart)
    console.log(isInCart, "isInCart");
    
    if (!isInCart) {
      let newProduct = { _id: productId, brand: brand, price: price, img: img, items: [{ size, quantity }] };
      clonedCart.push(newProduct)
      console.log();
    } 
    else {
      const productRow = clonedCart.find(element => element._id === productId);

      const sizeExist = productRow.items.some(element => element.size === size);
      
      if (sizeExist) {
        const sizeExisting =  productRow.items.find(element => element.size === size)
        sizeExisting.quantity = quantity
        
      } else {
        productRow.items.push({size, quantity})
      }
    }
    
    this.setState({cart: clonedCart})
    console.log("cart", this.state.cart);
    //this.getTotal()
  };


  getTotal = () => {
    let res = this.state.cart.price

    this.setState({totalPrice: res})
  }

  render() {
    return (
      <CartContext.Provider
        value={{
          state: this.state,
          addToCart: this.addToCart,
          getTotal: this.getTotal,
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    );
  }
}
export const CartConsumer = CartContext.Consumer;

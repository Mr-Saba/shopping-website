import React from "react";
import {PaymentRequestButtonElement, CardNumberElement, CardExpiryElement, CardCVCElement, injectStripe} from 'react-stripe-elements';
import { Button } from "@material-ui/core";
import "./checkout.css"
import { AddOrder } from "../../redux/actions";

class CheckoutForm extends React.Component {

  orderAdd = () => {
    const data = {
      orderId: Math.floor(1000 + Math.random() * 9000),
      date: this.currentDateGenerator(),
      address: this.props.info.address,
    }

    this.props.dispatch(AddOrder(data))
  }

  currentDateGenerator = () => {
    const date = new Date()
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
  }


  state = {
    message: ""
  }

  handleSubmit = async (ev) => {

    const {name, surname, email, phone, postal_code, city, address, fullFee} = this.props.info;
    console.log(this.props.info)

    ev.preventDefault()
    
    const cardElement = this.props.elements.getElement('cardNumber');
    
    const {error, paymentMethod} = await this.props.stripe
      .createPaymentMethod({
        type: 'card',
        card: cardElement,
        billing_details: {
          email: email,
          name: `${name} ${surname}`,
          phone: phone,
          address: {
            city: city,
            line1: address,
            postal_code: postal_code
          }
        },
      })
    console.log(paymentMethod)
    if (error) {
      this.setState({
        message: error
      })
    } else {
      this.setState({
      message: `Thanks for that purchase ${paymentMethod.billing_details.name}`
      });
      this.orderAdd()
      // ... SEND to your API server to process payment intent
    }

  }
  render() {
      return (
        <form onSubmit={this.handleSubmit} className="form">
          <p style={{marginBottom: "10px", color: "green"}}>{this.state.message && this.state.message}</p>  
          <h1>Checkout</h1>
          <CardNumberElement className="input"/>
          <CardExpiryElement className="input"/>
          <CardCVCElement className="input"/>
          <Button variant="contained" type="submit">pay</Button>
        </form>
      );

  }
}

export default injectStripe(CheckoutForm);
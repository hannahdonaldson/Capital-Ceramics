import React, { Component } from 'react';
import Link from 'react-router-dom';
import { NavLink } from "react-router-dom";


export default class ViewGoodie extends Component {
    constructor(props) {
        super(props)

        this.state = {
            singleGoodie: [],
            addToCart: true,
            cartNumberItems: false,
            numberOfItems: 1,
            number: 0
        }
        this.addToCart = this.addToCart.bind(this)
        this.addNumberItemToCart = this.addNumberItemToCart.bind(this)
        this.add = this.add.bind(this)
    }

    add() {
        this.setState({
          number: this.state.number + 1
        });
      };

    componentDidMount() {
        const { id } = this.props.match.params

        fetch(`https://hannahs-goodies-api.herokuapp.com/goodie/${id}`, {
            method: 'GET',
            header: {
                "accepts": "application/json",
                "Content-Type": "application/json"
            }
        })
        .then(response => {return response.json();})
        .then(data => {this.setState({singleGoodie: data});})
        .catch(err => {console.log("Fetch Error" + err);})
    }

    addNumberItemToCart() {
        this.setState({
            numberOfItems: event.target.value
        });
    }

    addToCart() {
        this.setState({
            cartNumberItems: true
        })
        console.log('You added this to your cart')
    }

    render() {
        return(
            <div className="view-goodies">

            {/* <Link exact to={'/cart'} > <button onClick = {this.addToCart} > Add to Cart </button>  </Link> */}

            <NavLink exact to = "/cart" className = 'cart-link'>
                <button onClick = {this.addToCart} > Add to Cart </button>
            </NavLink>

            {this.state.number}

            <button className='inc' onClick={this.add}>Add</button>
            
            <form>
                <label style = {{display: this.state.cartNumberItems ? 'none' : 'grid'}}>
                    <div>
                    <select value={this.state.numberOfItems} onChange={this.addNumberItemToCart} className = 'qty'>
                        <option value="1">1 Dozen</option> 
                        <option value="2">2 Dozen</option> 
                        <option value="3">3 Dozen</option> 
                        <option value="4">4 Dozen</option> 
                    </select>
                    </div>
                </label>
            </form>
                <div className = 'view-goodie-info'>
                    <h1 className = 'title'>{this.state.singleGoodie[1]}</h1>
                    <h3 className = 'summary'>{this.state.singleGoodie[2]}</h3>
                    <h2 className = 'cost'>${this.state.singleGoodie[3]}</h2>
                    <img className = 'img' src={this.state.singleGoodie[5]} />
                </div>
            </div>
        )
    }
}
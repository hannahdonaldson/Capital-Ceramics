import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { Link} from 'react-router-dom';
import Popup from "reactjs-popup";

import GoodieButtons from '../buttons/goodie-buttons'
import SearchBar from '../search/search-bar'

const titleize = require('titleize');

export default class Home extends Component {
        constructor(props) {
        super(props)

        this.state = {
            goodies: [],
            redirect: false,
            data: [],
            catagory: "all",
            searchInfo: "all"
        }
        this.viewInfo = this.viewInfo.bind(this)
        this.handleGoodieChangeCategory = this.handleGoodieChangeCategory.bind(this)
        this.handleGoodieChangeSearch = this.handleGoodieChangeSearch.bind(this)
    }

    componentDidMount() {
        fetch ("https://hannahs-goodies-api.herokuapp.com/goodies", {
            method: "GET",
            headers: {
                "accepts": "application/json",
                "Content-Type": "application/json"
            }
        })
        .then(response => {return response.json();})
        .then(data => {this.setState({goodies: data});})
        .catch(error => {
            console.log("Fetch error" + error)
        })
    }

    viewInfo() {
        this.setState({redirect: true});
    }

    handleGoodieChangeCategory(catagory) {
        this.setState({
            catagory: catagory
        })
    }

    handleGoodieChangeSearch(searchInfo) {
        this.setState({
            searchInfo: searchInfo
        })
    }

    render() {
        return(
            <div>
                <div className = 'grid-wrapper'>
                    <div className='home-bottom'>
                        <div className='home-goodie-buttons'>
                            <GoodieButtons handleGoodieChangeCategory={this.handleGoodieChangeCategory} />
                        </div>
                        <div className = "search-bar-nav"> <SearchBar handleGoodieChangeSearch={this.handleGoodieChangeSearch}/> </div>
                    </div>
                    <div className="goodies" >
                        {this.state.goodies.map((data) => (
                            this.state.catagory === data[4] || this.state.searchInfo === titleize(data[1]) ? (<div className="goodie-data">
                                <div className="goodie-data-title" key = {this.state.searchInfo}>
                                    {data[1]}
                                </div>
                                
                                <Link to={`/view_goodie/${data[0]}`} ><img src={data[5]} onClick = {this.viewInfo}></img></Link> 
                                
                                </div>) : null
                        ))}

                        {this.state.goodies.map((data) => (
                            this.state.searchInfo === "all" ? (<div className="goodie-data">
                                <div className="goodie-data-title">
                                    {data[1]}
                                </div>
                                
                                <Link to={`/view_goodie/${data[0]}`} ><img src={data[5]} onClick = {this.viewInfo}></img></Link> 
                                
                                </div>) : null
                        ))}


                        <div className="buy-goodie">
                            <Popup trigger={<button> Buy New Spring Special Blueberry Cupcakes! </button>} position="top center">
                                <Redirect push to={`/view_goodie/2`} />
                            </Popup>
                        </div>
                    </div>
                    
                </div>
            </div>
        )
    }
}


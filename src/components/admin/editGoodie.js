import React, { Component } from 'react';
import { withRouter } from 'react-router';

class EditGoodie extends Component {
    constructor(props) {
        super(props)

        this.state = {
            id: 0,
            title: "",
            author: "",
            formHidden: true
        }
        this.editBook = this.editBook.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    editBook() {
        this.setState({id: this.props.ourProp[0]})
        this.setState({title: this.props.ourProp[1]})
        this.setState({author: this.props.ourProp[2]})
        this.setState({formHidden: !this.state.formHidden})
    }

    handleSubmit(event) {
        event.preventDefault();
        let id = this.state.id
        let title = this.state.title
        let author = this.state.author

        const history = this.props.history
        
        fetch (`https://hannahs-goodies-api.herokuapp.com/update_book/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({title: title, author: author, id: id})
        })
        .then(response => response.json())
        .then(responseData => {return responseData})
        .then(() => {this.props.history.push('/')})
        .catch(err => {console.log("Fetch Error" + err)})
    }

    render() {
        return(
            <div className = ''>
                <button onClick = {this.editBook}>Update This Goodie</button>

                <form onSubmit = {this.handleSubmit} style = {{visibility: this.state.formHidden ? "hidden" : "visible"}}>
                    <label>Title</label>
                    <input type = "text" name = "title" value = {this.state.title} onChange = {this.handleChange}/>

                    <label>Author</label>
                    <input type = "text" name = "author" value = {this.state.author} onChange = {this.handleChange}/>

                    <input type = "submit" value = "Submit" />
                </form>
            </div>
        )
    }
}

export default withRouter(EditGoodie)
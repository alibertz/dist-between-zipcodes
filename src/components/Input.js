import React, { Component } from 'react';
const data = require('../zipcodes.json');

class Input extends Component {

    state={
        zip1: "",
        zip2: ""
    }

    // input validation
    setZips = () => {
        // these variables evaluate to true if there's a match from input to zipcodes.json
        let validZip1 = data.find(item => item.Zipcode === this.state.zip1);
        let validZip2 = data.find(item => item.Zipcode === this.state.zip2);

        // first checks if any input boxes are empty
        if(this.state.zip1.length === 0 && this.state.zip2.length > 0) {
            this.props.sendErr("Please enter a value for city 1");
        } else if (this.state.zip1.length > 0 && this.state.zip2.length === 0) {
            this.props.sendErr("Please enter a value for city 2");
        } else if (this.state.zip1.length === 0 && this.state.zip2.length === 0) {
            this.props.sendErr("Please enter zip values for both city inputs");
        } else {
            // if not empty, checks to see if zip code is present in zipcodes.json
            if (validZip1 && !validZip2) {
                this.props.sendErr("Input for city #2 is not a valid zip code");
            } else if (!validZip1 && validZip2) {
                this.props.sendErr("Input for city #1 is not a valid zip code");
            } else if (!validZip1 && !validZip2) {
                this.props.sendErr("Both inputs are not real US zip codes");
            } else {
                // finally, if there are 2 VALID inputs, it sends zip obj up to App.js
                this.props.setZipCodes(validZip1, validZip2);
            }
        }
    }

    render() {
        return (
            <div id="inputContainer">
                <div id="textboxContainer">
                    <div className="tb">
                        <input maxLength="5" value={this.state.zip1} onChange={event => this.setState({zip1: event.target.value.replace(/\D/,'')})}/>
                        <h5>City 1 Zip</h5>
                    </div>
                    <div className="tb">
                        <input maxLength="5" value={this.state.zip2} onChange={event => this.setState({zip2: event.target.value.replace(/\D/,'')})}/>
                        <h5>City 2 Zip</h5>
                    </div>
                    

                </div>
                <div id="unitContainer">
                      <label>
                        <input onClick={this.props.handleUnitChange} type="radio" name="unit" value="km"/>
                        <span>km</span>
                      </label>
                      <label>
                        <input onClick={this.props.handleUnitChange} type="radio" name="unit" value="miles"/>
                        <span>mi</span>
                      </label>
                </div>
                <div id="btnContainer" >
                    <button onClick={this.setZips}>Find distance</button>                
                </div>                
            </div>

        );
    }
}

export default Input;
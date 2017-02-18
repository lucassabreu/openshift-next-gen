import React, { Component } from 'react';
import './App.css';
import MonthGenderChart from './MonthGenderChart';
import ShowUpChart from './ShowUpChart';
import GenderChart from './GenderChart';

const weekdayList = [
    "All",
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

class App extends Component {
    
    constructor (props) {
        super(props);
        this.state = {
            weekday : weekdayList[0]
        };
    }

    onWeekdayChange (event) {
        this.setState({
            weekday : event.target.value
        });
    }

    render() {
        return (
            <div className="App">
                <h1 className="center">
                    <span>Month vs Gender</span>
                    <select value={this.state.weekday} onChange={(e) => this.onWeekdayChange(e)}>
                        { weekdayList.map((value, key) => <option key={key} value={value}>{value}</option>) }
                    </select>
                </h1>
                <MonthGenderChart weekday={this.state.weekday} />
                <div className="pieContainer">
                    <div>
                        <h2 className="center">Totals Appointments</h2>
                        <GenderChart weekday={this.state.weekday} />
                    </div>
                    <div>
                        <h2 className="center">Totals Show Ups vs No-Show Ups</h2>
                        <ShowUpChart weekday={this.state.weekday} />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;

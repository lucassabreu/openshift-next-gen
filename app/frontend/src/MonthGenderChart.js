import React, { Component } from 'react';
import { Tooltip, Legend, CartesianGrid, ResponsiveContainer, LineChart, Line, XAxis, YAxis } from 'recharts';

class MonthGenderChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            male : [],
            female : []
        };
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.weekday !== this.props.weekday) {
            this.updateChartData(nextProps.weekday);
        }
    }

    componentDidMount() {
        this.updateChartData(this.props.weekday);
    }

    updateChartData(weekday) {
        let url = '/api/appointments/totals-by-month-gender';

        if (weekday !== 'All') {
            url += '?weekday=' + weekday;
        }

        fetch(new Request(url))
            .then((response) => response.json())
            .then((data) => {
                var male = [];
                var female = [];

                data.map((e) => {
                    var date = new Date(e.month);
                    e.month = (
                        (date.getMonth() < 9 ? '0' : '') +
                            (date.getMonth() + 1) + '/' + date.getFullYear()
                    );
                    return e;
                });

                for(var key in data) {
                    if (data[key].gender === 'M') {
                        male.push(data[key])
                        continue;
                    }

                    if (data[key].gender === 'F') {
                        female.push(data[key]);
                    }
                }

                this.setState({
                    male : male,
                    female : female
                });
            });
    }

    render() {
        const chart = (data, label) => (
            <div>
                <h2 className="center">{label}</h2>
                <div>
                    <ResponsiveContainer>
                        <LineChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" label="Month" />
                            <YAxis />
                            <Line type="monotone" dataKey="showedUp" stroke="red" name="Show Up" />
                            <Line type="monotone" dataKey="noShowUp" stroke="blue" name="No-Show Up" />
                            <Tooltip />
                            <Legend />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        );

        return (
            <div className="monthGenderChart">
                { chart(this.state.female, "Female") }
                { chart(this.state.male, "Male") }
            </div>
        );
    }
}

export default MonthGenderChart;

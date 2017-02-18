import React, { Component } from 'react';
import { Legend, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

class MonthGenderChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data : []
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
        let url = '/api/appointments/totals-gender';

        if (weekday !== 'All') {
            url += '?weekday=' + weekday;
        }

        fetch(new Request(url))
            .then((response) => response.json())
            .then((data) => {
                var chartData = [];
                for(var key in data) {
                    if (data[key].gender === 'M') {
                        chartData.push({
                            name : "Male",
                            value : data[key].total,
                            color : 'blue'
                        });
                        continue;
                    }
                    
                    chartData.push({
                        name : "Female",
                        value : data[key].total,
                        color : 'red'
                    });
                }

                this.setState({
                    data : chartData,
                });
            });

    }

    render() {
        return (
            <ResponsiveContainer>
                <PieChart>
                    <Pie data={this.state.data}>
                        { this.state.data.map((e, i) => <Cell key={i} fill={e.color} />) }
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        );
    }
}

export default MonthGenderChart;

import React, { Component } from 'react';
import { Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

class ShowUpChart extends Component {
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
        let url = '/api/appointments/total-show-up-no-show-up';

        if (weekday !== 'All') {
            url += '?weekday=' + weekday;
        }

        fetch(new Request(url))
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    data : [
                        { name : 'No-Show Up', value : data.noShowUp, color : 'orange' },
                        { name : 'Show Up', value : data.showedUp, color : 'green' }
                    ],
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
                    <Legend />
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        );
    }
}

export default ShowUpChart;

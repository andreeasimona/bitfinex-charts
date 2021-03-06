import React from 'react';
import api from '../api/api.js';
import { Line } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import '../style/app.css';
import store from '../state/store';
class App extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            dataSet: store.getState().dataSet
        };
    }
    componentDidMount() {
        api();
        setInterval(() => api(), 30000);
        this.unsubscribe = store.subscribe(() => {
            this.setState({
                faArrowIcon: store.getState().isNegative ? faArrowDown : faArrowUp,
                faArrowClass: store.getState().isNegative ? 'arrowRed' : 'arrowGreen',
                differenceLastValue: store.getState().differenceLastValue.toFixed(4),
                lastPrice: store.getState().lastPrice,
                dataSet: store.getState().dataSet
            });
        });
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    render() {
        if (this.state && this.state.faArrowIcon) {
            return (
                <div className="app">
                    <strong className="arrowContainer">Difference between the last 30 seconds
                        <FontAwesomeIcon icon={this.state.faArrowIcon} className={this.state.faArrowClass} />
                        {this.state.differenceLastValue}%
                    </strong>
                    <Line
                        data={this.state.dataSet}
                        width={100}
                        height={50}
                        options={{
                            maintainAspectRatio: true
                        }}
                    />
                </div>
            );
        } else return null;
    }
}

export default App;

import actionTypes from './actions';

const processDataSet = (dataSet, price) => {
    let newDataSet = {...dataSet};

    newDataSet.labels = [...dataSet.labels, ''];
    newDataSet.datasets = dataSet.datasets.map(el => {
        return {...el, data: [...el.data, price]};
    });

    return newDataSet;
};

let reducerChart = (state, action) => {
    switch (action.type) {
    case actionTypes.getBtcGbp:
        if (action.error || action.response === undefined || action.response.error) {
            return state;
        }

        const lastPrice = action.response.last_price;
        const differenceLastValue = state.lastPrice === undefined ? 0 : (lastPrice - state.lastPrice);
        const isNegative = differenceLastValue < 0;
        const dataSet = processDataSet(state.dataSet, lastPrice);

        return {...state, dataSet, isNegative, differenceLastValue, lastPrice};
    default:
        return state;
    }
};
export default reducerChart;

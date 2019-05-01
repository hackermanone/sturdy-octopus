import React from 'react';

import Grid from '../components/Grid';

class MainPage extends React.Component {

    constructor() {
        super();
        this.speed = 100;
        this.rows = 40;
        this.cols = 70;
        this.play = null;
        this.state = {
            generation: 0,
            gridFull: Array(this.rows).fill(0).map(
                () => {
                    return Array(this.cols).fill(0)
                }
            )
        };
        this.gridCopy = this.state.gridFull;

        this.getCell = this.getCell.bind(this);
        this.updateGridCopy = this.updateGridCopy.bind(this);
    }

    componentDidMount() {
        setInterval(this.updateState, 300);
    }

    render() {
        return(
            <div>
                <h1>Welcome to Poncie</h1>
                <Grid 
                    gridFull={this.state.gridFull}
                    rows={this.rows}
                    cols={this.cols}
                    onDragOver={this.handleDragOver}
                    onDragStart={this.handleDragStart}
                    onClick={this.handleDragStart}
                />
                <h2>Generations : {this.state.generation}</h2>
                <button onClick={this.handleStart}>Start</button>
                <button onClick={this.handleStop}>Stop</button>
                <button type="reset" onClick={this.handleReset}>Reset</button>
            </div>
        )
    }

    handleStop = () => {
        clearInterval(this.play);
    }

    handleStart = () => {
        if (!this.play) {
            this.play = setInterval(this.start, 1000);
        }
    }

    start = () => {
        console.log('jh')
    }

    getCell(element) {
        let id = element.getAttribute("id"),
            regex = /[c|r]/gi;

        let cellArray = id.split(regex);
        // ids follow the format r[num]c[num] so the first partition will always be null, shift to get the real values
        cellArray.shift(); 
        return cellArray;
    }

    updateGridCopy(row, col) {
        this.gridCopy[row][col] = 1
    }

    updateState = () => {
        this.setState({
            gridFull: this.gridCopy
        })
        //console.log(this.state.gridFull)
    }

    handleReset = () => {
        this.gridCopy.map((arr) => {
            return arr.fill(0)
        })

        this.setState({
            gridFull: this.gridCopy
        })
    }

    handleDragOver = (e) => {
        e.preventDefault();
        e.target.classList = "table-cell on";
        let [row, col] = this.getCell(e.target);
        this.updateGridCopy(row, col);
    }

    handleDragStart = (e) => {
        e.target.classList = "table-cell on";
        let [row, col] = this.getCell(e.target);
        this.updateGridCopy(row, col);
    }
}

export default MainPage;
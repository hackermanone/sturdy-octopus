import React from 'react';

import Grid from '../components/Grid';

class MainPage extends React.Component {

    constructor() {
        super();
        this.speed = 100;
        this.rows = 5;
        this.cols = 4;
        this.play = null;
        this.state = {
            generation: 0,
            gridFull: Array(this.rows).fill(0).map(
                () => {
                    return Array(this.cols).fill(0)
                }
            )
        };
        this.queue = [];

        this.getCell = this.getCell.bind(this);
        this.pushToQueue = this.pushToQueue.bind(this);
        this.setSize = this.setSize.bind(this);
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
                <button onClick={this.handleNext}>Next</button>
                <form onSubmit={this.setSize}>
                    <input name="rows" type="number" min="1" placeholder="# Rows" required/>
                    <input name="cols" type="number" min="1" placeholder="# Cols" required/>
                    <input type="submit" value="submit"></input>
                </form>
            </div>
        )
    }

    handleStop = () => {
        if (this.play) {
            clearInterval(this.play);
            this.play = null;
        }
    }

    handleStart = () => {
        if (!this.play) {
            this.play = setInterval(this.start, 1000);
        }
    }

    start = () => {
        // make sure we have the most updated grid
        this.updateState();
        let gridCopy = Object.assign([], this.state.gridFull)
        // play the game!
        gridCopy.forEach( (row, rowIndex, rowArray) => {
            row.forEach((col, colIndex) => {
                let adjCells = 0;
                let isDead = this.state.gridFull[rowIndex][colIndex] === 0;
                // look at the number of adjcent cells
                //console.log(`Row ${rowIndex} Col ${colIndex}`)
                if (rowIndex > 0) if (this.state.gridFull[rowIndex - 1][colIndex - 1]) {adjCells++;}
                if (rowIndex > 0) if (this.state.gridFull[rowIndex - 1][colIndex]) {adjCells++; }
                if (rowIndex > 0) if (this.state.gridFull[rowIndex - 1][colIndex + 1]) {adjCells++; }
                if (this.state.gridFull[rowIndex][colIndex - 1]) {adjCells++; }
                if (this.state.gridFull[rowIndex][colIndex + 1]) {adjCells++; }
                if (rowIndex < rowArray.length - 1) if (this.state.gridFull[rowIndex + 1][colIndex - 1]) {adjCells++; }
                if (rowIndex < rowArray.length - 1) if (this.state.gridFull[rowIndex + 1][colIndex]) {adjCells++; }
                if (rowIndex < rowArray.length - 1) if (this.state.gridFull[rowIndex + 1][colIndex + 1]) {adjCells++; }

                
                // the cell dies of over population
                if (adjCells < 2 || adjCells > 3) {
                    gridCopy[rowIndex][colIndex] = 0;
                } 
                // the cell comes to life
                else if (isDead && adjCells === 3) {
                    gridCopy[rowIndex][colIndex] = 1;
                }
            })
        });
        console.log(this.state.gridFull)
        // update state
        // this.updateState();
    }

    getCell(element) {
        let id = element.getAttribute("id"),
            regex = /[c|r]/gi;

        let cellArray = id.split(regex);
        // ids follow the format r[num]c[num] so the first partition will always be null, shift to get the real values
        cellArray.shift(); 
        return cellArray;
    }

    pushToQueue(row, col, value) {
        this.queue.push([row,col,value])
    }

    setSize(e) {
        e.preventDefault();
        let data = new FormData(e.target);
        // parse the string to base 10
        this.rows = parseInt(data.get("rows"), 10);
        this.cols = parseInt(data.get("cols"), 10);

        this.gridCopy = Array(this.rows).fill(0).map((a)=> {
            return Array((this.cols)).fill(0);
        })

        this.setState({
            gridFull: Array.from(this.gridCopy)
        })
    }

    updateState = () => {
        let gridCopy = Array.from(this.state.gridFull);
        while (this.queue.length) {
            let [row, col, value] = this.queue.shift();
            if (row) {
                gridCopy[row][col] = value;
            }
        }
        this.setState({
            gridFull: gridCopy
        })
    }

    handleReset = () => {
        this.gridCopy.map((arr) => {
            return arr.fill(0)
        })

        this.setState({
            gridFull: Array.from(this.gridCopy)
        })
    }

    handleNext = () => {
        this.start();
    }

    handleDragOver = (e) => {
        e.preventDefault();
        e.target.classList = "table-cell on";
        let [row, col] = this.getCell(e.target);
        this.pushToQueue(row, col, 1);
    }

    handleDragStart = (e) => {
        e.target.classList = "table-cell on";
        let [row, col] = this.getCell(e.target);
        this.pushToQueue(row, col, 1);
        console.log(this.queue)
    }
}

export default MainPage;
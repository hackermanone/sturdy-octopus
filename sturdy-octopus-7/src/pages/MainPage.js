import React from 'react';

import Grid from '../components/Grid';

class MainPage extends React.Component {

    constructor() {
        super();
        this.speed = 100;
        this.rows = 40;
        this.cols = 70;

        this.state = {
            generation: 0,
            gridFull: Array(this.rows).fill(0).map(
                () => {
                    return Array(this.cols).fill(0)
                }
            )
        }

        this.getCell = this.getCell.bind(this);
        this.updateGridFull = this.updateGridFull.bind(this);
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
            </div>
        )
    }

    handleDragOver = (e) => {
        e.preventDefault();
        e.target.className = "table-cell on";
        
    }

    handleDragStart = (e) => {
        e.target.className = "table-cell on";

        console.log(this.getCell(e.target))
    }

    getCell(element) {
        let id = element.getAttribute("id"),
            regex = /[c|r]/gi;

        let cellArray = id.split(regex);
        // ids follow the format r[num]c[num] so the first partition will always be null, shift to get the real values
        cellArray.shift(); 
        return cellArray;
        
    }

    updateGridFull(row, col, value) {
        let gridFull = this.state.gridFull;
        gridFull[row][col] = value;
    }
}

export default MainPage;
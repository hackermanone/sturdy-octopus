import React from 'react';

class Grid extends React.Component {
    render() {
        return(
            <div className="table">
                {this.renderGrid()}
            </div>
        );
    }

    renderGrid = () => {
        let grid = this.props.gridFull;
        let result = [];

        grid.map((rows, rowIndex) => {
            result.push(<div key={`r${rowIndex}`} className="table-row"></div>)
            rows.map((cols, colIndex) => {
                result.push(
                <div 
                key={`r${rowIndex}c${colIndex}`} 
                onDragStart={this.handleDragStart} 
                onDragOver={this.handleDragOver} 
                onClick={this.handleDragStart}
                draggable="true"
                className="table-cell">
                </div>
                );
                return cols;
            })
            return rows;
        })

        return result;
    }

    handleDragOver = (e) => {
        e.preventDefault();
        if (e.target.className === "table-cell") {
            e.target.className = "table-cell on";
        } 
        console.log(e.target.className);
    }

    handleDragStart = (e) => {
        e.target.className = "table-cell on";
    }
}



export default Grid;
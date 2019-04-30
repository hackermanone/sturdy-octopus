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
                id={`r${rowIndex}c${colIndex}`}
                onClick={this.props.onDragStart}
                onDragStart={this.props.onDragStart}
                onDragOver={this.props.onDragOver}
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
}



export default Grid;
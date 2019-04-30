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
    }

    render() {
        return(
            <div>
                <h1>Welcome to Poncie</h1>
                <Grid 
                    gridFull={this.state.gridFull}
                    rows={this.rows}
                    cols={this.cols}
                />
                <h2>Generations : {this.state.generation}</h2>
            </div>
        )
    }
}

export default MainPage;
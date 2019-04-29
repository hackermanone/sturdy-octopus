import React from 'react';

class MainPage extends React.Component {

    state = {
        generation: 0
    }

    render() {
        return(
            <div>
                <h1>>Welcome to the Game of Love</h1>
                <Grid

                />
                <h2>Generations : {this.state.generation}</h2>
            </div>
        )
    }
}

export default MainPage;
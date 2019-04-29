import React from 'react';

class LandingPage extends React.Component {

    render() {
        return(
            <div>
                <form method="post" onSubmit={this.handleSubmit}>
                    <label htmlFor="name">Name</label><br/>
                    <input id="name" name="name" type="text"/><br/>
                    <label htmlFor="password">Password</label><br/>
                    <input id="password" name="password" type="password"/><br/>
                    <input type="submit" value="Log in" />
                </form>
            </div>
        )
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);
        const data = new FormData(e.target);

        console.log(...data);
        this.props.history.push('main')
    }

}

export default LandingPage;
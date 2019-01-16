import React, { Component } from 'react';


export default class NotFound extends Component {
    render() {
        return (
            <div>
                You have successfully logged out!
                {!this.props.auth.isAuthenticated() &&

                    (<div>
                        <h1>
                            Please login
                        </h1>
                        <button onClick={this.props.auth.login}>Login</button>
                    </div>)
                }

            </div>


        )
    }
}
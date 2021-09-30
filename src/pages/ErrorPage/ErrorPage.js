import React from 'react'
import './ErrorPage.css'

const ErrorPage = () => {
    return (
        <div className="errorDiv">
            <div className="errorContent">
                <img src="warning.png" alt="warning" id="warningIcon"/>
                <div className="errorText">
                    <div className="errorHead">
                    <h1>Error 404</h1>
                    </div>
                    <div className="errorBody">
                        <p>Not Found</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ErrorPage

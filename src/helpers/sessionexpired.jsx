import React from 'react'

const SessionExpired = () => {
    return (
        <div className="container-fluid">
            <div className="row mt-5">
                <div className="col-sm-12">
                    <div className="text-center">
                        <h5>Session has expired, please try to login again</h5>
                        <br/>
                    </div>
                </div>
                <div className="col-sm-12">
                    <div className="text-center">
                        <a href="/login" className="btn btn-danger">Login</a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SessionExpired

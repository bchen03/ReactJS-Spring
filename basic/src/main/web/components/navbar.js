'use strict';

import React from 'react';
import PropTypes from 'prop-types';

export default class NavBar extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark mdb-color darken-1 container-fluid">
                <a className="navbar-brand pt-3" href="#"><h3><strong>mStore QA Test Report App</strong></h3></a>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                    </ul>

                    <form className="form-inline">
                        <input className="form-control mr-4" type="text"
                            onChange={this.props.onChange} value={this.props.host} placeholder="API Host" aria-label="API Host" />
                    </form>

                    <ul className="navbar-nav">
                        <li className="nav-item">
        		            <button type="button" className="btn btn-warning" onClick={this.props.onReload}>Reload</button>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

NavBar.propTypes = {
    host: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    onReload: PropTypes.func
}

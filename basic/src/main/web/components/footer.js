import React from 'react';
import PropTypes from 'prop-types';


export default class Footer extends React.Component {
    render() {
        return (
            <div>
                <div style={{height: "5rem"}}/>
                <footer className="page-footer navbar-dark mdb-color darken-1 center-on-small-only pt-0 container-fluid fixed-bottom">
                    <div className="footer-copyright row">
                        <div className="container-fluid">
                            © 2018 Copyright: <a href={this.props.host}>mPlatform File Viewer</a>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}

Footer.propTypes = {
    host: PropTypes.string
}
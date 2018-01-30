import React from 'react';
import PropTypes from 'prop-types';

export default function ErrorPanel(props) {
    // var errorStyle = {
    //     color: "white",
    //     backgroundColor: "red",
    //     fontWeight: "bold"
    // }

    if (props.errorMessage)
        return <div className="error p-1 px-3">{props.errorMessage}</div>;
        //return className="error" <div style={errorStyle}>{props.errorMessage}</div>;
    else
        return null;
}

ErrorPanel.propTypes = {
    errorMessage: PropTypes.string
}


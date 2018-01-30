import React from 'react';
import PropTypes from 'prop-types';


export default class File extends React.Component {
    render() {
        return (
            <a className="list-group-item list-group-item-action" href={this.props.file.url} target="_blank">
                <i className="fa fa-file-text-o" aria-hidden="true"></i>
                <span className="ml-2"><strong>{this.props.file.title}</strong></span>
            </a>
        );
    }
}

File.propTypes = {
    file: PropTypes.shape({
        title: PropTypes.string,
        url: PropTypes.string
    })
}

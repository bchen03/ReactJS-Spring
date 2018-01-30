import React from 'react';
import PropTypes from 'prop-types';

import File from './file';

export default class FileList extends React.Component {
    constructor(props) {
        super(props);

        console.log("FileList constructor called w/ props: ", this.props)

		this.message = <p><strong>Click on the Reload button above to refresh the file list, or a file below to view:</strong></p>;
    }

    render() {
		var files = this.props.files.map((file, index) =>
            <File key={index} file={file}/>
        );

        return (
            <div className="container mt-3">
                {this.message}
                <div className="list-group">
                    {files}
                </div>
            </div>
        );
    }
}

FileList.propTypes = {
    files: PropTypes.arrayOf(PropTypes.object)
}


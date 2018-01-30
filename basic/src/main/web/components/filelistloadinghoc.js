import React from 'react';
import PropTypes from 'prop-types';

import FileList from './filelist';


// Higher Order Component (HOC) - Basically the Decorator pattern
function loadingHOC(WrappedComponent) {
    return class extends React.Component {
        render() {
            return (!this.props.isLoading) ?
                <WrappedComponent {...this.props} /> :
                <div className="container mt-3">
                    Loading data. Please wait...
                </div>;
        }
    }
}

const FileListLoadingHOC = loadingHOC(FileList);

export default FileListLoadingHOC;

import React from 'react';
import PropTypes from 'prop-types';


// Function as Child Component (Facc)/Render Props 
// This one just passes props to the children function but the better pattern is 
// to generate some state and pass that to the function; you don't have to only use
// this.props.children either, you can use any prop, i.e.
// <FileListLoadingRenderProps customprop={parm1 => <div>do some with parm1</div>} />
export default class FileListLoadingRenderProps extends React.Component {
    render() {
        return (
            <div>{this.props.children(this.props.isLoading, this.props.files)}</div>
        );
    }
}

FileListLoadingRenderProps.propTypes = {
    children: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    files: PropTypes.array
}


import React from 'react';
import PropTypes from 'prop-types';

import FileList from './filelist';

// Sibling communication
// 
// Solution here: https://stackoverflow.com/questions/37949981/call-child-method-from-parent (10)
//
// Scenario: 
//
// NavBar and FileListContainer are siblings. NavBar contains a button that when clicked should invoke
// a function that reloads the data in the FileListContainer (calls an API to get the data). Here's what
// needs to be done:
//
// Create a parent callback method (App.reloadFiles) and pass it as a prop to NavBar:
//
//  App: <NavBar onReload={this.reloadFiles} {other props} />
//
// NavBar will use this prop to setup the click handler for the button:
//
//  NavBar: <button type="button" className="btn btn-warning" onClick={this.props.onReload}>Reload</button> 
//
// Pass a function prop to FileListContainer (setClick) that FileListContainer will use to map to one of 
// its functions (FileListContainer.reload)
//
//  App: <FileListContainer host={this.state.host} setClick={click => this.childReload = click} />
//
//  FileListContainer: componentDidMount() { this.props.setClick(this.reload); } (reload() calls API)
//
// The parent (App) now holds FileListContainer's function (reload) in a function variable (this.childReload)
// and can call it when NavBar's button is clicked:
//
//  App: reloadFiles() { this.childReload(); }
//
// You can also do this with refs but with refs you need to know the actual child's function name while
// here the parent is passing a function to assign the child function to a parent defined variable name. 

export default class FileListContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: false,
            files: []
            //errorMessage: ""
        };

        this.reload = this.reload.bind(this);
    }

    componentDidMount() {
        this.props.setClick(this.reload);
        this.reload();
    }

    reload() {
        console.log("FileListContainer:reload() called");

        this.setState({isLoading: true, files: []});
        
        fetch(this.props.host + "api/files")
            .then(response => {
                if (!response.ok) {
                    console.log("An error occurred calling /api/values, text: ", response.statusText, ", response, ", response);
                    throw Error(response.statusText);
                }
                else {
                    response.json().then(
                        data => {
                            console.log("Files success: ", data);
                            setTimeout(() => {    // Give time for loading panel to show
                                this.setState({files: data, isLoading: false /*, errorMessage: ""*/});
                                this.props.onError("");
                            }, 2000);
                        }
                    );
                }
            })
            .catch(err => {
                console.log("fetch error: ", err);
                this.setState({isLoading: false /*, errorMessage: err.toString()*/ })
                this.props.onError(err.toString());
            });
        
    }

    render() {
        return (
            (!this.state.isLoading) ?
            <FileList files={this.state.files} /> :
            <div className="container mt-3">
                Loading data. Please wait...
            </div>

        );
    }
}

FileListContainer.propTypes = {
    host: PropTypes.string.isRequired,
    setClick: PropTypes.func,
    onError: PropTypes.func
}


'use strict';

import "jquery";
import "popper.js";
import "node-waves";
import "bootstrap";
import "mdbootstrap";

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import 'mdbootstrap/css/bootstrap.min.css';
import 'mdbootstrap/css/mdb.min.css';
import './main.css';

class App extends React.Component {
	constructor(props) {
		super(props);

		console.log("App:href: ", window.location.href);

		this.state = {
		    host: window.location.href,
		    // host: "http://localhost:8080/",
		    // files: [],
		    // isLoading: false,
		    errorMessage: ""
        };

		this.reloadFiles = this.reloadFiles.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.updateError = this.updateError.bind(this);
	}

	componentDidMount() {
//        this.reloadFiles();
	}

    reloadFiles() {
        console.log("App:reloadFiles - Calling childReload()");
        this.fileListReload();
    }

    reloadFiles2() {
        this.setState({isLoading: true, files: []});

		fetch(this.state.host + "api/files")
		    .then(response => {
                if (!response.ok) {
                    console.log("An error occurred calling /api/values, text: ", response.statusText, ", response, ", response);
                    throw Error(response.statusText);
                }
                else {
                    response.json().then(
                        data => {
                            console.log("Files success: ", data);
//                            setTimeout(() => {    // Give time for loading panel to show
                                this.setState({files: data, errorMessage: "", isLoading: false});
//                            }, 2000);
                        }
                    );
                }
            })
            .catch(err => {
                console.log("fetch error: ", err);
                this.setState({errorMessage: err.toString(), isLoading: false})
            });
    }

    renderResult() {
        // Show a loading panel if waiting for results
//        return (!this.state.isLoading) ?
//            <FileList files={this.state.files} /> :
//            <div className="container mt-3">Loading data. Please wait...</div>
    }

    handleChange(event) {
        console.log("App:handleChange, event: ", event.target.value);
        this.setState({host: event.target.value});
    }

    updateError(error) {
        console.log("App:updateError, event: ", error);
        this.setState({errorMessage: error});
    }

	render() {
		return (
		    <div style={{height:"100%"}}>
                <NavBar host={this.state.host} onChange={this.handleChange} onReload={this.reloadFiles} />
                <ErrorPanel errorMessage={this.state.errorMessage} />

                <FileListContainer host={this.state.host} setClick={click => this.fileListReload = click} onError={this.updateError} />

                {/*Render Props:*/}
                {/*<FileListLoadingRenderProps isLoading={this.state.isLoading} files={this.state.files} >
                    {
                        (isLoading, files) => (
                            (!isLoading) ?
                            <FileList files={files} /> :
                            <div className="container mt-3">
                                Loading data. Please wait...
                            </div>
                        )
                    }
                </FileListLoadingRenderProps>*/}

                {/*HOC:*/
                 /*<FileListLoadingHOC isLoading={this.state.isLoading} files={this.state.files} />*/}

                {/*Inline Render:*/
                 /*RenderResult()*/}

                <Footer host={this.state.host} />
            </div>
		)
	}
}

class NavBar extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark mdb-color darken-1 container-fluid">
                <a className="navbar-brand pt-3" href="#"><h3><strong>mPlatform File Viewer</strong></h3></a>

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

function ErrorPanel(props) {
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

class ReloadButton extends React.Component {
    render() {
        return (
		    <div className="container">
		        <div className="row">
		            <button type="button" className="btn btn-primary" onClick={this.props.onReload}>Reload files</button>
                </div>
            </div>
        );
    }
}

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

class FileListContainer extends React.Component {
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

class FileList extends React.Component {
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

// Function as Child Component (Facc)/Render Props 
// This one just passes props to the children function but the better pattern is 
// to generate some state and pass that to the function; you don't have to only use
// this.props.children either, you can use any prop, i.e.
// <FileListLoadingRenderProps customprop={parm1 => <div>do some with parm1</div>} />
class FileListLoadingRenderProps extends React.Component {
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


class File extends React.Component {
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

class Footer extends React.Component {
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

ReactDOM.render(
	<App />,
	document.getElementById('react')
)


'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
var PropTypes = require('prop-types');

class App extends React.Component {
	constructor(props) {
		super(props);

		console.log("App:href: ", window.location.href);

		this.state = {
		    files: [],
		    host: window.location.href,
		    //host: "http://localhost:8080/",
		    errorMessage: "",
		    isLoading: false
        };

		this.reloadFiles = this.reloadFiles.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() {
        this.reloadFiles();
	}

    reloadFiles() {
        this.setState({isLoading: true});

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

	render() {
		return (
		    <div style={{height:"100%"}}>
                <NavBar host={this.state.host} onChange={this.handleChange} onReload={this.reloadFiles} />
                <ErrorPanel errorMessage={this.state.errorMessage} />

                {/*HOC:*/}
                <FileListLoadingHOC isLoading={this.state.isLoading} files={this.state.files} />

                {/*
                    <br/>Render Props: <FileListLoadingRenderProps isLoading={this.state.isLoading} files={this.state.files} />
                    <br/>Inline Render: RenderResult()
                */}

                <Footer />
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
        		            <button type="button" className="btn warning-color" onClick={this.props.onReload}>Reload</button>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
}

NavBar.propTypes = {
    onReload: PropTypes.func
}

function ErrorPanel(props) {
    var errorStyle = {
        color: "white",
        backgroundColor: "red",
        fontWeight: "bold"
    }

    if (props.errorMessage)
        return <div style={errorStyle}>{props.errorMessage}</div>;
    else
        return <div></div>
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

// Render Props - this is a horrible example
class LoadingRenderProps extends React.Component {
    render() {
        console.log("isLoading:", this.props.isLoading, ", files: ", this.props.files);
        return (
            <div>{this.props.render(this.props.isLoading, this.props.files)}</div>
        );
    }
}

class FileListLoadingRenderProps extends React.Component {
    render() {
        return (
            <LoadingRenderProps {...this.props} render={(isLoading, files) => (
                (!isLoading) ?
                <FileList files={files} /> :
                <div className="container mt-3">
                    Loading data. Please wait...
                </div>
            )}/>
        );
    }
}

class File extends React.Component {
    render() {
        return (
            <a className="list-group-item list-group-item-action" href={this.props.file.url} target="_blank">
                <i className="fa fa-file-text-o" aria-hidden="true"></i>
                <span className="ml-2">{this.props.file.title}</span>
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
                            © 2018 Copyright: <a href="http://localhost:8080">mPlatform File Viewer</a>
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


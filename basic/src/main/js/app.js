'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');

class App extends React.Component {

	constructor(props) {
		super(props);

		console.log("App:href: ", window.location.href);

		this.state = {
		    files: [],
		    host: window.location.href,
		    errorMessage: "",
		    isLoading: false
        };

		this.reloadFiles = this.reloadFiles.bind(this);
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
//                            setTimeout(() => {
                                this.setState({files: data, errorMessage: "", isLoading: false});
//                            }, 5000);

                        }
                    );
                }
            })
            .catch(err => {
                console.log("fetch error: ", err);
                this.setState({errorMessage: err.toString(), isLoading: false})
            });
    }

	render() {
		return (
		    <div>
                <NavBar host={this.state.host} onReload={this.reloadFiles} />
                <Error errorMessage={this.state.errorMessage} />
                {
                    !this.state.isLoading ?
                    <FileList files={this.state.files} /> :
                    <div className="container mt-3">Loading data. Please wait...</div>
                }
                <Footer />
            </div>
		)
	}
}

function Error(props) {
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

class NavBar extends React.Component {

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark mdb-color darken-1 container-fluid">
                <a className="navbar-brand" href="#">mPlatform QA Tests</a>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                    </ul>

                    <ul className="navbar-nav">
                        <li className="nav-item">
        		            <button type="button" className="btn btn-info" onClick={this.props.onReload}>Reload</button>
                        </li>
                    </ul>
                </div>
            </nav>
        );
    }
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
    render() {

		var message = <p><strong>Click on the Reload button above to refresh the file list, or a file below to view:</strong></p>;
		var files = this.props.files.map((file, index) =>
            <File key={index} file={file}/>
        );

        console.log("FileList::Files: ", files);

        return (
            <div className="container mt-3">
                {message}
                <div className="list-group">
                    {files}
                </div>
            </div>
        );
    }
}

class File extends React.Component {
    render() {
        return (
            <a className="list-group-item list-group-item-action" href={this.props.file.url} target="_blank">{this.props.file.title}</a>
        );
    }
}

class Footer extends React.Component {
    render() {
        return (
            <footer className="page-footer navbar-dark mdb-color darken-1 center-on-small-only pt-0 container-fluid fixed-bottom">
                <div className="footer-copyright row">
                    <div className="container-fluid">
                        © 2018 Copyright: <a href="http://localhost:8080">mPlatform QA Tests</a>
                    </div>
                </div>
            </footer>
        );
    }
}

ReactDOM.render(
	<App />,
	document.getElementById('react')
)


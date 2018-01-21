'use strict';

const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');

class App extends React.Component {

	constructor(props) {
		super(props);
		//this.state = {employees: [], files: []};
		this.state = {files: []};

		this.reloadFiles = this.reloadFiles.bind(this);
	}

	componentDidMount() {
//		client({method: 'GET', path: '/api/employees'}).done(response => {
//            console.log("Employees success: ", response.entity._embedded.employees);
//			this.setState({employees: response.entity._embedded.employees});
//		});

	}

    reloadFiles() {
		fetch("http://localhost:8080/api/files").then(
		    response => {
                //if (response.status !== 200) {
                if (!response.ok) {
                    console.log("An error occurred calling /api/values: ", response);
                }
                else {
                    response.json().then(
                        data => {
                            console.log("Files success: ", data);
                            this.setState({files: data});
                        }
                    );
                }
            }
        );
    }

	render() {
//        <EmployeeList employees={this.state.employees}/>

		return (
		    <div>
                <NavBar onReload={this.reloadFiles} />
                <FileList files={this.state.files} />
                <Footer />
            </div>
		)
	}
}

class NavBar extends React.Component {
    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark mdb-color darken-1 container-fluid">
                <a className="navbar-brand text-center" href="#">mPlatform QA Tests</a>

                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                    aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                    </ul>
                    <ul className="navbar-nav">
                        <li className="nav-item">
        		            <button type="button" className="btn btn-info" onClick={this.props.onReload}>Reload</button>
                            {/*<a className="nav-link" onClick={this.props.onReload}>Reload files</a>*/}
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

		var message = <p><strong>Click on the Reload button above to load files</strong></p>;
		var files = this.props.files.map((file, index) =>
            <File key={index} file={file}/>
        );

        if (files && files.length > 0)
            message = <p><strong>Click on a file below to view:</strong></p>;

        console.log("Files: ", files);

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


//class EmployeeList extends React.Component{
//	render() {
//		var employees = this.props.employees.map(employee =>
//			<Employee key={employee._links.self.href} employee={employee}/>
//		);
//		return (
//			<table>
//				<tbody>
//					<tr>
//						<th>First Name</th>
//						<th>Last Name</th>
//						<th>Description</th>
//					</tr>
//					{employees}
//				</tbody>
//			</table>
//		)
//	}
//}
// end::employee-list[]

// tag::employee[]
//class Employee extends React.Component{
//	render() {
//		return (
//			<tr>
//				<td>{this.props.employee.firstName}</td>
//				<td>{this.props.employee.lastName}</td>
//				<td>{this.props.employee.description}</td>
//			</tr>
//		)
//	}
//}

ReactDOM.render(
	<App />,
	document.getElementById('react')
)


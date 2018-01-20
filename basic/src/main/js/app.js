'use strict';

// tag::vars[]
const React = require('react');
const ReactDOM = require('react-dom');
const client = require('./client');
// end::vars[]

// tag::app[]
class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {employees: [], files: []};
	}

	componentDidMount() {
		client({method: 'GET', path: '/api/employees'}).done(response => {
			this.setState({employees: response.entity._embedded.employees});
		});

		fetch("http://localhost:8080/api/files").then(
		    response => {
                if (response.status !== 200) {
                    console.log("An error occurred calling /api/values: ", response);
                }
                else {
                    response.json().then(
                        data => {
                            console.log("Success: ", data)
                            this.setState({files: data});
                        }
                    );
                }
            }
        );
	}

	render() {
	    var files = this.state.files.map((file, index) =>
            <div key={index}><a href={file} target="_blank">{file}</a></div>
        );

		return (
		    <div>
			    <EmployeeList employees={this.state.employees}/>

			    <h2>Files:</h2>
                {files}

            </div>
		)
	}
}
// end::app[]

// tag::employee-list[]
class EmployeeList extends React.Component{
	render() {
		var employees = this.props.employees.map(employee =>
			<Employee key={employee._links.self.href} employee={employee}/>
		);
		return (
			<table>
				<tbody>
					<tr>
						<th>First Name</th>
						<th>Last Name</th>
						<th>Description</th>
					</tr>
					{employees}
				</tbody>
			</table>
		)
	}
}
// end::employee-list[]

// tag::employee[]
class Employee extends React.Component{
	render() {
		return (
			<tr>
				<td>{this.props.employee.firstName}</td>
				<td>{this.props.employee.lastName}</td>
				<td>{this.props.employee.description}</td>
			</tr>
		)
	}
}
// end::employee[]

// tag::render[]
ReactDOM.render(
	<App />,
	document.getElementById('react')
)
// end::render[]


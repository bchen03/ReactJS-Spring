'use strict';

import "jquery";
import "popper.js";
import "node-waves";
import "bootstrap";
import "mdbootstrap";

import React from 'react';
import PropTypes from 'prop-types';

import NavBar from './navbar';
import ErrorPanel from './errorpanel';
//import FileListContainer from './filelistcontainer';
import FileListLoadingHOC from './filelistloadinghoc';
//import FileListLoadingRenderProps from './filelistloadingrenderprops';
//import FileList from './filelist';
import Footer from './footer';

import 'mdbootstrap/css/bootstrap.min.css';
import 'mdbootstrap/css/mdb.min.css';
import '../main.css';


export default class App extends React.Component {
	constructor(props) {
		super(props);

		console.log("App:href: ", window.location.href);

		this.state = {
		    host: window.location.href,
		    // host: "http://localhost:8080/",
		    files: [],
		    isLoading: false,
		    errorMessage: ""
        };

		this.reloadFiles = this.reloadFiles.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.updateError = this.updateError.bind(this);
	}

	componentDidMount() {
        this.reloadFiles();
	}

    // Used by NavBar/FileListContainer sibling communication
    // reloadFiles() {
    //     console.log("App:reloadFiles - Calling childReload()");
    //     this.fileListReload();
    // }

    reloadFiles() {
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

    // renderResult() {
    //     // Show a loading panel if waiting for results
    //     return (!this.state.isLoading) ?
    //         <FileList files={this.state.files} /> :
    //         <div className="container mt-3">Loading data. Please wait...</div>
    // }

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

                {/*Sibling communication:*/}
                {/*<FileListContainer host={this.state.host} setClick={click => this.fileListReload = click} onError={this.updateError} />*/}

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

                {/*HOC:*/}
                <FileListLoadingHOC isLoading={this.state.isLoading} files={this.state.files} />

                {/*Inline Render:*/
                 /*RenderResult()*/}

                <Footer host={this.state.host} />
            </div>
		)
	}
}


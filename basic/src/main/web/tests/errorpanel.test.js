// Jest test for /tests/errorpanel.test.js using Babel/ES6 import

import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ErrorPanel from '../components/errorpanel';

Enzyme.configure({ adapter: new Adapter() });

// Use describe() for logical grouping 
describe('ErrorPanel Tests', () => {

    let wrapper = null;

    // Called before each test
    beforeEach(() => {
        wrapper = mount(<ErrorPanel errorMessage="This is an error" />);
    });

    // Called after each test
    afterEach(() => {
        wrapper = null;
    });

    it('Smoke test to render <ErrorPanel/>, only checks if it throws an exception', () => {
        const div = document.createElement('div');
        ReactDOM.render(<ErrorPanel errorMessage="This is an error"/>, div);
    });

    it('Test <ErrorPanel /> errorMessage prop = `This is an error`', () => {
        logWrapper(wrapper, 'Test <ErrorPanel /> errorMessage prop = `This is an error`');
        expect(wrapper.props().errorMessage).toEqual("This is an error");
    });

    it('Test <ErrorPanel /> errorMessage prop = ""', () => {
        let wrapper2 = mount(<ErrorPanel errorMessage="" />);
        logWrapper(wrapper2, 'Test <ErrorPanel /> errorMessage prop = ``');
        expect(wrapper2.html()).toBeNull();
    });

});

function logWrapper(wrapper, title) {
    console.log("=============================================");
    console.log("*** " + title + " ***");

    try {
        console.log(title + " text: ", wrapper.text());
    }
    catch (error) {
        console.log(title + " text: text() not found");
    }

    try {
        console.log(title + " html: ", wrapper.html());
    }
    catch (error) {
        console.log(title + " html: html() not found");
    }

    try {
        console.log(title + " debug: ", wrapper.debug());
    }
    catch (error) {
        console.log(title + " debug: debug() not found");
    }

    console.log("=============================================");
}


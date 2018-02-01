// Jest test for /tests/footer.test.js using Babel/ES6 import

import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Footer from '../components/footer';

Enzyme.configure({ adapter: new Adapter() });

// Use describe() for logical grouping 
describe('Footer Tests', () => {

    // it() or test(), they are aliases of each other
    it('Just to make sure Jest works, 1 + 2 = 3', () => {
        expect(1 + 2).toEqual(3);   // Basic test using toEqual matcher
    });

    it('Smoke test to render <Footer/>, only checks if it throws an exception', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Footer host="http://localhost:8080/"/>, div);
    });

    it('Footer component hierarchy contains class `.footer-copyright`', () => {
        const wrapper = shallow(<Footer />);

        // Dump shallow() text
        console.log("Footer text(): ", wrapper.text());

        // Look for a class 
        expect(wrapper.find('.footer-copyright').length).toBe(1);
    });

    it('Outputs `© 2018 Copyright: mPlatform File Viewer`', () => {
        const wrapper = shallow(<Footer/>);

        // Look for text
        expect(wrapper.text()).toContain('© 2018 Copyright: mPlatform File Viewer');
    });

    it('Test <Footer /> `host` prop', () => {

        const wrapper = mount(<Footer host="http://localhost:8080/" />);

        // Enzyme helpers
        console.log("*** Enzyme Helpers ***");
        console.log("Footer host prop text: ", wrapper.text());
        console.log("Footer host prop html: ", wrapper.html());
        console.log("Footer host prop debug: ", wrapper.debug());
        console.log("*************************");

        // Check props
        expect(wrapper.props().host).toEqual("http://localhost:8080/");

        // Set and check props
        wrapper.setProps({ host: "http://localhost:8083/" });
        expect(wrapper.props().host).toEqual("http://localhost:8083/");

        // html().toMatch()
        expect(wrapper.html()).toMatch(/localhost:8083/);

    });

});



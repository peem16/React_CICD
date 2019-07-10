import { shallow, mount, render } from 'enzyme';
import React from "react";
import  App from '../src/App.js';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });

describe('<App /> Test Suite', () => {
    it('Should display calculator page correctly', () => {
  const calculator = shallow(<App />)

  const form = calculator.find('form')
  expect(form.length).toBe(1)
  expect(form.find('input').length).toBe(2)
  expect(form.find('button').length).toBe(4)
  expect(form.find('p.result').length).toBe(1)
    // it('should render without throwing an error', () => {
    //     const component = shallow(<App />);
    //     expect(component.contains(<h1>Hello React App</h1>)).toBe(true);
    //   });

    //   it('should mount in a full DOM', () => {
    //     const component = mount(<App />);
    //     expect(component.find('.app').length).toBe(1);
    //   });

    //   it('should render to static HTML', () => {
    //     const component = render(<App />);
    //     expect(component.text()).toEqual('Hello React App');
    //   });
   })
   it('Should return the correct from plus', () => {
    const app = new App();
  
    const result = app.plus(1, 2)
    expect(result).toEqual(3)
  });
})

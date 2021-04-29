import React from 'react';
import { shallow } from 'enzyme';
import { Button } from 'app/components';

const buttonText = 'Hello World';

describe('Component -> UI -> Button', () => {
  test('renders without crashing', () => {
    shallow(<Button text={buttonText} />);
  });

  test('renders correctly with text', () => {
    const wrapper = shallow(<Button text={buttonText} />);
    expect(wrapper.contains(<p>{buttonText}</p>)).toBe(true);
  });
});

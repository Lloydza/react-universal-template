import React from 'react';
import { render } from '@testing-library/react';
import { Button } from 'app/components';

const buttonText = 'Hello World';

describe('Component -> UI -> Button', () => {
  test('renders correctly with text', () => {
    const { getByText } = render(<Button text={buttonText} />);
    expect(getByText(buttonText)).toBeInTheDocument();
  });
});

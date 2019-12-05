import { storiesOf } from '@storybook/react';
import React from 'react';
import Button from './index';

storiesOf('Button', module).add('with text', () => <Button text="Hello World" />);

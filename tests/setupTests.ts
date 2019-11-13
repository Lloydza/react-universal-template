import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

(global as any).fetch = require('jest-fetch-mock');

configure({ adapter: new Adapter() });

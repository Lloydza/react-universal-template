import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from 'app/content/styles/containers/notFoundPage/index.css';

import {
  changeRoute,
} from 'app/store/actions';

class NotFoundPage extends Component {
  handleChangeRoute = (e) => {
    e.preventDefault();
    const { onChangeRoute } = this.props;
    onChangeRoute('/');
  }

  render() {
    const { initialRoute } = this.props;

    return (
      <div className={styles.container}>
        <div>
          <h1>Oops! We could not find the page you are looking for.</h1>
        </div>
        <div>
          <h3>
            App entry point:
            {initialRoute}
          </h3>
        </div>
        <button
          type="button"
          className={styles.button}
          onKeyPress={this.handleChangeRoute}
          onClick={this.handleChangeRoute}
        >
            Go to the home page.
        </button>
      </div>
    );
  }
}

NotFoundPage.propTypes = {
  initialRoute: PropTypes.string.isRequired,
  onChangeRoute: PropTypes.func.isRequired,
};

const mapStateToProps = function (state) {
  return {
    initialRoute: state.session.initialRoute,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeRoute: (route) => {
      dispatch(changeRoute(route));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NotFoundPage);

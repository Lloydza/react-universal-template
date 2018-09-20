import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from 'app/content/styles/containers/errorPage/index.css';

import {
  changeRoute,
} from 'app/store/actions';

class ErrorPage extends Component {
  handleChangeRoute = (e) => {
    e.preventDefault();
    const { onChangeRoute } = this.props;
    onChangeRoute('/');
  }

  render() {
    return (
      <div className={styles.container}>
        <div>
          <h1>Oops! This shouldnt have happened...</h1>
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

ErrorPage.propTypes = {
  onChangeRoute: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    onChangeRoute: (route) => {
      dispatch(changeRoute(route));
    },
  };
};

export default connect(null, mapDispatchToProps)(ErrorPage);

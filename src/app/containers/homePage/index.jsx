import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from 'app/content/styles/containers/homePage/index.css';

import {
  changeRoute,
} from 'app/store/actions';

class HomePage extends Component {
  handleChangeRoute = (e) => {
    e.preventDefault();
    const { onChangeRoute } = this.props;
    onChangeRoute('/other');
  }

  render() {
    const { initialRoute } = this.props;

    return (
      <div className={styles.container}>
        <div>
          This is the Home Page
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
            Go to the other page.
        </button>
      </div>
    );
  }
}

HomePage.propTypes = {
  initialRoute: PropTypes.string.isRequired,
  onChangeRoute: PropTypes.func.isRequired,
};

const mapStateToProps = function (state) {
  return {
    initialRoute: state.session.initialRoute,
  };
};

const mapDispatchToProps = dispatch => ({
  onChangeRoute: (route) => {
    dispatch(changeRoute(route));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from 'app/content/styles/containers/otherPage/index.css';

import {
  changeRoute,
} from 'app/store/actions';

class OtherPage extends Component {
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
          This is the Other Page
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

OtherPage.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(OtherPage);

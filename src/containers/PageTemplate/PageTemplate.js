import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAuthSelf } from 'modules/auth';
import Header from 'components/Header';

class PageTemplate extends Component {
  componentDidMount() {
    const authCheck = async () => {
      try {
        const { props } = this;
        await props.getAuthSelf();
      } catch (error) {
        console.log(error);
      }
    };

    authCheck();
  }

  render() {
    // eslint-disable-next-line camelcase
    const { children, avatar_url } = this.props;
    return (
      <>
        {/* eslint-disable-next-line camelcase */}
        <Header global avatar_url={avatar_url} />
        <main className="contents">
          {children}
        </main>
      </>
    );
  }
}

const mapStateToProps = state => ({
  avatar_url: state.auth.users.avatar_url,
});

const mapDispatchToProps = dispatch => ({
  getAuthSelf: () => (dispatch(getAuthSelf())),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PageTemplate);

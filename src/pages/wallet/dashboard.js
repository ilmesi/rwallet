import React, { Component } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import PropTypes from 'prop-types';
import List from './list';
import AddIndex from './add.index';
import appActions from '../../redux/app/actions';

class Dashboard extends Component {
    static navigationOptions = () => ({
      header: null,
    });

    async componentDidMount() {
      const { wallets, showPasscode } = this.props;
      if (!isEmpty(wallets)) {
        showPasscode('verify');
      }
    }

    render() {
      const { navigation, wallets } = this.props;
      return isEmpty(wallets) ? <AddIndex navigation={navigation} /> : <List navigation={navigation} />;
    }
}

Dashboard.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    pop: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired,
  }).isRequired,
  wallets: PropTypes.arrayOf(PropTypes.object),
  showPasscode: PropTypes.func.isRequired,
};

Dashboard.defaultProps = {
  wallets: undefined,
};

const mapStateToProps = (state) => ({
  isWalletsUpdated: state.Wallet.get('isWalletsUpdated'),
  wallets: state.Wallet.get('walletManager') && state.Wallet.get('walletManager').wallets,

});

const mapDispatchToProps = (dispatch) => ({
  showPasscode: (category) => dispatch(
    appActions.showPasscode(category),
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

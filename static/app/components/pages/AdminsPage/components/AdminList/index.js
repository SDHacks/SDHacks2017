import PropTypes from 'prop-types';
import React from 'react';
import {connect} from 'react-redux';

import {Admin as AdminPropTypes} from '~/proptypes';

class AdminList extends React.Component {
  static propTypes = {
    admins: PropTypes.arrayOf(PropTypes.shape(
      AdminPropTypes
    ).isRequired).isRequired
  };

  renderAdmin = (admin, columns) =>
    <tr key={admin._id}>
      {columns.map(col => <td key={col.key}>{admin[col.key]}</td>)}
    </tr>;

  render() {
    var columns = [{
      key: 'username',
      text: 'Username'
    }, {
      key: 'role',
      text: 'Role'
    }];

    return (
      <table className="table table-sm">
        <thead className="thead-default">
          <tr>
            {columns.map(col =>
              <th key={col.key}>
                {col.text}
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {this.props.admins.map(admin => this.renderAdmin(admin, columns))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  admins: state.admins,
});

export default connect(
  mapStateToProps
)(AdminList);


import React from 'react';
import PropTypes from 'prop-types';
import {Column as ColumnPropTypes, User as UserPropTypes} from '../proptypes';

class User extends React.Component {
  createColumn(columnName, column) {
    return (
      <span
        key={columnName}>
        {this.props[columnName] ? column.prefix : '' }
        {this.props[columnName] || column.default}
      </span>
    );
  }
  linkWrapped(columnName, column) {
    return (
      <a key={columnName}
        href={column.link + this.props[columnName]}>
        {this.createColumn(columnName, column)}
      </a>
    );
  }
  render() {
    const columns =
      Object.entries(this.props.columns).map(([columnName, column]) =>
        <td
          key={columnName}>
          {column.link ?
            this.linkWrapped(columnName, column) :
            this.createColumn(columnName, column)}
        </td>
      );
    return (
      <tr>
        {columns}
      </tr>
    );
  }
}

User.propTypes = {
  columns: PropTypes.shape(ColumnPropTypes).isRequired,
  ...UserPropTypes
};

export default User;

import {Column as ColumnPropTypes, User as UserPropTypes} from '~/proptypes';

import PropTypes from 'prop-types';
import React from 'react';

class User extends React.Component {
  static propTypes = {
    columns: PropTypes.arrayOf(PropTypes.shape(
      ColumnPropTypes
    ).isRequired).isRequired,
    ...UserPropTypes
  };

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
      this.props.columns.map((column) =>
        <td
          key={column.data}>
          {column.link ?
            this.linkWrapped(column.data, column) :
            this.createColumn(column.data, column)}
        </td>
      );
    return (
      <tr>
        {columns}
      </tr>
    );
  }
}

export default User;

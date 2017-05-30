import PropTypes from 'prop-types';
import React from 'react';
import {BootstrapTable, TableHeaderColumn} from
  'react-bootstrap-table';

class User extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  };

  render() {
    return (
      <BootstrapTable data={[this.props.data]} scrollable>
        {Object.keys(this.props.data).map(key =>
          <TableHeaderColumn dataField={key} key={key} isKey={key === '_id'}>
            {key}
          </TableHeaderColumn>
        )}
      </BootstrapTable>
    );
  }
}

export default User;

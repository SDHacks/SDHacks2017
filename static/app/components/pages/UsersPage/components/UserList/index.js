import PropTypes from 'prop-types';
import React from 'react';
import {BootstrapTable, TableHeaderColumn} from
  'react-bootstrap-table';

import {Column as ColumnPropTypes, User as UserPropTypes} from '~/proptypes';

import User from '~/components/User';

import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

class UserList extends React.Component {
  static propTypes = {
    users: PropTypes.arrayOf(PropTypes.shape(
      UserPropTypes
    ).isRequired).isRequired,
    columns: PropTypes.arrayOf(PropTypes.shape(
      ColumnPropTypes
    ).isRequired).isRequired
  };

  renderPaginationPanel = (props) =>
    (<div className="col">
      <div>
        <span>{props.components.totalText}</span>
        {props.components.pageList}
      </div>
    </div>
    );

  expandComponent = (row) =>
    <User data={row} />;

  render() {
    let options = {
      sizePerPage: 10,  // which size per page you want to locate as default
      pageStartIndex: 1, // where to start counting the pages
      paginationSize: 3,  // the pagination bar size.
      paginationPosition: 'top',
      paginationShowsTotal: true,
      alwaysShowAllBtns: true,
      paginationPanel: this.renderPaginationPanel,
      noDataText: 'There are currently no users'
    };

    return (
      <BootstrapTable
        data={this.props.users}
        hover={true}
        striped
        pagination
        options={options}
        expandableRow={() => true}
        expandComponent={this.expandComponent}>
        {this.props.columns.map(col =>
          <TableHeaderColumn
            key={col.name}
            dataField={col.data}
            isKey={col.key || false}
            dataSort
            filter={{type: 'TextFilter', placeholder: 'Filter'}}
            >{col.name}</TableHeaderColumn>)
        }
      </BootstrapTable>
    );
  }
}

export default UserList;


import {connect} from 'react-redux';
import SearchBox from '../components/SearchBox';
import {setFilter} from '../actions';

const mapStateToProps = (state) => ({
  filter: state.filter
});

const mapDispatchToProps = (dispatch) => {
  return {
    updateFilter: (filter) => {
      dispatch(setFilter(filter));
    }
  };
};

const VisibleSearchBox = connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBox);

export default VisibleSearchBox;

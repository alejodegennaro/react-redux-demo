import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { itemsFetchData,itemsRemove } from '../actions/items';

class ItemList extends Component {
    componentDidMount() {
        this.props.fetchData('http:///5a53d77e77e1d20012fa0713.mockapi.io/items');
    }

    removeItem(index) {
        this.props.removeItem(index);
    }

    render() {
        if (this.props.hasErrored) {
            return <p>Sorry! There was an error loading the items</p>;
        }

        if (this.props.isLoading) {
            return <p>Loading…</p>;
        }

        return (
            <ul>
                {this.props.items.map((item, index) => (
                    <li key={item.id}>
                        <img src={item.imageUrl} width="50" height="50"/>
                        {item.label}
                        <button onClick={() => this.removeItem(index)}>Remove</button>
                    </li>
                ))}
            </ul>

        );
    }
}

ItemList.propTypes = {
    fetchData: PropTypes.func.isRequired,
    removeItem: PropTypes.func.isRequired,
    items: PropTypes.array.isRequired,
    hasErrored: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => {
    return {
        items: state.itemsReducer.items,
        hasErrored: state.itemsReducer.itemsHasErrored,
        isLoading: state.itemsReducer.getItems
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(itemsFetchData(url)),
        removeItem: (index) => dispatch(itemsRemove(index))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemList);

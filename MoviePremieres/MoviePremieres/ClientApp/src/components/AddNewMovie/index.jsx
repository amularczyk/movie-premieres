import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import { actionCreators } from '../../store/MoviesStore';

class AddNewMovie extends Component {
    render() {
        const { addNewMovie } = this.props;
        return (
            <div>
                <Button onClick={() => { addNewMovie({ title: "Movie 1" }) }}>Add new movie</Button>
            </div>
        );
    }
}

export default connect(
  state => state.moviesStore,
  dispatch => bindActionCreators(actionCreators, dispatch)
)(AddNewMovie);

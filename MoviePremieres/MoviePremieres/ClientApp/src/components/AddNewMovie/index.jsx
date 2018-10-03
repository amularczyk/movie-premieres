import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { moviesActions } from '../../store/actions/moviesActions';
import './styles.css';

class AddNewMovie extends Component {
    constructor(props) {
        super(props);

        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangePremiereDate = this.handleChangePremiereDate.bind(this);
        this.handleChangeImageUrl = this.handleChangeImageUrl.bind(this);
        this.handleChangeFilmwebUrl = this.handleChangeFilmwebUrl.bind(this);

        this.state = {
            title: '',
            premiereDate: '',
            imageUrl: '',
            filmwebUrl: ''
        };
    }

    handleChangeTitle(e) {
        this.setState({ title: e.target.value });
    }

    handleChangePremiereDate(e) {
        this.setState({ premiereDate: e.target.value });
    }

    handleChangeImageUrl(e) {
        this.setState({ imageUrl: e.target.value });
    }

    handleChangeFilmwebUrl(e) {
        this.setState({ filmwebUrl: e.target.value });
    }

    render() {
        const { addNewMovie } = this.props;
        const { title, premiereDate, imageUrl, filmwebUrl } = this.state;

        return (
            <div>
                <h1>Add new movie</h1>

                <form>
                    <FormGroup controlId="addNewMovieForm">
                        <ControlLabel>Title</ControlLabel>
                        <FormControl
                            type="text"
                            value={title}
                            placeholder="Enter title"
                            onChange={this.handleChangeTitle}
                        />
                        <FormControl.Feedback />
                        <ControlLabel>Premiere date</ControlLabel>
                        <FormControl
                            type="text"
                            value={premiereDate}
                            placeholder="Enter premiere date"
                            onChange={this.handleChangePremiereDate}
                        />
                        <FormControl.Feedback />
                        <ControlLabel>Image link</ControlLabel>
                        <FormControl
                            type="text"
                            value={imageUrl}
                            placeholder="Enter image link"
                            onChange={this.handleChangeImageUrl}
                        />
                        <FormControl.Feedback />
                        <ControlLabel>Filmweb link</ControlLabel>
                        <FormControl
                            type="text"
                            value={filmwebUrl}
                            placeholder="Enter filmweb link"
                            onChange={this.handleChangeFilmwebUrl}
                        />
                        <FormControl.Feedback />
                    </FormGroup>
                </form>
                <Button type="submit" onClick={() => { addNewMovie({ title, premiereDate, imageUrl, filmwebUrl }) }}>Add new movie</Button>
            </div>
        );
    }
}

export default connect(
  state => state.moviesStore,
  dispatch => bindActionCreators(moviesActions, dispatch)
)(AddNewMovie);

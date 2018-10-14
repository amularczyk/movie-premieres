import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker } from 'react-dates';
import { moviesActions } from '../../store/actions/moviesActions';
import './styles.css';

class Movie extends Component {
    static getDerivedStateFromProps(props, state) {
        if (props.movie.title && props.movie.title !== state.title) {
            return {
                title: props.movie.title,
                premiereDate: props.movie.premiereDate,
                imageUrl: props.movie.imageUrl,
                filmwebUrl: props.movie.filmwebUrl
            };
        }

        return null;
    }

    constructor(props, context) {
        super(props, context);

        this.state = {
            title: '',
            premiereDate: null,
            premiereDateFocused: false,
            imageUrl: '',
            filmwebUrl: '',
            editable: false
        };
    }

    componentDidMount() {
        const { id } = this.props.match.params;

        this.props.requestMovie({ id });
    }


    saveMovie() {
        const { editExistingMovie } = this.props;
        const { id } = this.props.match.params;
        const { title, premiereDate, imageUrl, filmwebUrl } = this.state;

        //editExistingMovie({ id, title, premiereDate, imageUrl, filmwebUrl });

        this.setState({
            editable: false
        });
    }

    render() {
        const { title, premiereDate, premiereDateFocused, imageUrl, filmwebUrl } = this.state;
        const { editable } = this.state;

        return (
            <div>
                <h1>{title}</h1>
                <Button className={'no-left-margin'} onClick={() => this.setState({ editable: !editable })}>{!editable ? 'Edit' : 'Cancel'}</Button>
                {editable && <Button onClick={() => this.saveMovie()}>Save</Button>}
                {imageUrl && <div><img src={imageUrl} /></div>}

                <form>
                    <FormGroup controlId="movieTile">
                        <ControlLabel>Title</ControlLabel>
                        <FormControl
                            type="text"
                            value={title}
                            placeholder="Enter title"
                            onChange={e => this.setState({ title: e.target.value })}
                            disabled={!editable}
                        />
                        <FormControl.Feedback />
                    </FormGroup>

                    <FormGroup controlId="moviePremiereDate">
                        <ControlLabel>Premiere date</ControlLabel>
                        <div>
                            <SingleDatePicker
                                onDateChange={date => this.setState({ premiereDate: date })}
                                date={premiereDate}
                                focused={premiereDateFocused}
                                onFocusChange={({ focused }) => this.setState({ premiereDateFocused: focused })}
                                isOutsideRange={() => false}
                                disabled={!editable}
                            />
                        </div>
                    </FormGroup>

                    <FormGroup controlId="movieImageUrl">
                        <ControlLabel>Image link</ControlLabel>
                        <FormControl
                            type="text"
                            value={imageUrl}
                            placeholder="Enter image link"
                            onChange={e => this.setState({ imageUrl: e.target.value })}
                            disabled={!editable}
                        />
                        <FormControl.Feedback />
                    </FormGroup>

                    <FormGroup controlId="movieFilmwebUrl">
                        <ControlLabel>Filmweb link</ControlLabel>
                        <FormControl
                            type="text"
                            value={filmwebUrl}
                            placeholder="Enter filmweb link"
                            onChange={e => this.setState({ filmwebUrl: e.target.value })}
                            disabled={!editable}
                        />
                        <FormControl.Feedback />
                    </FormGroup>
                </form>
            </div>
        );
    }
}

export default connect(
  state => state.movieStore,
  dispatch => bindActionCreators(moviesActions, dispatch)
)(Movie);

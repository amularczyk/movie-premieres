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

        //this.props.requestMovie({ id });
        this._asyncRequest = this.props.requestMovie({ id }).then(
            externalData => {
                this._asyncRequest = null;
                debugger;
                this.setState({
                    title: externalData.title,
                    premiereDate: externalData.premiereDate,
                    imageUrl: externalData.imageUrl,
                    filmwebUrl: externalData.filmwebUrl
                });
            }
        );
    }

    //componentDidUpdate(prevProps) {
    //    debugger;
    //    if (this.props.title !== prevProps.title) {
    //        debugger;
    //        this.setState({ title: this.props.title });
    //    }

    //    if (this.props.premiereDate !== prevProps.premiereDate) {
    //        debugger;
    //        this.setState({ premiereDate: this.props.premiereDate });
    //    }

    //    if (this.props.imageUrl !== prevProps.imageUrl) {
    //        debugger;
    //        this.setState({ imageUrl: this.props.imageUrl });
    //    }

    //    if (this.props.filmwebUrl !== prevProps.filmwebUrl) {
    //        debugger;
    //        this.setState({ filmwebUrl: this.props.filmwebUrl });
    //    }
    //}

    render() {
        const { title, premiereDate, premiereDateFocused, imageUrl, filmwebUrl } = this.state;
        const { editable } = this.state;

        return (
            <div>
                <h1>{title}</h1>
                <Button onClick={() => this.setState({ editable: true })}>Edit</Button>
                {imageUrl && <img src={imageUrl} />}

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

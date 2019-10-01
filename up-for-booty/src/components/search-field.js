import React, { Component } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import store from '../store';

export default class SearchField extends Component {
    constructor(props) {
        super(props);
        this.state = { language: 'eng' };
    }
    componentDidMount() {
        this._isMounted = true;
        //the method to react on store changes
        this.languageChange = (lang) => this.setState({ language: lang });
        //subscribe to store 
        store.subscribeToChanges(this.languageChange)
    }
    componentWillUnmount() {
        this._isMounted = false;
        store.unsubscribeToChanges(this.languageChange);
    }
    render() {
        return (
            <div>
                <Form onSubmit={(e) => e.preventDefault()}  >
                    <FormGroup>
                        <Label className="logo" id="bold">{this.state.language === 'eng' ? 'Search' : 'Sök'}</Label>
                        <Input
                            type="search"
                            name="search"
                            id="exampleSearch"
                            placeholder={this.state.language === 'eng' ? 'Search' : 'Sök'}
                            onChange={(e) => this.props.searchCallback(e.target.value)}
                        />
                    </FormGroup>
                </Form>
            </div>
        )
    }
}
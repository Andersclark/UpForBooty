import React, { Component } from 'react';
import { Form, FormGroup, Input } from 'reactstrap';
import store from '../store';

export default class SearchField extends Component {
    constructor(props) {
        super(props);
        this.state = { language: store.getLanguage() };
    }
    componentDidMount() {
        this._isMounted = true;
        this.languageChange = (lang) => this.setState({ language: lang });
        store.subscribeToChanges(this.languageChange)
    }
    componentWillUnmount() {
        this._isMounted = false;
        store.unsubscribeToChanges(this.languageChange);
    }
    render() {
        return (
            <div className="searchfield">
                <Form onSubmit={(e) => e.preventDefault()}  >
                    <FormGroup>
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
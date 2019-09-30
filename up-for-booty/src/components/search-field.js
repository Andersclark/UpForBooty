import React, { Component } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import store from '../store';

export default class SearchField extends Component {
    render() {
        let language = store.getLanguage();
        return (
            <div>
                <Form onSubmit={(e) => e.preventDefault()}  >
                    <FormGroup>
                        <Label className="logo" id="bold">{language === 'eng' ? 'Search' : 'Sök'}</Label>
                        <Input
                            type="search"
                            name="search"
                            id="exampleSearch"
                            placeholder={language === 'eng' ? 'Search' : 'Sök'}
                            onChange={(e) => this.props.searchCallback(e.target.value)}              
                        />
                    </FormGroup>
                </Form>
            </div>
        )
    }
}
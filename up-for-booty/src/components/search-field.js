import React, { Component } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';

export default class SearchField extends Component {
    render() {
        return (
            <div>
                <Form onSubmit={(e) => e.preventDefault()}  >
                    <FormGroup>
                        <Label className="logo" id="bold">Search</Label>
                        <Input
                            type="search"
                            name="search"
                            id="exampleSearch"
                            placeholder="search"
                            onChange={(e) => this.props.searchCallback(e.target.value)}              
                        />
                    </FormGroup>
                </Form>
            </div>
        )
    }
}
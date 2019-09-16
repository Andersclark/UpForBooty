import React, { Component } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';


export default class SearchField extends Component {
    render() {
        return (
            <div>
                <Form>
                    <FormGroup>
                        <Label for="exampleSearch">Search</Label>
                        <Input
                            type="search"
                            name="search"
                            id="exampleSearch"
                            placeholder="search placeholder"
                        />
                    </FormGroup>
                </Form>
            </div>
        )
    }
}
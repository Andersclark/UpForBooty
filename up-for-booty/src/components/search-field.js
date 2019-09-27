import React, { Component } from 'react';
import { Form, FormGroup, Input } from 'reactstrap';

export default class SearchField extends Component {
    render() {
        return (
            <div className="searchfield">
                <Form onSubmit={(e) => e.preventDefault()}  >
                    <FormGroup>
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
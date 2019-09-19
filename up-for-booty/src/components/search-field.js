import React, { Component } from 'react';
import { Form, FormGroup, Label, Input } from 'reactstrap';
import store from "../store";

export default class SearchField extends Component {

    onSearch(e) {
        //if there is a value, do the filtering
        if (e.target.value) {
            //get whole list
            let listOfAll = store.getBooties();

            //filter it 
            //find the matches that did start with the search-text)
            let startWithRegex = new RegExp('^' + e.target.value, 'ig')
            let firstMatchList = this.findMatch(listOfAll, startWithRegex)
            //find the matches that didnt start with the search-text, but contains the search-text
            let anyWhereRegex = new RegExp('^[^'+e.target.value+'].*'+e.target.value, 'ig')
            let secondMatchList = this.findMatch(listOfAll, anyWhereRegex)            
    
            //mash these two arrays together to get the best scores first in the array
            let resultList = firstMatchList.concat(secondMatchList);

            //send the filterd array to the parent
            this.props.searchCallback(resultList);
        }
        else {
            //send null to parent since search has been erased
            this.props.searchCallback(null);
        }
    }

    findMatch(list, regex){
        let matchList = list.filter(function (item) {
            return item.firstName.match(regex);
        });
        return matchList;
    }

    render() {
        return (
            <div>
                <Form>
                    <FormGroup>
                        <Label className="logo" id="bold">Search</Label>
                        <Input
                            type="search"
                            name="search"
                            id="exampleSearch"
                            placeholder="search"
                            onKeyUp={(e) => this.onSearch(e)}
                        />
                    </FormGroup>
                </Form>
            </div>
        )
    }
}
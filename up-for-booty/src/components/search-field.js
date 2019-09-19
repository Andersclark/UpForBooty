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
            //find the matches that did start with the search-text, both on first and lastname
            let startWithRegex = new RegExp('^' + e.target.value, 'ig');
            let firstNameMatchList = this.findMatch(listOfAll, startWithRegex, 'firstName');
            let lastNameMatchList = this.findMatch(listOfAll, startWithRegex, 'lastName');
            

            //find the matches that didnt start with the search-text, but contains the search-text
            let anyWhereRegex = new RegExp('^[^'+e.target.value+'].*'+e.target.value, 'ig');
            let secondMatchFirstNameList = this.findMatch(listOfAll, anyWhereRegex, 'firstName');            
            let secondMatchLastNameList = this.findMatch(listOfAll, anyWhereRegex, 'lastName');            

            //mash these two arrays together to get the best scores first in the array
            let resultList = firstNameMatchList.concat(lastNameMatchList, secondMatchFirstNameList, secondMatchLastNameList);

            //take away all duplicate
            for(let i = resultList.length-1; i >= 0; i--){
                for(let j = i-1; j >= 0; j--){                    
                    if(resultList[i]._id === resultList[j]._id){
                        resultList.splice(i, 1)
                    }
                }
            }
            //send the filterd array to the  parent
            this.props.searchCallback(resultList);
        }
        else {
            //send null to parent since search has been erased
            this.props.searchCallback(null);
        }
    }

    findMatch(list, regex, key){
        let matchList = list.filter(function (item) {
            return item[key].match(regex);
        });
        return matchList;
    }

    render() {
        return (
            <div>
                <Form>
                    <FormGroup>
                        <Label>Search</Label>
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
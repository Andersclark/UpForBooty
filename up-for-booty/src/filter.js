import store from './store';


let filter = (data) => {
        let list = store.getBooties();

    //filter list based on the search-input
    if (data.search) {
        list = search(list, data.search);
    }

    //filter the list based on slider-input
    if (data.slider) {
        list = filterByTime(list, data.slider);
    }

    return list;
}

let search = (list, searchInput) => {

    //filter it 
    //find the matches that did start with the search-text, both on first and lastname
    let startWithRegex = new RegExp('^' + searchInput, 'ig');
    let firstNameMatchList = findMatch(list, startWithRegex, 'firstName');
    let lastNameMatchList = findMatch(list, startWithRegex, 'lastName');


    //find the matches that didnt start with the search-text, but contains the search-text
    let anyWhereRegex = new RegExp('^[^' + searchInput + '].*' + searchInput, 'ig');
    let secondMatchFirstNameList = findMatch(list, anyWhereRegex, 'firstName');
    let secondMatchLastNameList = findMatch(list, anyWhereRegex, 'lastName');

    //mash these arrays together to get the best scores first in the array
    let resultList = firstNameMatchList.concat(lastNameMatchList, secondMatchFirstNameList, secondMatchLastNameList);

    //take away all duplicate
    if (resultList.length > 1) {
        for (let i = resultList.length - 1; i > 0; i--) {
            let otherIndex = resultList.findIndex(obj => obj._id === resultList[i]._id);
            if (otherIndex !== i) {
                resultList.splice(i, 1);
            }
        }
    }

    return resultList;
}

let findMatch = (list, regex, key) => {
    let matchList = list.filter(function (item) {
        return item[key].match(regex);
    });
    return matchList;
}

let filterByTime = (list, value) => {
    let filteredList = [];

    for (let i = 0; i < list.length; i++) {
        let currTime = JSON.stringify(list[i].time._d).substring(12, 14);
        if (currTime >= value[0] && currTime <= value[1]) {
            filteredList.push(list[i]);
        }
    }

    return (filteredList);

}

export default filter;
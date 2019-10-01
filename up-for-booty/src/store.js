let store = { booties: [], language: 'eng' };
const subscribingFunctions = [];

store.saveToBooties = (data) => {
    store.booties = []
    data.forEach(element => {
        store.booties.push(element);
    });
    let subscriber;
    // Notify all subscribers of changes
    for (subscriber of subscribingFunctions) {
        subscriber(store.booties);
    }
}


store.setLanguage = (lang) => {
    store.language = lang;

    let subscriber;
    // Notify all subscribers of changes
    for (subscriber of subscribingFunctions) {
        subscriber(lang);
    }
}

store.getBooties = () => {    
    return store.booties;
}



// A subscribing function should be ready to
// receive the changes and react on them
store.subscribeToChanges = (func) => {
    // Add subscribing function    
    subscribingFunctions.push(func);
}

store.unsubscribeToChanges = (func) => {
    // Find and remove subscribing function
    let index = subscribingFunctions.indexOf(func);
    if (index < 0) { return; }
    subscribingFunctions.splice(index, 1);
}

export default store;

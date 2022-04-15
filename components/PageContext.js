const React = require('react')
const PageContext = React.createContext();


function PageProvider({children: Component, value}) {
    return(
        <PageContext.Provider value={value}>
            {Component}
        </PageContext.Provider>
    );
}

module.exports = { PageProvider, PageContext };
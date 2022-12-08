import React, {useState, useContext, createContext} from 'react';

const FilterContext = createContext({filter:'', setFilter:null});

function FilterProvider(props) {

    const [filter, setFilter] = useState('');

    return (
        <FilterContext.Provider value={{ filter, setFilter }}>
            {props.children}
        </FilterContext.Provider>
    );
}

const useFilter = () => useContext(FilterContext);

export {useFilter};

export default FilterProvider;
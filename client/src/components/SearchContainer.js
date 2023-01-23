import { FormRow, FormRowSelect } from '.';
import { useAppContext } from '../context/appContext';
import Wrapper from '../assets/wrappers/SearchContainer';
import { useState, useMemo } from 'react';

function SearchContainer()
{
    const [localSearch, setLocalSearch] = useState("");

    const {
        isLoading,
        search,
        searchStatus,
        searchType,
        sort,
        sortOptions,
        statusOptions,
        jobTypeOptions,
        handleChange,
        clearFilters,
    } = useAppContext();

    const handleSearch = (e) => {
        // if (isLoading) return;
        handleChange({ name: e.target.name, value: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLocalSearch('');
        clearFilters();
    };

    const debounce = () => {
        let timeoutID;
        return (e) => {
            setLocalSearch(e.target.value);
            clearTimeout(timeoutID);
            timeoutID = setTimeout(() => {
                handleChange({ name: e.target.name, value: e.target.value });
            }, 1000)
        }
    }

    const optimizedDebounce = useMemo(() => debounce(),[]);

    return (
        <Wrapper>
          <form className='form'>
            <h4>search form</h4>
            {/* search position */}
            <div className='form-center'>
                <FormRow
                    type='text'
                    name='search'
                    value={localSearch}
                    handleChange={optimizedDebounce}
                ></FormRow>
                <FormRowSelect 
                    labelText="Job Type" name="searchType" value={searchType} handleChange={handleSearch} list={['all', ...jobTypeOptions]}
                />
                <FormRowSelect 
                    labelText="Job Status" name="searchStatus" value={searchStatus} handleChange={handleSearch} list={['all', ...statusOptions]}
                />
                <FormRowSelect 
                    labelText="Sort" name="sort" value={sort} handleChange={handleSearch} list={sortOptions}
                />
                <button
                    className='btn btn-block btn-danger'
                    disabled={isLoading}
                    onClick={handleSubmit}
                >
                    clear filters
                </button>
            </div>
          </form>
        </Wrapper>
    );
}

export default SearchContainer;
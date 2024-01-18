import React from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../assets/articleSearch.css';

const ArticleSearch = ({
    handleSubmit,
    categoryOptions,
    sourceOptions,
    authorOptions,
    searchTerm,
    setSearchTerm,
    selectedCategories,
    setSelectedCategories,
    selectedSources,
    setSelectedSources,
    selectedAuthors,
    setSelectedAuthors,
    dateRange,
    setDateRange
}) => {
    return (
        <form onSubmit={handleSubmit} className="article-search-form">
            <div className="search-fields">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    placeholder="Enter search term"
                    className='form-control w-200'
                />
                <Select
                    options={categoryOptions}
                    isMulti
                    onChange={setSelectedCategories}
                    value={selectedCategories}
                    placeholder="Select Categories"
                    className='w-200'
                />
                <Select
                    options={sourceOptions}
                    isMulti
                    onChange={setSelectedSources}
                    value={selectedSources}
                    placeholder="Select Sources"
                    className='w-200'
                />
                <Select
                    options={authorOptions}
                    isMulti
                    onChange={setSelectedAuthors}
                    value={selectedAuthors}
                    placeholder="Select Authors"
                    className='w-200'
                />
                <DatePicker
                    selectsRange
                    startDate={dateRange[0]}
                    endDate={dateRange[1]}
                    onChange={setDateRange}
                    className="search-date-picker form-control w-200"

                />
                <button type="submit" className="search-button">Search</button>
            </div>
        </form>
    );
};

export default ArticleSearch;

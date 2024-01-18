import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ArticleList from './ArticleList';
import ArticleSearch from './ArticleSearch';
import '../assets/preferencesStyle.css';
import axiosInstance from '../utils/axiosInstance';
import { Col, Container, Row } from 'react-bootstrap';
import ArticalCard from './ArticalCard';

const ArticlesPage = ({ title, apiUrl }) => {
    const [articles, setArticles] = useState([]);
    const [sourceOptions, setSourceOptions] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [authorOptions, setAuthorOptions] = useState([]);
    const [paginationInfo, setPaginationInfo] = useState({});
    const [queryParams, setQueryParams] = useState({});
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedSources, setSelectedSources] = useState([]);
    const [selectedAuthors, setSelectedAuthors] = useState([]);
    const [dateRange, setDateRange] = useState(["", ""]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        setIsLoading(true);
        Promise.all([
            axios.get('http://localhost:8000/api/sources'),
            axios.get('http://localhost:8000/api/categories'),
            axios.get('http://localhost:8000/api/authors')
        ]).then(([sourcesResponse, categoriesResponse, authorsResponse]) => {
            setSourceOptions(sourcesResponse.data.map(s => ({ value: s.id, label: s.name })));
            setCategoryOptions(categoriesResponse.data.map(c => ({ value: c.id, label: c.name })));
            setAuthorOptions(authorsResponse.data.map(a => ({ value: a.id, label: a.name })));
        }).catch(error => {
            console.error('Error fetching data', error);
            setError('Failed to fetch data');
        }).finally(() => {
            setIsLoading(false);
        });
    }, []);

    const resetFilters = () => {
        setQueryParams({});
        setSearchTerm('');
        setSelectedCategories([]);
        setSelectedSources([]);
        setSelectedAuthors([]);

        setDateRange(["", ""]);
        setPaginationInfo({});
    };

    useEffect(() => {
        if (Object.keys(queryParams).length > 0) {
            fetchArticles(1);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [queryParams]);

    useEffect(() => {
        resetFilters();
        fetchArticles(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apiUrl]);

    const fetchArticles = async (page = 1) => {
        setIsLoading(true);
        try {
            const queryString = new URLSearchParams({ ...queryParams, page }).toString();
            const response = await axiosInstance.get(`${apiUrl}?${queryString}`);
            setArticles(response.data.data);
            const { current_page, last_page, links } = response.data;
            setPaginationInfo({ current_page, last_page, links });
        } catch (error) {
            console.error('Error fetching the articles', error);
            setError('Failed to fetch articles');
        } finally {
            setIsLoading(false);
        }
    };

    const handlePageClick = (newPage) => {
        if (newPage !== paginationInfo.current_page) {
            fetchArticles(newPage);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setQueryParams({
            ...queryParams,
            searchTerm,
            categories: selectedCategories.map(c => c.value),
            sources: selectedSources.map(s => s.value),
            authors: selectedAuthors.map(a => a.value),
            startDate: dateRange[0],
            endDate: dateRange[1]
        });
    };

    if (isLoading) return <p className="loading-message">Loading...</p>;
    if (error) return <p className="error-message">Error: {error}</p>;

    return (
        <div className='py-5'>
            <Container>
                <Row>
                    <Col md={12}>
                        <h3 className="page-title mb-3">{title}</h3>
                        <ArticleSearch
                            handleSubmit={handleSubmit}
                            categoryOptions={categoryOptions}
                            sourceOptions={sourceOptions}
                            authorOptions={authorOptions}
                            searchTerm={searchTerm}
                            setSearchTerm={setSearchTerm}
                            selectedCategories={selectedCategories}
                            setSelectedCategories={setSelectedCategories}
                            selectedSources={selectedSources}
                            setSelectedSources={setSelectedSources}
                            selectedAuthors={selectedAuthors}
                            setSelectedAuthors={setSelectedAuthors}
                            dateRange={dateRange}
                            setDateRange={setDateRange}
                        />
                        <ArticleList
                            articles={articles}
                            fetchArticles={fetchArticles}
                            handlePageClick={handlePageClick}
                            paginationInfo={paginationInfo}
                        />
                    </Col>
                </Row>
            </Container>
        </div>

    );
};

export default ArticlesPage;
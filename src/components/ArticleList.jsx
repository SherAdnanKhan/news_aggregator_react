import React from 'react';
import '../assets/articleList.css';
import ArticalCard from './ArticalCard';
import { Col, Row } from 'react-bootstrap';

const ArticleList = ({ articles, paginationInfo, handlePageClick }) => {
    return (
        <div>
            <div className="article-list">
                <Row>
                    {articles?.map(article => (
                        <Col key={article.id} md={4}>
                            <div className="article-item">
                                <ArticalCard article={article} />
                            </div>
                        </Col>
                    ))}
                </Row>
            </div>

            <nav className="pagination">
                {paginationInfo.links && paginationInfo.links.map((link, index) => (
                    <button key={index}
                        onClick={() => handlePageClick(link.label === "&laquo; Previous" ? paginationInfo.current_page - 1 :
                            link.label === "Next &raquo;" ? paginationInfo.current_page + 1 : parseInt(link.label))}
                        disabled={!link.url}
                        className={`pagination-link ${link.active ? 'active' : ''}`}>
                        {link.label.replace('&laquo;', '<').replace('&raquo;', '>')}
                    </button>
                ))}
            </nav>
        </div>
    );
};

export default ArticleList;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../assets/articleDetails.css';
import { Link } from 'react-router-dom';
import '../assets/Styling/ArticalDetail.css'
import { Container, Row, Col } from 'react-bootstrap';
import placeholdernews from "../assets/images/placeholder-news.jpg"

const ArticleDetails = ({ articleId }) => {
    const [article, setArticle] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/articles/${articleId}`)
            .then(response => {
                setArticle(response.data);
            })
            .catch(error => {
                console.error('Error fetching article details', error);
            });
    }, [articleId]);

    return (
        <>
            <div classNameName="article-details">
                {article ? (
                    <div className="blog-single gray-bg">
                        <Container >
                            <Row className="align-items-start">
                                <Col lg={8} className="m-15px-tb">
                                    <article className="article">
                                        <div className="article-img">
                                            <img src={article?.image ? article.image : placeholdernews} title="" alt="" />
                                        </div>
                                        <div className="article-title">
                                            <h6><a href="#">{article?.category?.name}</a></h6>
                                            <h2>{article.title}</h2>
                                            <div className="media">
                                                <div className="media-body">
                                                    <label>{article?.author?.name}</label>
                                                    <span>Published on: {new Date(article.published_at).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="article-content" dangerouslySetInnerHTML={{ __html: article.content }}>
                                        </p>
                                    </article>
                                </Col>
                                <Col lg={4} className="m-15px-tb blog-aside">
                                    <div className="widget widget-author">
                                        <div className="widget-title">
                                            <h3>Author</h3>
                                        </div>
                                        <div className="widget-body">
                                            <div className="media align-items-center">
                                                <div className="avatar">
                                                    <img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="" />
                                                </div>
                                                <div className="media-body">
                                                    <h6>Hello, I'm<br />{article?.author}</h6>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="widget widget-latest-post">
                                        <div className="widget-title">
                                            <h3>Latest Articles</h3>
                                        </div>
                                        <div className="widget-body">
                                            <div classNameName="article-details-card col-lg-2">
                                                {article?.latestArticles?.map((latestArticle) => (
                                                    <div key={latestArticle.id} className="latest-post-aside media">
                                                        <div className="lpa-left media-body">
                                                            <div className="lpa-title">

                                                                <h5><Link to={`/articles/${latestArticle.id}`}>{latestArticle.title}</Link></h5>
                                                            </div>
                                                            <div className="lpa-meta">
                                                                <a className="name" href="#">
                                                                    {latestArticle?.author?.name}
                                                                </a>
                                                                <a className="date" href="#">
                                                                    {new Date(latestArticle.published_at).toLocaleDateString()}
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                ) : (
                    <p>Loading article...</p>
                )}
            </div>
        </>
    );
};

export default ArticleDetails;

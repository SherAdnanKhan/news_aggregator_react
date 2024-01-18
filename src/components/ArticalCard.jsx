import React from 'react';
import '../assets/articleList.css';
import '../assets/Styling/ArticalCard.css'
import { Link } from 'react-router-dom';
import placeholdernews from "../assets/images/placeholder-news.jpg"

const ArticalCard = ({ article }) => {
    const timeAgo = (date) => {
        const now = new Date();
        const secondsAgo = Math.round((now - new Date(date)) / 1000);

        const formatter = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

        if (secondsAgo < 60) {
            return formatter.format(-secondsAgo, 'second');
        }
        const minutesAgo = Math.round(secondsAgo / 60);
        if (minutesAgo < 60) {
            return formatter.format(-minutesAgo, 'minute');
        }
        const hoursAgo = Math.round(minutesAgo / 60);
        if (hoursAgo < 24) {
            return formatter.format(-hoursAgo, 'hour');
        }
        const daysAgo = Math.round(hoursAgo / 24);
        if (daysAgo < 30) {
            return formatter.format(-daysAgo, 'day');
        }
    }

    return (

        <div className="blog-card blog-card-blog">
            <div className="blog-card-image">
                <a href="#">
                    <img className="img" src={article.photo ? article.photo : placeholdernews} />
                </a>
                <div className="ripple-cont"></div>
            </div>
            <div className="blog-table">
                <h6 className="blog-category blog-text-success">
                    <i className="far fa-newspaper"></i> Article
                </h6>
                <h4 className="blog-card-caption">
                    <Link to={`/articles/${article.id}`}>{article.title}</Link>
                </h4>
                <p className="blog-card-description" dangerouslySetInnerHTML={{ __html: article.trail_text }}>
                </p>
                <div className="ftr">
                    <div className="author">
                        <span>{article?.author?.name}</span>
                    </div>
                    <div className="stats">
                        <i className="far fa-clock"></i> {timeAgo(article.published_at)}
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ArticalCard;
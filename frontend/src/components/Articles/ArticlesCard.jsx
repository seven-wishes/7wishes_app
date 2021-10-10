import React, { useState } from "react";
import avatar_empty from "../../assets/images/user.svg";

const ArticlesCard = ({article, answerArticle, auth, alert_message}) => {
    const [answer, setAnswer] = useState(false);
    const [text, setText] = useState('');

    const avatar = article.avatar_url || avatar_empty
    const name = article.nickname || "Аноним"

    const onAnswer = () => {
        if (!auth) {
            return alert_message('Вы не авторизованы')
        }
        setAnswer(true)
    }

    const onChange = (e) => {
        setText(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(text)
        answerArticle(text, article.account_id)
        setAnswer(false)
    }

    return (
        <div className="articles__item">
            <figure className="articles__item-image">
                <picture>
                    <img src={`//7-wishes.ru${avatar}`} alt=""/>
                </picture>
            </figure>
            <div className="articles__item-info">
                <div className="articles__item-title">{name}{` - ${article.age && article.age}`}</div>
                <div className="users__card-city">{article.city_id !== 1 ? article.city : ''}</div>
                <div className="articles__item-text">{article.body}</div>
                {answer
                    ? <form onSubmit={onSubmit} className="article__answer">
                        <textarea onChange={onChange} className="article__answer-textarea" />
                        <button className="article__answer-submit" type="submit">Send</button>
                    </form>
                    : <button className="articles__item-action" onClick={onAnswer}>Ответить</button>
                }
            </div>
        </div>
    )
};

export default ArticlesCard;
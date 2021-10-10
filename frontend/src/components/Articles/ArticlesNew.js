import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const ArticlesNew = (props) => {
    const history = useHistory();
    const [text, setText] = useState('');

    const onChange = (e) => {
        setText(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        props.createArticle(text)
        history.push('/articles')
    }

    return (
        <div className="articles">
            <div className="wrap">
                <h1 className="info__pagetitle">Новая публикация</h1>
                <form className="articles__form" onSubmit={onSubmit}>
                    <textarea name="" onChange={onChange} value={text}/>
                    <button className="articles__form-submit" type="submit">Добавить</button>
                </form>
            </div>
        </div>
    )
};

export default ArticlesNew;
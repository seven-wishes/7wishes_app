import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import Articles from "../components/Articles/Articles";
import { answerArticle, getArticles } from "../redux/actions/articlesActions";
import { alert_message } from "../redux/actions/appActions";

class ArticlesContainer extends React.Component {
    componentDidMount() {
        this.props.getArticles();
    }

    render() {
        return (
            <Articles {...this.props} />
        )
    }
}

const  mapStateToProps = (state) => {
    return {
        articles: state.articlesReducer.articles,
        auth: state.authReducer
    }
}
export default compose(
    connect(mapStateToProps, {
        getArticles,
        answerArticle,
        alert_message
    }),
)(ArticlesContainer);
import React from "react";
import {compose} from "redux";
import {connect} from "react-redux";
import ArticlesNew from "../components/Articles/ArticlesNew";
import { createArticle } from "../redux/actions/articlesActions";

class ArticlesNewContainer extends React.Component {
    render() {
        return (
            <ArticlesNew {...this.props} />
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
        createArticle
    }),
)(ArticlesNewContainer);
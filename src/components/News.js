import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';


export default class News extends Component {

    static defaultProps = {
        pageSize: 9,
        country: "us",
        category: "general",

    }

    static propTypes = {
        pageSize: PropTypes.number,
        country: PropTypes.string,
        category: PropTypes.string
    }

    capitalize = (str) => {

        return str.charAt(0).toUpperCase() + str.slice(1);

    }

    constructor(props) {
        super(props);
        //console.log("news component constructor");
        this.state = {
            articles: [],
            loading: true,
            page: 1,
            totalResults: 0
        }
        document.title = `${this.capitalize(this.props.category)} - News Monkey `;
    }


    async updateNews() {

        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pageSize}`;

        this.setState({ loading: true });

        let data = await fetch(url);

        this.props.setProgress(30);

        let parsedData = await data.json();

        this.props.setProgress(70);

        console.log(parsedData);

        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false

        });

        this.props.setProgress(100);
    }

    async componentDidMount() {
        //console.log("cdm");
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3dde1840218f480080248868382f5e93&page=1&pagesize=${this.props.pageSize}`;

        // this.setState({ loading: true });

        // let data = await fetch(url);
        // let parsedData = await data.json();

        // console.log(parsedData);

        // this.setState({
        //     articles: parsedData.articles,
        //     totalResults: parsedData.totalResults,
        //     loading: false

        // });
        this.updateNews();

    }

    fetchMoreData = async () => {

        this.setState({ page: this.state.page + 1 });

        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pagesize=${this.props.pageSize}`;

        // this.setState({ loading: true });

        let data = await fetch(url);
        let parsedData = await data.json();

        console.log(parsedData);

        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults,
            // loading: false

        });

    }

    handlePrevious = async () => {

        this.setState({ page: this.state.page - 1 });
        this.updateNews();

        // console.log("previous");

        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3dde1840218f480080248868382f5e93&page=${this.state.page - 1}&pagesize=${this.props.pageSize}`;

        // this.setState({ loading: true });

        // let data = await fetch(url);
        // let parsedData = await data.json();

        //console.log(parsedData);

        //this.setState({ articles: parsedData.articles });

        // this.setState({
        //     articles: parsedData.articles,
        //     page: this.state.page - 1,
        //     loading: false
        // })

    }

    handleNext = async () => {
        // console.log("next");

        if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {

            this.setState({ page: this.state.page + 1 });
            this.updateNews();

            // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3dde1840218f480080248868382f5e93&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;

            // this.setState({ loading: true });

            // let data = await fetch(url);
            // let parsedData = await data.json();

            // //console.log(parsedData);

            // this.setState({ articles: parsedData.articles });

            // this.setState({
            //     articles: parsedData.articles,
            //     page: this.state.page + 1,
            //     loading: false
            // })

        }
    }

    render() {
        //console.log("return");
        return (
            <>
                <div className="container my-3 ">
                    <div className="container" style={{ margin: "35px 0px" }}>
                        <h1 className="text-center">News Monkey - Top {this.capitalize(this.props.category)} Headlines</h1>
                    </div>
                    {this.state.loading && <Spinner />}
                    <InfiniteScroll
                        dataLength={this.state.articles.length} //This is important field to render the next data
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length !== this.state.totalResults}
                        loader={<Spinner />}>

                        <div className="container">
                            <br/>
                            <div className="row">
                                {/* {!(this.state.loading) && this.state.articles.map((element) => { */}
                                {this.state.articles.map((element) => {
                                    return <div className="col-md-4" key={element.url}>
                                        {/* <NewsItem title={element.title.slice(0,44)} description={element.description.slice(0,88)} imageUrl={element.urlToImage} newsUrl={element.url}/> */}
                                        <NewsItem title={element.title ? element.title : ""} description={element.description ? element.description : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                    </div>
                                })}
                            </div>
                        </div>
                    </InfiniteScroll>
                </div>
                {/* <div className="container d-flex justify-content-between mb-5">
                    <button type="button" disabled={this.state.page <= 1} onClick={this.handlePrevious} className="btn btn-dark">&larr; Previous</button>
                    <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} type="button" onClick={this.handleNext} className="btn btn-dark">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Next &rarr;&nbsp;</button>
                </div> */}
            </>
        )
    }
}

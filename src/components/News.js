import React, { Component } from 'react'
import Loading from './Loading';
import Newsitems from './Newsitem'
import InfiniteScroll from 'react-infinite-scroll-component';
export class News extends Component {
  static defaultProps = {
    country: 'in',
    cat: null,
    pageSize: 12,
    q: null,
    apiKey : process.env.REACT_APP_NEWS_API
  }
  // static propTypes = {
  //   country: this.PropTypes.string,
  //   pageSize: this.PropTypes.number
  // }
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: true,
      page: 1
    }
  }

  async pageLoad(pageNo) {
    this.setState({ loading: true });
    
    
    let url = `https://newsapi.org/v2/top-headlines?${this.props.q ? "":"country="+this.props.country}&apiKey=${this.props.apiKey}&page=${pageNo}&pageSize=${this.props.pageSize}${this.props.cat ? "&category=" + this.props.cat : ""}${this.props.q ? "&q=" + this.props.q : ""}`;
    let data = await fetch(url).then(res => res.json())
      .then(res => {
        this.setState({ articles: res.articles, totalResults: res.totalResults, loading: false  });
      })
      .catch(err => console.error(err));
  }
  async componentDidMount() {
    this.pageLoad(this.state.page);
    this.setState({ loading: false });
  }
  handleNext = async () => {
    if (Math.ceil(this.state.totalResults / this.props.pageSize) <= this.state.page) { return; }
    else {
      this.pageLoad(this.state.page + 1);
      this.setState({ page: this.state.page + 1})
    }


  }
  handlePrev = async () => {
    if (this.state.page <= 1)
      return;
    else {
      this.pageLoad(this.state.page - 1);
      this.setState({ page: this.state.page - 1, loading: false })
    }


  }
  fetchMoreData = async ()=>{
    this.setState({page : this.state.page+1});
    // this.pageLoad(this.state.page);
    this.setState({ loading: true });
       let url = `https://newsapi.org/v2/top-headlines?${this.props.q ? "":"country="+this.props.country}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}${this.props.cat ? "&category=" + this.props.cat : ""}${this.props.q ? "&q=" + this.props.q : ""}`;
    // let url = `https://newsdata.io/api/1/news?${this.props.q ? "":"country="+this.props.country}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}${this.props.cat ? "&category=" + this.props.cat : ""}${this.props.q ? "&q=" + this.props.q : ""}`;
    let data = await fetch(url).then(res => res.json())
      .then(res => {
        this.setState({ articles: this.state.articles.concat(res.articles), totalResults: res.totalResults, loading: false  });
      })
      .catch(err => console.error(err));
  }
  render() {

    return (
      <div>
        <h1>News</h1>
        {/* {this.state.loading && <Loading />} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          // style={{ display: 'flex', flexDirection: 'column-reverse' }} //To put endMessage and loader to the top.
          hasMore={this.state.articles.length != this.state.totalResults}
          loader={<Loading/>}
          scrollableTarget="scrollableDiv"
        >
          <div>
          <div className='row'>
            {
              this.state.articles.map((element) => {
                {this.props.q && console.log(this.state.totalResults);}
                return <div className='col-md-3 col-sm-6' key={element.url}>
                  <Newsitems imgUrl={element.urlToImage} title={element.title} description={element.description} newsUrl={element.url} publishedAt={element.publishedAt} source={element.source.name} mode={this.props.mode} />
                </div>
              })
            }
           </div>
          </div >
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between" style={{ justifyContent: "space-between" }}>
          <button title='Prev' disabled={this.state.page <= 1} className={`btn btn-${this.props.mode === "light" ? "dark" : "light"} btn-lg`} onClick={this.handlePrev}>Previous</button>
          <button title='Next' disabled={Math.ceil(this.state.totalResults / this.props.pageSize) <= this.state.page} className={`btn btn-${this.props.mode === "light" ? "dark" : "light"} btn-lg`} onClick={this.handleNext}>Next</button>
        </div> */}
      </div>
    )
  }
}

export default News
import React, { Component } from 'react'
export class Newsitems extends Component {

  ;

  render() {
    let { imgUrl, title, description, newsUrl, publishedAt,source,mode  } = this.props
    return (
      <div className='my-3 container mx-0'>
        {
          <div className={`card bg-${mode}`} >
            <img src={imgUrl ? imgUrl : "https://www.zdnet.com/a/hub/i/r/2014/09/18/a05c6cbb-3f07-11e4-b6a0-d4ae52e95e57/thumbnail/770x578/984091aa227ad8ff61f481fbc479c287/download.jpg"} className="card-img-top" alt="Loading" />
            <div className="card-body">
              <h5 className="card-title">{title}
                <span className={`badge rounded-pill bg-${mode === "light" ? "dark" : "light"} text-${mode} badge-sm`}><small>{source}</small></span></h5>
              <p className="card-text">{description}</p>
              <p className="card-text"><small className="text-muted">{publishedAt.slice(0, 10)}</small></p>
              <a href={newsUrl} target="_blank" className= {`btn btn-${mode === "light" ? "dark" : "light"} btn-sm`}>Read More...</a>
            </div>
          </div>
        }

      </div>
    )
  }
}

export default Newsitems
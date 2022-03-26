import React, { Component } from 'react'

export default class NewsItem extends Component {
    render() {
        const { title, description, imageUrl, newsUrl, author, date, source } = this.props;
        return (
            <div>
                <div className="card">
                    <div style={{ display: "flex", justifyContent: "flex-end", position: "absolute", right: 0 }}>
                        <span className=" badge rounded-pill bg-danger" style={{ zIndex: "1", left: "50%" }} >{source ? source : "Unknown"}</span>
                    </div>
                    <img src={imageUrl ? imageUrl : "https://cdn.vox-cdn.com/thumbor/NUq3ZW7wnCrwoIqdUG03kIfJz-0=/0x36:1800x978/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/23265403/S3e7_crowd.png"} className="card-img-top" alt="&nbsp; NO_IMG " />
                    <div className="card-body">

                        {/* <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ zIndex: "1", left: "50%" }} >{source ? source : "Unknown"}</span> */}
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}</p>
                        <p className="card-text"><small className="text-info">By " {author ? author : "Unknown"} " on {new Date(date).toGMTString()} </small></p>
                        <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-sm btn-dark">Read More</a>

                    </div>

                </div>
                <br />
            </div>
        )
    }
}

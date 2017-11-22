import React, { Component } from 'react'
import { connect } from 'react-redux'
import AddPostButton from './AddPostButton'
import * as PostHelpers from '../utils/PostHelpers'

class PostIndex extends Component {
  state = {
    orderBy: 'voteScore',
    order: 'desc'
  }

  asc = (a,b) => a < b
  desc = (a,b) => a > b

  // TODO: Impliment faster sorting algorithm
  insertionSort(array, orderBy, order = this.state.order) {
    const sortedArray = []
    array.forEach(post => {
      if (sortedArray.length < 1) {
        sortedArray.push(post)
      }
      else {
        let temp = post
        sortedArray.forEach((value, index) => {
          if (this[order](temp[orderBy], value[orderBy])) {
            sortedArray[index] = temp
            temp = value
          }
          if (sortedArray.length === index + 1)
            sortedArray.push(temp)
        })
      }
    })
    return sortedArray
  }


  filterPosts() {
    if (this.props.filter === 'all')
      return this.insertionSort(this.props.posts, this.state.orderBy)
    else
      return (
        this.insertionSort(
          this.props.posts.filter(post => {
            return post.category === this.props.filter
          }), this.state.orderBy
        )
      )
  }

  orderByHandler(e) {
    this.setState({orderBy: e.target.value})
  }

  orderHandler(e) {
    this.setState({order: e.target.value})
  }


  render () {
    return(
      <div className="container post-index">
        <h3 className="post-category-title">{this.props.filter}</h3>
        <div>
          Sort By:
          <select value={this.state.orderBy} onChange={(e) => this.orderByHandler(e)}>
            <option value="voteScore">Votes</option>
            <option value="timestamp">Time Posted</option>
            <option value="title">Title</option>
            <option value="author">Author</option>
          </select>
          <select value={this.state.order} onChange={(e) => this.orderHandler(e)}>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
        {this.props.posts && this.filterPosts().map(post => (
          <div className="row post-preview" key={post.id}>
            <h4>{post.title}</h4>
            <p className="post-body">{post.body}</p>
            <h5>Votes: {`${post.voteScore}`}</h5>
            <div className="post-info-container">
              <small>posted by: {post.author}</small><br/>
              <small>in {post.category}</small><br/>
              <small>{PostHelpers.getTimePassed(post.timestamp)} ago</small>
            </div>
          </div>
        ))}
        <AddPostButton/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts
  }
}

export default connect(mapStateToProps)(PostIndex)
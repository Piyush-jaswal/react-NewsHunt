import React, { Component } from 'react'
import LoadUrl from './Loader.gif'
export default class Loading extends Component {
  render() {
    return (
      <div>
        <div className="text-center">
            <img src= {LoadUrl} alt="Nom-Nom"/>
        </div>
      </div>
    )
  }
}

import React, { Component } from 'react'

export default class Button extends Component {
    render() {
        return (
            <button
                type="button"
                class="btn btn-danger btn-floating btn-lg"
                id="btn-back-to-top"
            >
                <i class="fas fa-arrow-up"></i>
            </button>
        )
    }
}

import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { ScrollToTop } from 'react-to-top'
import {
  BrowserRouter,
  Route,
  Routes
} from "react-router-dom";
import About from './components/About';
export default class App extends Component {
  constructor (){
    super();
    this.state = {
      searchInput: null,
      mode: "light",
   };
  };
  apiKey = process.env.REACT_APP_NEWS_API
  toggleMode = ()=>{
    if(this.state.mode === 'light')
    {
      this.setState({mode : "dark"})
      document.body.style.backgroundColor = "#181823";
      document.body.style.color = "white";
    }
    else
    {
      this.setState({mode : "light"});
      document.body.style.backgroundColor = "white";
      document.body.style.color = "black";
    }
  }
 
  
  render() {
    return (
      <div>
        <BrowserRouter>
          <Navbar searchInput = {this.state.searchInput} mode= {this.state.mode} updateSearch={this.setState.bind(this)} changeMode = {this.toggleMode}/>
           <Routes>
            <Route path="/" element={<News apiKey = {this.apiKey} key="home" pageSize={12} mode = {this.state.mode}/>}></Route>
            <Route path='/about' element= {<About/>} />
            <Route path="/business" element={<News apiKey = {this.apiKey} key="business" pageSize={12} cat={"business"} mode = {this.state.mode}/>}></Route>
            <Route path="/entertainment" element={<News apiKey = {this.apiKey} key="entertainment" pageSize={12} cat={"entertainment"} mode = {this.state.mode}/>}></Route>
            <Route path="/general" element={<News apiKey = {this.apiKey} key="general" pageSize={12} cat={"general"} mode = {this.state.mode}/>}></Route>
            <Route path="/health" element={<News apiKey = {this.apiKey} key="health" pageSize={12} cat={"health"} mode = {this.state.mode}/>}></Route>
            <Route path="/science" element={<News apiKey = {this.apiKey} key="science" pageSize={12} cat={"science"} mode = {this.state.mode}/>}></Route>
            <Route path="/sports" element={<News apiKey = {this.apiKey} key="sports" pageSize={12} cat={"sports"} mode = {this.state.mode}/>}></Route>
            <Route path="/technology" element={<News apiKey = {this.apiKey} key="technology" pageSize={12} cat={"technology"} mode = {this.state.mode}/>}></Route>
            <Route path="/search" element={<News apiKey = {this.apiKey} key={this.state.searchInput} q={this.state.searchInput?this.state.searchInput:""} mode = {this.state.mode}/>}></Route>

          </Routes>

        </BrowserRouter>
        <ScrollToTop />

        {/* { this.state.scrollTop > 100 &&<button onClick={this.scrollToTop} > Top </button>} */}

      </div>
    )
  }
}

//API apiKey = {this.apiKey} Key = 17dca642b4cc4844a8c7b10f5dc385ab
// d87c533f1fbe49228b4e96b28e5a87f4


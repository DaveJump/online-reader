require('normalize.css/normalize.css');
require('styles/reset.scss');
require('styles/App.scss');

import React from 'react';

import Footer from './footer';
import Pannel from './pannel';
import Catalog from './catalog';
import PopUp from './popUp';
import Controller from './controller';


class Main extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			dataArr: props.dataArr,
			popUp: [false,'']
		}
	}

	componentDidMount(){
		Controller.status = 1;
		this.refs.loading.style.display = 'block';
		let id = this.state.dataArr[0].chapterId || this.props.dataArr[0].chapterId;
		Controller.showFictionByChapterId(id,(dataArr) => {
			this.refs.loading.style.display = 'none';
			this.setState({dataArr: dataArr});
		});
	}

  render(){
  	let dataArr = this.props.dataArr;
		document.body.style.background = dataArr[1].bkColor;
		
    return(
      <div>
				<div className="m-artical-action">
					<div className="artical-action-mid" onClick={Controller.toggleNavBar}></div>
				</div>

				<header className="top-nav">
					<div className="icon-back"></div>
					<div className="nav-title">返回书架</div>
				</header>

				<section id="fiction_container" className="m-read-content" style={{fontSize: dataArr[1].fontSize}}>
					
					<h4>{this.state.dataArr[3] ? this.state.dataArr[3].t : ''}</h4>

					{
						this.state.dataArr[3] ? this.state.dataArr[3].p.map((item,index) => {
							return (
								<p key={index}>{item}</p>
							)
						}) : ''
					}

					<nav className="m-button-bar">
						<ul className="u-tab">
							<li ref="prev_button" onClick={this.prevChapter.bind(this)}>上一章</li>
							<li ref="next_button" onClick={this.nextChapter.bind(this)}>下一章</li>
						</ul>
					</nav>
				</section>

				<PopUp popUpMsg={this.state.popUp[1]} popUpShow={this.state.popUp[0]} popUpClick={this.popUpHide.bind(this)}/>
				<Pannel dataArr={dataArr}/>
				<Catalog dataArr={dataArr} loadingLayer={this.refs.loading}/>
				<Footer dataArr={dataArr} />

				<section ref="loading" className="loading">
					<div className="spinner">
						<div className="rect1"></div>
						<div className="rect2"></div>
						<div className="rect3"></div>
						<div className="rect4"></div>
						<div className="rect5"></div>
					</div>
				</section>
      </div>
    );
  }

  prevChapter(){
  	if(this.props.dataArr[0].chapterId === 0){
  		this.setState({popUp: [true,'已经是第一章啦！']});
  		return false;
  	}else{
  		this.props.dataArr[0].chapterId --;
  		window.scrollTo(0,0);
  	}
  	this.refs.loading.style.display = 'block';
		Controller.showFictionByChapterId(this.props.dataArr[0].chapterId,(dataArr) => {
			this.refs.loading.style.display = 'none';
			Controller.render(dataArr);
		});

  }

  nextChapter(){
  	if(this.props.dataArr[0].chapterId === this.props.dataArr[0].chapterCount - 1){
  		this.setState({popUp: [true,'已经是最后一章啦！']});
  		return false;
  	}else{
  		this.props.dataArr[0].chapterId ++;
  		window.scrollTo(0,0);
  	}
  	this.refs.loading.style.display = 'block';
		Controller.showFictionByChapterId(this.props.dataArr[0].chapterId,(dataArr) => {
			this.refs.loading.style.display = 'none';
			Controller.render(dataArr);
		});
  }

  popUpHide(){
  	this.setState({popUp: [false,'123']});
  }

}

export default Main;

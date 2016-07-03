require('normalize.css/normalize.css');
require('styles/reset.scss');
require('styles/App.scss');

import React from 'react';
import Pubsub from 'react-pubsub';

import Footer from './footer';
import Panel from './panel';
import Catalog from './catalog';
import PopUp from './popUp';
import Controller from './controller';


class Main extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			fictionContent: null,
			chapters: null,
			popUp: [false,'']
		}
	}

	componentDidMount(){
		Controller.status = 1;
		this.refs.loading.style.display = 'block';
		let id = this.props.dataArr[0].chapterId;

		Controller.showFictionByChapterId(id,(content) => {
			this.setState({fictionContent: content});
			this.refs.loading.style.display = 'none';
		});
	}

	getFictionContent(content,callback){
		this.setState({fictionContent: content});
		callback && callback();
	}

	getChapters(dataChapters){
		this.setState({chapters: dataChapters});
	}

  render(){
  	let dataArr = this.props.dataArr;
		document.body.style.background = dataArr[1].bkColor;

    let fontColor = '';

    if(dataArr[0].currentBkId === 4 || dataArr[0].currentBkId === 5 || !dataArr[1].day){
      fontColor = '#d6d6d6';
    }

    return(
      <div>
				<div className="m-article-action">
					<div className="article-action-mid" onClick={Controller.toggleNavBar}></div>
				</div>

				<header className="top-nav">
					<div className="icon-back"></div>
					<div className="nav-title">返回书架</div>
				</header>

				<section id="fiction_container" className="m-read-content" style={{fontSize: dataArr[1].fontSize,color: fontColor}}>

					<h4>{(this.state.fictionContent) ? (this.state.fictionContent.t) : ''}</h4>

					{
						(this.state.fictionContent) ? (this.state.fictionContent.p.map((item,index) => {
							return (
								<p key={index} style={{lineHeight: dataArr[1].lineHeight}}>{item}</p>
							)
						})) : ''
					}

					<nav className="m-button-bar" style={{display: this.state.fictionContent ? 'block' : 'none'}}>
						<ul className="u-tab">
							<li ref="prev_button" style={{color: fontColor,borderColor: fontColor}} onTouchEnd={this.prevChapter.bind(this)}>上一章</li>
							<span>第 {dataArr[0].chapterId + 1 || dataArr[0].chapterId + 1} 章 / 共 {dataArr[0].chapterCount} 章</span>
							<li ref="next_button" style={{color: fontColor,borderColor: fontColor}} onTouchEnd={this.nextChapter.bind(this)}>下一章</li>
						</ul>
					</nav>
				</section>

				<PopUp popUpMsg={this.state.popUp[1]} popUpShow={this.state.popUp[0]} popUpClick={this.popUpHide.bind(this)}/>
				<Panel dataArr={dataArr}/>
				<Catalog dataArr={dataArr} loadingLayer={this.refs.loading} chapters={this.state.chapters} getFictionContent={this.getFictionContent.bind(this)}/>
				<Footer dataArr={dataArr} getChapters={this.getChapters.bind(this)} />

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
  	}
  	this.refs.loading.style.display = 'block';
		Controller.showFictionByChapterId(this.props.dataArr[0].chapterId,(content) => {
			this.refs.loading.style.display = 'none';
			this.setState({fictionContent: content});
			window.scrollTo(0,0);
		});
  }

  nextChapter(){
  	if(this.props.dataArr[0].chapterId === this.props.dataArr[0].chapterCount - 1){
  		this.setState({popUp: [true,'已经是最后一章啦！']});
  		return false;
  	}else{
  		this.props.dataArr[0].chapterId ++;
  	}
  	this.refs.loading.style.display = 'block';
		Controller.showFictionByChapterId(this.props.dataArr[0].chapterId,(content) => {
			this.refs.loading.style.display = 'none';
			this.setState({fictionContent: content});
			window.scrollTo(0,0);
		});
  }

  popUpHide(){
  	this.setState({popUp: [false,'']});
  }

}

export default Main;

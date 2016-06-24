require('normalize.css/normalize.css');
require('styles/reset.scss');
require('styles/App.scss');

import React from 'react';

import Footer from './footer';
import Pannel from './pannel';
import Catalog from './catalog';
import Controller from './controller';

let yeomanImage = require('../images/yeoman.png');

class Main extends React.Component{

	componentDidMount(){
		Controller.status = 1;
	}

  render(){
  	let dataArr = this.props.dataArr;
		document.body.style.background = dataArr[1].bkColor
		
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
					<h4>Title</h4>
					<p>江暖心命二婢收拾好了东西，就在经过白子涵身边时，却听一道清越的声音响在耳畔，“父亲明日回京，母亲命我过来邀请表妹明晚过府参加家宴。”</p>
					<p>江暖心命二婢收拾好了东西，就在经过白子涵身边时，却听一道清越的声音响在耳畔，“父亲明日回京，母亲命我过来邀请表妹明晚过府参加家宴。”</p>
					<p>江暖心命二婢收拾好了东西，就在经过白子涵身边时，却听一道清越的声音响在耳畔，“父亲明日回京，母亲命我过来邀请表妹明晚过府参加家宴。”</p>
					<p>江暖心命二婢收拾好了东西，就在经过白子涵身边时，却听一道清越的声音响在耳畔，“父亲明日回京，母亲命我过来邀请表妹明晚过府参加家宴。”</p>
					<p>江暖心命二婢收拾好了东西，就在经过白子涵身边时，却听一道清越的声音响在耳畔，“父亲明日回京，母亲命我过来邀请表妹明晚过府参加家宴。”</p>

					<nav className="m-button-bar">
						<ul className="u-tab">
							<li id="prev_button">上一章</li>
							<li id="next_button">下一章</li>
						</ul>
					</nav>
				</section>

				<Pannel dataArr={dataArr}/>
				<Catalog />
				<Footer dataArr={dataArr} />

				<section className="loading">
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

}

export default Main;

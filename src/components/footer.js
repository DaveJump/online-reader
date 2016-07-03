import React from 'react';
import Controller from './controller';

class Footer extends React.Component{

	getChaptersCb(){
		Controller.toggleCatalog((chapters) => {
			this.props.getChapters(chapters);
		});
	}

	render(){
		let dataArr = this.props.dataArr;

		return(
			<footer className="bottom-nav">
				<div className="catalog" onTouchEnd={this.getChaptersCb.bind(this)}>
					<div className="icon-catalog"></div>
					<div className="text-catalog">目录</div>
				</div>

				<div className="pageStyle" onTouchEnd={Controller.togglePanel.bind(this)}>
					<div className="icon-pageStyle"></div>
					<div className="text-pageStyle">样式</div>
				</div>

				<div className="mod" onTouchEnd={Controller.changeMod.bind(this)}>
					<div className="mod-day" style={{display: dataArr[1].day ? 'block' : 'none'}}>
						<div className="icon-mod-day"></div>
						<div className="text-mod-day">白天</div>
					</div>
					<div className="mod-night" style={{display: !dataArr[1].day ? 'block' : 'none'}}>
						<div className="icon-mod-night"></div>
						<div className="text-mod-night">夜间</div>
					</div>
				</div>
			</footer>
		);
	}
}

export default Footer;

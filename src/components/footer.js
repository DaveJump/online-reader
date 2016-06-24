import React from 'react';
import Controller from './controller';

class Footer extends React.Component{

	render(){
		let dataArr = this.props.dataArr;

		return(
			<footer className="bottom-nav">
				<div className="catalog" onClick={Controller.toggleCatalog}>
					<div className="icon-catalog"></div>
					<div className="text-catalog">目录</div>
				</div>

				<div className="pageStyle" onClick={Controller.togglePannel}>
					<div className="icon-pageStyle"></div>
					<div className="text-pageStyle">样式</div>
				</div>

				<div className="mod" onClick={Controller.changeMod}>
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
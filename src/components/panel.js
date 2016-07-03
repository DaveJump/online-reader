import React from 'react';
import Controller from './controller';

class Panel extends React.Component{
	render(){
		let circle = ['white','yellow','brown','green','mazarine','black'];
		let font = ['large-font','medium-font','small-font'];
		let lh = ['large-lh','medium-lh','small-lh'];
		let className = '';
		let fontClassName = '';
		let lhClassName = '';
		let dataArr = this.props.dataArr;

		return (
			<section className="nav-panel">
				<div className="child-mod clearfix">
					<span style={{lineHeight: 4}}>字号</span>
					{
						font.map(function(item,index){
							fontClassName = (index === dataArr[0].currentFontId) ? ('font-size-button' + ' ' + 'current') : 'font-size-button';
							return (
								<div className="fontSize-wrapper" key={index + 1} style={{background: fontClassName.indexOf('current') > 0 ? '#f0f0f0' : '#ffffff'}} onTouchEnd={Controller.changeFontSize.bind(this,index)}>
									<div key={index} id={item} className={fontClassName}></div>
								</div>
							)
						}.bind(this))
					}
				</div>
				<div className="child-mod clearfix">
					<span>背景</span>
					{
						circle.map(function(item,index){
							className = 'bk_container' + ' ' + item;
							return (
                <div key={index+1} className="bk-wrapper">
                  <div key={index} className={className} onTouchEnd={this.changeBk.bind(this,index)} style={{opacity: !dataArr[1].day ? 0.3 : 1}}>
                    <div key={index} className="bk-container-current" style={{display: index === dataArr[0].currentBkId ? 'block' : 'none'}}></div>
                  </div>
                </div>
							)
						}.bind(this))
					}
				</div>
				<div className="child-mod clearfix">
					<span style={{lineHeight: 4}}>行距</span>
					{
						lh.map(function(item,index){
							lhClassName = (index === dataArr[0].currentlhId) ? ('lh-button' + ' ' + 'current') : 'lh-button';
							return (
								<div className="lh-wrapper" key={index + 1} style={{background: lhClassName.indexOf('current') > 0 ? '#f0f0f0' : '#ffffff'}} onTouchEnd={Controller.changeLH.bind(this,index)}>
									<div key={index} id={item} className={lhClassName}></div>
								</div>
							)
						}.bind(this))
					}
				</div>
			</section>
		)
	}

	changeBk(index){
		if(!this.props.dataArr[1].day){
			return false;
		}else{
			Controller.changeBk(index);
		}
	}
}

export default Panel;

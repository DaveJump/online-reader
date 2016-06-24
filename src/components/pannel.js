import React from 'react';
import Controller from './controller';

class Pannel extends React.Component{
	render(){
		let circle = ['white','yellow','brown','green','mazarine','black'];
		let fontCircle = [
			{
				size: 'large-font',
				font: '大'
			},
			{
				size: 'medium-font',
				font: '中'
			},
			{
				size: 'small-font',
				font: '小'
			}
		];
		let className = '';
		let fontClassName = '';
		let dataArr = this.props.dataArr;

		return (
			<section className="nav-pannel">
				<div className="child-mod">
					<span>字号</span>
					{
						fontCircle.map(function(item,index){
							fontClassName = (index === dataArr[0].currentFontId) ? ('font-size-button' + ' ' + 'current') : 'font-size-button';
							return (
								<div key={index} id={item.size} className={fontClassName} onClick={Controller.changeFontSize.bind(this,index)}>{item.font}</div>
							)
						}.bind(this))
					}
				</div>
				<div className="child-mod">
					<span>背景</span>
					{
						circle.map(function(item,index){
							className = 'bk_container' + ' ' + item;
							return (
								<div key={index} className={className} onClick={this.changeBk.bind(this,index)} style={{opacity: !dataArr[1].day ? 0.3 : 1}}>
									<div key={index} className="bk-container-current" style={{display: index === dataArr[0].currentBkId ? 'block' : 'none'}}></div>
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

export default Pannel;
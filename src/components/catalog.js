import React from 'react';
import Controller from './controller';

class Catalog extends React.Component{

	constructor(props){
		super(props);
		this.state = {dataArr: props.dataArr}
	}

	componentDidMount(){
		Controller.showAllChapter((dataArr) => {
			this.setState({dataArr: dataArr});
		});
	}

	render(){

		if (this.state.dataArr[2]){
			return(
				<div ref="chapter_catalog" className="chapter_catalog_pannel">
					<ul>
						{
							this.state.dataArr[2].map((item,index) => {
								return (
									<li key={index} data-chapter_id={index} onClick={this.selectChapter.bind(this,index)}>{item.chapterTitle}</li>
								)
							})
						}
					</ul>
				</div>
			);
		}
		else {
			return(
				<div id="chapter_catalog" className="chapter_catalog_pannel">
					<ul></ul>
				</div>
			);
		}

	}

	selectChapter(index){
		this.props.loadingLayer.style.display = 'block';
		Controller.showFictionByChapterId(index,(dataArr) => {
			this.props.loadingLayer.style.display = 'none';
			this.refs.chapter_catalog.style.display = 'none';
			Controller.render(dataArr);
		});
		window.scrollTo(0,0);
	}

}

export default Catalog;
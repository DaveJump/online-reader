import React from 'react';
import Controller from './controller';

class Catalog extends React.Component{

	render(){
		let chapters = this.props.chapters;

		if (chapters){
			return(
				<div ref="chapter_catalog" className="chapter_catalog_panel">
            <div className="catalog-spinner">
              <div className="rect1"></div>
              <div className="rect2"></div>
              <div className="rect3"></div>
              <div className="rect4"></div>
              <div className="rect5"></div>
            </div>
					<ul>
						{
              chapters.map((item,index) => {
								return (
									<li key={index} onTouchEnd={this.selectChapter.bind(this,index)}>{item.chapterTitle}</li>
								)
							})
						}
					</ul>
				</div>
			);
		}
		else {
			return(
				<div id="chapter_catalog" className="chapter_catalog_panel">
					<div className="catalog-spinner">
            <div className="rect1"></div>
            <div className="rect2"></div>
            <div className="rect3"></div>
            <div className="rect4"></div>
            <div className="rect5"></div>
          </div>
					<ul></ul>
				</div>
			);
		}

	}

	selectChapter(index){
		this.props.loadingLayer.style.display = 'block';

		Controller.showFictionByChapterId(index,(content) => {
			this.props.getFictionContent(content,() => {
				this.props.loadingLayer.style.display = 'none';
				Controller.hideAll();
				window.scrollTo(0,0);
			});
		});
	}

}

export default Catalog;

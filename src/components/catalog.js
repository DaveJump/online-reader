import React from 'react';
import Controller from './controller';

class Catalog extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      dataArr: props
    }
  }

  componentDidMount(){
    this.setState({
      dataArr: this.props.dataArr
    });
  }

	render(){
		if (this.state.dataArr[3] instanceof Array){
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
              this.state.dataArr[3].map((item,index) => {
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
		Controller.showFictionByChapterId(index,(dataArr) => {
			this.props.loadingLayer.style.display = 'none';
			this.refs.chapter_catalog.style.display = 'none';
			Controller.render(dataArr);
		});
		window.scrollTo(0,0);
	}

}

export default Catalog;

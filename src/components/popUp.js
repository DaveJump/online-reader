import React from 'react';

class PopUp extends React.Component{
	render(){
		return (
			<section className="popUpBox" onClick={this.props.popUpClick} style={{display: this.props.popUpShow ? 'block' : 'none'}} >
				<div><h3>{this.props.popUpMsg}</h3></div>
			</section>
		)
	}
}

export default PopUp;
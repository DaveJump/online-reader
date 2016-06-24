import {store} from './util';
const $ = require('../../bower_components/jquery/dist/jquery.min');
const Base64 = require('./base64');


$(window).scroll(() => {Controller.hideAll();});

let Controller = {

	status: 0,

	dataArr: [
		{
			currentBkId: 1,
			currentFontId: 1,
			chapterId: 0,
			chapterCount: 4
		},
		{
			bkColor: '#e9dfc7',
			fontSize: '14px',
			day: true
		}
	],

	storage: () => {
		store('readerData',Controller.dataArr);
	},

	togglePannel: () => {

		if(Controller.status){
			$('.chapter_catalog_pannel').hide();
			$('.nav-pannel').toggle();

			$('.pageStyle').find('.icon-pageStyle').toggleClass('active');
			$('.pageStyle').find('.text-pageStyle').toggleClass('active');
		}

	},

	toggleCatalog: () => {

		if(Controller.status){
			if($('.icon-pageStyle').hasClass('active') || $('.text-pageStyle').hasClass('active')){
				$('.icon-pageStyle').removeClass('active');
				$('.text-pageStyle').removeClass('active');
			}
			$('.nav-pannel').hide();
			$('.chapter_catalog_pannel').toggle();
		}

	},

	hideAll: () => {

		if(Controller.status){
			$('.nav-pannel').hide();
			$('.chapter_catalog_pannel').hide();
			$('.top-nav').hide();
			$('.bottom-nav').hide();
			$('.icon-pageStyle').removeClass('active');
			$('.text-pageStyle').removeClass('active');
		}

	},

	toggleNavBar: () => {

		if(Controller.status){
			$('.top-nav').toggle();
			$('.bottom-nav').toggle();
			$('.icon-pageStyle').removeClass('active');
			$('.text-pageStyle').removeClass('active');

			if(!$('.nav-pannel').is(':hidden') || !$('.chapter_catalog_pannel').is(':hidden')){
				$('.nav-pannel').hide();
				$('.chapter_catalog_pannel').hide();
			}
		}

	},

	changeBk: (index) => {
	
		switch(index){
			case 0:
				Controller.dataArr[1].bkColor = '#fff';
				break;
			case 1:
				Controller.dataArr[1].bkColor = '#e9dfc7';
				break;
			case 2:
				Controller.dataArr[1].bkColor = '#A4A4A4';
				break;
			case 3:
				Controller.dataArr[1].bkColor = '#CDEFCE';
				break;
			case 4:
				Controller.dataArr[1].bkColor = '#283548';
				break;
			case 5:
				Controller.dataArr[1].bkColor = '#0F1410';
				break;
			default:
				Controller.dataArr[1].bkColor = '#e9dfc7';
		}

		Controller.dataArr[0].currentBkId = index;
		Controller.storage();
		Controller.render(Controller.dataArr);

	},

	changeFontSize: (index) => {

		switch(index){
			case 0:
				Controller.dataArr[1].fontSize = '20px';
				break;
			case 1:
				Controller.dataArr[1].fontSize = '16px';
				break;
			case 2:
				Controller.dataArr[1].fontSize = '12px';
				break;
			default:
				Controller.dataArr[1].fontSize = '16px';
		}

		Controller.dataArr[0].currentFontId = index;
		Controller.storage();
		Controller.render(Controller.dataArr);

	},

	changeMod: () => {

		Controller.dataArr[1].day = !Controller.dataArr[1].day;
		if(!Controller.dataArr[1].day){
			Controller.dataArr[1].bkColor = '#0F1410';
			Controller.dataArr[0].currentBkId = 5;
		}else{
			Controller.dataArr[1].bkColor = '#fff';
			Controller.dataArr[0].currentBkId = 0;
		}

		Controller.storage();
		Controller.render(Controller.dataArr);
	}

}

Controller.dataArr = store('readerData').length ? store('readerData') : Controller.dataArr;

export default Controller;
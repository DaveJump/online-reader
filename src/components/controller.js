import {store} from './util';
const $ = require('../../bower_components/jquery/dist/jquery.min');


$(window).scroll(() => {Controller.hideAll();});

let Controller = {

	status: 0,

	dataArr: [
		{
			currentBkId: 2,
			currentFontId: 1,
			currentlhId: 1,
			chapterId: 0,
			chapterCount: 4
		},
		{
			bkColor: '#ECD6AF',
			fontSize: '14px',
			lineHeight: '2',
			day: true
		}
	],

	storage: () => {
		store('readerData',Controller.dataArr);
	},

	togglePanel: () => {

		if(Controller.status){
			$('.chapter_catalog_panel').hide();
			$('.nav-panel').toggle();

      $('.icon-catalog').removeClass('active');
      $('.text-catalog').removeClass('active');

			$('.pageStyle').find('.icon-pageStyle').toggleClass('active');
			$('.pageStyle').find('.text-pageStyle').toggleClass('active');
		}

	},

	toggleCatalog: () => {

		if(Controller.status){

      $('.icon-pageStyle').removeClass('active');
      $('.text-pageStyle').removeClass('active');

      $('.catalog').find('.icon-catalog').toggleClass('active');
      $('.catalog').find('.text-catalog').toggleClass('active');

			$('.nav-panel').hide();
			$('.chapter_catalog_panel').toggle();

			let flag = true;

      if(!$('.chapter_catalog_panel').find('li').length && flag){
      	$('.catalog-spinner').show();
        Controller.showAllChapter((dataArr) => {
        	console.log(dataArr)
          Controller.render(dataArr);
          $('.catalog-spinner').hide();
          flag = true;
        });
        flag = false;
      }else{
        return false;
      }

		}

	},

	hideAll: () => {

		if(Controller.status){
			$('.nav-panel').hide();
			$('.chapter_catalog_panel').hide();
			$('.top-nav').hide();
			$('.bottom-nav').hide();
			$('.icon-pageStyle').removeClass('active');
			$('.text-pageStyle').removeClass('active');
      $('.icon-catalog').removeClass('active');
      $('.text-catalog').removeClass('active');
		}

	},

	toggleNavBar: () => {

		if(Controller.status){
			$('.top-nav').toggle();
			$('.bottom-nav').toggle();
			$('.icon-pageStyle').removeClass('active');
			$('.text-pageStyle').removeClass('active');
			$('.icon-catalog').removeClass('active');
      $('.text-catalog').removeClass('active');

			if(!$('.nav-panel').is(':hidden') || !$('.chapter_catalog_panel').is(':hidden')){
				$('.nav-panel').hide();
				$('.chapter_catalog_panel').hide();
			}
		}

	},

	changeBk: (index) => {

		switch(index){
			case 0:
				Controller.dataArr[1].bkColor = '#fff';
				break;
			case 1:
				Controller.dataArr[1].bkColor = '#FFF1D6';
				break;
			case 2:
				Controller.dataArr[1].bkColor = '#ECD6AF';
				break;
			case 3:
				Controller.dataArr[1].bkColor = '#D4ECD2';
				break;
			case 4:
				Controller.dataArr[1].bkColor = '#19354B';
				break;
			case 5:
				Controller.dataArr[1].bkColor = '#3F443E';
				break;
			default:
				Controller.dataArr[1].bkColor = '#ECD6AF';
		}

		Controller.dataArr[0].currentBkId = index;
		Controller.storage();
		Controller.render(Controller.dataArr);

	},

	changeFontSize: (index) => {

		switch(index){
			case 0:
				Controller.dataArr[1].fontSize = '22px';
				break;
			case 1:
				Controller.dataArr[1].fontSize = '18px';
				break;
			case 2:
				Controller.dataArr[1].fontSize = '12px';
				break;
			default:
				Controller.dataArr[1].fontSize = '18px';
		}

		Controller.dataArr[0].currentFontId = index;
		Controller.storage();
		Controller.render(Controller.dataArr);

	},

	changeLH: (index) => {

		switch(index){
			case 0:
				Controller.dataArr[1].lineHeight = '1.2';
				break;
			case 1:
				Controller.dataArr[1].lineHeight = '2';
				break;
			case 2:
				Controller.dataArr[1].lineHeight = '3';
				break;
			default:
				Controller.dataArr[1].lineHeight = '2';
		}

		Controller.dataArr[0].currentlhId = index;
		Controller.storage();
		Controller.render(Controller.dataArr);

	},

	changeMod: () => {

		Controller.dataArr[1].day = !Controller.dataArr[1].day;
		if(!Controller.dataArr[1].day){
			Controller.dataArr[1].bkColor = '#0F1410';
		}else{
			Controller.dataArr[1].bkColor = '#fff';
			Controller.dataArr[0].currentBkId = 0;
		}

		Controller.storage();
		Controller.render(Controller.dataArr);

	},

	showAllChapter: (callback) => {

		if(Controller.status){
			$.get('../data/chapter.json',(data) => {
				if(data.result === 0){
					let chapterArr = new Array;
					for(let i = 0;i < Controller.dataArr[0].chapterCount;i ++){
						chapterArr.push({
							chapterId: parseInt(data.chapters[i].chapter_id) + 1,
							chapterTitle: data.chapters[i].title
						});
					}
					if(!Controller.dataArr[3]){
						Controller.dataArr.push(chapterArr);
					}else{
						Controller.dataArr[3] = chapterArr;
					}
					callback && callback(Controller.dataArr);
				}
			},'json');
		}

	},

	showFictionByChapterId: (id,callback) => {

		if(Controller.dataArr[3]){
			Controller.dataArr[3] = {};
		}

		if(Controller.status){
			$.get('../data/data' + id + '.json',(jsonData) => {
				if(jsonData.result == 0){
					if(!Controller.dataArr[2]){
						Controller.dataArr.push(jsonData);
					}else{
						Controller.dataArr[2] = jsonData;
					}
					Controller.dataArr[0].chapterId = id;
					Controller.storage();
					callback && callback(Controller.dataArr);
				}
			},'json');
		}

	}

}

Controller.dataArr = store('readerData').length ? store('readerData') : Controller.dataArr;

export default Controller;

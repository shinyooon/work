$(document).ready(function(){
	var is_ios = /(iPad|iPhone|iPod)/g.test( navigator.userAgent );
	if(is_ios) $('<link rel="stylesheet" type="text/css" href="http://v2.theminda.com/domestic/m/common/css/ios.css" />').appendTo("head");
	mainEvent.init();
	mainEvent.initEvent();
	panelEvent.init();
	panelEvent.initEvent();
	inputCheck.init();
	calendarEvent.init();
	calendarEvent.initEvent();
	lyEvent.init();
	lyEvent.initEvent();
	txtMore.init();
	txtMore.initEvent();
});

//main 이벤트
var mainEvent = {
	$header: null,
	$top_visual: null,
	//range: null,
	visual_h: null,
	header_h: null,
	timer: null,
	lastScrollTop:null,

	init : function(){
		this.$header = $('#header');
		this.header_h = this.$header.outerHeight(true);
		this.$top_visual = $('.top-visual-wrap');
		this.visual_h = this.$top_visual.outerHeight(true);
		//this.range = this.visual_h/2;
	},
	initEvent : function(scrollTop){
		var objThis = this;
		this.$header.css({'top' : 0});
		// this.topVisualCtrl (scrollTop);
		$(window).on('scroll', function (){
			objThis.scrollTop = window.pageYOffset;
			objThis.hdCtrl (objThis.scrollTop);
			//objThis.topVisualCtrl (objThis.scrollTop);
		});
		this.hdCtrl (scrollTop);

	},
	hdCtrl : function(scrollTop){
		if(scrollTop>this.visual_h+this.header_h){
			this.$header.removeClass('transparent');
			// this.$header.delay(200).queue(function() {
			// 	$(this).removeClass("transparent");
			// 	$(this).dequeue();
			// });
		}
		else if(scrollTop<this.visual_h-this.header_h&& scrollTop>0){
			this.$header.addClass('transparent');
		}

		if(this.visual_h && (scrollTop>this.visual_h-this.header_h) || !this.visual_h && (scrollTop>this.header_h)){
			this.hdAni(scrollTop);
		}
		this.lastScrollTop = scrollTop;
		//console.log(this.lastScrollTop+ ', ' + scrollTop);
		clearTimeout(this.timer);
		this.timer = setTimeout( refresh , 100 );
		var refresh = function () {
			this.$header.css({
				'top' : 0
			})
		}
	},
	hdAni : function(scrollTop){
		if (scrollTop > this.lastScrollTop){
			this.$header.css({
				'top' : -this.header_h
			})
		} else {
			this.$header.css({
				'top' : 0
			})

		}
	}
	/*topVisualCtrl : function(scrollTop){
		var calc = 1 - (scrollTop - (this.visual_h/1.4) + this.range) / this.range;
		this.$top_visual.css({ 'opacity': calc });
		if ( calc > '1' ) {
			this.$top_visual.css({ 'opacity': 1 });
		} else if ( calc < '0' ) {
			this.$top_visual.css({ 'opacity': 0 });
		}
	}*/
}
//panel이벤트
var panelEvent ={
	$panelWrap : null,
	$body : null,
	$dimmed : null,
	$btnClse : null,

	//$btnSrch :null,

	init : function(){
		this.$panelWrap = $('.panel-wrap');
		this.$dimmed = $('.dimmed');
		this.$body = $('body');
		this.$btnClse  = this.$panelWrap.find('.btn-clse');
	},
	initEvent : function(){
		var objThis = this;
		$('.btn-icon-srch').click(function(){
			objThis.openPanel($('.slide-top'));
		});
		this.$btnClse.click(function(){
			var $panel = $(this).closest('.panel');
			objThis.closePanel($panel);
		});
		this.$dimmed.click(function(){
			if($('.panel-share').hasClass('open')){
				objThis.closePanel($('.panel-share'));
			}else{
				objThis.closePanel($(this));
			}
		})
		$('#main-srch-city').click(function(){
			objThis.openPanel($('.panel-srch'));
			//$('.spot-input-area input').focus();
		});
		$('#main-srch-date').click(function(){
			objThis.openPanel($('.panel-date'));
			$("#datecheck").daterangepicker("open");
		});
		$('#rev-srch-date').click(function(){
			objThis.openPanel($('.panel-date'));
			$("#datecheck").daterangepicker("open");
		});
		$('.date-srch-wrap .btn-save').click(function(){
			objThis.closePanel($('.panel-date'));
			$('#main-srch-date').val(calendarEvent.$checkIn.val()+' - '+calendarEvent.$checkOut.val());
			$('#rev-srch-date').val(calendarEvent.$checkIn.val()+' - '+calendarEvent.$checkOut.val());
		});
		$('.last-srch-area .list-city .btn, .list-auto li a').click(function(e){
			e.preventDefault();
			objThis.closePanel($('.panel-srch'));
			$('#main-srch-city').val($(this).text());
		});
		$('.btn-icon-share').click(function(e){
			e.preventDefault();
			objThis.openPanel($('.panel-share'));
		});
	},
	openPanel: function($panel){
		var objThis = this;
		this.$panelWrap.show();
		setTimeout(function(){
			objThis.$body.addClass('p-open');
		},50);
		if($panel.hasClass('slide-top')){
			setTimeout(function(){
				objThis.$body.addClass('p-t-open');
			},200);
		}else if ($panel.hasClass('slide-bottom')&&this.$body.hasClass('p-t-open')){
			setTimeout(function(){
				$panel.addClass('open');
			},60);
		}
		else if($panel.hasClass('slide-bottom')){
			setTimeout(function(){
				$panel.addClass('open');
			},60);
		}
		 $panel.focus();
	},
	closePanel : function($panel){
		var objThis = this;
		if($panel.hasClass('slide-top')||$panel.hasClass('dimmed')){
			//this.$dimmed.fadeOut(100);
			this.$body.removeClass('p-t-open');
			setTimeout(function(){
				setTimeout(function(){
					objThis.$body.removeClass('p-open');
				},50);
				objThis.$panelWrap.hide();
			},300);
		}else if($panel.hasClass('slide-bottom') && this.$body.hasClass('p-t-open')){
			$panel.removeClass('open');
		}else if($panel.hasClass('slide-bottom')){
			$panel.removeClass('open');
			this.$body.removeClass('p-open');
			setTimeout(function(){
				objThis.$panelWrap.hide();
			},400);
		}
		else{
			//this.$dimmed.fadeOut(200);
		}
	}
}

//input 이벤트
var inputCheck = {
	$inputWrap : null,
	$input : null,
	$btnReset : null,
	$select : null,

	init : function(){
		var objThis = this;
		this.$inputWrap = $('.input-wrap');
		this.$input = this.$inputWrap.find('input:text');
		this.$btnReset = this.$inputWrap.find('.btn-clse-input');
		// 전체 input text value가 있는지 확인
		this.$input.each(function(){
			objThis.keyupInput($(this));
		})
		this.$input.keyup(function(){
			objThis.keyupInput($(this));
		});
		this.$btnReset.click(function(){
			objThis.resetInput($(this));
		});
		this.selectChangEvent();
	},
	keyupInput : function($selector){
		if($selector.val()){
			$selector.siblings('.btn-clse-input').show();
			// [D] 퍼블리싱 확인을 위한 스크립트. 개발시 삭제해주세용
			$('.list-auto').show();
		}else{
			$selector.siblings('.btn-clse-input').hide();
		}
	},
	resetInput : function($selector){
		$selector.siblings('input:text').val('');
		$selector.hide();
		$('.list-auto').hide();
	},
	selectChangEvent : function(){
		var objThis = this;
		var text = ''
		this.$select = this.$inputWrap.find('.select');
		this.$select.change(function(){
			text = $(this).find(":selected").text();
			$(this).closest('.input-wrap').find('.select-result').text(text);
		})
	}
}

//달력이벤트
var calendarEvent ={
	startDate : null,
	endDate : null,
	$checkIn : null,
	$checkOut : null,
	$setDateCheck : null,
	range : null,
	$resetBtn : null,

	init : function(){
		var objThis = this;
		this.$checkIn = $("#checkin");
		this.$checkOut = $("#checkout");
		this.$setDateCheck = $("#datecheck");
		this.$resetBtn= $(".btn-reset-cal");
		this.$setDateCheck.daterangepicker({
			datepickerOptions : {
				numberOfMonths : 7,
				//dayNamesMin : [ "일", "월", "화", "수", "목", "금", "토" ],
				monthNames : [ "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
				minDate : new Date(),
				showButtonPanel : false,
				maxDate : "+180d",
			},
			dateFormat : 'yy-mm-dd',
		});
	},
	initEvent: function(){
		var objThis = this;

		this.$setDateCheck.change(function(){
			objThis.range = objThis.$setDateCheck.daterangepicker("getRange");
			if(objThis.range!==null){
				objThis.startDate = objThis.getFormmatedDate(objThis.range.start);
				objThis.endDate = objThis.getFormmatedDate(objThis.range.end);
				objThis.$checkIn.val(objThis.startDate);
				objThis.$checkOut.val(objThis.endDate);
			}
		});
		this.$resetBtn.click(function(){
			objThis.reset();
		})
	},
	reset : function(){
		this.$checkIn.val('');
		this.$checkOut.val('');
		this.$setDateCheck.daterangepicker("clearRange");

	},
	getFormmatedDate : function(date){
		if(date instanceof Date){
			var yyyy = date.getFullYear();
			var dd = date.getDate();
			var mm = date.getMonth()+1; //January is 0!

			// if(dd<10) dd='0'+dd;
			// if(mm<10) mm='0'+mm;
			if(dd<10) dd=dd;
			if(mm<10) mm=mm;

			//return yyyy+'-'+mm+'-'+dd;
			return mm+'월 '+dd+'일';
		}else{
			return '';
		}
	}
}
var txtMore = {
	$filterArea :null,
	$body : null,
	$bxMoreWrap : null,
	$innerHtml : null,
	$realH  : null,
	$hiddenH : null,

	init : function(){
		this.body = $('body');
		this.$bxMoreWrap =$('.bx-more-wrap');
		this.innerHtml = '';
	},
	initEvent : function(){
		objThis = this;
		this.$bxMoreWrap.each(function(){
			this.hiddenH = $(this).find('.bx-txt-more').outerHeight(true);
			this.realH = $(this).find('.bx-txt-more p').outerHeight(true);
			if(this.realH>this.hiddenH){
				$(this).append('<button class="no-style btn-txt-more color-grey">더보기<span class="icon-cm icon-plus"></span></button>')
			}
		})
		this.body.on('click', '.btn-txt-more', function(){
			objThis.$bxMoreWrap = $(this).closest('.bx-more-wrap');
			objThis.btnMoreEvent(objThis.$bxMoreWrap);
			$(this).html(objThis.innerHtml);
		});
	},
	btnMoreEvent : function($bxMoreWrap){
		this.$bxMoreWrap = $bxMoreWrap;
		this.$bxMoreWrap.toggleClass('open');
		if(this.$bxMoreWrap.hasClass('open')){
			this.innerHtml = '닫기<span class="icon-cm icon-clse"></span>';
		}else{
			this.innerHtml = '더보기<span class="icon-cm icon-plus"></span>';
		}
	},
}
var quantityCtrl = {
	$quantityWrap : null,
	$btnPlus : null,
	$btnMinus : null,
	$cntInput : null,
	$cntfield : null,
	cnt : null,

	init : function (){
		this.$quantityWrap = $('.quantity-wrap');
		this.$btnPlus = this.$quantityWrap.find('.btn-plus');
		this.$btnMinus = this.$quantityWrap.find('.btn-minus');
		this.$cntInput = this.$quantityWrap.find('#srch-rev-cnt');
		this.$cntfield = this.$quantityWrap.find('.txt-cnt');
		this.cnt= parseInt(this.$cntInput.val());
	},
	initEvent : function(){
		var objThis = this;
		this.$btnPlus.click(function(){
			objThis.cnt = objThis.cnt+1;
			objThis.showTxt();
		})
		this.$btnMinus.click(function(){
			if(objThis.cnt>1) {
				objThis.cnt = objThis.cnt-1;
				objThis.showTxt();
			}
		});

	},
	showTxt : function(){
		this.$cntInput.val(this.cnt);
		this.$cntfield.text(this.cnt+'명');
	}

}
//레이어 이벤트
//레이어가 한페이지에 여러개 있을수도 있으니 프로토타입으로 생성
function Layer($layer){
	this.$lyWrap = $layer;
	this.scrollTop = 0;
	this.init();
	this.initEvent();
};
Layer.prototype.init = function(){
	this.$body = $('body');
	this.$btnClse  = this.$lyWrap.find('.btn-clse');
	this.$lyCon = this.$lyWrap.find('.ly-con');
	this.$lyHeader  =  this.$lyWrap.find('.ly-hd');
	this.lyHeader_h = this.$lyHeader.outerHeight(true);
};
Layer.prototype.initEvent = function(){
	var objThis = this;
	//this.open(this.$lyWrap);
	//close Layer
	this.$btnClse.click(function(e){
		e.preventDefault();
		$(this).closest('.ly-wrap').removeClass('open')
		setTimeout(function() {
			objThis.$lyWrap.hide();
		}, 200)
		objThis.$body.removeClass('p-open');
	});
	this.hdCtrl ();
};
Layer.prototype.hdCtrl =function(){
	var objThis = this;
	this.$lyCon.on('scroll', function (){
		objThis.scrollTop =$(this).scrollTop();
		// if(objThis.scrollTop>0){
		// 	objThis.$lyHeader.removeClass('transparent');
		// }else{
		// 	objThis.$lyHeader.addClass('transparent');
		// }
		if (objThis.scrollTop> objThis.lyHeader_h){
			if (objThis.scrollTop > objThis.lastScrollTop){
				objThis.$lyHeader.css({
					'top' : -objThis.lyHeader_h
				})
			} else {
				objThis.$lyHeader.css({
					'top' : 0
				})
			}
		}
		objThis.lastScrollTop =objThis.scrollTop;
		clearTimeout(timer);
		var timer = setTimeout( refresh , 0 );
		var refresh = function () {
			objThis.$lyHeader.css({
				'top' : 0
			})
		}
	});
};
Layer.prototype.open = function(){
	var objThis = this;
	this.$body.addClass('p-open');
	this.$lyWrap.show();
	setTimeout(function() {
		objThis.$lyWrap.addClass('open');
	},50)
	this.$lyCon.scrollTop(0);
};
var lyEvent = {
	reviewLy :null,
	init : function(){
		this.reviewLy = $('.ly-review');
	},
	initEvent:function(){
		var objThis = this;
		$('a.img-ly').click(function(e){
			e.preventDefault();
			var reviewLayer = new Layer(objThis.reviewLy);
			reviewLayer.open();
		})
	}
}

function Toast(msg){
	this.$toast =null;
	this.$body = null;
	this.init();
}
Toast.prototype.init = function(){
	this.$body = $('body');
	this.$body.append('<div id="toast"></div>');
	this.$toast = $('#toast');
}
Toast.prototype.show = function(msg){
	var _this = this;
	this.$toast.html(msg);
	this.$toast.addClass('show');
	setTimeout(function(){
		 _this.$toast.removeClass('show');
	}, 2900);
}

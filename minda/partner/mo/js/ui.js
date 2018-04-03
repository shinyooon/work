$(document).ready(function(){
	var is_ios = /(iPad|iPhone|iPod)/g.test( navigator.userAgent );
	if(is_ios) $('<link rel="stylesheet" type="text/css" href="/filelist/partner/mo/css/ios.css" />').appendTo("head");
	inputCheck.init();
	calendarEvent.init();
	calendarEvent.initEvent();
	txtMore.init();
	txtMore.initEvent();
    setSlideSize.init();
    setSlideSize.initEvent();
});
//input 이벤트
var inputCheck = {
	$body : null,
	$inputWrap : null,
	$input : null,
	$btnReset : null,
	$select : null,
	btnHtml: null,

	init : function(){
		var _this = this;
		this.$body = $('body');
		this.$input = $('input:text, input:password');
		this.btnHtml = '<button type="button" class="input-wrap__btn-del"></button>';
		this.$input.closest('.input-wrap').append(_this.btnHtml);
		this.$inputWrap = this.$input.closest('.input-wrap');
		this.$btnReset = this.$inputWrap.find('.input-wrap__btn-del');
		// 전체 input text value가 있는지 확인
        this.$input.change(function(){
            _this.keyupInput($(this));
		});
		this.$input.each(function(){
			_this.keyupInput($(this));
		})
		this.$input.keyup(function(){
			_this.keyupInput($(this));
		});
		_this.$btnReset.on('click', function(){
			_this.resetInput($(this));
		});
	},
	keyupInput : function($selector){
		if($selector.val()){
			$selector.siblings('.input-wrap__btn-del').show();
		}else{
			$selector.siblings('.input-wrap__btn-del').hide();
		}
	},
	resetInput : function($selector){
		$selector.siblings('input:text, input:password').val('');
		$selector.hide();
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
		var _this = this;
		this.$checkIn = $("#checkin");
		this.$checkOut = $("#checkout");
		this.$setDateCheck = $("#datecheck");
		this.$resetBtn= $(".panel-cal__input-txt2 + .input-wrap__btn-del");
		this.$setDateCheck.daterangepicker({
			datepickerOptions : {
				numberOfMonths : 19,
				monthNames : [ "1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
				showButtonPanel : false,
				minDate: '-1y',
				maxDate : "+180d",
			},
			dateFormat : 'yy-mm-dd',
		});
	},
	initEvent: function(){
		var _this = this;

		this.$setDateCheck.change(function(){
			_this.range = _this.$setDateCheck.daterangepicker("getRange");
			if(_this.range!==null){
				_this.startDate = _this.getFormmatedDate(_this.range.start);
				_this.endDate = _this.getFormmatedDate(_this.range.end);

				$('input[name="checkin"]').val(_this.startDate);
				$('input[name="checkout"]').val(_this.endDate);

				_this.$checkIn.val(_this.getDateTxt(_this.startDate));
				_this.$checkOut.val(_this.getDateTxt(_this.endDate));
				// _this.$setDateCheck.daterangepicker('option', 'datepickerOptions.maxDate', new Date(_this.range.start.setDate(_this.range.start.getDate() + 15)));
			}
		});
		this.$resetBtn.click(function(){
			_this.reset();
		})
	},
	reset : function(){
		this.$checkIn.val('');
		this.$checkOut.val('');
		this.$setDateCheck.daterangepicker("clearRange");
		this.$setDateCheck.daterangepicker('option', 'datepickerOptions.maxDate', "+180d");

	},
	getFormmatedDate : function(date){
		if(date instanceof Date){
			var yyyy = date.getFullYear();
			var dd = date.getDate();
			var mm = date.getMonth()+1; //January is 0!

			 if(dd<10) dd='0'+dd;
			 if(mm<10) mm='0'+mm;
			return yyyy+'-'+mm+'-'+dd;

			//if(dd<10) dd=dd;
			//if(mm<10) mm=mm;


			//return mm+'월 '+dd+'일';
		}else{
			return '';
		}
	},
	getDateTxt : function(formmatedDate){
		var rDate = formmatedDate.split('-');
		var rtnTxt = '';
		if(rDate[1] != undefined && rDate[2] != undefined)
			rtnTxt = parseInt(rDate[1])+'월'+ parseInt(rDate[2])+'일';
		return rtnTxt;
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
		_this = this;
		this.$bxMoreWrap.each(function(){
			this.hiddenH = $(this).find('.bx-txt-more').outerHeight(true);
			this.realH = $(this).find('.bx-txt-more p').outerHeight(true);
			if(this.realH>this.hiddenH){
				$(this).append('<button class="no-style btn-txt-more color-grey">더보기<span class="icon-cm icon-plus"></span></button>')
			}
		})
		this.body.on('click', '.btn-txt-more', function(){
			_this.$bxMoreWrap = $(this).closest('.bx-more-wrap');
			_this.btnMoreEvent(_this.$bxMoreWrap);
			$(this).html(_this.innerHtml);
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
function QantityCtrl($target){
	this.$quantityWrap = null;
	this.$btnPlus = null;
	this.$btnMinus = null;
	this.$cntInput = null;
	this.$cntfield = null;
	this.cnt = null;
	this.init($target);
	this.initEvent();

}

QantityCtrl.prototype.init = function($target){
	this.$quantityWrap = $target;
	this.$btnPlus = this.$quantityWrap.find('.btn-plus');
	this.$btnMinus = this.$quantityWrap.find('.btn-minus');
	this.$cntInput = this.$quantityWrap.find('.s_input_ea');
	this.$cntfield = this.$quantityWrap.find('.txt-cnt');
	this.cnt= parseInt(this.$cntInput.val());
}

QantityCtrl.prototype.initEvent = function(){
	var _this = this;
	this.$btnPlus.unbind('touchend');
	this.$btnPlus.bind('touchend',function(){
		_this.cnt = _this.cnt+1;
		_this.showTxt();
	});
	this.$btnMinus.unbind('touchend');
	this.$btnMinus.bind('touchend',function(){
		if(_this.cnt>1) {
			_this.cnt = _this.cnt-1;
			_this.showTxt();
		}
	});
}

QantityCtrl.prototype.showTxt = function(){
	this.$cntInput.val(this.cnt);
	this.$cntfield.text(this.cnt+'紐�');
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

$(window).resize(function(){
    setSlideSize.initEvent();
});

var setSlideSize={
    $window_h :null,
    $body : null,
    $header_h:null,
    $nav_h:null,
    $fnb_h:null,
    $slideInner:null,

    init:function(){
        this.$window_h = $(window).outerHeight();
        this.$header_h =$('#header').outerHeight();
        this.$nav_h = $('.nav').outerHeight();
        this.$fnb_h = $('.fnb').outerHeight();
        this.$slideInner = $('.swiper-inner');
    },
    initEvent:function(){
        this.$slideInner.css({
            height:this.$window_h-this.$header_h-this.$fnb_h-this.$nav_h+15
        });
    }
}
function Tab(tab,panel){
	this.$tab_wrap = null;
	this.$tab_list = null;
	this.$tab_item = null;
	this.$tab_btn = null;
	this.$tab_panel = null;
	this.href= null;
	this.init(tab,panel);
	this.initEvent();
}

Tab.prototype.init = function(tab,panel){
	this.$tab_wrap = $(tab);
	this.$tab_list = $('.'+tab+'-list');
	this.$tab_item = this.$tab_list.find('.'+tab+'-item');
	this.$tab_btn = this.$tab_item.find('.'+tab+'-btn');
	this.$tab_panel = $('.'+panel)
	this.str_item = tab+'-item';
	this.str_panel = panel;
}
Tab.prototype.initEvent = function(){
 	var _this = this;
	this.$tab_btn.click(function(e){
		e.preventDefault();
		_this.href= $(this).attr("href");
		_this.$tab_item.removeClass(_this.str_item+'--active');
		$(this).closest('.'+_this.str_item).addClass(_this.str_item+'--active');
		if(_this.str_panel){
			if(_this.$tab_panel.hasClass('fade')){
				_this.$tab_panel.removeClass('in');
				setTimeout(function() {
					_this.$tab_panel.removeClass(_this.str_panel+'--active');
				},200);
				setTimeout(function() {
					$(_this.href).addClass(_this.str_panel+'--active');
					setTimeout(function(){
						$(_this.href).addClass('in');
					},50)
				},200);
			}else{
				_this.$tab_panel.removeClass(_this.str_panel+'--active');
				$(_this.href).addClass(_this.str_panel+'--active');
			}
		}
	})
};


function ScrollNav($link){
	this.$ly = null;
	this.$link = null;
	this.href = null;
	this.pos = null;
	this.pos_y = null;
	this.init($link);
	this.initEvent();
}

ScrollNav.prototype.init = function($link){
	this.$ly = $('.ly');
	this.tab = $('.view__tab');
	this.$link = $link;
}
ScrollNav.prototype.initEvent = function(){
	var _this = this;
	this.$link.click(function(e){
		//e.preventDefault();
		_this.href = this.hash;
		_this.$pos = $(_this.href).position();
		_this.$pos_y = _this.$pos.top-30;
		$('.ly').animate({scrollTop:_this.$pos_y},500,function(){
			//window.location.hash = _this.href;
		});
	});
}

var lnbCtrl = {
	$dep1Item:null,
	$dep1Link:null,
	$dep2Item:null,
	$dep2Link:null,
	$activeDep1Item : null,
	$activeDep2Item : null,

	init:function(){
		this.$dep1Item = $('.gnb__item');
		this.$dep1Link = this.$dep1Item.find('.gnb__link');
		this.$dep2Item = $('.gnb__depth2-item');
		this.$dep2Link = this.$dep2Item.find('.gnb__depth2-link');
	},
	active:function(dep1,dep2){
		if(dep1!=null){
			this.$activeDep1Item = this.$dep1Item.eq(dep1);
			this.$activeDep1Item.addClass('gnb__item--active');
		};
		if(dep2!=null){
			this.$activeDep2Item = this.$activeDep1Item.find('.gnb__depth2-item').eq(dep2);
			this.$activeDep2Item.addClass('gnb__depth2-item--active');
		};
	},
	initEvent : function(){
		var _this = this;
		this.$dep1Link.click(function(e){
            e.preventDefault();
			if(_this.$activeDep1Item !=null ){
				_this.$activeDep1Item.removeClass('gnb__item--active');
			}
			_this.$activeDep1Item = $(this).closest('.gnb__item');
			_this.$activeDep1Item.addClass('gnb__item--active');
		});
		this.$dep2Link.click(function(e){
			e.preventDefault();
			if(_this.$activeDep2Item !=null){
				_this.$activeDep2Item.removeClass('gnb__depth2-item--active');
			}
			_this.$activeDep2Item = $(this).closest('.gnb__depth2-item');
			_this.$activeDep2Item.addClass('gnb__depth2-item--active');
		});
	}
}

$(function(){
	lnbCtrl.init();
	lnbCtrl.initEvent();
})

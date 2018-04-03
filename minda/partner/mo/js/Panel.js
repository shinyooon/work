function Panel($target){
	this.$panel =null;
	this.$body = null;
	this.$dimmed = null;
	this.$btnClse = null;
	this.init($target);
	this.initEvent();
}
Panel.prototype.init = function($target){
	this.$panel =$target;
	this.$dimmed = this.$panel.find('.backdrop');
	this.$body = $('body');
	this.$btnClse  = this.$panel.find('.panel__btn-clse');
}
Panel.prototype.initEvent = function(){
	var objThis = this;
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
}
Panel.prototype.openPanel = function($panel){
	var objThis = this;
	this.$panel.show();
	setTimeout(function(){
		objThis.$body.addClass('body--hidden');
	},50);
	if($panel.hasClass('slide-top')){
		setTimeout(function(){
			objThis.$body.addClass('p-t-open');
		},200);
	}else if ($panel.hasClass('panel--bottom')&&this.$body.hasClass('body--hidden')){
		setTimeout(function(){
			$panel.addClass('is-open');
		},60);
	}
	else if($panel.hasClass('panel--bottom')){
		setTimeout(function(){
			$panel.addClass('is-open');
		},60);
	}
	$panel.focus();

}
Panel.prototype.closePanel = function($panel){
	var objThis = this;
	if($panel.hasClass('slide-top')||$panel.hasClass('dimmed')){
		//this.$dimmed.fadeOut(100);
		this.$body.removeClass('p-t-open');
		setTimeout(function(){
			setTimeout(function(){
				objThis.$body.removeClass('p-open');
			},50);
			objThis.$panel.hide();
		},300);
	}else if($panel.hasClass('panel--bottom') && $('.ly-wrap').hasClass('open')){
		$panel.removeClass('is-open');
		setTimeout(function(){
			objThis.$panel.hide();
		},400);
	}else if($panel.hasClass('panel--bottom') && this.$body.hasClass('p-t-open')){
		$panel.removeClass('is-open');
	}else if($panel.hasClass('panel--bottom')){
		$panel.removeClass('is-open');
		this.$body.removeClass('p-open');
		setTimeout(function(){
			objThis.$panel.hide();
		},400);
	}

}


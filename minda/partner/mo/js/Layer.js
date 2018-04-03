//레이어 이벤트
//레이어가 한페이지에 여러개 있을수도 있으니 프로토타입으로 생성
function Layer($layer){
	this.$layer = $layer;
	this.init();
	this.initEvent();
};
Layer.prototype.init = function(){
	this.$body = $('body');
	this.$btnClse  = this.$layer.find('.ly__btn-clse');
	this.$lyWrap = this.$layer.find('.ly__wrap');
};
Layer.prototype.initEvent = function(){
	var _this = this;
	this.$btnClse.click(function(e){
		e.preventDefault();
		_this.close();
	});

	this.$layer.click(function(){
		_this.close();
	})
	this.$lyWrap.click(function(e){
		e.stopPropagation();
	});
};
Layer.prototype.open = function(){
	var _this = this;
	this.$body.addClass('body--hidden');
	this.$layer.addClass('is-open');
	setTimeout(function() {
		_this.$layer.addClass('in');
	},50)
};
Layer.prototype.close = function(){
	var _this = this;
	this.$layer.removeClass('in')
	setTimeout(function() {
		_this.$layer.removeClass('is-open');
		if($('.ly.is-open').length + $('.panel.is-open').length == 0){
			_this.$body.removeClass('body--hidden');
		}
	}, 200)
};

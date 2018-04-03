
//레이어가 한페이지에 여러개 있을수도 있으니 프로토타입으로 생성
function Layer($modal){
	this.$modal = $modal;
	this.$dialog = null;
	this.$body = null;
	this.$backdrop = null;
	this.$layer = null;
	this.$layer_wrap = null;
	this.init();
	this.initEvent();
};
Layer.prototype.init = function(){
	this.$body = $('body');
	this.$layer =$('.ly');
	this.$layer_wrap = this.$layer.find('.ly__wrap')
	this.$dialog = this.$modal.find('.modal-dialog');
	this.$btnClse  = this.$modal.find('.modal__btn-clse');
};
Layer.prototype.initEvent = function(){
	var _this = this;
	this.$btnClse.click(function(e){
		e.preventDefault();
		_this.close();
	});
	if(!this.$modal.hasClass('full')){
		this.$modal.click(function(){
			_this.close();
		})
		this.$dialog.click(function(e){
			e.stopPropagation();
		});
	}
};
Layer.prototype.open = function(){
	var _this = this;
	if(!this.$body.hasClass('body--hidden')){
		this.$body.addClass('body--hidden');
	}
	if(!this.$modal.hasClass('full')){
		if(!this.$layer.hasClass('ly--hidden')){
			this.$layer.addClass('ly--hidden');
			this.$body.append('<div class="modal-backdrop fade"></div>');
		}
		this.$backdrop = this.$body.find('.modal-backdrop');
		setTimeout(function() {
			_this.$backdrop.addClass('in');
		},100);
	}
	this.$modal.show();
	setTimeout(function() {
		_this.$modal.addClass('in');
	},100);
};
Layer.prototype.close = function(){
	var _this = this;
	this.$modal.removeClass('in');
	if(this.$backdrop){
		this.$backdrop.removeClass('in');
		setTimeout(function(){
			_this.$backdrop.remove();
		},100);
	}
	setTimeout(function() { _this.$modal.hide(); }, 300);
	if(this.$layer.hasClass('ly--hidden')){
		setTimeout(function(){
			_this.$layer.removeClass('ly--hidden');
		},100);
	}else{
		setTimeout(function(){
			_this.$body.removeClass('body--hidden');
		},100)
	}
};


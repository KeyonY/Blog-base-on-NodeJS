import $ from 'jquery';
import '../css/base.scss';
import '../css/index.scss';

$(function(){
	$(window).scroll(function(){
		if($(this).scrollTop() > 20){
			$('nav.navbar').addClass('opaque');
			$('.toTop').fadeIn();
		}else if($(this).scrollTop() == 0){
			$('nav.navbar').removeClass('opaque');
			$('.toTop').fadeOut();
		}
	})

	//定位 返回顶部的小工具的位置
	var clientW = document.body.clientWidth;
	$('.toTop').css('right',(clientW-1200)/2+30+'px');
	//返回顶部的小工具的功能
	$('.toTop').find('li').eq(0).click(function(){
		console.log(1111);
		$('html,body').animate({scrollTop: '0px'},400);
	})
})

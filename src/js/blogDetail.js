import '../css/blogDetail.scss';

$(function(){
	setTimeout(function(){
		$('.reminderBox').fadeOut(200);
	},3000)

	//点赞按钮的事件
	$('.icon-smallzan').click(function(){
		$.get('/custom/blog/good?id='+$('#blogID').val(),function(data){
			if(data.success){
				var zanNum = parseInt($('#smallzan').html());
				$('#smallzan').html(++zanNum);
				$('#reminderSuccess').css('top','-24px');
				$('#reminderSuccess').fadeIn(200);
				setTimeout(function(){
					$('#reminderSuccess').animate({top:'-30px'},200,function(){
						$(this).fadeOut(200);
					})
				},400)
			}
		})
	})
})
window.addEventListener("hashchange", switch_sign, false);

//$("#sign-form-1").validate();

//$("#sign-form-2").validate();

// Validation
$("#sign-form-1").submit(function(event) {
	
	var fullname = $("input[name='fullname']").val();
	if ( fullname.trim().length === 0) {

		event.preventDefault();

		var fullnameError = '<label id="fullnameError" class="error is-visible">请填写姓名</label>'
		$("input[name='fullname']").next().remove(".error");
		$("input[name='fullname']").after(fullnameError);
	}

	var account = $("input[name='account']", ".view-signup").val();
	if (account.trim().length === 0) {

		event.preventDefault();

		var accountError = '<label class="error is-visible">请填写邮箱或手机号</lable>';
		$("input[name='account']", ".view-signup").next().remove(".error");
		$("input[name='account']", ".view-signup").after(accountError);
	}

	
	//alert("called!");
	//console.log("Called!!");
});

$("input").focus(function(){
	//console.log('testddd');
  //$(this).next().remove(".error");
  $(this).next().text("tette");
});

//$("#sign-form-1").submit(function(event) {alert("alert called");});

function switch_sign () {
	//alert(window.location.hash);
	if (window.location.hash === '#signin') {
		$('a[href="\#signin"]').addClass('active');
		$('a[href="\#signup"]').removeClass('active');
		$('.navs-slider').attr('data-active-index','1');
		$('.view-signin').show();
		$('.view-signup').hide();
	} else if (window.location.hash === '#signup') {
		$('a[href="\#signin"]').removeClass('active');
		$('a[href="\#signup"]').addClass('active');
		$('.navs-slider').attr('data-active-index','0');
		$('.view-signup').show();
		$('.view-signin').hide();
	}
	

}
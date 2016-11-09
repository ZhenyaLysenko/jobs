$(function() {


	/* CAROUSEL FLAGS START*/
	if( $(".carousel-flags").find(".flags-item").length <= 14 ){

		$(".carousel-flags").owlCarousel({
			dots: false,
			navRewind: false,
			nav: false,
			loop: true,
			responsive:{
				320:{
					items: 3
				},
				500:{
					items:5
				},
				600:{
					items:8
				},
				1000:{
					items:14
				}
			}
		});

	}

	/* CAROUSEL FLAGS END*/

	/* TOGGLE MNU SEARCH FORM */
	$(".numb-select-work-title").on("click", function(){
		$(".numb-select-work-wrap").toggle(0);
	});

	$(".select-numb").on("click", function(){
		var $this = $(this),
				txt = $this.children().text();

		$this.addClass("selected").siblings().removeClass("selected");
		$(".numb-item").html(txt);
		$(".numb-select-work-wrap").hide(0);

	});

	/* TOGGLE MNU SEARCH FORM END */


	/* TABS */

	$(".tab-container").easytabs({
		updateHash: false
	});

	$(".tab-cont").equalHeight();

	/* TABS END*/ 


	/* MOBILE MENU */	
	var cloneMenu = $("#navtop").children("ul").clone();
	$("#mobile-nav").append(cloneMenu);

	$(".toggle-mnu").on("click", function() {
		$(this).toggleClass("on");
		$("#mobile-nav").stop(false, true).slideToggle(200);
	
		return false;
	});
	/* MOBILE MENU END */	


	/* SORT ITEM */	
	$(".sort").find("button").on("click", function(){

		$(this).addClass("selected")
						.siblings()
						.removeClass("selected");
	});
	/* SORT ITEM END*/	

	
	/* FORM */

	
	function checkTag(){
		var $input = $("#filter-form").find("input.tag"),
				$inputLength = $input.length;
		

		for(var i = 0; i < $inputLength; i++ ){
			if( $input.eq(i).val().length > 0 ){
				$input.eq(i)
							.siblings(".delete-tag")
							.show();
			}
		}
		return false;
	}

	function clearInput(){
		
		$(".delete-tag").on("click", function(){
			$(this).siblings("input").val("");
			$(this).hide();
		});

	}

	function searchJobs(ths){

		var $this = $(ths),
				$form = $this.closest("form"),
				$jobs = $form.find('input[name="jobs"]').val(),
				$city = $form.find('input[name="city"]').val(),
				$filterForm = $("#filter-form");
		
		$filterForm.children(".tag-form-wrap").find("#tag1").val($jobs);
		$filterForm.children(".tag-form-wrap").find("#tag2").val($city);

		checkTag();
		clearInput();
		
	}


	$(".tag").keypress(function(){
		$(this).siblings(".delete-tag").show();
		clearInput();
	});

	$(".subimit").on("click", function(){
		searchJobs(this);
		return false;
	});

	
	$(".toggleclick").on("click", function(){
		$(this).siblings(".input-wrap")
		.stop(false, true)
		.slideToggle(100);
	});



	/* slider */

	var maxCount = 300000,
			minCount = 0;

	$("#money-range").slider({
		range: true,
		min: minCount,
		max: maxCount,
		step: 1000,
		values: [ 5000, 30000 ],
		slide: function( event, ui ) {
			$("#money-from").val( ui.values[0] );
			$("#money-to").val( ui.values[1] );
		}
	});
	
	$("#money-from").val( $("#money-range").slider("values", 0) );
	$("#money-to").val( $("#money-range").slider("values", 1) );



	$("#money-from").change(function(){
		var $value1 = $(this).val(),
				$value2 = $("#money-to").val();

		if( parseInt($value1) > parseInt($value2) ){
			$value1 = $value2;
			$(this).val( parseInt( $value2 ) );
		}

		$("#money-range").slider("values", 0, $value1 );
	});


	$("#money-to").change(function(){
		var $value2 = $(this).val(),
				$value1 = $("#money-from").val();
	
		if( parseInt($value2) > maxCount){
			$value = maxCount;
			$(this).val(maxCount);
		}

		if( parseInt($value2) < parseInt($value1) ){
			$value2 = $value1;
			$(this).val( parseInt( $value1 ) );
		}
		
		$("#money-range").slider("values", 1, parseInt($value2) );
	});

	/* FILTER INPUT */
	$("#money-to, #money-from").keypress(function(event){
		var key, keyChar;
		if(!event) var event = window.event;
		
		if (event.keyCode){
			key = event.keyCode;
		}
		else if(event.which){
			key = event.which;
		}

		if(key==null || key==0 || key==8 || key==13 || key==9 || key==46 || key==37 || key==39 ) return true;
		keyChar=String.fromCharCode(key);
		
		if(!/\d/.test(keyChar))	return false;

	});

	/* MASK INPUT*/

	$(".mask-tel").mask("+7(999)999-99-99");
	$(".mask-date").mask("99ч99м9999г");

	/* FORM END*/

	/* TREADMILL */
	$(window).load(function(){
		$(".new-jobs-wrap").liMarquee({
			direction: "up",
			removeContentFadeDuration: "600"
		});
	});
	/* TREADMILL END*/

	var mfp = $.magnificPopup.instance;
	if (!mfp.isOpen) {
		$(".popup-open").magnificPopup({
			type: "inline",
			mainClass: 'mfp-fade',
			removalDelay: 300,
			tClose: "Закрыть",
			tLoading: "Подождите. Идёт загрузка"
		});
	};

	$(".delete-human").on("click", function(){
		$(this).closest(".contact-human").detach();
		return false;
	});

	$(".delete-vacancy").on("click", function(){
		$(this).closest(".vacancy").detach();
		return false;
	});

	$(window).scroll(function(){
		var scroll = $(window).scrollTop();

		if(scroll >= 50){
				$("#header").addClass("scrolled");
			
			}else{
				$("#header").removeClass("scrolled");
			}
		});

	// //E-mail Ajax Send
	// $("form").submit(function() {
	// 	var $this = $(this);
	// 	$.ajax({
	// 		type: "POST",
	// 		url: "/mail.php",
	// 		data: th.serialize()
	// 	}).done(function() {
	// 		alert("Thank");
	// 		setTimeout(function() {
	// 			// Done Functions
	// 			th.trigger("reset");
	// 		}, 1000);
	// 	});
	// 	return false;
	// });



});

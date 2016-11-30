oliva.Behavior.loginPopup = function() {
	var $lwa = $('.lwa');
	var $loginForm = $('.lwa-form', $lwa);
	if($loginForm) {
		$('#lwa_user_login', $loginForm)
			.attr('placeholder', $('#lwa_user_login', $loginForm).siblings('label').html())
			.addClass('login-in')
		;
		$('#lwa_user_email', $loginForm)
			.attr('placeholder', $('#lwa_user_email', $loginForm).siblings('label').html())
			.addClass('login-in')
		;
		$('#lwa_user_pass', $loginForm)
			.attr('placeholder', $('#lwa_user_pass', $loginForm).siblings('label').html())
			.addClass('pass-in')
		;

		$('.lwa-rememberme', $loginForm).remove();
	}

	//var $registerForm = $('.lwa-register', $lwa);
	//var $rememberForm = $('.lwa-remember', $lwa);

	$('.lwa-links-register-inline, .lwa-links-remember', $loginForm).click(function(){
		$('.lwa-form, .lwa-links', $lwa).hide(0);
	});

	$('.lwa-links-register-inline-cancel, .lwa-links-remember-cancel', $lwa).click(function(){
		$('.lwa-form, .lwa-links', $lwa).show(0);
	});

	$('input[type="text"]', $lwa).addClass('login-in');
	$('input[type="submit"]', $lwa).addClass('login-btn');


	//Register
	$('.lwa-links-register-inline').click(function(event){
		event.preventDefault();
		$(this).parents('.lwa').find('.lwa-register').addClass('showed');
	});
	$('.lwa-links-register-inline-cancel').click(function(event){
		event.preventDefault();
		$(this).parents('.lwa-register').removeClass('showed');
	});

	//Visual Effects for hidden items
	//Remember
	$(document).on('click', '.lwa-links-remember', function(event){
		event.preventDefault();
		$(this).parents('.lwa').find('.lwa-remember').addClass('showed');

	});
	$(document).on('click', '.lwa-links-remember-cancel', function(event){
		event.preventDefault();
		$(this).parents('.lwa-remember').removeClass('showed');
	});
};

oliva.Behavior.Quantity = function() {
	$('body').on('click', '.plus', function(){
		var $product = $(this).closest('.product');
		var quantity = parseInt($(this).siblings('.qty').val()) + 1;
		$(this).siblings('.qty').val(quantity);
		$('.add_to_cart_button', $product).data('quantity', quantity);
		$('.qty', $product).val(quantity);
	});
	$('body').on('click', '.minus', function(){
		var $this = $(this);
		var $product = $(this).closest('.product');
		var $qty = $this.siblings('.qty');
		var quantity = parseInt($qty.val()) - 1;
		if (quantity >= 1) {
			$qty.val(quantity);
			$('.add_to_cart_button', $product).data('quantity', quantity);
		}
	});
};

oliva.Behavior.ArhiveProduct = function() {
	// add_to_cart_button click emulation
	//$('.product').on('click', '.fw-add_to_cart_button', function(){
	//	var $this = $(this);
	//	var $product = $this.parents('.product');
	//	var quantity = $('.add_to_cart_button', $product).data('quantity');
	//	if (quantity > 0) {
	//		$product.find('.add_to_cart_button').click();
	//		setTimeout(function(){
	//			$('.carts .products-count').html($('.widget_shopping_cart_content .total .products-count').html());
	//			$('.carts .total').html($('.widget_shopping_cart_content .price .amount').html());
	//		}, 2500);
	//	}
	//});
};

oliva.Behavior.productFilters = function(){
	var $form = $('.woocommerce-ordering');
	$('input', $form).change(function(){
		$form.submit();

		return false;
	});
};

oliva.Behavior.initDatePicker = function(context) {
	var $datepicker = $(".datepicker", context);
	if($datepicker.length){
		$datepicker.datepicker({
			changeMonth:true,
			changeYear:true,
			dateFormat: "yy-mm-dd",
			yearRange: "1910:2012"
		});
	}
};

oliva.Behavior.updateMailchimpUserWithCardsList = function(context) {
	var $currentUserEmail = $('.js-current-user-email');
	if($currentUserEmail.length) {
		setTimeout(function(){
			$('.users_with_card').find('.yikes-easy-mc-email').val($currentUserEmail.data('email'));
			$('.users_with_card').submit();
		},300);

	}
}
oliva.Behavior.cardForm = function(context) {
	var $form = $('.add-card-form');
	$form.validate({
		ignore: [],
		errorPlacement: $.noop,
		errorClass: "red",
		rules: {
			barcode: {
				required: true,
				number: true
			},
			cardcode: {
				required: true,
				minlength: 3
			},
			username: {
				required: true,
				regex: "/^[A-Za-z0-9]+$/"
			},
			email: {
				required: true,
				email: true
			},
			password: {
				required: true,
				minlength: 6
			},
			password2: {
				required: true,
				equalTo: "#password"
			},
			fio: {
				required: true
			},
			birthday: {
				required: true,
				date: true,
				regex: "/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/"
			},
			phone: {
				required: true
			},
			city: {
				required: true
			},
			"from[]": {
				required: true
			},
			"purpose[]": {
				required: true
			},
			"interes[]": {
				required: true
			}
		},
		submitHandler: function(form) {
			form.submit();
		}
	});
};
oliva.Behavior.businessLunchForm = function(context) {
	var $container = $('.business-lunch-form');
	if($container.length) {
		var $requiredFields = $('.required-fields', $container);
		$form = $container.find('form');
		$form.on('change', function(){
			$requiredFields.addClass('hidden');
		});
		$form.validate({
			ignore: [],
			errorPlacement: $.noop,
			errorClass: "red",
			rules: {

			},
			submitHandler: function(form) {
				var $form  = $(form),
					$selectedOptions = $form.find('input[type="radio"]:checked');
				if($selectedOptions.length < 2){
					$requiredFields.removeClass('hidden');
					$('html, body').animate({
						scrollTop : $requiredFields.offset().top - 100
					}, 400);
					return;
				}
				form.submit();
			}
		});
	}
};
function getWindowWidth() {
	var windowWidth = 0;
	if (typeof(window.innerWidth) == 'number') {
		windowWidth = window.innerWidth;
	} else {
		if (document.documentElement && document.documentElement.clientWidth) {
			windowWidth = document.documentElement.clientWidth;
		} else {
			if (document.body && document.body.clientWidth) {
				windowWidth = document.body.clientWidth;
			}
		}
	}
	return windowWidth;
}
oliva.Behavior.setEqualHeightForNewsItems = function(){
	var $container = $('.news-section');
	if($container.length) {
		$('body').imagesLoaded().done(function(){

			var $latestNewsContainer = $('.js-latest-news'),
			$latestEventsContainer = $('.js-latest-events'),
			$latestEvents = $latestEventsContainer.find('.post-item'),
			$latestNews = $latestNewsContainer.find('.post-item'),

			maxItems = Math.max($latestEvents.length, $latestNews.length);

			for(var i = 0; i < maxItems; i++){
				var $news = $latestNews.eq(i),
					$event = $latestEvents.eq(i);
				if($news.length !== 0 && $event.length !== 0){
						var height = Math.max($news.outerHeight(), $event.outerHeight());
						$news.css({'height': height});
						$event.css({'height': height});
				}
			}

			$(window).on('resize', function (){
				for(var i = 0; i < maxItems; i++){
					var $news = $latestNews.eq(i),
						$event = $latestEvents.eq(i);
					$news.css({'height' : 'inherit'});
					$event.css({'height' : 'inherit'});
					if($news.length !== 0 && $event.length !== 0){
						var height = Math.max($news.outerHeight(), $event.outerHeight());
						$news.css({'height': height});
						$event.css({'height': height});
					}
				}
			});
		});

	}
}
oliva.Behavior.setEqualHeightBlocks = function(context) {
	var $items = $('.js-equal-height-by-row');
	var $products = $('.js-equal-height-by-row-container').find('.type-product').find('.cart-container');
	$('body').imagesLoaded().done(function(){
		$products.matchHeight({
			'byRow': false
		});

		$('.products').find('.type-product').find('.cart-container').matchHeight({
			'byRow': false,
			'property' : 'height'
		});
		$items.matchHeight({
			'byRow': true
		});
	});
}

oliva.Behavior.showSearchBlockMobile = function(){
	var $languageContainer = $('.language'),
		$searchContainer = $('.search-block'),
		$searchBtn = $('.icon-search', $searchContainer);
	$searchBtn.on('click', function(e){
		e.preventDefault();
		if($searchContainer.hasClass('active')) {
			$searchContainer.find('form').submit();
		}
		$searchContainer.toggleClass('active');
		if(getWindowWidth() < 860 && $searchContainer.hasClass('active')) {
			$languageContainer.toggle(0);
		}

	});
}



oliva.Behavior.openRegisterModal = function (context) {
	var $btn = $('.js-open-registry-modal', context);
	if($btn.length) {
		$btn.on('click', function(e){
			e.preventDefault();
			var $modalContent = $('.modal-dialog').find('.lwa-divs-only');
			if($modalContent.length){
				$('.lwa-form', $modalContent).hide();
				$('.lwa-remember', $modalContent).hide();
				$('.lwa-register', $modalContent).show().addClass('showed');
				$('.login').find('a[data-toggle="modal"]').trigger('click');
			}
		})
	}
}
oliva.Behavior.toggleBlocks = function (context) {
	$('body').on('click', function (e) {
		var $target = $(e.target),
			isCartOpened =  $('.cart-popup').is(':visible'),
			isMenuOpened = $('.show-menu-active').length !== 0;

		if((isCartOpened || isMenuOpened) && $target.closest('.wrapper').length !== 0) {
			e.preventDefault();
		}
		//is menu or cart opened

		//hide cart
		if(!(
			($target.hasClass('carts') || $target.closest('.carts').length !== 0 ) ||
			($target.hasClass('cart-popup') || $target.closest('.cart-popup').length !== 0 )
			)){
			$('.cart-popup').hide();
		}

		//hide menu
		if(!(
			($target.hasClass('open-submenu') || $target.closest('.open-submenu').length !== 0) ||
			($target.hasClass('show-menu') || $target.closest('.show-menu').length !== 0) ||
			($target.hasClass('sub-menu') || $target.closest('.sub-menu').length !== 0)
			)
		)
		{
			var $subMenu = $('.sub-menu');
			$('.open-submenu').removeClass('current-menu-item');
			$subMenu.removeClass('show-sub-menu');
			if(getWindowWidth() > 992) {
				$subMenu.hide();
			}
			$('body').removeClass('menu-opened');
			$('.show-menu').removeClass('show-menu-active');
		}
		if(!($target.hasClass('.search-block.active') || $target.closest('.search-block.active').length !== 0)) {
			var $searchBlock = $('.search-block'),
				$searchInput = $searchBlock.find('.search-input');
			$searchBlock.removeClass('active');

			if($searchInput.is(':visible')) {
				if(getWindowWidth() <= 768) {
					$searchInput.hide();
				}else {
					$searchInput.animate({width: 'hide'});
				}
				$('.language').show();
			}
		}

	});
}
oliva.Behavior.addKidsPageClass = function(context) {
	var $container  = $('.page-kids, .kids-gallery');
	if($container.length) {
		$container.closest('#content').addClass('js-page-kids');
	}
}
oliva.Behavior.moveCheckoutIntroBlock = function(context) {
	var $container  = $('.js-checkout-intro');
	if($container.length) {
		$container.insertAfter('.main .content');
	}
}
oliva.Behavior.showMorePopularProducts = function(context) {
	var $container  = $('.js-section-popular');
	if($container.length) {
		var $products = $container.find('.product.type-product');
		$hiddenProducts = $products.filter(function(index) {
			return $(this).index() > 4;
		});
		if($hiddenProducts.length == 0){
			$('.js-show-more-products').closest('.more').addClass('hidden');
		}
		$hiddenProducts.addClass('hidden');
		$('.js-show-more-products').on('click', function(e){
			e.preventDefault();
			$(this).closest('.more').addClass('hidden');
			$hiddenProducts.removeClass('hidden');
			$.fn.matchHeight._update()
		});
	}
}
oliva.Behavior.disableFixedBodyTouchMove = function(context) {
	$('body').on('touchmove', function(e){
		var $this = $(this);
		if($this.hasClass('menu-opened')) {
			e.stopPropagation();
			e.stopImmediatePropagation();
		}
	});
}
document.ontouchmove = function(e) {
	console.log(1);
	e.stopPropagation();
};
oliva.Behavior.toggleMobileMenu = function(context) {
	var $btn = $('.open-drop');
	$btn.on('click', function(e){
		e.preventDefault();
		$('.left-submenu').toggle();
	});
}
oliva.Behavior.updateCart = function(context) {
	var $container = $('.woocommerce-cart-container');
	if($container.length) {
		$('body').on('click', '.minus, .plus', function(){
			var $this = $(this);
				refreshCart();
		});
		$('body').on('click', '.js-remove-cart-product', function(e){
			e.preventDefault();
			var $this = $(this),
				link = $this.attr('href');
			//remove item
			$.post(link).done(function(){
				refreshCart();
			});
		});
	}
}
oliva.Behavior.addToCartViaAjax = function(){
	var $btn = $('.fw-add_to_cart_button');
	$btn.on('click', function(e){
		e.preventDefault();
		var $this = $(this),
			$form = $this.closest('form'),
			link = $('[rel="canonical"]').attr('href'),
			ser = $form.serialize();
		if($('.search.search-results').length !== 0){
			link = link.replace('/search', '');
		}
		$.post(link, ser).done(function (data) {
			updateMiniCart(data);
			$.notify("Cart updated", 'success');
		});
	});

	//remove cart item

	$('body').on('click', '.remove-from-cart-button', function(e){
		e.preventDefault();
		$.post($(this).attr('href')).done(function(data){
			updateMiniCart(data);
		});
	})
}
function updateMiniCart(data) {
	var $html = $(data),
		$header =  $html.find('.header');
	if($header.length) {
		$('.carts').html($html.find('.carts').html());
		$('.widget_shopping_cart_content').html($html.find('.widget_shopping_cart_content').html())
	}else {
		window.location.reload();
	}
}

oliva.Behavior.updateBusinessLunchForm = function(context) {
	var $container = $('.business-lunch-form');
	if($container.length){
		var $form = $container.find('form');
		//deselect all inputs
		$form.find('.product-addon').not(':first-child').find('input[type="radio"]').removeAttr('checked');
		$form.attr('method', 'post');
	}
}
oliva.Behavior.subscribeToMailchimp = function(context) {
	var $registerForm = $('.registerform');
	$registerForm.find('.lwa-submit-button').find('input[type="submit"]').on('click', function(){
		var email = $registerForm.find('#user_email').val();
		$('.users_without_cards').find('.yikes-easy-mc-email ').val(email).closest('form').submit();
	});

}
oliva.Behavior.switchDeliveryDependedFields = function(context) {
	var $shippingMethod = $('.shipping_method');
	if($shippingMethod.length) {
		function toggleFields(){
			var $shippingMethod = $('.shipping_method'),
				shippingType = $shippingMethod.filter(':checked').val(),
				$addressField = $('#billing_address_1'),
				$addressFieldContainer = $addressField.closest('.form-row'),
				$restaurantField = $('.js_billing_restaurant');
			switch (shippingType){
				case 'flat_rate':
				case 'free_shipping':
					$restaurantField.hide();
					$addressFieldContainer.show();
					$addressField.attr('required', 'required');
					break;

				case 'local_pickup':
					$restaurantField.show();
					$addressFieldContainer.hide();
					$addressField.removeAttr('required');
					break;
			}

		}
		toggleFields();
		$shippingMethod.on('change', function(){
			toggleFields();
		});
	}
}


function refreshCart() {
	var link = $('[rel="canonical"]').attr('href');
	var $form = $('.woocommerce-cart-container').find('#cartForm');
	var ser = $form.serialize();
	ser += '&update_cart=update_cart';
	$.post($form.attr('action'), ser).done(function (data) {
		if($('.woocommerce-cart-container', data).length) {
			$('.woocommerce-cart-container').html($('.woocommerce-cart-container', data).html());
		}else {
			window.location.reload();
		}
	});
}
var ajaxurl = LWA.ajaxurl;
oliva.Behavior.sendCorporativeClientRequest = function(context) {
	var $container = $('.cc_form');
	if($container.length) {
		$container.validate({
			ignore: [],
			errorPlacement: $.noop,
			errorClass: "red",
			submitHandler: function(form) {
				var $form  = $(form),
					$submitBtn = $form.find('.pink-button');
				$submitBtn.attr('disabled', 'disabled');
				$.ajax({
					url: ajaxurl,
					type: 'POST',
					dataType: 'json',
					data: {
						'action' : 'sendCorporativeClientRequest',
						'formData': $form.serialize()
					},
					success: function (data) {
						if (data.error || !data.success) {
							$.notify(data.msg, 'error');
						} else {
							$.notify(data.msg, 'success');
							$form[0].reset();
						}
						$submitBtn.removeAttr('disabled');
					}
				});
			}
		});
	}
};

oliva.Behavior.sendFoodBoxRequest = function(context) {
	var $container = $('#food-box-contact-form');
	if($container.length) {
		$container.validate({
			ignore: [],
			errorPlacement: $.noop,
			errorClass: "red",
			submitHandler: function(form) {
				var $form  = $(form),
					$submitBtn = $form.find('.pink-button');
				$submitBtn.attr('disabled', 'disabled');
				$.ajax({
					url: ajaxurl,
					type: 'POST',
					dataType: 'json',
					data: {
						'action' : 'sendFoodBoxRequest',
						'formData': $form.serialize()
					},
					success: function (data) {
						if (data.error || !data.success) {
							$.notify(data.msg, 'error');
						} else {
							$.notify(data.msg, 'success');
							var $selects = $('select', $form);
							$selects.val('').trigger("liszt:updated");
							$form[0].reset();
						}
						$submitBtn.removeAttr('disabled');
					}
				});
			}
		});
	}
};



jQuery(document).ready(function ($) {
	$.validator.addMethod(
		"regex",
		function(value, element, regstring) {
			// fast exit on empty optional
			if (this.optional(element)) {
				return true;
			}

			var regParts = regstring.match(/^\/(.*?)\/([gim]*)$/);
			if (regParts) {
				// the parsed pattern had delimiters and modifiers. handle them.
				var regexp = new RegExp(regParts[1], regParts[2]);
			} else {
				// we got pattern string without delimiters
				var regexp = new RegExp(regstring);
			}

			return regexp.test(value);
		},
		"Please check your input."
	);

	$(".fancybox").fancybox({
		openEffect : 'none',
		closeEffect: 'none'
	});
});
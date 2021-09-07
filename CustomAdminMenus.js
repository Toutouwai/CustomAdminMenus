(function($) {

	$(document).ready(function() {

		// Make menu links with hrefs that start with an asterisk open in a new tab
		$('.pw-primary-nav, .cam-menu-list').find('a[href^="*"]').each(function() {
			$(this).attr('href', $(this).attr('href').substring(1)).attr('target', '_blank');
		});

		// Highlight menu when viewing list of links
		if($('body').hasClass('ProcessHome')) {
			var menu_number = $('.cam-menu-list').data('menu');
			var $menu_link = $('.pw-primary-nav > li > a[href$="?menu=' + menu_number + '"]');
			if($menu_link.length) $menu_link.parent('li').addClass('uk-active');
		}

	});

}(jQuery));

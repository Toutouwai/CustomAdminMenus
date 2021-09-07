(function($) {

	function setJson() {
		$('.cam-menu').each(function() {
			var $json_field = $(this).find('.cam-menu-json');
			var $rows = $(this).find('.cam-child-rows .cam-child-row');
			var data = [];
			$rows.each(function() {
				var icon = $(this).find('.cam-link-icon').val().trim();
				var label = $(this).find('.cam-link-label').val().trim();
				var url = $(this).find('.cam-link-url').val().trim();
				var newtab = $(this).find('.cam-link-newtab').is(':checked');
				if(!label || !url) return;
				data.push({'icon': icon, 'label': label, 'url': url, 'newtab': newtab});
			});
			$json_field.val(JSON.stringify(data));
		});
	}

	$(document).ready(function() {

		// Init sortable
		$('.cam-child-rows').sortable({
			axis: 'y'
		});

		// Row delete icon clicked
		$(document).on('click', '.cam-row-delete', function() {
			var $rows = $(this).closest('.cam-child-rows');
			$(this).closest('.cam-child-row').remove();
			if(!$rows.children().length) {
				$rows.siblings('.cam-row-heads').removeClass('has-rows');
			}
		});

		// Row add button clicked
		$('.cam-add-row').click(function() {
			$(this).siblings('.cam-row-heads').addClass('has-rows');
			var $row_template = $(this).siblings('.cam-row-template').children();
			$(this).siblings('.cam-child-rows').append($row_template.clone());
		});

		// Config form submitted
		$('#ModuleEditForm').submit(setJson);
		// AdminOnSteroids save shortcut key
		$('#Inputfield_submit_save_module').click(setJson);

	});

}(jQuery));

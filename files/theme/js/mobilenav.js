$(document).ready(function() {
	$(".btn--burger").click(function() {
		if ($(this).hasClass('is--closed')) {
			$(this).addClass('is--open');
			$(this).removeClass('is--closed');
			$(".mobile--nav").addClass('is--open');
		} else {
			if ($(this).hasClass('level_4--open')) {
				$(this).removeClass('level_4--open');
				$(".mobile--nav").removeClass('level_4--open');
				$(".level_4.is--open").each(function() {
					$(this).removeClass('is--open');
				});
			} else if ($(this).hasClass('level_3--open')) {
				$(this).removeClass('level_3--open');
				$(".mobile--nav").removeClass('level_3--open');
				$(".level_3.is--open").each(function() {
					$(this).removeClass('is--open');
				});
			} else if ($(this).hasClass('level_2--open')) {
				$(this).removeClass('level_2--open');
				$(".mobile--nav").removeClass('level_2--open');
				$(".level_2.is--open").each(function() {
					$(this).removeClass('is--open');
				});
			} else {
				$(this).removeClass('is--open');
				$(this).addClass('is--closed');
				$(".mobile--nav").removeClass('is--open');
			}
		}
		return false;
	});
	$(".level_1>.submenu>.submenu").click(function() {
		$(".btn--burger").addClass('level_2--open');
		$(".mobile--nav").addClass('level_2--open');
		$(this).siblings('.level_2').addClass("is--open");
		return false;
	});
	$(".level_2>.submenu>.submenu").click(function() {
		$(".btn--burger").addClass('level_3--open');
		$(".mobile--nav").addClass('level_3--open');
		$(this).siblings('.level_3').addClass("is--open");
		return false;
	});
	$(".level_3>.submenu>.submenu").click(function() {
		$(".btn--burger").addClass('level_4--open');
		$(".mobile--nav").addClass('level_4--open');
		$(this).siblings('.level_4').addClass("is--open");
		return false;
	});
});
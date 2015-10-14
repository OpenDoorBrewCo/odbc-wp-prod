(function($){
	$(document).ready(function(){


		var get_template_value = function() {
			var element = $("select[name='jkreativ_portfolio_setting[portfolio_layout]']");
			return $(element).val();
		};

		var show_hide_default = function() {
			$("#postdivrich").show();
			$(".composer-switch").hide();
            $("#wpb_visual_composer").hide();
			$("#normal-sortables > div").each(function(){
				$(this).attr('style', '');
			});			
		};

		var show_hide_portfolio_template = function() {
			var template = get_template_value();
			show_hide_default();

			if(template === 'ajax') {				
				$("#jkreativ_portfolio_media_gallery").show();
				$("#jkreativ_portfolio_meta_metabox").show();
				$("#jkreativ_portfolio_ajax_metabox").show();
			} else if(template === 'cover') {
				$("#jkreativ_portfolio_media_gallery").show();
				$("#jkreativ_portfolio_cover_metabox").show();
				$("#jkreativ_portfolio_cover_meta_metabox").show();
			} else if(template === 'sidecontent') {
				$("#jkreativ_portfolio_media_gallery").show();
				$("#jkreativ_portfolio_meta_metabox").show();
				$("#jkreativ_portfolio_sidecontent_metabox").show();
			} else if(template === 'landingpage') {
				$("#postdivrich").hide();
				$("#jkreativ_portfolio_landing_metabox").show();
				$("#jkreativ_legacy_page_builder_metabox").show();
			} else if(template === 'landingpagevc') {
                $("#postdivrich").show();
                $(".composer-switch").show();
                $("#wpb_visual_composer").show();
                $("#jkreativ_portfolio_landing_vc_metabox").show();

                if($(".composer-switch").hasClass('vc-backend-status')) {
                    $("#postdivrich").hide();
                    $("#wpb_visual_composer").show();
                } else {
                    $("#postdivrich").show();
                    $("#wpb_visual_composer").hide();
                }
            } else if(template === 'anotherpage') {
				$("#postdivrich").hide();
				$("#jkreativ_portfolio_link_metabox").show();
			}
		};


        setTimeout(function(){ show_hide_portfolio_template(); }, 500);
		$("select[name='jkreativ_portfolio_setting[portfolio_layout]']").bind('change', show_hide_portfolio_template);
		show_hide_portfolio_template();
	});
})(jQuery);

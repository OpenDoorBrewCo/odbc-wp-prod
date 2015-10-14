function GetAgeCheckedState() {
    var SetOfDrinkingAge = jQuery.cookie("OfDrinkingAge");
	
    if (SetOfDrinkingAge != "yes") {
        DisplayIdCheck();
    }
}


function DisplayIdCheck() {
    var src = "./age-check";
	var height = 0;
	var width = 0;
	if(jQuery(window).height()<=750){
		height = jQuery(window).height();
	}else{
		var height = jQuery(window).height()/2;
	}
	if(jQuery(window).width()<=750){
		width  = jQuery(window).width();
	}else{
		var width = jQuery(window).width()/2;
	}
		
	
    jQuery.modal('<iframe src="' + src + '" height="' + height + '" width="' + width + '" style="border:2px">', {
        closeHTML: "",
        opacity: 100,
        overlayCss: {},

        containerCss: {
            backgroundColor: "#EBEBEB",
            borderColor: "green",
            height: height + 10,
            width: width + 10,
			overflow: "hidden"
        },
        closeHTML:"#idYes",
        

        onOpen: function (dialog) {
            dialog.overlay.fadeIn('medium', function () {
                dialog.data.hide();
                dialog.container.fadeIn('medium', function () {
                    dialog.data.slideDown('medium');
                });
            });
        },

        onClose: function (dialog) {
            dialog.data.fadeOut('medium', function () {
                dialog.container.hide('medium', function () {
                    dialog.overlay.slideUp('medium', function () {
                        jQuery.modal.close();
                        var SetOfDrinkingAge = jQuery.cookie("OfDrinkingAge");
                        if (SetOfDrinkingAge != "yes")
                        {
                            //Redirect to wholesome fun if not over 21
                            window.location.replace("https://www.google.com/#q=wholesome+family+fun");
                        }
                    });
                });
            });
        }
    });
}

jQuery(document).ready(function () {
    GetAgeCheckedState();
});
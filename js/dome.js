$(function(){
	 $.belowthefold = function(element, settings) {
		var fold = $(window).height() + $(window).scrollTop();
		return fold <= $(element).offset().top - settings.threshold;
	};
	$.abovethetop = function(element, settings) {
		var top = $(window).scrollTop();
		return top >= $(element).offset().top + $(element).height() - settings.threshold;
	};
	$.rightofscreen = function(element, settings) {
		var fold = $(window).width() + $(window).scrollLeft();
		return fold <= $(element).offset().left - settings.threshold;
	};
	$.leftofscreen = function(element, settings) {
		var left = $(window).scrollLeft();
		return left >= $(element).offset().left + $(element).width() - settings.threshold;
	};
	$.inviewport = function(element, settings) {
		return !$.rightofscreen(element, settings) && !$.leftofscreen(element, settings) && !$.belowthefold(element, settings) && !$.abovethetop(element, settings);
	};

	$.extend($.expr[':'], {
		"below-the-fold": function(a, i, m) {
			return $.belowthefold(a, {threshold : 0});
		},
		"above-the-top": function(a, i, m) {
			return $.abovethetop(a, {threshold : 0});
		},
		"left-of-screen": function(a, i, m) {
			return $.leftofscreen(a, {threshold : 0});
		},
		"right-of-screen": function(a, i, m) {
			return $.rightofscreen(a, {threshold : 0});
		},
		"in-viewport": function(a, i, m) {
			return $.inviewport(a, {threshold : -10});
		}
	});
	function MyBestView() {
		var j = -1;
		//$(".animate-element:not(.start-animation):in-viewport").each(function () {
		$(".animate-element:not(.start-animation):in-viewport").each(function () {
			var $this = $(this);
			if (!$this.hasClass("start-animation") && !$this.hasClass("animation-triggered")) {
				$this.addClass("animation-triggered");
				j++;
				if($this.hasClass("Myanimate")){
					Myanimate()		;
					$this.addClass("start-animation");
					/*if($this.hasClass("skills")){
						$this.animateSkills();
					};*/
				}else{
					setTimeout(function () {
					$this.addClass("start-animation");

					/*if($this.hasClass("skills")){
						$this.animateSkills();
					};*/
				}, 200 * j);
				};
				
			};
		});

	};
	var BrowserDetect = {
      init: function () {
         this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
         this.version = this.searchVersion(navigator.userAgent)
         || this.searchVersion(navigator.appVersion)
         || "an unknown version";
      },
      searchString: function (data) {
         for (var i=0;i<data.length;i++) {
            var dataString = data[i].string;
            var dataProp = data[i].prop;
            this.versionSearchString = data[i].versionSearch || data[i].identity;
            if (dataString) {
               if (dataString.indexOf(data[i].subString) != -1)
                  return data[i].identity;
            }
            else if (dataProp)
               return data[i].identity;
         }
      },
      searchVersion: function (dataString) {
         var index = dataString.indexOf(this.versionSearchString);
         if (index == -1) return;
         return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
      },
      dataBrowser: [
         {
            string: navigator.userAgent,
            subString: "Chrome",
            identity: "Chrome"
         },
         {
            string: navigator.vendor,
            subString: "Apple",
            identity: "Safari",
            versionSearch: "Version"
         },
         {
            prop: window.opera,
            identity: "Opera",
            versionSearch: "Version"
         },
         { 
            string: navigator.userAgent,
            subString: "Firefox",
            identity: "Firefox"
         },
         {
            string: navigator.userAgent,
            subString: "MSIE",
            identity: "Explorer",
            versionSearch: "MSIE"
         },
         {
            string: navigator.userAgent,
            subString: "Gecko",
            identity: "Mozilla",
            versionSearch: "rv"
         },
         { // for older Netscapes (4-)
            string: navigator.userAgent,
            subString: "Mozilla",
            identity: "Netscape",
            versionSearch: "Mozilla"
         }
      ],
   };
   BrowserDetect.init();
   if(BrowserDetect.version <= 8 && BrowserDetect.browser == "Explorer"){
    	$(".animate-element").css("opacity",1);
		$(".muanimate").css("opacity",1);
		$(".muanimate div").css("opacity",1);
		$(".clouds").css("opacity",0)
	}else{
		$(window).bind("scroll", function () {
			MyBestView();
		});
		MyBestView();
	}
	
	
	
	function Myanimate(){
		
		j=0;
		$(".muanimate").each(function(){
			var $this = $(this);
			j++;
			setTimeout(function(){
				if($this.hasClass('hous')){
					i=0;
					setTimeout(function(){
						$this.find('div').each(function(){
						i++;
						var that=$(this);
						setTimeout(function(){
							that.addClass('ismyanimate')
						},i*300);
						});
						
					},300);
				}else{
					$this.addClass('ismyanimate');
				}
				
			},j*600);
			
		});
		
		
	};
	
});

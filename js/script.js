SiteModel = {
    options: {'slideHomeT1': 800, 'slideHomeT2': 5000, 'featureHomeUp': 800, 'featureHomeDown': 500, 'quotesHomeT1': 500, 'faqTime': 200, 'action': false},
    init: function() {
        switch(_page) {
            case 'about':
                SiteModel.initAbout();
            break;
            case 'catalog-index':
                SiteModel.initCatalogSlider();
                break;
            case 'catalog':
                SiteModel.initCatalogPreview();
            break;
            case 'clients':
                SiteModel.initClients();
            break;
            case 'cms':
                SiteModel.initCms();
            break;           
            case 'contact':
                SiteModel.initContact();
            break;
            case 'home':
                SiteModel.initHomeSlider();
                SiteModel.initHomeFeatures();
                SiteModel.initHomeReview();
                SiteModel.initContact();
            break;
            case 'hosting':
                SiteModel.initFaq();
            break;   
            case 'faq':
                SiteModel.initFaq();
            break;
            case 'manual':
                SiteModel.initManual();
            break;
            case 'logo':
                SiteModel.initLogo();
            break;         
            case 'mini-sites':
                SiteModel.initFaq();
                SiteModel.initHomeFeatures();
                SiteModel.initMiniSites();
                //SiteModel.initCatalogPreview();
            break;
            case 'order':
                SiteModel.initOrder();
                break;
            case 'client-order':
                SiteModel.initClientOrder();
                break;
			case 'webinar':
				SiteModel.webinar();
				break;
        }
    },
	webinar: function() {
		$('.b-order').find('input[type=text], input[type=email]').bind('focus', function() {
            if ($(this).val() == $(this).attr('tooltip') || $(this).val() == $(this).attr('error') || $(this).val() == "Неправильный email") {
                $(this).val('');
            }
        }).bind('blur', function() {
            if ($(this).val() == '') {
                $(this).val($(this).attr('tooltip'));
            }
        });
		$('.btn-apply').click(function() { 
			var els = ['name', 'lname', 'email'];
			var errors = ["Введите имя", "Введите фамилию", "Введите Email"]		
			var emailrule = new RegExp('^[a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+[\.][a-zA-Z0-9._-]+$');
			var flag = true;

			for (i = 0; i < 3; i++) {
				$('#'+els[i]).removeClass('error');
			}			
			
			for (i = 0; i < 3; i++) {
				var a = $('#'+els[i]);
				if ($(a).val() == $(a).attr('tooltip') || $(a).val() == $(a).attr('error') || $(a).val() == '') {
					flag = false;
					$(a).val(errors[i]);
					$(a).addClass("error");
				}
				else if(els[i] == 'email' && ! emailrule.test(a.val())) {
					flag = false;
					$(a).val("Неправильный email");
					$(a).addClass("error");
				}
			}
			if (flag == true) {
				$('#form').submit();
			}
		});
	},
    initAbout: function() {
        $('.b-about-item:even').addClass('even');
        $('.b-about-item:odd').addClass('odd');    
    },
    initHomeSlider: function() {
        // Image slider
        var ibox = $(".main_gallery .gallery_img");
        var pbox = $(".main_gallery .gallery_points");
        SiteModel._hoverHomeSlider(ibox);
        SiteModel._hoverHomeSlider(pbox);
        
        for (i = ibox.find("img").length; i > 0; i--){
            $("<span/>").appendTo(pbox);
        }        
        var span = $(".main_gallery .gallery_points span");
        span.bind('click.home', function() {
            if ($(this).is('.active') == false) {
                var index = $(this).index(".main_gallery .gallery_points span");
                span.removeClass("active");
                $(this).addClass("active");
                ibox.find(" a.active").animate({opacity: "0"}, SiteModel.options.slideHomeT1, function(){$(this).hide();}).removeClass("active");
                ibox.find(" a:eq("+index+")").addClass("active").show('normal', function(){$(this).animate({opacity: "1"}, SiteModel.options.slideHomeT1);});
            }
            return false;
        });
        
        ibox.find(" a:eq(0)").addClass("active").animate({opacity: "1"},300);
        pbox.find(" span:eq(0)").addClass("active");
        $(".main_gallery").everyTime(SiteModel.options.slideHomeT2,'main-slider',function() {
            SiteModel._switchHomeSlider(span);
        });
        
        $('.create-site .example-container img').css({'visibility':'hidden'});
        $('<img/>').attr('src', function () {
            var imgUrl = $('.create-site .example-container').css('background-image');
            imgUrl = imgUrl.substring(4,  imgUrl.length-1);
            imgUrl = imgUrl.replace('www.', '');
            if (imgUrl.indexOf('"') != -1 || imgUrl.indexOf('"') != -1) {
                imgUrl = imgUrl.substring(1, imgUrl.length-1);
            }
            return imgUrl;
        }).load(function () {
            $('.create-site .example-container img').css({'visibility':'visible'});
            $('.create-site .example-container img:first').css({'opacity': 0})
            $('.create-site .example-container img[data-src]').each(function () {
                $(this).attr('src', $(this).attr('data-src'));
            });
        });
    },
    initHomeFeatures: function() {
        // Features
        $(".n-button").click(function(){
            var column = $(".three_columns .one_column");
            var subblocks = $(".subblocks .subblock");
            var index = column.find(" .n-button").index(this);
            var active = subblocks.index($(".subblocks .subblock.active"));
            var open = (active == -1) ? false : true;
            
            if (open == false) {
                subblocks.eq(index).addClass("active").slideDown(SiteModel.options.featureHomeDown);
                column.eq(index).addClass("active");
                column.not($(column.eq(index))).addClass("not_this2");
            }
            else {
                if (index == active) {
                    subblocks.eq(index).removeClass("active").slideUp(SiteModel.options.featureHomeUp, function() {
                        column.removeClass("active not_this2");
                    });
                }
                else {
                    column.removeClass("active").addClass('not_this2');
                    column.eq(index).addClass("active").removeClass('not_this2');
                    //$(".subblocks .subblock").eq(active).removeClass("active").slideUp(SiteModel.options.featureHomeUp);
                    //$(".subblocks .subblock").eq(index).addClass("active").slideDown(SiteModel.options.featureHomeDown);
                    subblocks.eq(active).removeClass("active").fadeTo(SiteModel.options.featureHomeUp, 0, function() {
                        subblocks.eq(index).addClass("active").fadeTo(SiteModel.options.featureHomeDown, 1);
                        $(this).hide();
                    });
                }
            }
        });
        $(".three_columns .one_column").hover(function(){
            $(".three_columns .one_column").not($(this)).addClass("not_this");
        },function(){
            $(".three_columns .one_column").removeClass("not_this");  
        });
        // Diagram
        $(".info .one_block:eq(0)").addClass("active");
        $(".diagram_content").hover(function(){
            $(".diagram_content .step").hover(function(){
                $(".diagram").removeClass("diagram0 diagram1 diagram2 diagram3 diagram4 diagram5 diagram6");
                $(".diagram_content .step").removeClass("active");
                $(".info .one_block").removeClass("active");
                var index = $(".diagram_content .step").index(this);
                $(this).addClass("active");
                $(".diagram").addClass("diagram"+index+"");
                $(".info .one_block:eq("+index+")").addClass("active");
            }, function(){
                $('.diagram_content .step').removeClass('active');
                $('.diagram').removeClass('diagram0 diagram1 diagram2 diagram3 diagram4 diagram5 diagram6');
            });
        });
    },
    initHomeReview: function() {
        var length = $(".slider_reviews .container .one_block").length;
        $(".slider_reviews .container").width((length+1) * 810).data('curr',0).data('size',length-1);
        $(".navi_right").click(function(){
            SiteModel._switchHomeReview(1);
            return false;
        })
        $(".navi_left").click(function(){
            SiteModel._switchHomeReview(-1);
            return false;
        });    
    },
    initCatalogSlider: function() {
        // Image slider
        $('.catalog .slider').each(function(){
            
            var ibox = $(this).find(".block_big_img");
            var pbox = $(this).find(".gallery_points");
            var dbox = $(this).find(".block_right_description");
            var links = $(this).find('.watch_site').data('links');
            ibox.find(".list").each(function(){
                pbox.append("<span/>");
            });
            var span = pbox.find("span");
            span.bind('click.catalog', function() {
                if (!$(this).is('.active')) {
                    var index = $(this).index();
                    var link = 'http://demo.' + links[index].replace('_', '-') + '.gophotoweb.com'
                    span.removeClass("active");
                    $(this).addClass("active");
                    dbox.find('.watch_site').attr('href', link);
                    ibox.find(" .list.active").animate({opacity: "0"}, SiteModel.options.slideHomeT1, function(){$(this).hide();}).removeClass("active");
                    ibox.find(" .list:eq("+index+")").addClass("active").show('normal', function(){$(this).animate({opacity: "1"}, SiteModel.options.slideHomeT1);});
                }
                return false;
            });
            
            ibox.find(".list:gt(0)").hide();
            ibox.find(".list:eq(0)").addClass("active").css({opacity: "1"});
            pbox.find("span:eq(0)").addClass("active");
            var link = 'http://demo.' + links[0].replace('_', '-') + '.gophotoweb.com'
            $(this).find('.watch_site').attr('href', link);
        });
        
        
    },
    initCatalogPreviewSlider: function() {
        // Image slider
            
        var ibox = $(".catalog-list-desc .slider .block_big_img");
        var pbox = $(".catalog-list-desc .slider .gallery_points");
        var dbox = $(".catalog-list-desc .slider .block_right_description");
        var links = $('.catalog-list-desc .slider .watch_site').data('links');
        ibox.find(".list").each(function(){
            pbox.append("<span/>");
        });
        var span = pbox.find("span");
        span.bind('click.catalog', function() {
            if (!$(this).is('.active')) {
                var index = $(this).index();
                var link = 'http://demo.' + links[index].replace('_', '-') + '.gophotoweb.com'
                span.removeClass("active");
                $(this).addClass("active");
                dbox.find('.watch_site').attr('href', link);
                ibox.find(" .list.active").animate({opacity: "0"}, SiteModel.options.slideHomeT1, function(){$(this).hide();}).removeClass("active");
                ibox.find(" .list:eq("+index+")").addClass("active").show('normal', function(){$(this).animate({opacity: "1"}, SiteModel.options.slideHomeT1);});
            }
            return false;
        });
        
        ibox.find(".list:gt(0)").hide();
        ibox.find(".list:eq(0)").addClass("active").css({opacity: "1"});
        pbox.find("span:eq(0)").addClass("active");
        var link = 'http://demo.' + links[0].replace('_', '-') + '.gophotoweb.com'
        $('.catalog-list-desc .slider .watch_site').attr('href', link);
        
        
    },
    initCatalogPreview: function() {
        $('.catalog-list-preview a').click(function() {
            var id = parseInt($(this).attr('id').replace('a',''));
            var row = Math.floor(id / 4);
            var vrow = $('.catalog-list-desc').index($('.catalog-list-desc.open'));
            var flag = true;
            if (vrow == -1) {
                // Open    
                $('.catalog-list-desc').eq(row).html($('#d'+id).html()).addClass('open').slideDown(400);
                $('.catalog-list-preview').eq(row).addClass('border_dashed_b');
                SiteModel.initCatalogPreviewSlider();
            }
            else {
                if ($(this).is('.active') == true) {
                    // Close
                    $('.catalog-list-desc').eq(vrow).removeClass('open').slideUp(400, function() {$(this).html('');});
                    $('.catalog-list-preview').eq(vrow).removeClass('border_dashed_b');
                    flag = false;
                }
                else {
                    if (row == vrow) {
                        $('.catalog-list-desc').eq(row).html($('#d'+id).html());
                        // Change
                    }
                    else {
                        // Close and open
                        $('.catalog-list-desc').eq(vrow).removeClass('open').slideUp(400, function() {$(this).html('');});
                        $('.catalog-list-preview').eq(vrow).removeClass('border_dashed_b');
                        $('.catalog-list-desc').eq(row).html($('#d'+id).html()).addClass('open').slideDown(400);
                        $('.catalog-list-preview').eq(row).addClass('border_dashed_b');
                    }
                    SiteModel.initCatalogPreviewSlider();
                }
            }
            
            $('.catalog-list-preview a.active').removeClass('active');
            if (flag == true) {
                $(this).addClass('active');
            }
            else {
                $(this).removeClass('active');
            }
            return false;
        });
    
    },
    initContact: function() {
        var el = $('#contact-form');
        el.find('input[type=text]').bind('focus', function() {
            if ($(this).val() == $(this).attr('help')) $(this).val('');
        }).bind('blur', function() {
            if ($(this).val() == '') $(this).val($(this).attr('help'));
        });
        el.find('textarea').bind('focus', function() {
            if ($(this).val() == $(this).attr('help')) $(this).val('');
        }).bind('blur', function() {
            if ($(this).val() == '') $(this).val($(this).attr('help'));
        });        
        
        $('#contact-form').bind("submit", function() {
            var flag = true;
            var error = new Array(new Array(), new Array());
            var enter = 'введите';
            $('.contact-error').hide();
            $('.contact-message').hide();
            el.find('input[type=text]').removeClass('error');
            el.find('select').parent().removeClass('error');
            el.find('textarea').removeClass('error');
            // Name
            var name = $(this).find('input[name=name]');
            if ($(name).val() == $(name).attr('help') || $(name).val() == '') {
                flag = false;
                error[0].push(enter + ' ' + $(name).attr('title'));
                if (enter != '') enter = '';
                $(name).addClass('error');
            } 
            // Email
            var email = $(this).find('input[name=email]');
            var emailrule = new RegExp('^[ a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+[\.][ a-zA-Z0-9._-]+$');
            if ($(email).val() == $(email).attr('help') || $(email).val() == '') {
                flag = false;
                error[0].push(enter + ' ' + $(email).attr('title'));
                if (enter != '') enter = '';
                $(email).addClass('error');
            }
            else if (! emailrule.test($(email).val())) {
                flag = false;
                error[1].push('неправильный email. ');
                $(email).addClass('error');
            } 
            // Category
            var category = $(this).find('select[name=category]');
            if ($(category).val() == '0') {
                flag = false;
                error[0].push(enter + ' ' + $(category).attr('title'));
                if (enter != '') enter = '';
                $(category).parent().addClass('error');
            }
            // Text
            var text = $(this).find('textarea');
            if ($(text).val() == $(text).attr('help') || $(text).val() == '') {
                flag = false;
                error[0].push(enter + ' сообщение');
                if (enter != '') enter = '';
                $(text).addClass('error');
            }            
            if (flag == false) {
                error[0] = error[0].join(', ');
                error[1] = error[1].join(' ');
                if (error[0].length != 0) {
                    error = error[1].charAt(0).toUpperCase() + error[1].slice(1) + error[0].charAt(0).toUpperCase() + error[0].slice(1)+'.';
                }
                else {
                    error = error[1].charAt(0).toUpperCase() + error[1].slice(1);
                }
                $('#error').html(error).show();
            }
            var question = $(this).find('select[name=question]');
            if (flag == true) {
                $.ajax({
                    url: '/send-mail/',
                    type: 'POST',
                    dataType: 'json',
                    data: {
                        name: $(name).val(),
                        email: $(email).val(),
                        question: $(question).val(),
                        category: $(category).val(),
                        message: $(text).val(),
                        _ajax: true
                    },
                    headers: {'HTTP_X_REQUESTED_WITH': 'xmlhttprequest'},
                    beforeSend: function() {
                        $('#error').hide();
                        $('#message-2').show();
                        el.find('input[type=submit]').attr('disabled', true);
                        el.find('input[type=submit]').hide();
                        $('#preloader').show();
                    },
                    success: function(json) {
                        if (json != undefined && json.success == true) {
                            $('#message-2').hide();
                            $('#message-1').show();
                            
                            el.find('input, textarea, select').each(function(){
                                var tag = $(this).get(0).tagName.toLowerCase();
                                switch(tag) {
                                case 'select':
                                    $(this).find('option:selected').removeAttr('selected');
                                    $(this).find('option:first').attr('selected', 'selected');
                                    break;
                                case 'textarea':
                                    $(this).val( $(this).attr('help') );
                                    break;
                                default:
                                    var type = $(this).attr('type').toLowerCase();
                                    if (type=='text')
                                        $(this).val( $(this).attr('help') );
                                }
                            });
                        }
                        else {
                            $('#error').text('Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте отправить сообщение через 5 минут.').show();
                            $('#message-2').hide();
                        }
                        el.find('input[type=submit]').removeAttr('disabled');
                        el.find('input[type=submit]').show();
                        $('#preloader').hide();
                    },
                    error: function() {
                        $('#error').text('Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте отправить сообщение через 5 минут.').show();
                        $('#message-2').hide();
                        el.find('input[type=submit]').removeAttr('disabled');
                        el.find('input[type=submit]').show();
                        $('#preloader').hide();
                        el.reset();
                    }
                });
            }            
            return false;
        });
    },
    initClients: function() {
        $("#clientsSlider").awShowcase({content_width:978,content_height:530,fit_to_parent:false,auto:false,interval:5000,continuous:true,loading:true,tooltip_width:200,tooltip_icon_width:32,tooltip_icon_height:32,tooltip_offsetx:18,tooltip_offsety:0,arrows:true,buttons:false,btn_numbers:true,keybord_keys:true,mousetrace:false,pauseonover:false,stoponclick:true,transition:'hslide',transition_delay:0,transition_speed:500,show_caption:'onload',thumbnails:false,thumbnails_position:'outside-last',thumbnails_direction:'vertical',thumbnails_slidex:1,dynamic_height:false,speed_change:true,viewline:false,custom_function:null});
        //Clients Tabs Years
        $('.nav-clients-year li').click(function(){ 
            $('.nav-clients-year li').removeClass('active');
            $(this).addClass('active'); 
            $('.b-clients-year').hide();
            $($(this).children().attr('href')).show();
            return false;
        });	
        //Clients Tabs Month
        $('.nav-client-month li').click(function(){ 
            $(this).parent().find('.active').removeClass('active');
            $(this).addClass('active'); 
            $(this).parent().parent().find('.b-clients-month').hide();
            $($(this).children().attr('href')).show();
        return false;
        });	
    },
    initFaq: function() {
        $('.b-faq-item').attr('open', 'open');
        $('.lnk-faq').click(function(event){
            //event.preventDefault();
            if ($(this).parent().parent().children('.b-faq-answer').is(':visible') == true) {
                $(this).parent().parent().children('.b-faq-answer').slideUp(SiteModel.options.faqTime);
            }
            else {
                $('.b-faq-answer:visible').slideUp(SiteModel.options.faqTime);
                $(this).parent().parent().children('.b-faq-answer').slideDown(SiteModel.options.faqTime);
            }
            return false;
        });
        $('.lnk-faq-all').toggle(function(){
            $('.b-faq-answer').slideDown(SiteModel.options.faqTime);
            $(this).html('скрыть все ответы');
            return false;
        },
        function(){
            $('.b-faq-answer').slideUp(SiteModel.options.faqTime);
            $(this).html('открыть все ответы');
            return false;
        });
    },   
    initCms: function() {
        $('.b-cms-item a').click(function(){
            $('.b-cms-video').hide();							  
            $(this).parent().parent().next().slideDown();
            return false;
        });
        $('.b-cms-video .btn-expand').click(function(){
            $(this).parent().slideUp();
            return false;
        });    
    },
    initLogo: function() {
        var size = $('.b-logo-thumbs img').size();
        $('.b-logo-container-slider').width(size * 660).data('size', size-1);
        $('.b-logo-thumbs a').click(function() {
            if (SiteModel.options.action == false) {
                SiteModel.options.action = true;
                SiteModel._switchLogoSlider($('.b-logo-thumbs a').index(this));
            }
            return false;
        });
        $('.btn-prev').click(function() {
            if (SiteModel.options.action == false) {
                SiteModel.options.action = true;
                var index = $('.b-logo-thumbs a.active').index('.b-logo-thumbs a');
                index -= 1;
                index = (index < 0) ? ($('.b-logo-container-slider').data('size')) : index;
                SiteModel._switchLogoSlider(index);
            }
            return false;
        });
        $('.btn-next').click(function() {
            if (SiteModel.options.action == false) {
                SiteModel.options.action = true;        
                var index = $('.b-logo-thumbs a.active').index('.b-logo-thumbs a');
                index += 1;
                index = (index <= $('.b-logo-container-slider').data('size')) ? index : 0;
                SiteModel._switchLogoSlider(index);
            }
            return false;
        });              
    },
    initMiniSites: function() {
        $('.btn-apply').click(function(){ 
            window.location = '/order.html';
        });
    },
    initOrder: function() {
        var sitePrice = parseInt($('.b-order-name > h3').html());
        var discount = 1;
        $('.btn-apply').click(function(){SiteModel._orderValidate('order')});

        SiteModel._tooltipInit();
		
        $('.f-user-data').find('input[type=text], input[type=email]').bind('focus', function() {
            if ($(this).val() == $(this).attr('tooltip') || $(this).val() == $(this).attr('error') || $(this).val() == "Неправильный email") {
                $(this).val('');
            }
        }).bind('blur', function() {
            if ($(this).val() == '') {
                $(this).val($(this).attr('tooltip'));
            }
        });
        $('.b-order-options input[type=text]').bind('focus', function() {
            if ($(this).val() == $(this).attr('tooltip')) {
                $(this).val('');
            }
        }).bind('blur', function() {
            if ($(this).val() == '') {
                $(this).val($(this).attr('tooltip'));
            }
        });
        SiteModel._priceRefresh(1);
        $('input[name=discount]').click(function(){
            if ($(this).is(':checked')) {
                discount = 0.7;
            }
            else {
                discount = 1;
            }
            SiteModel._priceRefresh(discount);
        });
        $('.discount-label #get_discount').on('click', function () {
            SiteModel._checkPromoCode();
        });
        $('input[type=radio], input[type=checkbox]').bind('click', function(){
            $(this).parent().find('input[type=text]').focus();
            if ($(this).parents('.b-order-domain').size() != 0 && $(this).parent().find('input[type=text]').size() == 0) {
                $('.b-order-domain input[type=text]').each(function() {
                    $(this).val($(this).attr('tooltip'));
                });
            }
            if ($(this).attr('name') != 'discount' && !$(this).parent().is('#agreement'))
                SiteModel._priceRefresh(discount);
        });
        $('.b-order-other #url').bind('click', function () {
            $(this).parent().parent().children('input').click();
        });
        $('input[name=minisites]').bind('click', function() {
            // Hosting in diff place
            if ($(this).prop('checked') === true) {
                if ($('input[name=hosting]:checked').val() == 11) {
                    $('input[name=hosting]').eq(0).prop('checked', true);
                }
                $('input[name=hosting]').eq(3).prop('disabled', true);
                SiteModel._priceRefresh(discount);
            }
            else {
                 $('input[name=hosting]').eq(3).prop('disabled', false);
                SiteModel._priceRefresh(discount);
            }
        });
    },
	initClientOrder: function() {
        var discount = 1;
        SiteModel._tooltipInit();
        if ($('.line > label > input').length == 2)
            $('.b-order-name:last > h3').html((parseInt($('.line > label > input')
                .parent().parent().children('.price').html())) + '<sup>$</sup>');
        else
            $('.b-order-name:last > h3').html((parseInt($('.line > label > input:checked')
                .parent().parent().children('.price').html())) + '<sup>$</sup>');

        $('.btn-apply').click(function(){SiteModel._orderValidate('client')});

        $('input[name=discount]').click(function(){
            if ($(this).is(':checked')) {
                discount = 0.7;
            } else {
                discount = 1;
            }
            $('.b-order-name:last > h3').html(parseInt(parseInt($('.line > label > input:checked')
                .parent().parent().children('.price').html()) * discount) + '<sup>$</sup>');
        });
        $('input[type=radio]').bind('click', function(){
            $('.b-order-name:last > h3').html(parseInt(parseInt($('.line > label > input:checked')
                .parent().parent().children('.price').html()) * discount) + '<sup>$</sup>');

        });
    },
    initManual: function () {
        var headerHeight = $('header.main-header').outerHeight()-25;
        $( 'a[href^=#top_]' ).click( function () {
            var hash = SiteModel._cleanHash($( this ).attr( 'href' ).match( /#.+$/ )[0]);
            var link = document.getElementsByName(hash).item(0);
            SiteModel._scrollToElement(link, headerHeight);
            window.location.hash = '!'+hash;
            return false;
        });
        hash = SiteModel._cleanHash(document.location.hash);
        if (hash != '') {
            var link = document.getElementsByName(hash).item(0);
            if (window.addEventListener) { 
                window.addEventListener('load', function () {
                    SiteModel._scrollToElement(link, headerHeight);
                }, false);
            } else if (window.attachEvent) {
                window.attachEvent("onload", function() {
                    SiteModel._scrollToElement(link, headerHeight);
                });
            }
        }
    },
    _cleanHash: function (hash) {
        hash = hash.replace('#!', '');
        hash = hash.replace('#', '');
        var index = hash.substr((hash.length-1), 1);
        if (index == '/') {
            hash = hash.substr((hash.length-1), 1);
        }
        return hash;
    },
    _priceRefresh: function(discount) {
        var sitePrice = parseInt($('.b-order-name > h3').html());
        var domainPrice = 0;
        var otherPrice = 0;
        var hostingPrice = 0;
        var logoPrice = 0;
        $('.b-order-other > .line > label > input:checked').parent().parent().children('.price').each(function(){
            otherPrice += parseInt($(this).html());

        });
        if ($('.b-order-options.b-order-domain input').is(':checked')) {
            domainPrice += parseInt($('.b-order-options.b-order-domain input:checked').parent().parent().children('.price').html());
        }
        if ($('.b-order-options.b-order-hosting input').is(':checked')) {
            hostingPrice = parseInt($('.b-order-options.b-order-hosting input:checked').parent().parent().children('.price').html());
        }
        if ($('.b-order-options.b-order-logo input').is(':checked')) {
            otherPrice += parseInt($('.b-order-options.b-order-logo input:checked').parent().parent().children('.price').html());
        }
        $('.b-order-name:last > h3').html((parseInt(sitePrice * discount+ domainPrice + otherPrice + hostingPrice + logoPrice)) + '<sup>$</sup>');
        if ($('#host-error').is('.active')) {
            if ($('.b-order-options.b-order-hosting input:checked').attr('value') != 22) {
                $('#host-error').hide();
            } else {
                $('#host-error').show();
            }
        }
    },
    _orderValidate: function(mode) {
        var flag = true;
		var els = ['name', 'lastname', 'email', 'phone'];
		var errors = ["Введите имя", "Введите фамилию", "Введите Email", "Введите телефон"];
		var focus = null;
		for (i = 0; i < 4; i++) {
			$('#'+els[i]).removeClass('error');
		}
		for (i = 0; i < 4; i++) {
			var a = $('#'+els[i]);
			var emailrule = new RegExp('^[ a-zA-Z0-9._-]+@[a-zA-Z0-9_-]+[\.][ a-zA-Z0-9._-]+$');
				
			if ($(a).val() == $(a).attr('tooltip') || $(a).val() == $(a).attr('error') || $(a).val() == '') {
				if (focus == null) focus = a;
				flag = false;
				$(a).val(errors[i]);
				$(a).addClass("error");
			}
			else if(els[i] == 'email' && ! emailrule.test(a.val())) {
				if (focus == null) focus = a;
				flag = false;
				$(a).val("Неправильный email");
				$(a).addClass("error");
			}
		}
		var country = $('#country');
		if ($('#country option:selected').val() == 0) {
			flag = false;
			$(country).addClass("error");
		}
		else {
			$(country).removeClass('error');
		}

        $('#error, #host-error, #domain-error').hide();
        if ($('#agreement > input').is(':checked') == false && $('.b-order-options.b-order-hosting input').is(':checked') == false && mode != 'client') {
            if (focus != null) focus.focus();
            $('#error').html('Для заказа вам необходимо принять условия предоставления услуг и лицензионного соглашения').show();
            $('#host-error').html('Пожалуйста, выберите опцию хостинга').show();
            return false;
        }
        else if($('#agreement > input').is(':checked') == false) {
            if (focus != null) focus.focus();
            $('#error').html('Для заказа вам необходимо принять условия предоставления услуг и лицензионного соглашения').show();
            $('#host-error').hide();
            return false;
        } 
        else if($('.b-order-options.b-order-hosting input').is(':checked') == false && mode != 'client') {
            $('#host-error').html('Пожалуйста, выберите опцию хостинга').show();
            $('#error').hide();
            return false;
        }
        else {
            $('#error, #host-error').hide();
        }
        if (flag == true) {
            SiteModel._orderSuccess(mode);
        }
    },
    _tooltipInit: function() {
        $('.lnk-order-tooltip').click(function(){
            $('.b-order-tooltip').hide();
            $(this).parent().find('.b-order-tooltip').show();
            return false;
        }).hover(function(){
                $(this).parent().children('a').css('text-decoration','underline');
            },function(){
                $(this).parent().children('a').css('text-decoration','none');
            });
        $('.b-tooltip-close').click(function(){
            $(this).parent().parent('.b-order-tooltip').hide();
            return false;
        });
        $('.b-order-tooltip-i a').click(function(){
            var href = $(this).attr('href');
            if ($(this).attr('target') == '_blank')
                window.open(href, '_blank');
            else
                window.location = href;
        });
    },
    _orderSuccess: function(mode) {
		var name = $("#name").val();
		var email = $("#email").val();
		var lname = $("#lastname").val();
		var phone = $("#phone").val();
		var city = $("#city").val();
	    var source = $('#source option:selected').val();
		var country = $('#country option:selected').val();
        var url = ($("#url").val() == $("#url").attr('tooltip')) ? '' : $("#url").val();
        var url1 = ($("#url1").val() == $("#url1").attr('tooltip')) ? '' : $("#url1").val();
        var mess = $("#comment").val();
        var communication = ($('#communication').size() == 0) ? '' : $('#communication option:selected').val();
        var discount = $('input[name=discount]').is(':checked') ? 'y' : 'n';

        if (mode == 'order') {
			var phone = $('#phone').val();
            var domain = $('input[name=domain]:checked').val();
            var hosting = $('input[name=hosting]:checked').val();
            var logo = $('input[name=logo]:checked').val();
            var minisite = $('input[name=minisites]:checked').val();
            var namesite = $('.b-order-name > h2').html();
			var mailagree = $('#mailagree input[type=checkbox]:checked').val();
			var totalamount = parseInt($('.b-order-name:last > h3').html());
            
            var promocode = $('.discount-label').is('.discount_apply') 
                                ? $('.discount-label').attr('data-code') 
                                : null;

            var other = [];
            $('input[name=other]:checked').each(function(){
                other.push($(this).val());
            });
            other.push(hosting);
            other.push(minisite);
            $('.btn-apply').hide();
			$('#preloader').css('display', 'inline-block');
			
			$.ajax({
                    url: '/send_site.html',
                    type: 'POST',
                    dataType: 'html',
                    data: {
						name: name, lname: lname, city: city, email: email, source:source, 
						country: country, phone: phone,
						mess:mess, communication:communication,
						namesite:namesite, other:other, url:url, url1:url1,
						discount:discount, mailagree:mailagree, totalamount:totalamount,
                        promocode: promocode
					},
                    success: function(response) {
						if (response != "fail") {
							window.location = "/order_success.html";
						} else if (response == "fail") {
                                                    $('.btn-apply').show();
                                                    $('#preloader').hide();
                                                    var msg = 'Вы не являетесь клиентом хостинга от Gophotoweb. Пожалуйста, выберите другую опцию по услугам хостинга.';
                                                    $('#host-error').html(msg).css({'color': 'red', 'position':'relative', 'left': '0px', 'margin-bottom':'5px'}).attr('class', 'active').show();
                                                    SiteModel._scrollToElement(document.getElementById('host-error'), 80);
                        }
						else {
						    $('.btn-apply').show();
				            $('#preloader').hide();
							var msg = 'Ошибка при отправке заявки. Пожалуйста, заполните поля заявки еще раз и нажмите кнопку отправить.';
							$('#error').html(msg).css('visibility', 'visible').css('color', 'red');
						}
                    },
                    error: function() {
                        $('.btn-apply').show();
                        $('#preloader').hide();
							var msg = 'Ошибка при отправке заявки. Пожалуйста, заполните поля заявки еще раз и нажмите кнопку отправить.';
							$('#error').html(msg).css('visibility', 'visible').css('color', 'red');
                    }
                });			
            $('#error').hide();
        } else {
            var haveSite = $('#have-site option:selected').val() == 'yes' ? 'y' : 'n';

            if ($('.line > label > input').length == 2) {
                var typeId = $('.line > label > input:first').val();
                var typeName = $('.line > label > input:first').parent().children('span').html();
            } else {
                var typeId = $('.line > label > input:checked').val();
                var typeName = $('.line > label > input:checked').parent().children('span').html();
            }
            $.post("../send_site_client.html",
                {name:name, lname:lname, mess:mess, email:email, phone:phone, communication:communication,
                    from:source, country:country, url:url, typeId:typeId, typeName:typeName,
                    haveSite:haveSite}, function(response){
                    if (response === "ok") {
                        window.location = "../order-success-client.html";
                    }
                    else {
                        var msg = 'Ошибка при отправке заявки. Пожалуйста, заполните поля заявки еще раз и нажмите кнопку отправить.';
                        $('#msgbox').html(msg).css('visibility', 'visible').css('color', 'red');
                    }
                });
            $('#error').hide();

        }
    },
    _switchHomeSlider: function() {
        var index = $(".main_gallery .gallery_points span.active").index();
        index ++;
        index = (index < $(".main_gallery .gallery_img img").size()) ? index : 0;
        $(".main_gallery .gallery_points span").eq(index).trigger('click');
    },
    _hoverHomeSlider: function(box) {
        box.hover(function(){
            $(".main_gallery").stopTime('main-slider');
        }, function(){
            $(".main_gallery").everyTime(SiteModel.options.slideHomeT2,'main-slider',function() {
                SiteModel._switchHomeSlider();
            });
        });   
    },
    _switchHomeReview: function(n) {
        var index = $(".slider_reviews .container").data('curr');
        var size = $(".slider_reviews .container").data('size');
        index += n;
        if (n > 0) {
            index = (index > size) ? 0 : index;
        }
        else {
            index = (index < 0) ? size : index;
        }
        $(".slider_reviews .container").data('curr', index);
        $(".container_wrapper .container").animate({'marginLeft':'-'+index*812+"px"}, SiteModel.options.quotesHomeT1);
    },
    _switchLogoSlider: function(n) {
        $('.b-logo-thumbs a.active').removeClass('active');
        $('.b-logo-thumbs a').eq(n).addClass('active');
        $('.b-logo-container-slider').animate({'left': '-'+(n)*660+'px'}, function() {SiteModel.options.action = false;});
        return true;
    },
    _switchCatalogSlider: function() {
        var index = $(".catalog .slider .gallery_points span.active").index();
        index ++;
        index = (index < $(".catalog .slider .block_big_img img").size()) ? index : 0;
        $(".catalog .slider .gallery_points span").eq(index).trigger('click');
    },
    _scrollToElement: function (elementDOM, headerHight) {
        var selectedPosX = 0;
        var selectedPosY = 0;
        
        while (elementDOM != null) {
            selectedPosX += elementDOM.offsetLeft;
            selectedPosY += elementDOM.offsetTop;
            elementDOM = elementDOM.offsetParent;
        }
        selectedPosY -= headerHight;
        $('body,html').animate({scrollTop:selectedPosY}, 1000, "swing");
    },
    _checkPromoCode: function () {
        var that = $('.discount-label');
        var message_block = that.find('#message_discount');
        var input_code = that.find('input[id=promocode]');
        
        var validate = false;
        
        that.find('#discount error').hide();
        
        var promocode = input_code.val();
        if (promocode == '' || promocode == input_code.attr('tooltip')) {
            message_block.html(input_code.attr('error'));
            message_block.show();
        } else {
            validate = true;
        } 

        if (validate) {
            message_block.hide();
            input_code.removeClass('error');
            $.post('checkPromocode', {promocode: promocode},
                function (response) {
                    res = JSON.parse(response);
                    
                    if (!res.error) {
                        var sitePrice = parseInt($('.b-order-name > h3').html());
                        res.discount = res.discount == 0 ? 1 : 1 - res.discount/100;
                        
                        that.attr('data-code', input_code.val());
                        that.addClass('discount_apply').html('Ваш промо-код применен. Сумма заказа пересчитана.');
                        
                        SiteModel._priceRefresh(res.discount);
                        $('.b-order-name > h3').html(sitePrice*res.discount+'<sup>$</sup>');
                        SiteModel._priceRefresh(1);
                    } else {
                        message_block.html(res.message);
                        message_block.show();
                    }
                }
           )
        }
    }
}
jQuery(document).ready(function($) {
	//Main navigation
	$(".nav-main li").has('nav').addClass('has-nav');  
    $(".nav-main li").has('nav').find('> a').click(function() {
        var p = $(this).parent();
        if (p.is('.open')) {
            p.removeClass('open');
            $(this).removeClass('active');
        }
        else {
            p.addClass('open');
            $(this).addClass('active');
        }
        return false;
    });
    $(document).bind('click', 'click.menu', function() {
        $(".nav-main li.open").removeClass('open');
    });    
    SiteModel.init();
});

jQuery(document).ready(function($){
var slideshows = $('.cycle-slideshow').on('cycle-next cycle-prev', function(e, opts) {
    // advance the other slideshow
    slideshows.not(this).cycle('goto', opts.currSlide);
});

$('#cycle-2 .cycle-slide').click(function(){
    var index = $('#cycle-2').data('cycle.API').getSlideIndex(this);
    slideshows.cycle('goto', index);
});

});
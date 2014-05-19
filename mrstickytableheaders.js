(function ($) {
    $.fn.mrstickytableheaders = function (options) {
        var opts = $.extend(true, {}, $.fn.mrstickytableheaders.defaults, options);

        if (opts.thclass == "mrsth")
        {
            $('<style />').html(".mrsth { background: rgba(222, 222, 222, 0.9); }").appendTo("body");
        }

        $("th").each(function (index, element) {
            $(element).css({ width: $(element).width() });
        });
        
        $('table').each(function (i, obj) {
            var tableid = $(obj).attr('id');

            $(window).scroll(function () {

                if (IsPartiallyInScreen(obj)) {
                    var thead = $('thead', obj);

                    if (!IsHeadOnScreen(thead)) {
                        if ($('#div-' + tableid).length <= 0) {

                            var divcontainer = $('<div />', { id: 'div-' + tableid }).css({ position: 'fixed', top: '0px', zIndex: 1000 });
                            var clone_table = $('<table />', {});
                            var clone_thead = $('<thead />', { 'class': opts.thclass });
                            var clone_tr = $('<tr />', {});

                            $("th", thead).each(function (index, element) {
                                var clone_th = $('<th />').html($(element).text()).css({ width: $(element).css("width") });                                
                                if (/chrom(e|ium)/.test(navigator.userAgent.toLowerCase())) {
                                    clone_th.css({ width: Number($(element).css("width").replace("px", "")) + 1 })
                                }
                                clone_th.appendTo(clone_tr);
                            });

                            clone_tr.appendTo(clone_thead);
                            clone_thead.appendTo(clone_table);
                            clone_table.appendTo(divcontainer);
                            divcontainer.insertAfter(obj);
                        }
                    } else {
                        RemoveDiv(tableid);                        
                    }
                } else {
                    RemoveDiv(tableid);
                }
            });
        });
        return this;
    };

    $.fn.mrstickytableheaders.defaults = {
        thclass: "mrsth"
    };
    
    function RemoveDiv(tableid)
    {
        if ($('#div-' + tableid)) {
            $('#div-' + tableid).remove();
        }
    }

    function IsHeadOnScreen(elem) {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();

        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + $(elem).height();

        return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom) && (elemBottom <= docViewBottom) && (elemTop >= docViewTop) || (docViewBottom >= elemTop && elemBottom >= docViewBottom));
    }

    function IsPartiallyInScreen(elem) {
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();

        var elemTop = $(elem).offset().top;
        var elemBottom = elemTop + $(elem).height();

        return ((elemTop >= docViewTop && elemBottom <= docViewBottom) || (elemBottom >= docViewTop) && (elemTop <= docViewBottom));
    }

}(jQuery));

$( document ).ready(function() {

    //Global Vars
     
     // Gray out options if #brand selected 
     var grayed_items  = $("#prod1, #prod2, #prod3, #age1, #age2, #character1, #price1");


    
    //filter open/close
    // Top level open/close

        $(".filter-menu div span").each(function() {

            $(this).click(function() {

            var text_val = $(this).parent().find(".level1 li.active").text().split(")").join(") <br />");

            var menu_length = $(this).parent().find(".level1 li").length,
                //menu_li = $(this).find(".level1")
                menu_li_gt5 = $(this).parent().find(".level1 li:gt(4)");

            if(!$(this).hasClass("clicked")) {
                $(this).addClass("clicked");
                $(this).find("i").addClass('fa-caret-up');
                $(this).find("i").removeClass('fa-caret-down');
                $(this).parent().find(".level1").delay(10).slideDown();

                // Hide selected filter values when accordian is open
                if ($(this).find("p").hasClass("selected_val")) {
                     $(this).find("p").remove();
                }


                // Show More button if there are more than 5 items
                if (menu_length > 5) {
                    menu_li_gt5.hide();
                    $(this).parent().find(".show-more").show();
                }

                // Check to see if options selected. If so, show clear button when opened/reopened
                if($(this).parent().find(".level1 li").hasClass("active")){
                    $(this).parent().find(".clear").show();
                }
                else{
                    $(this).parent().find(".clear").hide();
                }
            }

           else {
                $(this).removeClass("clicked");
                $(this).find("i").removeClass('fa-caret-up');
                $(this).find("i").addClass('fa-caret-down');
                $(this).parent().find(".level1").slideUp();
                $(this).parent().find(".clear").slideUp();
                $(this).parent().find(".show-more").hide();

                 if ($(this).find("p").hasClass("selected_val")) {
                     $(this).find("p").show();
                }
         
                // Add/clear selected values when filters closed 
                if ($(this).parent().find(".level1 li").hasClass("active")) {
                     $(this).append("<p class='selected_val'>" + text_val + "</p>");
                }
                else {
                   $(this).find("p").hasClass("selected_val").remove();
                }
            }

            });
        });

    // 2nd Level selection

    $(".level1 li").each(function() {    

        $(this).click(function() {
                   
            if (!$(this).hasClass("active")) {
                $(this).addClass("active");
                $(this).append("<i class='fa fa-times-circle'></i>"); 
                      if($(this).hasClass("deselected")) {
                        $(this).parent().parent().find(".clear").hide();   
                      }    
                      else {
                        $(this).parent().parent().find(".clear").slideDown();   
                      }

            }
            else {
                $(this).removeClass("active");
                $(this).find("i").remove();
                $(this).parent().parent().find("p.selected_val").remove(); // Work in progress


                // Check to see if there are more than one filter items checked. Remove "Clear" if none checked
                var parent_id = $(this).parent().parent().find(".level1 li.active");
                
                if(parent_id.length > 0) {
                   $(this).parent().parent().find(".clear").slideDown();
                }
                else {
                    $(this).parent().parent().find(".clear").slideUp();
                }

                // Clear styles on grayed out items if #brand is not selected
                if(!$("#brand1").hasClass("active")) {
                    grayed_items.removeClass("deselected");
                    grayed_items.find(".selected_val").remove();
                }            
            }

            // Move deselected items to bottom of list
            if($("#brand1").hasClass("active")) {
                    $(".prod-cat span").addClass("main-cat-deselected");
                    $("#prod1, #prod2, #prod3").removeClass("active").addClass("deselected").appendTo(".prod-cat .level1");
                    $("#age1").removeClass("active").addClass("deselected").appendTo(".age .level1");
                    $("#age2").removeClass("active").addClass("deselected").appendTo(".age .level1");
                    $("#character1").removeClass("active").addClass("deselected").appendTo(".characters .level1");
                    $("#price1").removeClass("active").addClass("deselected").appendTo(".price .level1").css("display", "none");
                    $("#price6").css("display", "block");
                    $(".prod-cat .clear").hide();
                    grayed_items.find("i").remove(); 
                    //grayed_items.parent().parent().find(".clear").hide();        

                }
                // Reappend un-selected items to original position
                else {
                    $(".prod-cat span").removeClass("main-cat-deselected");
                    $("#prod1, #prod2, #prod3").prependTo(".prod-cat .level1");
                    $("#age2").prependTo(".age .level1");
                    $("#age1").prependTo(".age .level1");
                    $("#character1").prependTo(".characters .level1");
                    $("#price1").prependTo(".price .level1").show();
                    $("#price6").hide();
                }
        });  

    });

    // Clear link

    $(".clear").each(function() {
        $(this).click(function() {
            if($(this).parent().find(".level1 li").hasClass("active")){
                $(this).parent().find(".level1 li").removeClass("active");
                $(this).parent().find(".level1 li i").remove();
                $(this).slideUp();

                //Clear styles on grayed out items if #brand is no longer selected
                if(!$("#brand1").hasClass("active")) {
                    grayed_items.removeClass("deselected");
                    grayed_items.find(".selected_val").remove();
                    $(".prod-cat span").removeClass("main-cat-deselected");
                    $("#prod1, #prod2, #prod3").prependTo(".prod-cat .level1");
                    $("#age2").prependTo(".age .level1");
                    $("#age1").prependTo(".age .level1");
                    $("#character1").prependTo(".characters .level1");
                    $("#price1").prependTo(".price .level1").show();
                    $("#price6").hide();
                }
            }
            
        });
    });

    // Clear All 

    $(".clear-all").click(function() {
        $(".level1 li").removeClass("active");
        $(".level1 li").find("i").remove();
        $(".clear").slideUp();
        grayed_items.removeClass("deselected");
        $(".prod-cat span").removeClass("main-cat-deselected");
        $(".filter-menu div").find("p.selected_val").remove();
        $("#prod1, #prod2, #prod3").prependTo(".prod-cat .level1");
        $("#age2").prependTo(".age .level1");
        $("#age1").prependTo(".age .level1");
        $("#character1").prependTo(".characters .level1");
        $("#price1").prependTo(".price .level1").show();
        $("#price6").hide();
                           
    });
  
    $(".show-more").each(function() {
         $(this).click(function() {

          var show_li_gt5 = $(this).parent().find(".level1 li:gt(4)");

          if (!$(this).hasClass("expanded")) {
            show_li_gt5.slideDown(500);
            $(this).addClass("expanded");
            $(this).text("Show Less");
        }
         else {
                show_li_gt5.slideUp(500);
                $(this).removeClass("expanded");
                $(this).text("Show More");
            }
         });
     });


    // Mobile View
    $(window).resize(function() {
        var width = $(window).width();

        if(width > 700) {
            $(".filter-canvas").show();
            $("body").removeClass("show-filters");
        }
        /*else {
            $(".filter-canvas").hide();
            $("body").removeClass("show-filters");
        }*/
    });

    var left = $(".filter-canvas").offset().left;
    
    $(".filter-by").click(function() {

       if ($("body").hasClass("show-filters")) {
        $(".filter-canvas").css({left:left}).animate({"left":"100%"}, 300);
        $("body").removeClass("show-filters");
       }
       else {
        $("body").addClass("show-filters");
        $(".filter-canvas").css({left:left}).animate({"left":"0"}, 300);
       }
        $(".back").click(function() {
            
            $("body").removeClass("show-filters");
            $(".filter-canvas").css({left:left}).animate({"left":"100%"}, 300);

        });
    });


});



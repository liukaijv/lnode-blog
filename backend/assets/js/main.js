$(function(){
  var animationSpeed = 300;
  $(document).on('click', '.sidebar-menu li a', function (e) {     
      var $this = $(this);
      var checkElement = $this.next();      
      if ((checkElement.is('.treeview-menu')) && (checkElement.is(':visible')) && (!$('body').hasClass('sidebar-collapse'))) {    
        checkElement.slideUp(animationSpeed, function () {
          checkElement.removeClass('menu-open');         
        });
        checkElement.parent("li").removeClass("active");
      }
      else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {     
        var parent = $this.parents('ul').first();    
        var ul = parent.find('ul:visible').slideUp(animationSpeed);    
        ul.removeClass('menu-open');        
        var parent_li = $this.parent("li");      
        checkElement.slideDown(animationSpeed, function () {       
          checkElement.addClass('menu-open');
          parent.find('li.active').removeClass('active');
          parent_li.addClass('active');    
        });
      }   
      if (checkElement.is('.treeview-menu')) {
        e.preventDefault();
      }
    });
})
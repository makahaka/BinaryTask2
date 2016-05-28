$(function($){
  var id = 0;
  List = function(container, form){
    var on = form.find.bind(form);
    on('button.btn-primary').click(function(){
      $('input:checkbox').prop('checked',true);
      $('.item').addClass('removed');
    });
    on('button.btn-warning').click(function(){
      $('input:checkbox').prop('checked',false);
      $('.item').removeClass('removed');
    });
    on('button.btn-danger').click(function () {
      container.find('.removed').remove();
    });
    $('body').keydown(function(event){
      if(event.keyCode ===13) {
        if (on('#item-field').attr('data-id')) {
          var currentIdItem = on('#item-field').attr('data-id');
          var editTextItem = form.find('#item-field').val();
          on('#' + currentIdItem).text(editTextItem);
          form.find('input').val('');
        } else {
          var value = form.find('input').val();
          form.find('input').val('');
          new Item(value).appendTo(container);
        }
      } else if (event.keyCode === 27) {
        form.find('input').val('');
        on('#item-field').removeAttr('data-id');
      }
    })
  };

  Item = function(name){
    var itemTextId = id++;
    var itemContainer = $('<div class="item"></div>');
    var itemCheckBox = $('<input type="checkbox">');
    var itemText = $('<span id='+itemTextId+'></span>');
    var itemDeleteButton = $('<button>delete</button>');
    itemText.text(name || 'Example');
    itemContainer.append(itemCheckBox);
    itemContainer.append(itemText);
    itemContainer.append(itemDeleteButton);
    itemCheckBox.click(function() {
      if (itemCheckBox.prop('checked')) {
        itemContainer.addClass('removed');
      } else {
        itemContainer.removeClass('removed');
      }
    });
    itemText.click(function(){
      $('body').find('#item-field').attr('data-id', itemTextId);
      var currentText = itemText.text();
      $('#item-field').val(currentText);
    });
    itemDeleteButton.click(function(){
      itemContainer.remove();
    })
    return itemContainer;
  };
  new List($('.container'), $('.form'));
})(jQuery);

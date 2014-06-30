 var editMenu = $('.editModeMenu');
 var mainContainer = $('#mainContainer');
 var rowsContainer = $('.passportRows');
 var fieldsData = [
     {
         'id': 'Species',
         'value': 'Dog'
        },
     {
         'id': 'Breed',
         'value': 'German Shepherd'
        },
     {
         'id': 'Sex',
         'value': 'Female'
        },
     {
         'id': 'Age',
         'value': '3'
        },
     {
         'id': 'Color',
         'value': 'Black'
        },
     {
         'id': 'Weight',
         'value': '8kg'
        },
     {
         'id': 'Chip',
         'value': '42526658'
        },
     {
         'id': 'Address',
         'value': 'London'
        },
     {
         'id': 'Owner',
         'value': 'Bruce Wilis'
        }
    ];


 for (var i = 0; i < fieldsData.length; i++) {
     rowsContainer.append('<li><span>' + fieldsData[i].id + ':</span><label id="' + fieldsData[i].id + '">' + fieldsData[i].value + '</label></li>');
 }

// $('.passportRows label').each(function () {
//     var data = localStorage.getItem($(this).prop('id'));
//     $(this).html(data);
// });


 mainContainer.on('mouseenter', function () {
     editMenu.addClass('extended');
 });

 mainContainer.on('mouseleave', function () {
     editMenu.removeClass('extended');
     if ($('.passportRows label:eq(0)').hasClass('edit')) {
         $('.passportRows label').each(function () {
             var key = $(this).prop('id');
             var value = $(this).html();
             localStorage.setItem(key, value);
             $(this).attr('contenteditable', 'false').removeAttr('class');
         });
     }
 });

 editMenu.on('click', function () {
     $('.passportRows label').each(function () {
         $(this).attr('contenteditable', 'true').addClass('edit');
     });
     $(this).removeClass('extended');
 });
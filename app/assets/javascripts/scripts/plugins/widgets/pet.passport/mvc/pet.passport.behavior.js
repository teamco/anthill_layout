 define([], function definePetPassportBehavior() {
     var PetPassportBehavior = function PetPassportBehavior() {
         this.editMenu = $('.editModeMenu');
         this.mainContainer = $('#mainContainer');
         this.rowsContainer = $('.passportRows');
         this.fieldsData = [
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
         
         this.initialize();
     }


     return PetPassportBehavior.extend('PetPassportBehavior', {

         initialize: function initialize() {

             for (var i = 0; i < this.fieldsData.length; i++) {
                 this.rowsContainer.append('<li><span>' + this.fieldsData[i].id + ':</span><label id="' + this.fieldsData[i].id + '">' + this.fieldsData[i].value + '</label></li>');
             };

             this.mainContainer.on('mouseenter', function () {
                 this.editMenu.addClass('extended');
             }.bind(this));

             this.mainContainer.on('mouseleave', function () {
                 this.editMenu.removeClass('extended');
                 if ($('.passportRows label:eq(0)').hasClass('edit')) {
                     $('.passportRows label').each(function () {
                         var key = $(this).prop('id');
                         var value = $(this).html();
                         localStorage.setItem(key, value);
                         $(this).attr('contenteditable', 'false').removeAttr('class');
                     });
                 }
             }.bind(this));

             this.editMenu.on('click', function () {
                 $('.passportRows label').each(function () {
                     $(this).attr('contenteditable', 'true').addClass('edit');
                 });
                 this.editMenu.removeClass('extended');
             }.bind(this));

         }

     });
 });
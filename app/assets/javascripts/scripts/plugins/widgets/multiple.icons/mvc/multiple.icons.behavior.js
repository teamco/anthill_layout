define([], function defineMultipleIconsBehavior() {
    var MultipleIconsBehavior = function MultipleIconsBehavior() {
        this.iconsDB = [
            {
                "class": "note-icon",
                "title": "Make a Note"
            }
                ];

        this.iconsContainer = $('.icons-container');
        this.makeNote = $('.note-icon');
        this.appContainer = $('.app');

        this.initialize();
    }

    return MultipleIconsBehavior.extend('MultipleIconsBehavior', {

        initialize: function initialize() {
            for (var i = 0; i < this.iconsDB.length; i++) {
                var currentIcon = '<li><a class="' + this.iconsDB[i].class + '" title="' + this.iconsDB[i].title + '" /></li>';
                this.iconsContainer.append(currentIcon);
            }

            $(document).on('click', '.note-icon', function () {
                var notesAmount = $('.note-container').length;
                var top = 100 * notesAmount;
                var noteVisual = '<div class="note-container" style="top:' + top + 'px"><a class="close-note"></a><div class="content" onkeypress="return(this.innerText.length <= 130)"></div></div>';
                this.appContainer.prepend(noteVisual);
            }.bind(this));
            
            $(document).on('click', '.close-note', function () {
                var index = $(this).parent().index();
//                for(var i = index; i > 0; i--){
//                   console.log($('.note-container')[i]);
//                }
                $(this).parent('div').remove();
            });

            $(document).on('click', '.note-container .content', function () {
                $(this).attr('contenteditable', 'true').addClass('editable');
            });

            $(document).on('mouseleave', '.note-container .content', function () {
                if ($(this).hasClass('editable')) {
                    $(this).attr('contenteditable', 'false').removeClass('editable');
                }
            });

            $(document).on('click', '.note-container', function () {
                $(this).css('z-index', '3');
            });

            $(document).on('mouseleave', '.note-container', function () {
                $(this).css('z-index', '0');
            })

        }
    });
});
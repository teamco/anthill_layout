var iconsDB = [
    {
        "class": "note-icon",
        "title": "Make a Note"
    }
];

var iconsContainer = $('.icons-container');
var makeNote = $('.note-icon');
var appContainer = $('.app');



for (var i = 0; i < iconsDB.length; i++) {
    var currentIcon = '<li><a class="' + iconsDB[i].class + '" title="' + iconsDB[i].title + '" /></li>';
    iconsContainer.append(currentIcon);
}

$(document).on('click', '.note-icon', function () {
    var notesAmount = $('.note-container').length;
    var top = 100 * notesAmount;
    var noteVisual = '<div class="note-container" style="top:' + top + 'px"><a class="close-note"></a><div class="content" onkeypress="return(this.innerText.length <= 130)"></div></div>';
    appContainer.prepend(noteVisual);
});
$(document).on('click', '.close-note', function () {
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
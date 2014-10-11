define([], function defineEventsBehavior() {

    var EventsBehavior = function EventsBehavior($mainContainer) {

        this.$mainContainer = $mainContainer;

        this.mocData = [{
            date: "1412013690000",
            type: "",
            title: "CoABoardMeeting",
            description: "Thereisnodescription.",
            url: "events_details.php?page=body&ID=1"
        }, {
            date: "1411013690000",
            type: "",
            title: "CABoardMeeting",
            description: "Thereisnodescription.",
            url: "events_details.php?page=body&ID=4"
        }, {
            date: "1411013690000",
            type: "",
            title: "CIBoardMeeting/AnnualDinner",
            description: "Thereisnodescription.",
            url: "events_details.php?page=body&ID=7"
        }, {
            date: "1411013690000",
            type: "",
            title: "CIBoardMeeting",
            description: "Thereisnodescription.",
            url: "events_details.php?page=body&ID=8"
        }, {
            date: "1412043190000",
            type: "",
            title: "SierriaofAmerica-BoardMeeting-ConferenceCall",
            description: "Thereisnodescription.",
            url: "events_details.php?page=body&ID=10"
        }, {
            date: "1412143190000",
            type: "",
            title: "CTBoardMeeting",
            description: "Thereisnodescription.",
            url: "events_details.php?page=body&ID=9"
        }];

        this.initialize();
    };

    return EventsBehavior.extend('EventsBehavior', {


        initialize: function initialize() {
            this.$mainContainer.eventCalendar({
                jsonData: this.mocData
            });

            $(document).on('click', '.eventEditorContainer .cancel_button', function () {
                $('.eventEditorContainer').remove();
            });

            $(document).on('click', '.eventEditorContainer .save_button', function () {
                var evTitle = $('[name="eventTitle"]')[0].value,
                    evDescription = $('[name="eventDescription"]')[0].value,
                    evDate = $('[name="eventDate"]')[0].value,
                    evTime = $('[name="timePicker"]')[0].value,
                    pretimestamp = evDate + ' ' + evTime,
                    dArr = pretimestamp.split('/'),
                    timestamp = new Date(dArr[1] + '-' + dArr[0] + '-' + dArr[2]).getTime(),
                    sendData =  {
                            'title': evTitle,
                            'description': evDescription,
                            'date': evDate,
                            'time': evTime
                        };
                
                console.log(sendData);
                //$('.eventEditorContainer').remove();
            });

        }
    });
});
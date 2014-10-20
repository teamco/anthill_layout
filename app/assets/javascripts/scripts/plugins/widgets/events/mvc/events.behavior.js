define([], function defineEventsBehavior() {

	var EventsBehavior = function EventsBehavior($mainContainer, $element) {

		this.$mainContainer = $mainContainer;
		this.$element = $element;
	};

	return EventsBehavior.extend('EventsBehavior', {


		initialize: function initialize() {

			var json = [];
			var calendarReadyData = [];

			try {
				json = JSON.parse(this.scope.view.controller.getStoredData());
				var count = Object.keys(json).length;

				for (var i = 0; i < count; i++) {
					var currentField = Object.keys(json)[i],
						date = json[currentField].timest,
						title = json[currentField].title,
						description = json[currentField].description;

					calendarReadyData.push({
						'date': date.toString(),
						'type': date.toString(),
						'title': title,
						'description': description,
						'url': ''
					});
				}

				//console.log(calendarReadyData);

			} catch (e) {

				// TODO
			}

			this.$mainContainer.eventCalendar({
				jsonData: calendarReadyData
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
					timestamp = (new Date(pretimestamp)).getTime(),
					sendData = {
						title: evTitle,
						description: evDescription,
						date: evDate,
						time: evTime,
						timest: timestamp
					};

				this.$element.collectEventData(sendData, timestamp);
				$('.eventEditorContainer').remove();

				$('#calendarik').append('<div class="eventSavedNotice animated flipInX">Event Saved Successfully</div>');
				setTimeout(function () {
					var notice = $('.eventSavedNotice');
					notice.removeClass('flipInX').addClass('flipOutX');
					setTimeout(function () {
						notice.remove();
					}, 1000);
				}, 2000);
			}.bind(this));


			$(document).on('click.recicle', '.recicle_button', this.$element.$, function (event) {

                var eventTimestemp = $(event.target).parent()[0].className;


				//				this.scope.observer.publish(
				//					this.scope.eventmanager.eventList.getEventData, [eventTimestemp, $element]
				//				)

				console.log(eventTimestemp);

			}.bind(this));

		}

	});
});
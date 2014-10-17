define([], function defineEventsBehavior() {

	var EventsBehavior = function EventsBehavior($mainContainer, scope) {

		this.$mainContainer = $mainContainer;
		this.scope = scope;
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

				console.log(calendarReadyData);

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

				this.scope.collectEventData(sendData, timestamp);
				$('.eventEditorContainer').remove();

				//console.log(this.$mainContainer);

				this.$mainContainer.empty();

				this.$mainContainer.eventCalendar({
					jsonData: calendarReadyData
				});
			}.bind(this));


			$(document).on('click', '.pencil_button', function (event) {
//				this.scope.observer.publish(
//					this.scope.eventmanager.eventList.getEventData, [1412013690000, $element]
//				)
				console.log(event);
				console.log($(this).parent());
				
			}.bind(this));

		}

	});
});
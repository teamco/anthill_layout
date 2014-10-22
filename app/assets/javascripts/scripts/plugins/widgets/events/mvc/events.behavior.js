define([], function defineEventsBehavior() {

    /**
     * Define EventsBehavior
     * @class EventsBehavior
     * @param $mainContainer
     * @param $element
     * @constructor
     */
    var EventsBehavior = function EventsBehavior($mainContainer, $element) {

        /**
         * Define main $container
         * @member EventsBehavior
         */
        this.$mainContainer = $mainContainer;

        /**
         * Define $element
         * @member EventsBehavior
         */
        this.$element = $element;
    };

    return EventsBehavior.extend('EventsBehavior', {

        /**
         * Define Init
         * @member EventsBehavior
         */
        initialize: function initialize() {

            var json = this.$element.view.controller.parseData() || [];
            var calendarReadyData = [];

            var keys = Object.keys(json),
                count = keys.length;

            for (var i = 0; i < count; i++) {

                var currentField = keys[i],
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

            this.$mainContainer.eventCalendar({
                jsonData: calendarReadyData
            });

            this.bindCancel();
            this.bindSave();
            this.bindRecycle();
        },

        /**
         * Remove container
         * @member EventsBehavior
         */
        removeContainer: function removeContainer() {
            $('.eventEditorContainer', this.$element.$).remove();
        },

        /**
         * Define cancel button binding
         * @member EventsBehavior
         */
        bindCancel: function bindCancel() {

            this.$element.$.on(
                'click.cancel',
                '.cancel_button',
                this.removeContainer.bind(this)
            );
        },

        /**
         * Define recycle button binding
         * @member EventsBehavior
         */
        bindRecycle: function bindRecycle() {

            this.$element.$.on(
                'click.recicle',
                '.recicle_button',
                function clickRecicle(event) {

                    /**
                     * Get scope
                     * @type {Events}
                     */
                    var scope = this.$element.view.scope;

                    scope.observer.publish(
                        scope.eventmanager.eventList.removeEvent,
                        $(event.target).parent()[0].className
                    );
					
					this.$element.renderEmbeddedContent();

                }.bind(this)
            );
        },

        /**
         * Define save button binding
         * @member EventsBehavior
         */
        bindSave: function bindSave() {

            this.$element.$.on(
                'click.save',
                '.save_button',
                function clickSave() {

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

                    this.removeContainer.bind(this)();

                    $('#calendarik').append('<div class="eventSavedNotice animated flipInX">Event Saved Successfully</div>');
					
					
                    setTimeout(function () {
                        var notice = $('.eventSavedNotice');
                        notice.removeClass('flipInX').addClass('flipOutX');
						
                        setTimeout(function () {
                            notice.remove();
							this.$element.renderEmbeddedContent();
                        }.bind(this), 1000);
                    }.bind(this), 2000);

                }.bind(this)
            );
        }
    });
});
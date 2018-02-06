(function() {
  'use strict';

  var TOPIC_OPTION_REGEX = /(?:kafka[._])?topics?(?:[._]prefix)?$/;

  /**
   * Extracts the topics from the connector configuration
   * @requires configurationTypeFilter
   */
  angularAPP.filter('configurationTopics', function (configurationTypeFilter) {

    /**
     * @param {Object} config Connector configuration
     * @returns {Array} Set of topic strings
     */
    return function (config) {
      var option;
      var topics;

      if (angular.isString(config.topics) && 'Sink' === configurationTypeFilter(config)) {
        return trimWhiteSpace(config.topics.split(','));
      }

      for (option in config) {
        if (angular.isString(config[option]) && TOPIC_OPTION_REGEX.test(option)) {
          return trimWhiteSpace(config[option].split(','));
        }
      }

      topics = [];

      for (option in config) {
        if (!angular.isString(config[option])) {
          continue;
        }

        if (-1 !== option.indexOf('ftp.monitor')) { // @see {@link https://github.com/Eneco/kafka-connect-ftp}
          Array.prototype.push.apply(topics, config[option].split(',').map(function (value) {
            return value.split(':')[1].trim();
          }));
        } else if (-1 !== option.indexOf('topic')) {
          Array.prototype.push.apply(topics, trimWhiteSpace(config[option].split(',')));
        }
      }

      return topics;
    };
  });

  /**
   * Removes whitespace from the set of strings
   * @param {Array} topics
   * @returns {Array}
   */
  function trimWhiteSpace(topics) {
    return topics.map(function (topic) {
      return topic.trim();
    });
  }

})();

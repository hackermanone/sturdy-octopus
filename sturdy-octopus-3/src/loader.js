const { getOptions } = require('loader-utils');

module.exports = function(source) {
    const options = getOptions(this);
    source = source.replace(options.replace, options.with);
    return source;
}
// inspired by https://github.com/jfromaniello/url-join
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var PROTOCOL_RE = /^[^/:]+:\/*$/;
var FILE_PROTOCOL_RE = /^file:\/\/\//;
var isProtocol = function (segment) { return !!segment.match(PROTOCOL_RE); };
var isFileProtocol = function (segment) { return !!segment.match(FILE_PROTOCOL_RE); };
var PROTOCOL_SEPARATOR_REPLACEMENT_RE = /^([^/:]+):\/*/;
var replaceProtocolSeparator = function (segment, replacement) {
    return segment.replace(PROTOCOL_SEPARATOR_REPLACEMENT_RE, "$1".concat(replacement));
};
var STARTING_SLASH_RE = /^[\/]+/;
var ENDING_SLASH_RE = /[\/]+$/;
var removeStartingSlashes = function (segment) { return segment.replace(STARTING_SLASH_RE, ''); };
var removeEndingSlashes = function (segment) { return segment.replace(ENDING_SLASH_RE, ''); };
var flattenEndingSlashes = function (segment) { return segment.replace(ENDING_SLASH_RE, '/'); };
var QUERY_AND_FRAGMENT_SLASH_RE = /\/(\?|&|#[^!])/g;
var removeLeadingQueryAndFragmentSlashes = function (segment) { return segment.replace(QUERY_AND_FRAGMENT_SLASH_RE, ''); };
var normalize = function (segments) {
    if (!segments.length) {
        return '';
    }
    var firstSegmentNormalized = segments[0], remainingSegments = segments.slice(1);
    if (isProtocol(firstSegmentNormalized) && remainingSegments.length > 0) {
        firstSegmentNormalized += remainingSegments.shift();
    }
    if (isFileProtocol(firstSegmentNormalized)) {
        firstSegmentNormalized = replaceProtocolSeparator(firstSegmentNormalized, ':///');
    }
    else {
        firstSegmentNormalized = replaceProtocolSeparator(firstSegmentNormalized, '://');
    }
    var normalizedSegments = __spreadArray([firstSegmentNormalized], remainingSegments, true).filter(function (segment) { return segment !== ''; })
        .map(function (segment, i, filteredSegments) {
        var normalizedSegment = segment;
        if (i > 0) {
            normalizedSegment = removeStartingSlashes(normalizedSegment);
        }
        if (i < filteredSegments.length - 1) {
            normalizedSegment = removeEndingSlashes(normalizedSegment);
        }
        else {
            normalizedSegment = flattenEndingSlashes(normalizedSegment);
        }
        return normalizedSegment;
    });
    var normalizedUrl = normalizedSegments.join('/');
    normalizedUrl = removeLeadingQueryAndFragmentSlashes(normalizedUrl);
    var _a = normalizedUrl.split('?'), normalizedNonQuery = _a[0], querySegments = _a.slice(1);
    return normalizedNonQuery + querySegments.join('&');
};
var urlJoin = function () {
    var paths = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        paths[_i] = arguments[_i];
    }
    return normalize(paths);
};
export default urlJoin;

// inspired by https://github.com/jfromaniello/url-join

const PROTOCOL_RE = /^[^/:]+:\/*$/
const FILE_PROTOCOL_RE = /^file:\/\/\//

const isProtocol = (segment: string): boolean => !!segment.match(PROTOCOL_RE)
const isFileProtocol = (segment: string): boolean => !!segment.match(FILE_PROTOCOL_RE)

const PROTOCOL_SEPARATOR_REPLACEMENT_RE = /^([^/:]+):\/*/
const replaceProtocolSeparator = (segment: string, replacement: string): string =>
  segment.replace(PROTOCOL_SEPARATOR_REPLACEMENT_RE, `$1${replacement}`)

const STARTING_SLASH_RE = /^[\/]+/
const ENDING_SLASH_RE = /[\/]+$/
const removeStartingSlashes = (segment: string): string => segment.replace(STARTING_SLASH_RE, '')
const removeEndingSlashes = (segment: string): string => segment.replace(ENDING_SLASH_RE, '')
const flattenEndingSlashes = (segment: string): string => segment.replace(ENDING_SLASH_RE, '/')

const QUERY_AND_FRAGMENT_SLASH_RE = /\/(\?|&|#[^!])/g
const removeLeadingQueryAndFragmentSlashes = (segment: string) => segment.replace(QUERY_AND_FRAGMENT_SLASH_RE, '')

const normalize = (segments: string[]): string => {
  if (!segments.length) {
    return ''
  }

  let [firstSegmentNormalized, ...remainingSegments] = segments
  if (isProtocol(firstSegmentNormalized) && remainingSegments.length > 0) {
    firstSegmentNormalized += remainingSegments.shift()
  }

  if (isFileProtocol(firstSegmentNormalized)) {
    firstSegmentNormalized = replaceProtocolSeparator(firstSegmentNormalized, ':///')
  } else {
    firstSegmentNormalized = replaceProtocolSeparator(firstSegmentNormalized, '://')
  }

  const normalizedSegments = [firstSegmentNormalized, ...remainingSegments]
    .filter((segment) => segment !== '')
    .map((segment, i, filteredSegments) => {
      let normalizedSegment = segment
      if (i > 0) {
        normalizedSegment = removeStartingSlashes(normalizedSegment)
      }

      if (i < filteredSegments.length - 1) {
        normalizedSegment = removeEndingSlashes(normalizedSegment)
      } else {
        normalizedSegment = flattenEndingSlashes(normalizedSegment)
      }

      return normalizedSegment
    })

  let normalizedUrl = normalizedSegments.join('/')
  normalizedUrl = removeLeadingQueryAndFragmentSlashes(normalizedUrl)

  const [normalizedNonQuery, ...querySegments] = normalizedUrl.split('?')
  return normalizedNonQuery + querySegments.join('&')
}

const urlJoin = (...paths: string[]): string => normalize(paths)
export default urlJoin

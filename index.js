import platform from 'platform'
import Bowser from 'bowser/bundled'

const MIN_SUPPORTED_ANDROID_VERSION = 4.4
const MIN_SUPPORTED_WINDOWS_VERSION = 8.1
const MIN_SUPPORTED_OS_VERSION = 10.11
const MIN_SUPPORTED_IOS_VERSION = 11

const isValidWindowsBrowser = (browser) =>
  browser.satisfies({
    Windows: {
      chrome: '>=62',
      firefox: '>=52',
      edge: '>=14',
    },
  })

export const isValidBrowser = (browser) =>
  browser.satisfies({
    Windows: {
      chrome: '>=62',
      firefox: '>=52',
      edge: '>=14',
    },
    MacOS: {
      chrome: '>=62',
      firefox: '>=52',
      safari: '>=10',
    },
    iOS: {
      safari: '>=10',
    },
    Android: {
      chrome: '>=62',
    },
  })

const supportMap = (family) => (version) =>
  ((isSupported) => {
    if (isSupported === undefined)
      return true
    else
      return isSupported
  })(
    {
      Android: (version) =>
        version >= MIN_SUPPORTED_ANDROID_VERSION
          ? isValidBrowser(Bowser.getParser(window.navigator.userAgent))
          : false,
      Windows: (version) =>
        version >= MIN_SUPPORTED_WINDOWS_VERSION
          ? isValidWindowsBrowser(Bowser.getParser(window.navigator.userAgent))
          : false,
      OS: (version) =>
        version >= MIN_SUPPORTED_OS_VERSION
          ? isValidBrowser(Bowser.getParser(window.navigator.userAgent))
          : false,
      iOS: (version) =>
        version >= MIN_SUPPORTED_IOS_VERSION
          ? isValidBrowser(Bowser.getParser(window.navigator.userAgent))
          : false,
    }[family]?.(version),
  )

export const isSupported = () => {
  const family = platform?.os?.family?.split(' ')[0] || undefined
  const version = parseFloat(platform?.os?.version || 9999)

  return supportMap(family)(version)
}

const result = isSupported()
const browser = Bowser.getParser(window.navigator.userAgent)
document.querySelector('#root').innerHTML = JSON.stringify(platform, null, 2)
document.querySelector('#result').innerHTML = JSON.stringify(result, null, 2)
document.querySelector('#browser').innerHTML = JSON.stringify(
  browser.getBrowser(),
  null,
  2,
)
document.querySelector('#support').innerHTML = JSON.stringify(
  {
    MIN_SUPPORTED_WINDOWS_VERSION:
      parseFloat(platform?.os?.version || 9999) >=
      MIN_SUPPORTED_WINDOWS_VERSION,
    MIN_SUPPORTED_OS_VERSION:
      parseFloat(platform?.os?.version || 9999) >= MIN_SUPPORTED_OS_VERSION,
    MIN_SUPPORTED_ANDROID_VERSION:
      parseFloat(platform?.os?.version || 9999) >=
      MIN_SUPPORTED_ANDROID_VERSION,
    MIN_SUPPORTED_IOS_VERSION:
      parseFloat(platform?.os?.version || 9999) >= MIN_SUPPORTED_IOS_VERSION,
  },
  null,
  2,
)

document
console.log(
  `isValidBrowser`,
  isValidBrowser(Bowser.getParser(window.navigator.userAgent)),
)
console.log(
  `isValidWindowsBrowser`,
  isValidWindowsBrowser(Bowser.getParser(window.navigator.userAgent)),
)
console.log(
  `platform?.os?.version, MIN_SUPPORTED_WINDOWS_VERSION`,
  platform?.os?.version,
  MIN_SUPPORTED_WINDOWS_VERSION,
)
console.log(
  `MIN_SUPPORTED_WINDOWS_VERSION`,
  parseFloat(platform?.os?.version || 9999) >= MIN_SUPPORTED_WINDOWS_VERSION,
)
console.log(
  `MIN_SUPPORTED_OS_VERSION`,
  parseFloat(platform?.os?.version || 9999) >= MIN_SUPPORTED_OS_VERSION,
)
console.log(
  `MIN_SUPPORTED_ANDROID_VERSION`,
  parseFloat(platform?.os?.version || 9999) >= MIN_SUPPORTED_ANDROID_VERSION,
)
console.log(
  `MIN_SUPPORTED_IOS_VERSION`,
  parseFloat(platform?.os?.version || 9999) >= MIN_SUPPORTED_IOS_VERSION,
)

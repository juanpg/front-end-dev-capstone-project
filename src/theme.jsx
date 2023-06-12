import { extendTheme } from "@chakra-ui/react"

const theme = extendTheme({
  fonts: {
    body: `'Karla'`,
    heading: `'Markazi Text', serif`,
  },
  colors: {
    primary: {
      green: '#495E57',
      yellow: '#F4CE14'
    },
    secondary: {
      orange: '#EE9972',
      pink: '#FBDABB',
      lightGray: '#EDEFEE',
      darkGray: '#333333'
    },
  },
})

export { theme }
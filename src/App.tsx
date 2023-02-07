import { ThemeProvider } from 'styled-components'

import { ButtonContainer } from './components/Button.styles'
import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <ButtonContainer>Enviar</ButtonContainer>

      <GlobalStyle />
    </ThemeProvider>
  )
}

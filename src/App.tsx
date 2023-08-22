import { ThemeProvider } from "styled-components";
import { defaultTheme } from "./styles/themes/default";
import { GlobalStyle } from "./styles/global";
import { Transactions } from "./pages/Transactions";
import { TransactionsProvider } from './contexts/TransactionsContext'


export function App() {

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <TransactionsProvider>
        <Transactions />
      </TransactionsProvider>
    </ThemeProvider>
  )
}

//uma vez que encapsulamos o Transactions com o elemento TransactionsProvider, estaremos quase lá
//afinal do arquivo Transactions ainda estará faltando a interface que retiramos e jogamos lá 
//no nosso contextApi, ou simplesmente context
//Por isso devemos passar o nosso useContext no arquivo Transactions

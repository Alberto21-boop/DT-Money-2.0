import { useContext } from "react";
import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import { PriceHightLight, TransactionsContainer, TransactionsTable } from "./styles";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { dateFormatter, priceFormatter } from "../../utils/formatter";



export function Transactions() {
  const { transactions } = useContext(TransactionsContext)
  // uma vez que retiramos a nossa interface daqui, devemos ir lá na nossa TransactionsContext
  // para simplesmente exportar a função TransactionContext, ou seja, exportar o nosso contexto 
  // const { } = useContext() neste contexto iremos importar o useContext, não se esqueça disto
  // e no useContext() vamos passar o TransactionsContext no useContext, e teremos isso:
  // const { } = useContext(TransactionsContext)e ai importamos o TransactionsContext
  // e no const { aqui dentro faremos crtl + espaço e logo teremos sugerido "transactions" }
  // const { transactions } = useContext(TransactionsContext) agora sim temos a nossa contextAPI
  // agora vá para o Summary para colocar o const { transactions } = useContext(TransactionsContext)

  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            {transactions.map(transaction => {
              return (
                <tr key={transaction.id}>
                  <td width="50%">{transaction.description}</td>
                  <PriceHightLight $variant={transaction.type}>
                    {transaction.type === 'outcome' && '- '}
                    {priceFormatter.format(transaction.price)}
                  </PriceHightLight>
                  <td>{transaction.category}</td>
                  <td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
                </tr>
              );
            })}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  );
}
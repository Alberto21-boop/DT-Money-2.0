import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import { PriceHightLight, TransactionsContainer, TransactionsTable } from "./styles";

export function Transactions() {
  return (
    <div>
      <Header />
      <Summary />

      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            <tr>
              <td width="50%">Desenvolvimento de Site</td>
              <PriceHightLight $variant="income">R$ 12.000,00</PriceHightLight>
              <td>Venda</td>
              <td>13/08/2023</td>
            </tr>

            <tr>
              <td width="50%">Hamburger</td>
              <PriceHightLight $variant="outcome">- R$ 59,90</PriceHightLight>
              <td>Alimentação</td>
              <td>10/08/2023</td>
            </tr>
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  );
}
import { useContext } from "react";
import { TransactionsContext } from "../contexts/TransactionsContext";

export function useSummary() {
  const { transactions } = useContext(TransactionsContext);
  // pegamos esta const ladas transactions que você já trabalhou, e faremos o mesmo
  // const { transactions } = useContext(TransactionsContext); feita as importações
  // será hora de imprimir estes dados no resumo de nossa aplicação na tela.

  const summary = transactions.reduce(
    (acc, transaction) => {
      //aqui é a onde vamos colocar a parte logica de nosso "acumulaitor"
      if (transaction.type === "income") {
        acc.income += transaction.price;
        acc.total += transaction.price;
      } else {
        acc.outcome += transaction.price;
        acc.total -= transaction.price;
      }

      return acc;
    },
    {
      income: 0,
      outcome: 0,
      total: 0,
    }
  );

  return summary;
}
// estamos fazendo este reduce para percorrer o array para dividir em tipos, ou seja,
// vou reduzir os tipos para um determinado tipo, [ income: 0, outcome: 0 e total: 0 ]
// vamos reduzir os valores de transactions para esta estrutura de dados aqui
// [ income: 0, outcome: 0 e total: 0 ]
// acc é o acumulador ("acumulaitor") com esta estrutura aqui [ income: 0, outcome: 0 ,total: 0 ], e por isso
// posso aumentar ou diminuir qualquer dado deste objeto {income: 0, outcome: 0 ,total: 0}

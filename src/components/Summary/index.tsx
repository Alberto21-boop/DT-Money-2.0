import { useSummary } from "../../hooks/useSummary";
import { priceFormatter } from "../../utils/formatter";
import { SummaryCard, SummaryContainer } from "./styled";
import { ArrowCircleUp, ArrowCircleDown, CurrencyDollar } from 'phosphor-react'


export function Summary() {
  const summary = useSummary();
  // por convenção utilizamos os nossos hooks e o importamos
  // aqui mesmo, para que possamos nos utilizar do reduce que foi criado aqui, e que
  // migramos para nossa pasta de hooks

  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color='#00b37e' />
        </header>

        <strong>{priceFormatter.format(summary.income)}</strong>
      </SummaryCard>

      <SummaryCard>
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={32} color='#f75a68' />
        </header>

        <strong>{priceFormatter.format(summary.outcome)}</strong>
      </SummaryCard>

      <SummaryCard $variant="green">
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color='#fff' />
        </header>

        <strong>{priceFormatter.format(summary.total)}</strong>
      </SummaryCard>
    </SummaryContainer>
  );
}

// feito o reduce, agorá será hora de se colocar o summary em cada saída, na entrada, saída e no total
// conforme feito mais acima em cada strong, desta forma aqui <strong>{summary.total}</strong>
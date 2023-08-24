import { useForm } from "react-hook-form";
import { SearchFormContainer } from "./styles";
import { MagnifyingGlass } from 'phosphor-react'
import * as z from 'zod'; // importamos o zod para utilizarmos 
import { zodResolver } from "@hookform/resolvers/zod";
import { useContext } from "react";
import { TransactionsContext } from "../../../../contexts/TransactionsContext";

const searchFormSchema = z.object({ //em quarto criamos esta const aqui
  query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchFormSchema>; // em quinto "tipamos"

export function SearchForm() {
  const { fetchTransactions } = useContext(TransactionsContext);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<SearchFormInputs>(); // primeiro criamos este useForm
  // e em sexto passamos o SearchFormInputs como generics 
  resolver: zodResolver(searchFormSchema);


  async function handleSearchTransactions(data: SearchFormInputs) { // em terceiro criamos esta função
    await fetchTransactions(data.query)

  }

  return (
    <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
      <input type="text"
        placeholder="Busque por transações"
        {...register('query')} // e em segundo adicionamos o register com um 'query'
      />

      <button type="submit" disabled={isSubmitting}>
        <MagnifyingGlass size={20} />
        Buscar
      </button>
    </SearchFormContainer>
  );
}
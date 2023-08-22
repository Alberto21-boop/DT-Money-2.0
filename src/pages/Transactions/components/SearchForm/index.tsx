import { useForm } from "react-hook-form";
import { SearchFormContainer } from "./styles";
import { MagnifyingGlass } from 'phosphor-react'
import * as z from 'zod'; // importamos o zod para utilizarmos 
import { zodResolver } from "@hookform/resolvers/zod";

const searchFormSchema = z.object({ //em quarto criamos esta const aqui
  query: z.string(),
})

type SearchFormInputs = z.infer<typeof searchFormSchema>; // em quinto "tipamos"

export function SearchForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<SearchFormInputs>(); // primeiro criamos este useForm
  // e em sexto passamos o SearchFormInputs como generics 
  resolver: zodResolver(searchFormSchema);


  async function handleSearchTransactions(data: SearchFormInputs) { // em terceiro criamos esta função
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log(data);
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
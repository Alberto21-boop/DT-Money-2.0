import * as Dialog from "@radix-ui/react-dialog"
import { CloseButton, Content, Overlay, T, TransactionType } from "./styles";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import * as z from 'zod';
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>;

export function NewTransactionModal() {
  const { register, handleSubmit } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema)
  });
  return (

    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Nova Transação</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form action="">
          <input type="text" placeholder="Descrição" required />
          <input type="number" placeholder="Preço" required />
          <input type="text" placeholder="Categoria" required />

          <TransactionType>
            <T $variant='income' value='income'>
              <ArrowCircleUp size={24} />
              Entrada
            </T>

            <T $variant='outcome' value='outcome'>
              <ArrowCircleDown size={24} />
              Saída
            </T>
          </TransactionType>
          {/* uma vez feito a logica no css é so adicionar aos ícones conforme feito no TransactionTypeButton  */}

          <button type="submit">
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>

  );
}
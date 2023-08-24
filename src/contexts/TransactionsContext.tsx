import { createContext, ReactNode, useState, useEffect } from "react";
import { api } from "../lib/axios";


interface Transaction {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  price: number;
  category: string;
  createdAt: string;
  //esta interface pegamos de Transactions, lá das pages, ctrl + c  e depois ctrl + v mesmo
}

interface TransactionsContextType {
  transactions: Transaction[]; // passamos a interface de transactions aqui mesmo,
  // e assim retornamos uma lista de transações mesmo.
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (data: CreateTransactionInput) => Promise<void>;// passo aqui a função do desacoplamento
}

interface TransactionsProviderProps {
  children: ReactNode; // como passamos no TransactionsProvider uma children devemos tipa la
}

interface CreateTransactionInput {
  description: string;
  price: number;
  category: string;
  type: 'income' | 'outcome'
  // não estou repetindo o código, apenas desacoplei caso em algum momento eu queira
  //cadastrar uma nova transação de outro ponto da aplicação
}

export const TransactionsContext = createContext({} as TransactionsContextType);

// aqui colocamos a nossa conexão com a API
// depois que você voltar aqui, vai vir aqui em nosso contexto , e ele estará assim:
//const TransactionsContext = createContext({} as TransactionsContextType);
//e ficará assim:
// export const TransactionsContext = createContext({} as TransactionsContextType);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  //
  async function fetchTransactions(query?: string) {
    const response = await api.get('/transactions', {
      params: {
        _sort: 'createdAt',
        _order: 'desc', // aqui e no sort estamos ordenando a lista
        q: query,
      }
    })

    setTransactions(response.data);

    //aqui é o que faremos apos instalar o axios, vamos vir nesta função e vamos fazer a const
    // e é aqui que vamos construir o nosso get
    //vale salientar que estamos passando a query em outras partes da nossa aplicação
  }

  async function createTransaction(data: CreateTransactionInput) {
    const { description, price, category, type } = data;

    const response = await api.post('transactions', {
      description,
      category,
      price,
      type,
      createdAt: new Date(),
    })

    setTransactions(state => [response.data, ...state]);

    // faço a função aqui mesmo, e esta é a função do 'desacoplamento'
  }

  useEffect(() => {
    fetchTransactions();
  }, [])


  return (
    <TransactionsContext.Provider value={{
      transactions,
      fetchTransactions,
      createTransaction,
    }}>
      {children}
    </TransactionsContext.Provider>
    //aqui iremos importar o TransactionsProvider lá no app, 
    //por isso copie agora mesmo o TransactionsProvider
  )
}
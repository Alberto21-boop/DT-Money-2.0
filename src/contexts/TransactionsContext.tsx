import { createContext, ReactNode, useState, useEffect } from "react";


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
}

interface TransactionsProviderProps {
  children: ReactNode; // como passamos no TransactionsProvider uma children devemos tipa la
}

export const TransactionsContext = createContext({} as TransactionsContextType);

// aqui colocamos a nossa conexão com a API
// depois que você voltar aqui, vai vir aqui em nosso contexto , e ele estará assim:
//const TransactionsContext = createContext({} as TransactionsContextType);
//e ficará assim:
// export const TransactionsContext = createContext({} as TransactionsContextType);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function loadTransactions() {
    const response = await fetch('http://localhost:3333/transactions')
    const data = await response.json();

    setTransactions(data);
  }
  useEffect(() => {
    loadTransactions();
  }, [])


  return (
    <TransactionsContext.Provider value={{ transactions }}>
      {children}
    </TransactionsContext.Provider>
    //aqui iremos importar o TransactionsProvider lá no app, 
    //por isso copie agora mesmo o TransactionsProvider
  )
}
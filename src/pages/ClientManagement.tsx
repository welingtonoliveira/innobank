import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { NumericFormat } from 'react-number-format';

interface Client {
  id: number;
  name: string;
  globalLimit: number;
}

const ClientManagement = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [showForm, setShowForm] = useState(false);

  const addClient = (client: Omit<Client, 'id'>) => {
    setClients([...clients, { ...client, id: Date.now() }]);
    setShowForm(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-4">Gerenciamento de Clientes</h1>
      <button
        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300 flex items-center"
        onClick={() => setShowForm(true)}
      >
        <Plus size={20} className="mr-2" />
        Adicionar Cliente
      </button>
      {showForm && <ClientForm onSubmit={addClient} onCancel={() => setShowForm(false)} />}
      <ClientList clients={clients} />
    </div>
  );
};

const ClientForm = ({ onSubmit, onCancel }: { onSubmit: (client: Omit<Client, 'id'>) => void; onCancel: () => void }) => {
  const [name, setName] = useState('');
  const [globalLimit, setGlobalLimit] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, globalLimit: parseFloat(globalLimit.replace(/\D/g, '')) / 100 });
  };

  const numberToWords = (num: number): string => {
    const units = ['', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove'];
    const teens = ['dez', 'onze', 'doze', 'treze', 'quatorze', 'quinze', 'dezesseis', 'dezessete', 'dezoito', 'dezenove'];
    const tens = ['', '', 'vinte', 'trinta', 'quarenta', 'cinquenta', 'sessenta', 'setenta', 'oitenta', 'noventa'];
    const scales = ['', 'mil', 'milhão', 'bilhão', 'trilhão'];

    if (num === 0) return 'zero';

    const convertLessThanOneThousand = (n: number): string => {
      if (n === 0) return '';
      if (n < 10) return units[n];
      if (n < 20) return teens[n - 10];
      const ten = Math.floor(n / 10);
      const one = n % 10;
      return (tens[ten] + (one ? ' e ' + units[one] : '')).trim();
    };

    let words = '';
    let scaleIndex = 0;

    while (num > 0) {
      const n = num % 1000;
      if (n !== 0) {
        const str = convertLessThanOneThousand(n);
        words = str + (str ? ' ' + scales[scaleIndex] + (n > 1 && scaleIndex > 0 ? 'ões' : '') + ' ' : '') + words;
      }
      scaleIndex++;
      num = Math.floor(num / 1000);
    }

    return words.trim();
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Novo Cliente</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Nome da Empresa</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Limite Global Mensal</label>
        <NumericFormat
          value={globalLimit}
          onValueChange={(values) => setGlobalLimit(values.value)}
          thousandSeparator="."
          decimalSeparator=","
          prefix="R$ "
          decimalScale={2}
          fixedDecimalScale
          allowNegative={false}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
        {globalLimit && (
          <p className="mt-2 text-sm text-gray-600">
            {`${globalLimit} (${numberToWords(parseFloat(globalLimit.replace(/\D/g, '')) / 100)} reais)`}
          </p>
        )}
      </div>
      <div className="flex justify-end space-x-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Adicionar
        </button>
      </div>
    </form>
  );
};

const ClientList = ({ clients }: { clients: Client[] }) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Lista de Clientes</h2>
      {clients.length === 0 ? (
        <p>Nenhum cliente cadastrado.</p>
      ) : (
        <ul className="space-y-4">
          {clients.map((client) => (
            <li key={client.id} className="bg-white p-4 rounded-md shadow">
              <h3 className="text-lg font-medium">{client.name}</h3>
              <p>Limite Global Mensal: R$ {client.globalLimit.toFixed(2)}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ClientManagement;
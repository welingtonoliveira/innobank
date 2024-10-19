import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Employee {
  id: number;
  name: string;
  role: string;
  benefits: {
    food: number;
    meal: number;
    transport: number;
    health: number;
    culture: number;
  };
}

const CompanyDashboard = () => {
  const navigate = useNavigate();
  const companyId = localStorage.getItem('currentCompany');
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [distributionType, setDistributionType] = useState<'role' | 'manual'>('role');

  const handleLogout = () => {
    localStorage.removeItem('currentCompany');
    navigate('/login');
  };

  const addEmployee = (employee: Omit<Employee, 'id'>) => {
    setEmployees([...employees, { ...employee, id: Date.now() }]);
    setShowForm(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-xl font-bold text-indigo-600">Empresa {companyId}</h1>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={handleLogout}
                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="py-10">
        <header>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight text-gray-900">Dashboard da Empresa</h1>
          </div>
        </header>
        <main>
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="px-4 py-8 sm:px-0">
              <div className="mb-4">
                <button
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition duration-300"
                  onClick={() => setShowForm(true)}
                >
                  Adicionar Funcionário
                </button>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Tipo de Distribuição</label>
                <select
                  value={distributionType}
                  onChange={(e) => setDistributionType(e.target.value as 'role' | 'manual')}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                  <option value="role">Por Cargo/Senioridade</option>
                  <option value="manual">Manual por Pessoa</option>
                </select>
              </div>
              {showForm && (
                <EmployeeForm
                  onSubmit={addEmployee}
                  onCancel={() => setShowForm(false)}
                  distributionType={distributionType}
                />
              )}
              <EmployeeList employees={employees} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

const EmployeeForm = ({
  onSubmit,
  onCancel,
  distributionType,
}: {
  onSubmit: (employee: Omit<Employee, 'id'>) => void;
  onCancel: () => void;
  distributionType: 'role' | 'manual';
}) => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [benefits, setBenefits] = useState({
    food: 0,
    meal: 0,
    transport: 0,
    health: 0,
    culture: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, role, benefits });
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 bg-white p-6 rounded-md shadow-md">
      <h2 className="text-xl font-semibold mb-4">Novo Funcionário</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Nome</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Cargo</label>
        <input
          type="text"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          required
        />
      </div>
      {distributionType === 'manual' && (
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Benefícios</h3>
          {Object.entries(benefits).map(([key, value]) => (
            <div key={key} className="mb-4">
              <label className="block text-sm font-medium text-gray-700 capitalize">{key}</label>
              <input
                type="number"
                value={value}
                onChange={(e) =>
                  setBenefits({ ...benefits, [key]: Number(e.target.value) })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                required
              />
            </div>
          ))}
        </div>
      )}
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

const EmployeeList = ({ employees }: { employees: Employee[] }) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Lista de Funcionários</h2>
      {employees.length === 0 ? (
        <p>Nenhum funcionário cadastrado.</p>
      ) : (
        <ul className="space-y-4">
          {employees.map((employee) => (
            <li key={employee.id} className="bg-white p-4 rounded-md shadow">
              <h3 className="text-lg font-medium">{employee.name}</h3>
              <p className="text-sm text-gray-600">Cargo: {employee.role}</p>
              <div className="mt-2">
                <h4 className="text-sm font-medium">Benefícios:</h4>
                <ul className="list-disc list-inside">
                  {Object.entries(employee.benefits).map(([key, value]) => (
                    <li key={key} className="text-sm">
                      {key.charAt(0).toUpperCase() + key.slice(1)}: R$ {value.toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CompanyDashboard;
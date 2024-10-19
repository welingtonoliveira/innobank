import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Users, BarChart2, LogIn } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="bg-indigo-800 text-white w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform -translate-x-full md:relative md:translate-x-0 transition duration-200 ease-in-out">
      <h2 className="text-2xl font-semibold text-center">Inno Benefícios</h2>
      <nav>
        <Link to="/" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-indigo-700 hover:text-white">
          <Home className="inline-block mr-2" size={20} />
          Dashboard
        </Link>
        <Link to="/clients" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-indigo-700 hover:text-white">
          <Users className="inline-block mr-2" size={20} />
          Gerenciar Clientes
        </Link>
        <Link to="/reports" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-indigo-700 hover:text-white">
          <BarChart2 className="inline-block mr-2" size={20} />
          Relatórios
        </Link>
        <Link to="/login" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-indigo-700 hover:text-white">
          <LogIn className="inline-block mr-2" size={20} />
          Login Empresa
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
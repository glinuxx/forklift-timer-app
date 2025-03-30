import { useState, useEffect } from 'react';
import { FaUser, FaSignOutAlt, FaChartBar, FaClock, FaTruck } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import useStats from '../hooks/useStats';
import Timer from './Timer';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('timer');
  const [history, setHistory] = useState([]);

  // Carrega histórico do localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem("timerHistory");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, [activeTab]); // Recarrega quando mudar de aba

  // Usa o hook de estatísticas
  const stats = useStats(history);

  const renderContent = () => {
    switch (activeTab) {
      case 'timer':
        return <Timer />;
      case 'stats':
        return (
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Estatísticas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="flex items-center">
                  <FaTruck className="text-blue-500 mr-3" size={24} />
                  <div>
                    <p className="text-sm text-gray-500">Total de Carretas</p>
                    <p className="text-2xl font-bold text-gray-800">{stats.totalCarretas}</p>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <div className="flex items-center">
                  <FaClock className="text-green-500 mr-3" size={24} />
                  <div>
                    <p className="text-sm text-gray-500">Horas Totais</p>
                    <p className="text-2xl font-bold text-gray-800">{stats.totalHours}h</p>
                  </div>
                </div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                <div className="flex items-center">
                  <FaChartBar className="text-purple-500 mr-3" size={24} />
                  <div>
                    <p className="text-sm text-gray-500">Tempo Médio por Carreta</p>
                    <p className="text-2xl font-bold text-gray-800">{stats.avgTimePerCarreta}</p>
                  </div>
                </div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                <div className="flex items-center">
                  <FaTruck className="text-yellow-500 mr-3" size={24} />
                  <div>
                    <p className="text-sm text-gray-500">Carretas Hoje</p>
                    <p className="text-2xl font-bold text-gray-800">{stats.completedToday}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <Timer />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-800 text-white">
        <div className="p-6">
          <h1 className="text-xl font-bold">Sistema de Controle</h1>
        </div>
        <div className="p-4 border-t border-blue-700">
          <div className="flex items-center mb-4">
            <FaUser className="mr-2" />
            <div>
              <p className="font-semibold">{user?.name || 'Usuário'}</p>
              <p className="text-sm text-blue-300">
                {user?.role === 'operator' ? 'Operador de Empilhadeira' :
                  user?.role === 'supervisor' ? 'Supervisor' : 'Administrador'}
              </p>
            </div>
          </div>
        </div>
        <nav className="mt-6">
          <button
            className={`flex items-center px-6 py-3 w-full text-left ${activeTab === 'timer' ? 'bg-blue-900' : 'hover:bg-blue-700'}`}
            onClick={() => setActiveTab('timer')}
          >
            <FaClock className="mr-3" />
            <span>Cronômetro</span>
          </button>
          <button
            className={`flex items-center px-6 py-3 w-full text-left ${activeTab === 'stats' ? 'bg-blue-900' : 'hover:bg-blue-700'}`}
            onClick={() => setActiveTab('stats')}
          >
            <FaChartBar className="mr-3" />
            <span>Estatísticas</span>
          </button>
          <button
            className="flex items-center px-6 py-3 w-full text-left hover:bg-blue-700 mt-auto"
            onClick={logout}
          >
            <FaSignOutAlt className="mr-3" />
            <span>Sair</span>
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <header className="bg-white shadow-sm">
          <div className="px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {activeTab === 'timer' ? 'Cronômetro de Descarregamento' : 'Painel de Estatísticas'}
            </h2>
          </div>
        </header>
        <main className="p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

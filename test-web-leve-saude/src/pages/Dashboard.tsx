import { useAuth } from '../hooks/useAuth';
import { useState, useEffect } from 'react';
import { 
  UserCircle, 
  LogOut, 
  MessageSquare, 
  Star, 
  Search,
  Filter,
  MoreHorizontal,
  Download,
  TrendingUp,
  Users,
  Bell,
  Eye,
  Check,
  MessageCircle,
  Trash2,
  Send
} from 'lucide-react';
import { BarChart, 
  Bar, 
  ResponsiveContainer,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
  CartesianGrid,
  XAxis,
  YAxis
} from 'recharts';
import { FeedbackDetailsModal, FeedbackResponseModal } from '../components/modals';

type Needle = {
  value: number;
  data: { name: string; value: number; color: string }[];
  cx: number;
  cy: number;
  iR: number;
  oR: number;
  color: string;
};


export default function Dashboard() {
  const { user, signOut } = useAuth();

  // Estados para filtros
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [ratingFilter, setRatingFilter] = useState('todos');
  const [dateFilter, setDateFilter] = useState('todos');
  const [showFilters, setShowFilters] = useState(false);
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [openActionMenuId, setOpenActionMenuId] = useState<number | null>(null);

  // Estados para modais
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<any>(null);

  // Estados para detalhes do feedback
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [detailsFeedback, setDetailsFeedback] = useState<any>(null);

  const cx = 220;
  const cy = 185;
  const iR = 250;
  const oR = 100;
  const value = 50;
  

  const handleSignOut = () => {
    signOut();
  };

  // Fechar menus quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      
      // Verificar se o clique foi fora dos menus
      const isClickOutsideExport = !target.closest('.export-menu');
      const isClickOutsideFilter = !target.closest('.filter-container');
      const isClickOutsideAction = !target.closest('.action-menu');
      const isClickOutsideModal = target.classList.contains('modal-backdrop');
      
      if (isClickOutsideExport) {
        setShowExportMenu(false);
      }
      
      if (isClickOutsideFilter) {
        setShowFilters(false);
      }

      if (isClickOutsideAction) {
        setOpenActionMenuId(null);
      }

      if (isClickOutsideModal) {
        handleCloseResponseModal();
        handleCloseDetailsModal();
      }
    };

    if (showExportMenu || showFilters || openActionMenuId !== null || showResponseModal || showDetailsModal) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showExportMenu, showFilters, openActionMenuId, showResponseModal, showDetailsModal]);

  // Dados mockados para demonstração
 
    const metrics = [
    {
      title: "Total de Feedbacks",
      value: "2,543",
      icon: MessageSquare,
      color: "bg-blue-500",
      change: "+12%",
      changeType: "positive",
    },
    {
      title: "Nota Média",
      value: "4.2",
      icon: Star,
      color: "bg-yellow-500",
      change: "+0.3",
      changeType: "positive",
    },
    {
      title: "Usuários Ativos",
      value: "1,247",
      icon: Users,
      color: "bg-green-500",
      change: "+8%",
      changeType: "positive",
    },
    {
      title: "Taxa de Satisfação",
      value: "87%",
      icon: TrendingUp,
      color: "bg-purple-500",
      change: "+5%",
      changeType: "positive",
    },
  ]

 const feedbacks = [
    {
      id: 1,
      user: "João Silva",
      avatar: "/placeholder.svg?height=32&width=32",
      rating: 5,
      comment: "Excelente atendimento!",
      date: "2024-01-24",
      status: "novo",
    },
    {
      id: 2,
      user: "Maria Santos",
      avatar: "/placeholder.svg?height=32&width=32",
      rating: 4,
      comment: "Muito bom, mas pode melhorar.",
      date: "2024-01-23",
      status: "lido",
    },
    {
      id: 3,
      user: "Pedro Costa",
      avatar: "/placeholder.svg?height=32&width=32",
      rating: 3,
      comment: "Razoável, esperava mais.",
      date: "2024-01-22",
      status: "respondido",
    },
    {
      id: 4,
      user: "Ana Oliveira",
      avatar: "/placeholder.svg?height=32&width=32",
      rating: 5,
      comment: "Superou minhas expectativas!",
      date: "2024-01-21",
      status: "novo",
    },
    {
      id: 5,
      user: "Carlos Mendes",
      avatar: "/placeholder.svg?height=32&width=32",
      rating: 4,
      comment: "Bom serviço, recomendo.",
      date: "2024-01-20",
      status: "lido",
    },
    {
      id: 6,
      user: "Fernanda Lima",
      avatar: "/placeholder.svg?height=32&width=32",
      rating: 2,
      comment: "Não gostei, precisa melhorar.",
      date: "2024-01-19",
      status: "respondido",
    },
    {
      id: 7,
      user: "Lucas Pereira",
      avatar: "/placeholder.svg?height=32&width=32",
      rating: 5,
      comment: "Perfeito, voltarei com certeza!",
      date: "2024-01-18",
      status: "novo",
    },
    {
      id: 8,
      user: "Mariana Almeida",
      avatar: "/placeholder.svg?height=32&width=32",
      rating: 4,
      comment: "Muito bom, mas pode melhorar.",
      date: "2024-01-17",
      status: "lido",
    },
    {
      id: 9,
      user: "Roberto Souza",
      avatar: "/placeholder.svg?height=32&width=32",
      rating: 5,
      comment: "Excelente serviço!",
      date: "2024-01-16",
      status: "novo",
    },
    {
      id: 10,
      user: "Patrícia Rocha",
      avatar: "/placeholder.svg?height=32&width=32",
      rating: 3,
      comment: "Razoável, esperava mais.",
      date: "2024-01-15",
      status: "respondido",
    },
    {
      id: 11,
      user: "Ricardo Martins",
      avatar: "/placeholder.svg?height=32&width=32",
      rating: 4,
      comment: "Bom serviço, recomendo.",
      date: "2024-01-14",
      status: "lido",
    },
    {
      id: 12,
      user: "Juliana Souza",
      avatar: "/placeholder.svg?height=32&width=32",
      rating: 1,
      comment: "Péssimo atendimento.",
      date: "2024-01-13",
      status: "novo",
    },
  ];


  const status = [
    { label: 'NOVO', value: feedbacks.filter(feedback => feedback.status === 'novo').length, color: '#00C49F' },
    { label: 'RESP', value: feedbacks.filter(feedback => feedback.status === 'respondido').length, color: '#FF8042' },
    { label: 'LIDO', value: feedbacks.filter(feedback => feedback.status === 'lido').length, color: '#FFBB28' },
  ];

  const rating = [
    { name: '1 Estrela', value: feedbacks.filter(feedback => feedback.rating === 1).length, color: '#f76f6fff' , data: feedbacks.map(feedback => ({ id: feedback.id, user: feedback.user })) },
    { name: '2 Estrelas', value: feedbacks.filter(feedback => feedback.rating === 2).length, color: '#f3983dff' , data: feedbacks.map(feedback => ({ id: feedback.id, user: feedback.user })) },
    { name: '3 Estrelas', value: feedbacks.filter(feedback => feedback.rating === 3).length, color: '#f8f876ff' , data: feedbacks.map(feedback => ({ id: feedback.id, user: feedback.user })) },
    { name: '4 Estrelas', value: feedbacks.filter(feedback => feedback.rating === 4).length, color: '#aaf360ff' , data: feedbacks.map(feedback => ({ id: feedback.id, user: feedback.user })) },
    { name: '5 Estrelas', value: feedbacks.filter(feedback => feedback.rating === 5).length, color: '#7be97bff' , data: feedbacks.map(feedback => ({ id: feedback.id, user: feedback.user })) },
  ]

  const mediumRating = [
    {name: "abaixo", value: feedbacks.reduce((acc, feedback) => acc + feedback.rating, 0) / feedbacks.length, color: '#f76f6fff'},
    {name: "acima", value: feedbacks.reduce((acc, feedback) => acc + feedback.rating, 0) / feedbacks.length, color: '#f8f876ff'},
    {name: "média", value: feedbacks.reduce((acc, feedback) => acc + feedback.rating, 0) / feedbacks.length, color: '#7be97bff'}
  ]

  // Funções para ações dos feedbacks
  const handleMarkAsRead = (feedbackId: number) => {
    console.log(`Marcando feedback ${feedbackId} como lido`);
    setOpenActionMenuId(null);
    // Simular atualização do status
    alert(`Feedback ${feedbackId} marcado como lido!`);
    // Aqui você adicionaria a lógica para atualizar o status no backend
  };

  const handleMarkAsResponded = (feedbackId: number) => {
    console.log(`Marcando feedback ${feedbackId} como respondido`);
    setOpenActionMenuId(null);
    // Simular atualização do status
    alert(`Feedback ${feedbackId} marcado como respondido!`);
    // Aqui você adicionaria a lógica para atualizar o status no backend
  };

  const handleViewDetails = (feedbackId: number) => {
    const feedback = feedbacks.find(f => f.id === feedbackId);
    if (feedback) {
      setDetailsFeedback(feedback);
      setShowDetailsModal(true);
    }
    setOpenActionMenuId(null);
  };

  const handleDeleteFeedback = (feedbackId: number) => {
    if (window.confirm(`Tem certeza que deseja excluir o feedback #${feedbackId}?`)) {
      console.log(`Excluindo feedback ${feedbackId}`);
      alert(`Feedback ${feedbackId} excluído com sucesso!`);
      setOpenActionMenuId(null);
      // Aqui você adicionaria a lógica para excluir no backend
    }
  };

  const toggleActionMenu = (feedbackId: number) => {
    setOpenActionMenuId(openActionMenuId === feedbackId ? null : feedbackId);
  };

  // Função para abrir modal de resposta
  const handleOpenResponse = (feedback: any) => {
    setSelectedFeedback(feedback);
    setShowResponseModal(true);
    setOpenActionMenuId(null);
  };

  // Função para enviar resposta
  const handleSendResponse = (feedbackId: number, responseText: string) => {
    console.log(`Enviando resposta para feedback ${feedbackId}:`, responseText);
    
    // Simular envio da resposta
    const feedback = feedbacks.find(f => f.id === feedbackId);
    if (feedback) {
      alert(`Resposta enviada com sucesso para ${feedback.user}!\n\nResposta: "${responseText}"`);
    }
    
    // Aqui você adicionaria a lógica para salvar a resposta no backend
    // e atualizar o status do feedback para "respondido"
  };

  // Função para fechar modal de resposta
  const handleCloseResponseModal = () => {
    setShowResponseModal(false);
    setSelectedFeedback(null);
  };

  // Função para fechar modal de detalhes
  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
    setDetailsFeedback(null);
  };

  // Função para contar filtros ativos
  const getActiveFiltersCount = () => {
    let count = 0;
    if (searchTerm) count++;
    if (statusFilter !== 'todos') count++;
    if (ratingFilter !== 'todos') count++;
    if (dateFilter !== 'todos') count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  // Função para resetar todos os filtros
  const resetFilters = () => {
    setSearchTerm('');
    setStatusFilter('todos');
    setRatingFilter('todos');
    setDateFilter('todos');
  };

  
  const filteredFeedbacks = feedbacks.filter(feedback => {
    const matchesSearch = feedback.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         feedback.comment.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'todos' || feedback.status === statusFilter;
    
    const matchesRating = ratingFilter === 'todos' || feedback.rating.toString() === ratingFilter;
    
    let matchesDate = true;
    if (dateFilter !== 'todos') {
      const feedbackDate = new Date(feedback.date);
      const today = new Date();
      
      switch(dateFilter) {
        case 'hoje':
          matchesDate = feedbackDate.toDateString() === today.toDateString();
          break;
        case 'semana':
          const weekAgo = new Date();
          weekAgo.setDate(today.getDate() - 7);
          matchesDate = feedbackDate >= weekAgo;
          break;
        case 'mes':
          const monthAgo = new Date();
          monthAgo.setMonth(today.getMonth() - 1);
          matchesDate = feedbackDate >= monthAgo;
          break;
      }
    }
    
    return matchesSearch && matchesStatus && matchesRating && matchesDate;
  });

  // Função para exportar dados para CSV
  const exportToCSV = () => {
    const headers = ['ID', 'Usuario', 'Avaliacao', 'Comentario', 'Data', 'Status'];
    
    const csvData = filteredFeedbacks.map(feedback => [
      feedback.id,
      `"${feedback.user}"`,
      feedback.rating,
      `"${feedback.comment.replace(/"/g, '""')}"`,
      feedback.date,
      feedback.status
    ]);

    const csvContent = [headers, ...csvData]
      .map(row => row.join(','))
      .join('\n');
    
    const blob = new Blob(['\uFEFF' + csvContent], { 
      type: 'text/csv;charset=utf-8;' 
    });
    
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0]; 
    const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-'); 
    link.setAttribute('download', `feedbacks_${dateStr}_${timeStr}.csv`);
    
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
    setShowExportMenu(false);
  };

  // Função para exportar dados para JSON
  const exportToJSON = () => {
    const exportData = {
      metadata: {
        exportDate: new Date().toISOString(),
        totalRecords: filteredFeedbacks.length,
        filters: {
          search: searchTerm || 'nenhum',
          status: statusFilter,
          rating: ratingFilter
        }
      },
      feedbacks: filteredFeedbacks.map(feedback => ({
        id: feedback.id,
        usuario: feedback.user,
        avaliacao: feedback.rating,
        comentario: feedback.comment,
        data: feedback.date,
        status: feedback.status
      }))
    };
    
    const jsonContent = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonContent], { type: 'application/json' });
    
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    
    const now = new Date();
    const dateStr = now.toISOString().split('T')[0];
    const timeStr = now.toTimeString().split(' ')[0].replace(/:/g, '-');
    link.setAttribute('download', `feedbacks_${dateStr}_${timeStr}.json`);
    
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    URL.revokeObjectURL(url);
    setShowExportMenu(false);
  };

  const RADIAN = Math.PI / 180;

  const needle = ({ value, data, cx, cy, iR, oR, color }: Needle) => {
  const total = data.reduce((sum, entry) => sum + entry.value, 0);
  const ang = 180.0 * (1 - value / total);
  const length = (iR + 2 * oR) / 3;
  const sin = Math.sin(-RADIAN * ang);
  const cos = Math.cos(-RADIAN * ang);
  const r = 5;
  const x0 = cx + 5;
  const y0 = cy + 5;
  const xba = x0 + r * sin;
  const yba = y0 - r * cos;
  const xbb = x0 - r * sin;
  const ybb = y0 + r * cos;
  const xp = x0 + length * cos;
  const yp = y0 + length * sin;

  return [
    <circle key="needle-circle" cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
    <path
      key="needle-path"
      d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`}
      stroke="#none"
      fill={color}
    />,
  ];
};

  return (
    <div className="min-h-screen bg-purple-100">
       <header className="bg-white border-b border-gray-200 px-6 py-4 rounded-b-3xl">
        <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-gray-800">Leve Saúde Dashboard</h1>
              <p className="text-2xl text-gray-600">Gerencie feedbacks e monitore a satisfação</p>
            </div>
            
             <div className="flex items-center gap-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Bell className="w-8 h-8" />
              </button>

              <div className="flex items-center space-x-2">
                <UserCircle className="w-8 h-8 text-gray-600" />
                <span className="text-2xl text-gray-700">{user?.email}</span>
              </div>

              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-8 h-8" />
                <span className="text-2xl">Sair</span>
              </button>
            </div>
        </div>
      </header>

      <main className="w-2/3 mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metrics, index) => (
            <div key={index} className="h-auto bg-white rounded-lg shadow p-6">
              <div className="flex items-center">
                <div className={`${metrics.color} p-3 rounded-lg`}>
                  <metrics.icon className="w-8 h-8 text-white" />
                </div>

                <div className="ml-4">
                  <p className="text-xl font-medium text-gray-600">{metrics.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{metrics.value}</p>
                </div>
              </div>
                <p className="text-xl text-green-600 flex items-center mt-5">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  {metrics.change} desde o mês passado
                </p>
            </div>
          ))}
        </div>

        <div className='flex justify-between items-center mb-8'>
          <div className=' h-85 bg-white w-1/2 rounded-lg py-4 mr-6'>
            <h2 className='text-2xl font-semibold text-gray-800 text-center mb-4'>Distribuição de Avaliações por Nota (Rating)</h2>
            <ResponsiveContainer width="100%" height="80%">
              <BarChart width={150} height={40} data={rating}>
                <XAxis dataKey="name" />
                <YAxis />  
                <CartesianGrid strokeDasharray="3 3" />
                  <Bar dataKey="value" >
                    {rating.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className='flex justify-between items-center w-1/2'>
            <div className='h-85 bg-white w-2/3 rounded-lg py-4 mr-6'>
              <h2 className='text-2xl font-semibold text-gray-800 text-center mb-4'>Proporção de Status dos Feedbacks</h2>
              <ResponsiveContainer width="100%" height="80%">
                <PieChart width={150} height={40}>
                  <Pie
                    dataKey="value"
                    startAngle={180}
                    endAngle={0}
                    data={mediumRating}
                    cx="50%"
                    cy="80%"
                    innerRadius="100"
                    outerRadius="180"
                    fill="#8884d8"
                    stroke="none"
                  >
                    {mediumRating.map((entry) => (
                      <Cell key={`cell-${entry.name}`} fill={entry.color} />
                    ))}
                  </Pie>
                  {needle({ value, data: mediumRating, cx, cy, iR, oR, color: '#797979ff' })}
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className='h-85 bg-white w-2/3 rounded-lg py-4'>
              <h2 className='text-2xl font-semibold text-gray-800 text-center mb-4'>Proporção de Status dos Feedbacks</h2>
              <ResponsiveContainer width="100%" height="80%">
                <PieChart width={150} height={40}>
                  <Tooltip  />
                  <Pie
                    data={status}
                    dataKey="value"
                    fill="#884d98"
                    nameKey="label"
                    innerRadius={60}
                    outerRadius={100}
                    >
                    {status.map((entry) => (
                      <Cell key={`cell-${entry.label}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend layout="vertical" align="right" verticalAlign="middle" iconSize={15} iconType='circle' itemSorter='dataKey' wrapperStyle={{fontSize: '1.5rem', paddingRight: '15px'}} />
                </PieChart>
              </ResponsiveContainer>               
            </div>
          </div> 
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-4xl font-semibold text-gray-800">Feedbacks Recentes</h1>
                <p className="text-2xl text-gray-600">
                  {activeFiltersCount > 0 ? (
                    <span>
                      Mostrando {filteredFeedbacks.length} de {feedbacks.length} feedbacks 
                      <span className="text-purple-600 font-medium"> (filtrados)</span>
                    </span>
                  ) : (
                    <span>Mostrando {filteredFeedbacks.length} feedbacks</span>
                  )}
                </p>
              </div>

              <div className="flex space-x-2">
                <div className="relative">
                  <Search className="absolute  left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-7 h-7" />
                  <input 
                    placeholder="Buscar feedbacks..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-10 text-2xl pl-12 w-90 border border-gray-300 rounded-lg
                     focus:outline-none focus:ring-gray-300 focus:border-gray-300 focus:ring-2" 
                  />
                </div>

                <div className="relative filter-container">
                  <button 
                    className={`p-2 transition-colors relative ${
                      activeFiltersCount > 0 
                        ? 'text-purple-600 hover:text-purple-700' 
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                    onClick={() => setShowFilters(!showFilters)}
                    title={`${activeFiltersCount} filtro(s) ativo(s)`}
                  >
                    <Filter className="w-7 h-7" />
                    {activeFiltersCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {activeFiltersCount}
                      </span>
                    )}
                  </button>
                </div>
                
                {/* Menu de Exportação */}
                <div className="relative export-menu">
                  <button 
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    onClick={() => setShowExportMenu(!showExportMenu)}
                    title="Exportar dados"
                  >
                    <Download className="w-7 h-7"/>
                  </button>

                  {/* Dropdown Menu */}
                  {showExportMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10">
                      <div className="py-2">
                        <button
                          onClick={exportToCSV}
                          className="flex items-center w-full px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <Download className="w-5 h-5 mr-3" />
                          Exportar CSV
                        </button>
                        <button
                          onClick={exportToJSON}
                          className="flex items-center w-full px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 transition-colors"
                        >
                          <Download className="w-5 h-5 mr-3" />
                          Exportar JSON
                        </button>
                        <hr className="my-2" />
                        <div className="px-4 py-2 text-sm text-gray-500">
                          {filteredFeedbacks.length} registro(s) serão exportados
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Painel de Filtros */}
          {showFilters && (
            <div className="px-6 py-4 bg-gray-50 border-b border-gray-200 filter-container">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Filtro por Status */}
                <div>
                  <label className="block text-xl font-medium text-gray-700 mb-2">Status</label>
                  <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="w-full text-xl border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="todos">Todos os Status</option>
                    <option value="novo">Novo</option>
                    <option value="lido">Lido</option>
                    <option value="respondido">Respondido</option>
                  </select>
                </div>

                {/* Filtro por Rating */}
                <div>
                  <label className="block text-xl font-medium text-gray-700 mb-2">Avaliação</label>
                  <select 
                    value={ratingFilter}
                    onChange={(e) => setRatingFilter(e.target.value)}
                    className="w-full text-xl border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="todos">Todas as Notas</option>
                    <option value="5">5 Estrelas</option>
                    <option value="4">4 Estrelas</option>
                    <option value="3">3 Estrelas</option>
                    <option value="2">2 Estrelas</option>
                    <option value="1">1 Estrela</option>
                  </select>
                </div>

                {/* Filtro por Data */}
                <div>
                  <label className="block text-xl font-medium text-gray-700 mb-2">Período</label>
                  <select 
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="w-full text-xl border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="todos">Todas as Datas</option>
                    <option value="hoje">Hoje</option>
                    <option value="semana">Última Semana</option>
                    <option value="mes">Último Mês</option>
                  </select>
                </div>

                {/* Botão para limpar filtros */}
                <div className="flex items-end">
                  <button 
                    onClick={resetFilters}
                    className="px-4 py-2 bg-purple-600 text-white text-xl rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Limpar Filtros
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xl font-medium text-gray-500 uppercase tracking-wider">
                    Usuário
                  </th>
                  <th className="px-6 py-3 text-left text-xl font-medium text-gray-500 uppercase tracking-wider">
                    Nota
                  </th>
                  <th className="px-6 py-3 text-left text-xl font-medium text-gray-500 uppercase tracking-wider">
                    Comentário
                  </th>
                  <th className="px-6 py-3 text-left text-xl font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-left text-xl font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xl font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {filteredFeedbacks.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center">
                      <div className="text-gray-500">
                        <Filter className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                        <p className="text-2xl font-medium">Nenhum feedback encontrado</p>
                        <p className="text-xl mt-2">
                          {activeFiltersCount > 0 
                            ? 'Tente ajustar os filtros para ver mais resultados.' 
                            : 'Não há feedbacks para exibir.'
                          }
                        </p>
                        {activeFiltersCount > 0 && (
                          <button 
                            onClick={resetFilters}
                            className="mt-4 px-4 py-2 bg-purple-600 text-white text-lg rounded-lg hover:bg-purple-700 transition-colors"
                          >
                            Limpar Filtros
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredFeedbacks.map((feedback) => (
                    <tr key={feedback.id} className={`hover:bg-gray-50 ${openActionMenuId === feedback.id ? 'bg-blue-50' : ''}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <UserCircle className="w-8 h-8 text-gray-400" />
                          <div className="ml-3">
                            <div className="text-xl font-medium text-gray-900">{feedback.user}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < feedback.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="ml-2 text-xl text-gray-600">{feedback.rating}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-xl text-gray-900 max-w-xs truncate">{feedback.comment}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-500">
                        {feedback.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-xl text-gray-500">
                        {feedback.status === 'novo' ? (
                          <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xl">
                            {feedback.status.charAt(0).toUpperCase() + feedback.status.slice(1)}
                          </span>
                        ) : (
                          <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xl">
                            {feedback.status.charAt(0).toUpperCase() + feedback.status.slice(1)}
                          </span>
                        )}
                      </td>
                      <td className="px-9 py-4 whitespace-nowrap text-right text-xl font-medium flex justify-start items-center">
                        <div className="relative action-menu">
                          <button 
                            className="text-gray-400 hover:text-gray-600 p-1"
                            onClick={() => toggleActionMenu(feedback.id)}
                            title="Mais ações"
                          >
                            <MoreHorizontal className="w-7 h-7" />
                          </button>

                          {/* Menu de Ações */}
                          {openActionMenuId === feedback.id && (
                            <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                              <div className="py-2">
                                <button
                                  onClick={() => handleViewDetails(feedback.id)}
                                  className="flex items-center w-full px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 transition-colors"
                                >
                                  <Eye className="w-5 h-5 mr-3" />
                                  Ver Detalhes
                                </button>
                                
                                {feedback.status === 'novo' && (
                                  <button
                                    onClick={() => handleMarkAsRead(feedback.id)}
                                    className="flex items-center w-full px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 transition-colors"
                                  >
                                    <Check className="w-5 h-5 mr-3" />
                                    Marcar como Lido
                                  </button>
                                )}
                                
                                {(feedback.status === 'novo' || feedback.status === 'lido') && (
                                  <>
                                    <button
                                      onClick={() => handleMarkAsResponded(feedback.id)}
                                      className="flex items-center w-full px-4 py-2 text-lg text-gray-700 hover:bg-gray-100 transition-colors"
                                    >
                                      <MessageCircle className="w-5 h-5 mr-3" />
                                      Marcar como Respondido
                                    </button>
                                    
                                    <button
                                      onClick={() => handleOpenResponse(feedback)}
                                      className="flex items-center w-full px-4 py-2 text-lg text-blue-600 hover:bg-blue-50 transition-colors"
                                    >
                                      <Send className="w-5 h-5 mr-3" />
                                      Responder
                                    </button>
                                  </>
                                )}
                                
                                <hr className="my-2" />
                                
                                <button
                                  onClick={() => handleDeleteFeedback(feedback.id)}
                                  className="flex items-center w-full px-4 py-2 text-lg text-red-600 hover:bg-red-50 transition-colors"
                                >
                                  <Trash2 className="w-5 h-5 mr-3" />
                                  Excluir Feedback
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Modais */}
      <FeedbackResponseModal
        isOpen={showResponseModal}
        feedback={selectedFeedback}
        onClose={handleCloseResponseModal}
        onSendResponse={handleSendResponse}
      />

      <FeedbackDetailsModal
        isOpen={showDetailsModal}
        feedback={detailsFeedback}
        onClose={handleCloseDetailsModal}
        onMarkAsRead={handleMarkAsRead}
        onMarkAsResponded={handleMarkAsResponded}
        onOpenResponse={handleOpenResponse}
      />
    </div>
  );
}
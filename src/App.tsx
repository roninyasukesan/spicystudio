/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Flame, 
  Search, 
  Info, 
  Crown, 
  MessageSquare, 
  UserCircle, 
  LogOut,
  Save,
  UserPlus,
  Trash2,
  Calendar,
  ShieldCheck,
  Headphones,
  LayoutDashboard,
  Store,
  FileText,
  Users2,
  Wallet,
  Image as ImageIcon,
  BarChart3,
  Share2,
  Settings,
  Bell,
  ChevronDown,
  ExternalLink,
  Plus,
  Clock,
  ArrowRight,
  Eye,
  EyeOff,
  Bot,
  PlayCircle,
  FileStack,
  Lock,
  User,
  Globe,
  Sun,
  Moon,
  Maximize2,
  RefreshCcw,
  Volume2,
  Check,
  CreditCard,
  X,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';

type ViewMode = 'admin' | 'affiliate' | 'onboarding' | 'login' | 'model' | 'client';
type Tab = 'dashboard' | 'creators' | 'approvals' | 'earnings' | 'notifications' | 'settings';
type AffiliateTab = 'dashboard' | 'marketplace' | 'requests' | 'my-affiliations' | 'finance' | 'materials' | 'analytics' | 'referrals' | 'settings';
type ModelTab = 'dashboard' | 'automations' | 'tutorials' | 'reports' | 'withdraw';
type ClientTab = 'explore' | 'feed' | 'favorites' | 'subscriptions' | 'wallet' | 'settings';
type OnboardingStep = 1 | 2 | 3 | 4 | 5;

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Modelo' | 'Cliente';
  plan?: 'Free' | 'VIP';
  passwordHint: string;
}

const INITIAL_USERS: User[] = [
  { id: '1', name: 'Admin', email: 'admin@email.com', role: 'Admin', passwordHint: 'admin1' },
  { id: '2', name: 'Modelo', email: 'modelo@email.com', role: 'Modelo', passwordHint: 'modelo1' },
  { id: '3', name: 'Cliente', email: 'cliente@email.com', role: 'Cliente', plan: 'Free', passwordHint: 'cliente1' },
  { id: '4', name: 'VIP', email: 'vip@email.com', role: 'Cliente', plan: 'VIP', passwordHint: 'vip1' },
  { id: '5', name: 'Laura Diamond', email: 'laura@spicy.com', role: 'Modelo', passwordHint: '123' },
  { id: '6', name: 'Isabella Gold', email: 'isabella@spicy.com', role: 'Modelo', passwordHint: '123' },
  { id: '7', name: 'Sophia Ruby', email: 'sophia@spicy.com', role: 'Modelo', passwordHint: '123' },
  { id: '8', name: 'Valentina', email: 'valentina@spicy.com', role: 'Modelo', passwordHint: '123' },
];

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('login');
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [affiliateTab, setAffiliateTab] = useState<AffiliateTab>('dashboard');
  const [modelTab, setModelTab] = useState<ModelTab>('dashboard');
  const [clientTab, setClientTab] = useState<ClientTab>('explore');
  const [affiliateTheme, setAffiliateTheme] = useState<'light' | 'dark'>('light');
  const [adminTheme, setAdminTheme] = useState<'light' | 'dark'>('dark');
  const [modelTheme, setModelTheme] = useState<'light' | 'dark'>('dark');
  const [clientTheme, setClientTheme] = useState<'light' | 'dark'>('light');
  const [showAddBalanceModal, setShowAddBalanceModal] = useState(false);
  const [selectedBalanceAmount, setSelectedBalanceAmount] = useState<number | null>(100);
  const [customBalanceAmount, setCustomBalanceAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'razorpay' | 'paypal'>('card');
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [onboardingStep, setOnboardingStep] = useState<OnboardingStep>(2);
  const [selectedDocType, setSelectedDocType] = useState<'RG' | 'CNH' | null>(null);
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [newUser, setNewUser] = useState<Partial<User>>({ role: 'Cliente', plan: 'Free' });
  const [showPixModal, setShowPixModal] = useState(false);
  const [pixKey, setPixKey] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  React.useEffect(() => {
    const handleClose = () => setIsSidebarOpen(false);
    window.addEventListener('close-sidebar', handleClose);
    return () => window.removeEventListener('close-sidebar', handleClose);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginForm.username === 'modelo' && loginForm.password === 'modelo1') {
      setViewMode('model');
      setLoginError('');
    } else if (loginForm.username === 'admin' && loginForm.password === 'admin123') {
      setViewMode('admin');
      setLoginError('');
    } else if (loginForm.username === 'afiliado' && loginForm.password === 'afiliado1') {
      setViewMode('affiliate');
      setLoginError('');
    } else if (loginForm.username === 'cliente' && loginForm.password === 'cliente1') {
      setViewMode('client');
      setLoginError('');
    } else {
      setLoginError('Credenciais inválidas');
    }
  };

  const handleAddUser = () => {
    if (newUser.name && newUser.email) {
      const userToAdd: User = {
        id: Math.random().toString(36).substr(2, 9),
        name: newUser.name,
        email: newUser.email,
        role: newUser.role as any,
        plan: newUser.plan as any,
        passwordHint: '123'
      };
      setUsers([...users, userToAdd]);
      setNewUser({ role: 'Cliente', plan: 'Free' });
    }
  };

  const removeUser = (id: string) => {
    setUsers(users.filter(u => u.id !== id));
  };

  if (viewMode === 'login') {
    return (
      <div className="min-h-screen bg-bg-darker flex items-center justify-center p-6 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-zinc-800/20 via-transparent to-transparent">
        <div className="w-full max-w-md">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand mb-6 shadow-2xl shadow-brand/20">
              <Flame size={32} className="text-white fill-white" />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Bem-vindo de volta</h1>
            <p className="text-zinc-500 mt-2">Entre com suas credenciais para acessar o painel</p>
          </div>

          <div className="bg-bg-card border border-border-subtle rounded-3xl p-8 shadow-2xl">
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 px-1">Usuário / Email</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
                  <input 
                    type="text"
                    required
                    value={loginForm.username}
                    onChange={e => setLoginForm({...loginForm, username: e.target.value})}
                    placeholder="modelo"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-4 pl-12 pr-4 text-white placeholder:text-zinc-700 outline-none focus:border-brand transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2 px-1">Senha</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
                  <input 
                    type={showPassword ? "text" : "password"}
                    required
                    value={loginForm.password}
                    onChange={e => setLoginForm({...loginForm, password: e.target.value})}
                    placeholder="modelo1"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-4 pl-12 pr-12 text-white placeholder:text-zinc-700 outline-none focus:border-brand transition-colors"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-400 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {loginError && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 text-sm py-3 px-4 rounded-xl font-medium animate-shake">
                  {loginError}
                </div>
              )}

              <div className="flex items-center justify-between px-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input type="checkbox" className="w-4 h-4 rounded border-zinc-800 bg-zinc-900 text-brand focus:ring-0 focus:ring-offset-0 transition-all" />
                  <span className="text-xs text-zinc-600 group-hover:text-zinc-400 transition-colors">Lembrar-me</span>
                </label>
                <button type="button" className="text-xs text-zinc-600 hover:text-brand transition-colors font-medium">Esqueceu a senha?</button>
              </div>

              <button 
                type="submit"
                className="w-full bg-brand hover:bg-brand-hover text-white font-bold py-4 rounded-xl transition-all active:scale-[0.98] shadow-xl shadow-brand/20 uppercase tracking-widest text-sm"
              >
                Entrar na conta
              </button>
            </form>

            <div className="mt-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px flex-1 bg-zinc-800"></div>
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">Acesso Rápido (Teste)</span>
                <div className="h-px flex-1 bg-zinc-800"></div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setLoginForm({ username: 'admin', password: 'admin123' })}
                  className="bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700/30 p-3 rounded-xl flex flex-col items-center gap-1 transition-all group"
                >
                  <ShieldCheck size={16} className="text-rose-400 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-bold text-zinc-300 uppercase">Admin</span>
                </button>
                <button 
                  onClick={() => setLoginForm({ username: 'modelo', password: 'modelo1' })}
                  className="bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700/30 p-3 rounded-xl flex flex-col items-center gap-1 transition-all group"
                >
                  <Flame size={16} className="text-rose-400 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-bold text-zinc-300 uppercase">Modelo</span>
                </button>
                <button 
                  onClick={() => setLoginForm({ username: 'afiliado', password: 'afiliado1' })}
                  className="bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700/30 p-3 rounded-xl flex flex-col items-center gap-1 transition-all group"
                >
                  <Users2 size={16} className="text-emerald-400 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-bold text-zinc-300 uppercase">Afiliado</span>
                </button>
                <button 
                  onClick={() => setLoginForm({ username: 'cliente', password: 'cliente1' })}
                  className="bg-zinc-800/50 hover:bg-zinc-800 border border-zinc-700/30 p-3 rounded-xl flex flex-col items-center gap-1 transition-all group"
                >
                  <UserCircle size={16} className="text-rose-400 group-hover:scale-110 transition-transform" />
                  <span className="text-[10px] font-bold text-zinc-300 uppercase">Cliente</span>
                </button>
              </div>
            </div>
          </div>

          <p className="text-center mt-8 text-zinc-600 text-sm hover:text-zinc-400 transition-colors cursor-pointer">
            Não tem uma conta? <span className="text-brand font-bold">Cadastre-se</span>
          </p>
        </div>
      </div>
    );
  }

  if (viewMode === 'model') {
    return (
      <div className={`min-h-screen flex transition-colors duration-300 ${modelTheme === 'dark' ? 'bg-[#0a0a0a] text-white' : 'bg-slate-50 text-slate-900'} model-theme overflow-hidden relative`}>
        {/* Mobile Overlay */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black z-[60] md:hidden"
            />
          )}
        </AnimatePresence>

        {/* Sidebar Model */}
        <aside className={`fixed inset-y-0 left-0 z-[70] w-64 border-r flex flex-col shrink-0 transition-all duration-300 md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:w-20 lg:w-64'} ${modelTheme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200 shadow-xl'}`}>
          <div className={`p-6 flex items-center justify-between md:justify-start gap-3 h-20 border-b ${modelTheme === 'dark' ? 'border-zinc-800/50' : 'border-slate-100'}`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-600 flex items-center justify-center shrink-0 shadow-lg shadow-rose-600/40">
                <Flame size={20} className="text-white fill-white" />
              </div>
              <span className={`text-xl font-black tracking-tighter italic md:hidden lg:block ${modelTheme === 'dark' ? 'text-white' : 'text-slate-900'}`}>SPICY</span>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className={`md:hidden transition-colors ${modelTheme === 'dark' ? 'text-zinc-500 hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}>
              <Plus className="rotate-45" size={24} />
            </button>
          </div>

          <div className="p-4 flex-1">
            <div className="mb-8 hidden md:block">
              <div className={`rounded-2xl p-4 border flex items-center gap-3 ${modelTheme === 'dark' ? 'bg-zinc-800/50 border-zinc-700/30 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}>
                <div className="relative">
                  <div className={`w-12 h-12 rounded-xl overflow-hidden ${modelTheme === 'dark' ? 'bg-zinc-700' : 'bg-slate-200'}`}>
                    <div className={`w-full h-full flex items-center justify-center font-bold ${modelTheme === 'dark' ? 'bg-gradient-to-br from-zinc-700 to-zinc-800 text-zinc-500' : 'bg-slate-300 text-slate-400'}`}>
                      <User size={24} />
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full border-4 border-zinc-900 flex items-center justify-center">
                    <ShieldCheck size={10} className="text-white" />
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-bold flex items-center gap-1">
                    👋 Olá, Modelo!
                  </h4>
                  <p className="text-[10px] text-zinc-500 font-medium">money talks</p>
                </div>
              </div>
            </div>

            <nav className="space-y-1">
              <ModelSidebarButton 
                active={modelTab === 'dashboard'} 
                icon={<LayoutDashboard size={20} />} 
                label="Painel" 
                onClick={() => setModelTab('dashboard')} 
                theme={modelTheme}
              />
              <ModelSidebarButton 
                active={modelTab === 'automations'} 
                icon={<Bot size={20} />} 
                label="Automações" 
                onClick={() => setModelTab('automations')} 
                theme={modelTheme}
              />
              <ModelSidebarButton 
                active={modelTab === 'tutorials'} 
                icon={<PlayCircle size={20} />} 
                label="Tutoriais" 
                onClick={() => setModelTab('tutorials')} 
                theme={modelTheme}
              />
              <ModelSidebarButton 
                active={modelTab === 'reports'} 
                icon={<FileStack size={20} />} 
                label="Relatórios" 
                onClick={() => setModelTab('reports')} 
                theme={modelTheme}
              />
              
              <div className="py-4">
                <div className={`h-px w-full ${modelTheme === 'dark' ? 'bg-zinc-800' : 'bg-slate-100'}`}></div>
              </div>

              <ModelSidebarButton 
                active={false} 
                icon={<ShieldCheck size={20} />} 
                label="Meus Dados" 
                onClick={() => setViewMode('onboarding')} 
                theme={modelTheme}
              />
              <ModelSidebarButton 
                active={modelTab === 'withdraw'} 
                icon={<Wallet size={20} />} 
                label="Saque" 
                onClick={() => setModelTab('withdraw')} 
                theme={modelTheme}
              />
              <ModelSidebarButton 
                active={false} 
                icon={<Globe size={20} />} 
                label="Fybot" 
                onClick={() => {}} 
                theme={modelTheme}
              />

              <div className="pt-6 pb-2 px-3 hidden md:block">
                <p className={`text-[10px] uppercase font-bold tracking-widest ${modelTheme === 'dark' ? 'text-zinc-600' : 'text-slate-400'}`}>Meus Links</p>
              </div>

              <div className={`hidden md:block rounded-2xl p-4 border mt-2 ${modelTheme === 'dark' ? 'bg-zinc-800/30 border-zinc-700/20' : 'bg-slate-50 border-slate-200 shadow-sm'}`}>
                <div className="flex items-center gap-3 mb-3 text-xs">
                  <span className="text-rose-400">🧜‍♀️</span>
                  <span className={`font-bold uppercase tracking-wider ${modelTheme === 'dark' ? 'text-zinc-400' : 'text-slate-600'}`}>ID 12145</span>
                </div>
                <div className="flex items-center gap-3 text-[10px] font-bold overflow-hidden">
                  <FileText size={14} className="shrink-0 text-zinc-500" />
                  <span className={`truncate ${modelTheme === 'dark' ? 'text-zinc-500' : 'text-slate-500'}`}>moneytalkstattoo@gmail.com</span>
                </div>
              </div>
            </nav>
          </div>

          <div className={`p-4 border-t flex items-center gap-2 ${modelTheme === 'dark' ? 'border-zinc-800/50' : 'border-slate-100'}`}>
            <button 
              onClick={() => setViewMode('login')}
              className={`flex-1 flex items-center justify-center md:justify-start gap-4 p-4 rounded-2xl transition-all font-bold text-sm ${modelTheme === 'dark' ? 'text-zinc-500 hover:bg-red-500/10 hover:text-red-400' : 'text-slate-500 hover:bg-slate-100'}`}
            >
              <LogOut size={20} />
              <span className="hidden md:block">Sair</span>
            </button>
            <button 
              onClick={() => setModelTheme(modelTheme === 'dark' ? 'light' : 'dark')}
              className={`p-4 rounded-2xl transition-all border ${modelTheme === 'dark' ? 'bg-zinc-800/50 border-zinc-700/30 text-yellow-400 hover:bg-zinc-800' : 'bg-slate-50 border-slate-200 text-slate-400 hover:bg-slate-100'}`}
              title="Alternar Tema"
            >
              {modelTheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </aside>

        {/* Content Area Model */}
        <main className="flex-1 flex flex-col h-screen overflow-hidden w-full">
          {/* Top Navbar Model */}
          <header className={`h-20 border-b px-4 md:px-8 flex items-center justify-between shrink-0 transition-colors ${modelTheme === 'dark' ? 'bg-[#0a0a0a] border-zinc-800/50' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className={`md:hidden p-2.5 rounded-xl border transition-colors ${modelTheme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-zinc-400' : 'bg-slate-100 border-slate-200 text-slate-600'}`}
              >
                <LayoutDashboard size={20} />
              </button>
              <button className={`hidden sm:block p-2.5 rounded-xl border transition-colors ${modelTheme === 'dark' ? 'bg-zinc-800 border-zinc-700 hover:bg-zinc-700' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'}`}>
                <Maximize2 size={18} className="text-zinc-400" />
              </button>
            </div>

            <div className="flex items-center gap-2 md:gap-3">
              <button className={`hidden md:flex p-2.5 rounded-xl border transition-all ${modelTheme === 'dark' ? 'bg-zinc-800 border-zinc-700 hover:bg-zinc-700' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'}`}>
                <RefreshCcw size={18} className="text-zinc-400" />
              </button>
              <button className={`p-2.5 rounded-xl border transition-all relative ${modelTheme === 'dark' ? 'bg-zinc-800 border-zinc-700 hover:bg-zinc-700' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'}`}>
                <Bell size={18} className="text-zinc-400" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className={`hidden sm:flex px-4 py-2.5 rounded-xl border transition-all items-center gap-2 ${modelTheme === 'dark' ? 'bg-zinc-800 border-zinc-700 hover:bg-zinc-700' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'}`}>
                <Globe size={18} className="text-zinc-400" />
                <span className="text-xs font-bold uppercase">BR</span>
              </button>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-4 md:p-10 custom-scrollbar pb-32">
            <AnimatePresence mode="wait">
              {modelTab === 'dashboard' && (
                <motion.div
                  key="model-dashboard"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-10"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className={`text-3xl font-black tracking-tight flex items-center gap-3 ${modelTheme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        Dashboard Financeiro
                        <button className={`p-2 rounded-xl border transition-all ${modelTheme === 'dark' ? 'bg-zinc-800/80 border-zinc-700/50 hover:bg-zinc-700' : 'bg-slate-100 border-slate-200 hover:bg-slate-200'}`}>
                          <Eye size={18} className="text-zinc-500" />
                        </button>
                      </h1>
                      <p className="text-zinc-500 font-medium mt-1">Acompanhe seu desempenho</p>
                    </div>
                    <button className={`border px-6 py-3 rounded-xl flex items-center gap-2 transition-all font-bold text-sm ${modelTheme === 'dark' ? 'bg-zinc-900 border-zinc-800 hover:bg-zinc-800' : 'bg-white border-slate-200 hover:bg-slate-50 shadow-sm'}`}>
                      <RefreshCcw size={16} className="text-zinc-500" />
                      Comparar Período
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <ModelStatCard title="Vendas de hoje" value="R$ 0,00" icon={<span className="text-rose-500">$</span>} theme={modelTheme} />
                    <ModelStatCard title="Vendas do mês" value="R$ 0,00" icon={<BarChart3 size={18} className="text-rose-500" />} theme={modelTheme} />
                    <ModelStatCard title="Saldo a receber" value="R$ 0,00" icon={<Wallet size={18} className="text-rose-500" />} theme={modelTheme} />
                    <ModelStatCard title="Saldo disponível" value="R$ 0,00" icon={<Wallet size={18} className="text-rose-500" />} theme={modelTheme} />
                    <ModelStatCard title="Assinantes" value="0" icon={<Users2 size={18} className="text-rose-500" />} theme={modelTheme} />
                    <ModelStatCard title="Comissão do mês" value="R$ 0,00" theme={modelTheme} extra={<span className="text-[10px] text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full font-bold">0 indicações totais</span>} />
                  </div>

                  {/* Faturamento Chart Section */}
                  <div className={`border rounded-3xl p-8 relative transition-colors ${modelTheme === 'dark' ? 'bg-zinc-900/40 border-zinc-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                    <div className="flex justify-between items-center mb-10">
                      <h3 className={`text-lg font-bold ${modelTheme === 'dark' ? 'text-white' : 'text-slate-950'}`}>Faturamento</h3>
                      <div className={`p-1 rounded-xl flex gap-1 border ${modelTheme === 'dark' ? 'bg-zinc-950 border-zinc-800' : 'bg-slate-100 border-slate-200'}`}>
                        {['1D', '7D', '30D', '3M', '1A', 'Total'].map(t => (
                          <button key={t} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${t === '30D' ? (modelTheme === 'dark' ? 'bg-zinc-800 text-white' : 'bg-white text-slate-900 shadow-sm') : 'text-zinc-600 hover:text-zinc-400'}`}>
                            {t}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="mb-12">
                      <div className="flex items-center gap-2 text-sm font-bold mb-8">
                        <div className="w-3 h-3 rounded-full bg-rose-500/50 animate-pulse"></div>
                        <span className="text-zinc-400">Total Últimos 30 dias</span>
                        <span className={`ml-auto text-3xl font-black ${modelTheme === 'dark' ? 'text-white' : 'text-slate-900'}`}>R$ 0,00</span>
                      </div>

                      {/* Achievement Milestones */}
                      <div className="flex justify-between items-center px-10 relative">
                        <div className={`absolute left-10 right-10 h-0.5 top-1/2 -translate-y-1/2 ${modelTheme === 'dark' ? 'bg-rose-900/20' : 'bg-slate-100'}`}></div>
                        {[100, 250, 500, 750, 1000].map((k, idx) => (
                          <div key={k} className="relative z-10 flex flex-col items-center gap-3">
                            <div className={`w-16 h-20 rounded-xl border flex flex-col items-center justify-center grayscale overflow-hidden group hover:grayscale-0 transition-all cursor-help ${modelTheme === 'dark' ? 'bg-zinc-800 border-zinc-700/50' : 'bg-slate-50 border-slate-200'}`}>
                              <div className={`absolute inset-0 ${modelTheme === 'dark' ? 'bg-gradient-to-t from-zinc-950/80 to-transparent' : 'bg-gradient-to-t from-slate-200/50 to-transparent'}`}></div>
                              <span className="relative z-10 font-black text-zinc-500 text-[10px] tracking-widest">{k}K</span>
                              <div className={`w-8 h-8 rounded-lg absolute bottom-4 ${modelTheme === 'dark' ? 'bg-zinc-700/50' : 'bg-slate-200/50'}`}></div>
                            </div>
                            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">A conquistar</span>
                          </div>
                        ))}
                      </div>
                      <p className="text-[9px] text-zinc-600 italic mt-6 px-1">*Placas ilustrativas de reconhecimento</p>
                    </div>

                    <div className="flex justify-center mt-12">
                      <button className={`border px-8 py-3 rounded-xl flex items-center gap-3 transition-all font-bold text-xs uppercase tracking-widest ${modelTheme === 'dark' ? 'bg-zinc-900 border-zinc-800 hover:bg-zinc-800 shadow-2xl' : 'bg-white border-slate-200 hover:bg-slate-50 shadow-md shadow-slate-200/50'}`}>
                        <FileText size={16} className="text-zinc-500" />
                        Acessar Relatório Completo
                        <ArrowRight size={14} className="text-zinc-600" />
                      </button>
                    </div>
                  </div>

                  {/* Empty Daily Data */}
                  <div className={`border rounded-3xl p-20 flex flex-col items-center justify-center text-center gap-6 ${modelTheme === 'dark' ? 'bg-zinc-900/30 border-zinc-800' : 'bg-white border-slate-100 shadow-sm'}`}>
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-zinc-600 border ${modelTheme === 'dark' ? 'bg-zinc-800/50 border-zinc-700/30' : 'bg-slate-50 border-slate-200'}`}>
                      <BarChart3 size={32} />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-2">Nenhum dado de vendas por hora</h4>
                      <p className="text-zinc-500 text-sm max-w-sm mx-auto">Os dados por horário aparecerão aqui assim que houver vendas</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className={`border rounded-3xl p-8 ${modelTheme === 'dark' ? 'bg-zinc-900/30 border-zinc-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                       <h4 className="font-bold mb-2">Tipos de Monetização</h4>
                       <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest mb-10">Distribuição de vendas do mês atual</p>
                       <div className="h-64 flex items-end justify-between px-10 relative">
                         {['Top Assinantes', 'Chat Picante', 'Grupo VIP', 'Conteúdo Avulso'].map(type => (
                           <div key={type} className="flex flex-col items-center gap-4 flex-1">
                             <div className={`w-1 rounded-full h-full relative ${modelTheme === 'dark' ? 'bg-zinc-800' : 'bg-slate-100'}`}>
                               <div className="absolute -top-6 left-1/2 -translate-x-1/2 font-bold text-[10px] text-zinc-600 whitespace-nowrap">R$ 0,00</div>
                             </div>
                             <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-tighter whitespace-nowrap">{type}</span>
                           </div>
                         ))}
                         <div className={`absolute left-8 bottom-12 flex flex-col gap-14 text-[10px] font-bold ${modelTheme === 'dark' ? 'text-zinc-700' : 'text-slate-300'}`}>
                           <span>R$ 0,00</span>
                           <span>R$ 0,00</span>
                           <span>R$ 0,00</span>
                           <span>0</span>
                         </div>
                       </div>
                    </div>

                    <div className={`border rounded-3xl p-8 ${modelTheme === 'dark' ? 'bg-zinc-900/30 border-zinc-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                       <h4 className="font-bold mb-2">Total por método de pagamento</h4>
                       <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest mb-10">Pix e Cartão do mês atual</p>
                       <div className="h-64 flex items-end justify-around px-10 relative">
                         <div className="flex flex-col items-center gap-4">
                           <div className={`w-1 rounded-full h-full relative ${modelTheme === 'dark' ? 'bg-zinc-800' : 'bg-slate-100'}`}>
                             <div className="absolute -top-6 left-1/2 -translate-x-1/2 font-bold text-[10px] text-zinc-600">R$ 0,00</div>
                           </div>
                           <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Pix</span>
                         </div>
                         <div className="flex flex-col items-center gap-4">
                           <div className={`w-1 rounded-full h-full relative ${modelTheme === 'dark' ? 'bg-zinc-800' : 'bg-slate-100'}`}>
                             <div className="absolute -top-6 left-1/2 -translate-x-1/2 font-bold text-[10px] text-zinc-600">R$ 0,00</div>
                           </div>
                           <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest">Cartão</span>
                         </div>
                         <div className={`absolute left-8 bottom-12 flex flex-col gap-14 text-[10px] font-bold ${modelTheme === 'dark' ? 'text-zinc-700' : 'text-slate-300'}`}>
                           <span>R$ 0,00</span>
                           <span>R$ 0,00</span>
                           <span>0</span>
                         </div>
                       </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className={`border rounded-3xl p-8 ${modelTheme === 'dark' ? 'bg-zinc-900/30 border-zinc-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                      <h4 className="text-sm font-bold mb-1">Semana de maior faturamento (mês passado)</h4>
                      <p className="text-[10px] text-zinc-600 mb-6">Do dia ao dia</p>
                      <div className={`text-3xl font-black ${modelTheme === 'dark' ? 'text-white' : 'text-slate-900'}`}>R$ 0,00</div>
                    </div>
                    <div className={`border rounded-3xl p-8 ${modelTheme === 'dark' ? 'bg-zinc-900/30 border-zinc-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                      <h4 className="text-sm font-bold mb-1">Maior pico de vendas (mês passado)</h4>
                      <p className="text-[10px] text-zinc-600 mb-6">Data --</p>
                      <div className={`text-3xl font-black ${modelTheme === 'dark' ? 'text-white' : 'text-slate-900'}`}>R$ 0,00</div>
                    </div>
                  </div>

                  {/* Previsão de Faturamento */}
                  <div className={`border rounded-3xl p-10 ${modelTheme === 'dark' ? 'bg-zinc-900/30 border-zinc-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                    <div className="mb-10">
                      <h3 className={`text-lg font-bold mb-1 ${modelTheme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Previsão de faturamento (próxima semana)</h3>
                      <p className="text-xs text-zinc-500">Valores referentes ao mesmo período do mês passado</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                      <div className={`rounded-2xl p-6 border ${modelTheme === 'dark' ? 'bg-zinc-950/50 border-zinc-800/50' : 'bg-slate-50 border-slate-100 shadow-sm'}`}>
                        <p className="text-xs font-medium text-zinc-500 mb-1">Previsão de faturamento para essa semana</p>
                        <div className="text-2xl font-black text-rose-500">R$ 829,00</div>
                      </div>
                      <div className={`rounded-2xl p-6 border ${modelTheme === 'dark' ? 'bg-zinc-950/50 border-zinc-800/50' : 'bg-slate-50 border-slate-100 shadow-sm'}`}>
                        <p className="text-xs font-medium text-zinc-500 mb-1">Faturamento atual nesta semana</p>
                        <div className={`text-2xl font-black ${modelTheme === 'dark' ? 'text-white' : 'text-slate-900'}`}>R$ 1.374,00</div>
                      </div>
                    </div>

                    <div className="h-[400px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={[
                          { day: 'Seg', current: 160, prev: 180 },
                          { day: 'Ter', current: 230, prev: 170 },
                          { day: 'Qua', current: 120, prev: 100 },
                          { day: 'Qui', current: 240, prev: 98 },
                          { day: 'Sex', current: 150, prev: 102 },
                          { day: 'Sáb', current: 220, prev: 170 },
                          { day: 'Dom', current: 240, prev: 120 },
                        ]}>
                          <defs>
                            <linearGradient id="colorCur" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.1}/>
                              <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={modelTheme === 'dark' ? "#27272a" : "#f1f5f9"} />
                          <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 12}} />
                          <YAxis axisLine={false} tickLine={false} tick={{fill: '#71717a', fontSize: 12}} />
                          <Tooltip 
                            contentStyle={{ 
                              backgroundColor: modelTheme === 'dark' ? '#18181b' : '#fff', 
                              borderRadius: '12px', 
                              border: modelTheme === 'dark' ? '1px solid #27272a' : '1px solid #f1f5f9' ,
                              boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                              color: modelTheme === 'dark' ? '#fff' : '#000'
                            }}
                            itemStyle={{ color: modelTheme === 'dark' ? '#fff' : '#000' }}
                          />
                          <Area type="monotone" dataKey="current" stroke="#f43f5e" strokeWidth={3} fillOpacity={1} fill="url(#colorCur)" />
                          <Area type="monotone" dataKey="prev" stroke="#10b981" strokeWidth={2} strokeDasharray="5 5" fill="none" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </motion.div>
              )}

              {modelTab === 'reports' && (
                <motion.div
                  key="model-reports"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div>
                    <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
                      Relatórios
                      <button className="bg-zinc-800/80 p-2 rounded-xl border border-zinc-700/50 hover:bg-zinc-700 transition-all">
                        <Eye size={18} className="text-zinc-500" />
                      </button>
                    </h1>
                    <p className="text-zinc-500 font-medium mt-1">Acompanhe suas métricas financeiras</p>
                  </div>

                  <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 space-y-10">
                    <div className="space-y-6">
                      <div className="flex items-center gap-2 text-sm font-bold">
                        <Search size={18} className="text-zinc-500 md:rotate-90" />
                        Filtros
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-zinc-500 flex items-center gap-2">Tipo de Relatório</label>
                          <div className="relative">
                            <Users2 className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                            <select className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-sm font-bold appearance-none outline-none focus:border-rose-500/50 transition-all">
                              <option>Grupo VIP</option>
                              <option>Conteúdo Avulso</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-bold text-zinc-500 flex items-center gap-2">Data Inicial</label>
                          <div className="relative">
                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                            <input type="text" defaultValue="01/04/2026" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-sm font-bold outline-none focus:border-rose-500/50 transition-all" />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <label className="text-xs font-bold text-zinc-500 flex items-center gap-2">Data Final</label>
                          <div className="relative">
                            <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                            <input type="text" defaultValue="30/04/2026" className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 text-sm font-bold outline-none focus:border-rose-500/50 transition-all" />
                          </div>
                        </div>

                        <div className="flex items-end">
                          <button className="w-full py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-bold transition-all text-sm shadow-lg shadow-rose-500/20">
                            Aplicar Filtros
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {['Últimos 7 dias', 'Últimos 30 dias', 'Esta semana', 'Este mês'].map(filter => (
                          <button key={filter} className={`px-4 py-2 rounded-lg border text-xs font-bold transition-all ${filter === 'Últimos 30 dias' ? 'bg-zinc-800 border-zinc-700 text-white shadow-lg' : 'bg-transparent border-zinc-800 text-zinc-500 hover:border-zinc-700'}`}>
                            {filter}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-10 border-t border-zinc-800/50 space-y-6">
                      <label className="text-xs font-bold text-zinc-500">Status</label>
                      <p className="text-[10px] text-zinc-600 -mt-4">Filtre por status da assinatura</p>
                      <div className="relative max-w-full">
                        <select className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-4 px-6 text-sm font-bold appearance-none outline-none focus:border-rose-500/50 transition-all">
                          <option>✓ Todos</option>
                          <option>Ativos</option>
                          <option>Cancelados</option>
                        </select>
                        <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                      </div>
                    </div>
                  </div>

                  <div className="bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl">
                    <div className="p-8 border-b border-zinc-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                      <div>
                        <h3 className="font-bold text-lg">Relatório</h3>
                        <p className="text-xs text-zinc-500 font-medium">Dados detalhados</p>
                        <p className="text-zinc-500 text-[10px] font-bold mt-2">Total Líquido: <span className="text-white">R$ 0,00</span></p>
                      </div>
                      <button className="bg-zinc-950 border border-zinc-800 px-6 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-zinc-900 transition-all">
                        <FileText size={16} />
                        Exportar
                        <ChevronDown size={14} />
                      </button>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className={`border-b text-[11px] font-bold uppercase tracking-widest ${modelTheme === 'dark' ? 'border-zinc-800 text-zinc-500' : 'border-slate-100 text-slate-400'}`}>
                            <th className="py-6 px-8">Data</th>
                            <th className="py-6 px-4">Produto</th>
                            <th className="py-6 px-4">Status</th>
                            <th className="py-6 px-4">Valor Bruto</th>
                            <th className="py-6 px-4">Liquido</th>
                            <th className="py-6 px-4 text-right pr-8">Comissão</th>
                          </tr>
                        </thead>
                        <tbody className={`divide-y ${modelTheme === 'dark' ? 'divide-zinc-800/50' : 'divide-slate-50'}`}>
                          {[1, 2, 3, 4, 5].map((item) => (
                            <tr key={item} className={`text-xs transition-colors group ${modelTheme === 'dark' ? 'hover:bg-zinc-800/30' : 'hover:bg-slate-50'}`}>
                              <td className="py-6 px-8 text-zinc-400">05/05/2026</td>
                              <td className={`py-6 px-4 font-bold transition-colors tracking-tight ${modelTheme === 'dark' ? 'text-white group-hover:text-rose-500' : 'text-slate-900 group-hover:text-rose-600'}`}>Conteúdo Exclusivo - Galeria Privada</td>
                              <td className="py-6 px-4">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border shadow-lg ${modelTheme === 'dark' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 shadow-emerald-500/5' : 'bg-emerald-50 text-emerald-600 border-emerald-200 shadow-emerald-200/20'}`}>Pago</span>
                              </td>
                              <td className="py-6 px-4 text-zinc-500 font-bold">R$ 149,90</td>
                              <td className={`py-6 px-4 font-black ${modelTheme === 'dark' ? 'text-zinc-300' : 'text-slate-900'}`}>R$ 127,42</td>
                              <td className="py-6 px-4 text-right pr-8 text-rose-500 font-black">15%</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="p-20 text-center flex flex-col items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-zinc-800/50 flex items-center justify-center text-zinc-600 border border-zinc-700/30">
                          <BarChart3 size={24} />
                        </div>
                        <p className="text-sm font-bold text-zinc-600">Mostrando os lançamentos mais recentes</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {modelTab === 'withdraw' && (
                <motion.div
                  key="model-withdraw"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div>
                      <h1 className={`text-3xl font-black tracking-tight flex items-center gap-3 ${modelTheme === 'dark' ? 'text-white' : 'text-slate-950'}`}>
                        Configurações de Saque
                        <button className={`p-2 rounded-xl border transition-all ${modelTheme === 'dark' ? 'bg-zinc-800/80 border-zinc-700/50 hover:bg-zinc-700' : 'bg-slate-100 border-slate-200 hover:bg-slate-200'}`}>
                          <Eye size={18} className="text-zinc-500" />
                        </button>
                      </h1>
                      <p className="text-zinc-500 font-medium mt-1">Gerencie seus recebimentos e configure sua chave PIX para repasses</p>
                    </div>
                    <button 
                      onClick={() => setShowPixModal(true)}
                      className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3.5 rounded-2xl flex items-center gap-3 transition-all font-bold text-sm shadow-xl shadow-rose-500/30 group"
                    >
                      <Settings size={18} className="group-hover:rotate-90 transition-transform duration-500" />
                      Configurar Chave PIX
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className={`p-8 rounded-[2.5rem] relative overflow-hidden group border ${modelTheme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                      <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                      <div className="relative z-10 space-y-6">
                        <div>
                          <h4 className="text-[10px] font-black text-rose-500 mb-1 uppercase tracking-[0.2em]">Saldo Disponível</h4>
                          <div className={`text-5xl font-black tracking-tighter ${modelTheme === 'dark' ? 'text-white' : 'text-slate-950'}`}>R$ 0,00</div>
                        </div>
                        <div className={`pt-6 border-t flex flex-col gap-1 ${modelTheme === 'dark' ? 'border-zinc-800/50' : 'border-slate-100'}`}>
                          <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Limite Mínimo</div>
                          <div className={`text-sm font-bold ${modelTheme === 'dark' ? 'text-zinc-300' : 'text-slate-600'}`}>R$ 50,00 por operação</div>
                        </div>
                        <button className={`w-full py-5 rounded-2xl font-bold transition-all disabled:opacity-50 cursor-not-allowed uppercase tracking-widest text-xs border ${modelTheme === 'dark' ? 'bg-zinc-800 border-zinc-700/50 text-zinc-500' : 'bg-slate-50 border-slate-200 text-slate-400'}`}>
                          Solicitar Saque
                        </button>
                      </div>
                    </div>

                    <div className={`p-8 rounded-[2.5rem] flex flex-col justify-between border-dashed border ${modelTheme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-300 shadow-sm'}`}>
                      <div>
                        <div className="flex items-center justify-between mb-8">
                          <h4 className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Configuração PIX</h4>
                          <div className={`w-10 h-10 rounded-xl border flex items-center justify-center ${modelTheme === 'dark' ? 'bg-zinc-800 border-zinc-700/50' : 'bg-slate-50 border-slate-100'}`}>
                            <Wallet size={18} className="text-zinc-500" />
                          </div>
                        </div>
                        {pixKey ? (
                          <div className="bg-rose-500/5 p-6 rounded-2xl border border-rose-500/20 relative group">
                            <p className="text-[9px] text-rose-500 font-black uppercase tracking-widest mb-2 opacity-60">Chave PIX Cadastrada</p>
                            <p className={`text-lg font-black tracking-tight ${modelTheme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{pixKey}</p>
                            <button className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors">
                              <ExternalLink size={14} />
                            </button>
                          </div>
                        ) : (
                          <div className={`p-6 rounded-2xl text-zinc-500 text-xs font-medium italic text-center border-dashed border ${modelTheme === 'dark' ? 'bg-zinc-950 border-zinc-800' : 'bg-slate-50 border-slate-200'}`}>
                            Nenhuma chave PIX vinculada à sua conta
                          </div>
                        )}
                      </div>
                      <div className="bg-rose-500/5 p-4 rounded-xl border border-rose-500/10 mt-6">
                        <p className="text-[9px] text-rose-400/80 font-bold leading-relaxed flex gap-2">
                          <Info size={12} className="shrink-0" />
                          Os repasses são processados em até 24h úteis após a solicitação. A chave PIX deve ser do mesmo titular.
                        </p>
                      </div>
                    </div>

                    <div className={`p-8 rounded-[2.5rem] flex flex-col items-center justify-center text-center gap-6 shadow-2xl border ${modelTheme === 'dark' ? 'bg-gradient-to-br from-zinc-800 to-zinc-900 border-zinc-700/50 shadow-black/50' : 'bg-white border-slate-200/50 shadow-slate-200/40'}`}>
                      <div className={`w-16 h-16 rounded-3xl flex items-center justify-center text-rose-500 border ${modelTheme === 'dark' ? 'bg-zinc-900 border-zinc-700/50' : 'bg-slate-50 border-slate-200'}`}>
                        <Crown size={28} />
                      </div>
                      <div>
                        <h4 className={`font-black mb-2 uppercase tracking-tight ${modelTheme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Clube de Benefícios</h4>
                        <p className="text-xs text-zinc-400 leading-relaxed font-bold px-4">
                          Novos níveis de comissão e saques instantâneos liberados em breve para influenciadoras Elite.
                        </p>
                      </div>
                      <button className="text-[10px] font-black text-rose-500 uppercase tracking-widest hover:underline">
                        Ver requisitos
                      </button>
                    </div>
                  </div>

                  <div className={`rounded-[2.5rem] overflow-hidden shadow-2xl border ${modelTheme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200 shadow-sm'}`}>
                    <div className={`p-8 border-b flex justify-between items-center ${modelTheme === 'dark' ? 'border-zinc-800 bg-zinc-900/50' : 'border-slate-100 bg-slate-50/50'}`}>
                      <h3 className={`font-black tracking-tight uppercase tracking-widest text-sm ${modelTheme === 'dark' ? 'text-zinc-400' : 'text-slate-400'}`}>Histórico de Movimentações</h3>
                      <div className="flex items-center gap-2 text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
                        <Clock size={12} />
                        Últimos saques solicitados
                      </div>
                    </div>
                    <div className="p-24 flex flex-col items-center justify-center text-center gap-6">
                      <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center text-zinc-800 border group-hover:scale-110 transition-transform ${modelTheme === 'dark' ? 'bg-zinc-950 border-zinc-800' : 'bg-slate-50 border-slate-100'}`}>
                        <Wallet size={32} />
                      </div>
                      <div className="space-y-2">
                        <p className={`font-black text-lg ${modelTheme === 'dark' ? 'text-zinc-200' : 'text-slate-900'}`}>Ainda não há nada por aqui</p>
                        <p className="text-zinc-500 text-xs font-medium max-w-xs mx-auto">Suas solicitações de saque e histórico de pagamentos aparecerão nesta lista.</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Floating Support Button */}
          <button className="fixed bottom-8 right-8 w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-500 to-rose-700 text-white flex items-center justify-center shadow-2xl shadow-rose-500/40 hover:scale-110 transition-transform z-50">
            <Headphones size={24} />
          </button>
          
          {/* PIX Configuration Modal */}
          <AnimatePresence>
            {showPixModal && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowPixModal(false)}
                  className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                />
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  className="relative w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-[2rem] p-8 shadow-2xl overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-8">
                      <div className="w-12 h-12 rounded-2xl bg-zinc-800 border border-zinc-700/50 flex items-center justify-center text-rose-500">
                        <Wallet size={24} />
                      </div>
                      <button 
                        onClick={() => setShowPixModal(false)}
                        className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-500 transition-colors"
                      >
                        <Plus className="rotate-45" size={24} />
                      </button>
                    </div>

                    <div className="mb-8">
                      <h3 className="text-2xl font-black text-white mb-2">Configurar PIX</h3>
                      <p className="text-zinc-500 text-sm font-medium">Informe sua chave PIX para receber seus repasses automaticamente.</p>
                    </div>

                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Chave PIX (E-mail, CPF, Celular ou Aleatória)</label>
                        <input 
                          type="text"
                          placeholder="Sua chave aqui..."
                          value={pixKey}
                          onChange={(e) => setPixKey(e.target.value)}
                          className="w-full bg-zinc-950 border border-zinc-800 rounded-2xl py-4 px-6 text-white font-bold outline-none focus:border-rose-500/50 transition-all placeholder:text-zinc-700"
                        />
                      </div>

                      <div className="bg-rose-500/5 p-4 rounded-xl border border-rose-500/10 flex gap-3 text-[10px] text-rose-400 font-bold leading-relaxed">
                        <Info size={16} className="shrink-0" />
                        Atenção: A chave deve ser de titularidade do mesmo CPF/CNPJ enviado no onboarding.
                      </div>

                      <button 
                        onClick={() => setShowPixModal(false)}
                        className="w-full py-4 bg-rose-500 hover:bg-rose-600 text-white rounded-2xl font-black transition-all shadow-xl shadow-rose-500/20 uppercase tracking-widest text-sm"
                      >
                        Salvar Chave PIX
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
          
          <div className="fixed bottom-24 right-8 w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center shadow-2xl border border-rose-500/30 hover:bg-rose-500/30 transition-all z-50">
             <Volume2 size={20} />
          </div>
        </main>
      </div>
    );
  }

  if (viewMode === 'onboarding') {
    return (
      <div className="min-h-screen bg-bg-darker text-white pb-20 onboarding-theme">
        {/* Top Navbar Onboarding */}
        <div className="flex justify-center py-8">
          <div className="bg-bg-card border border-border-subtle p-1 rounded-2xl flex gap-1 shadow-2xl">
            <button 
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${
                onboardingStep <= 5 ? 'bg-white text-zinc-900 shadow-lg' : 'text-zinc-500'
              }`}
            >
              <span role="img" aria-label="doc">📋</span>
              Meus Dados
            </button>
            <button className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold text-zinc-500 hover:text-zinc-300 transition-all">
              <span role="img" aria-label="user">👤</span>
              Perfil
            </button>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-8">
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1.5 h-10 bg-rose-600 rounded-full"></div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Meus Dados</h1>
                <p className="text-zinc-500 text-sm font-medium">Valide seus documentos para utilizar a plataforma</p>
              </div>
            </div>
          </header>

          {/* Stepper */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold">
                {onboardingStep === 2 && "Seleção de Documento"}
                {onboardingStep === 3 && "Upload de Documentos"}
              </h2>
              <div className="bg-onboarding-primary/20 text-onboarding-primary text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-onboarding-primary/30">
                Etapa {onboardingStep} de 5
              </div>
            </div>
            <p className="text-zinc-500 text-sm mb-8">
              {onboardingStep === 2 && "Escolha o tipo de documento que deseja enviar"}
              {onboardingStep === 3 && "Envie fotos claras e legíveis dos seus documentos"}
            </p>

            <div className="flex items-center gap-1 md:gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
              {[1, 2, 3, 4, 5].map((step) => (
                <React.Fragment key={step}>
                  <div 
                    className={`w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center text-[10px] md:text-xs font-bold transition-all shrink-0 ${
                      step === onboardingStep 
                        ? 'bg-onboarding-accent text-white scale-110 shadow-lg shadow-onboarding-accent/20' 
                        : step < onboardingStep 
                          ? 'bg-onboarding-accent/20 text-onboarding-accent' 
                          : 'bg-bg-card border border-border-subtle text-zinc-600'
                    }`}
                  >
                    {step < onboardingStep ? '\u2713' : step}
                  </div>
                  {step < 5 && (
                    <div className={`step-line ${step < onboardingStep ? 'step-line-active' : ''}`}></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {onboardingStep === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-bg-card border border-border-subtle rounded-3xl p-10 shadow-sm"
              >
                <div className="mb-8">
                  <button 
                    onClick={() => setViewMode('model')}
                    className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm font-bold"
                  >
                    <ArrowRight className="rotate-180" size={16} />
                    Voltar
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                  <DocTypeCard 
                    title="RG (Registro Geral)"
                    desc="Documento de identidade emitido pela SSP"
                    icon={<FileText size={32} />}
                    selected={selectedDocType === 'RG'}
                    onClick={() => setSelectedDocType('RG')}
                  />
                  <DocTypeCard 
                    title="CNH (Carteira de Habilitação)"
                    desc="Carteira Nacional de Habilitação"
                    icon={<div className="font-bold border-2 border-current rounded px-1 text-sm uppercase">CNH</div>}
                    selected={selectedDocType === 'CNH'}
                    onClick={() => setSelectedDocType('CNH')}
                  />
                </div>

                <button 
                  onClick={() => selectedDocType && setOnboardingStep(3)}
                  disabled={!selectedDocType}
                  className={`w-full py-4 rounded-xl font-bold transition-all uppercase tracking-widest text-sm ${
                    selectedDocType 
                      ? 'bg-onboarding-primary hover:bg-onboarding-primary-hover text-white shadow-lg shadow-onboarding-primary/20' 
                      : 'bg-zinc-800 text-zinc-500 cursor-not-allowed opacity-50'
                  }`}
                >
                  Selecione um documento
                </button>
              </motion.div>
            )}

            {onboardingStep === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-bg-card border border-border-subtle rounded-3xl p-10"
              >
                <div className="mb-8">
                  <button 
                    onClick={() => setOnboardingStep(2)}
                    className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-sm font-bold"
                  >
                    <ArrowRight className="rotate-180" size={16} />
                    Voltar
                  </button>
                </div>

                <div className="mb-10">
                  <h3 className="text-xl font-bold mb-2">Envie seus documentos</h3>
                  <p className="text-zinc-500 text-sm">Você selecionou {selectedDocType}. Envie fotos claras e legíveis.</p>
                </div>

                <div className="space-y-12">
                  <UploadSection 
                    title={`1. ${selectedDocType} do titular`}
                    subtitle={`Envie foto da frente do documento e verso se disponível`}
                  >
                    <div className="grid grid-cols-1 gap-4">
                      <UploadField label={`Frente do ${selectedDocType}`} />
                      <UploadField label={`Verso do ${selectedDocType} (opcional)`} />
                    </div>
                  </UploadSection>

                  <UploadSection 
                    title="2. Foto do Rosto (Selfie)"
                    subtitle="Apenas uma foto normal do seu rosto, sem segurar documento"
                  >
                    <UploadField label="Tire uma foto ou envie sua selfie" limit="5MB" />
                    <div className="mt-4 flex items-center gap-3 bg-zinc-900/50 p-4 rounded-xl border border-border-subtle/50 text-zinc-400 text-xs">
                      <Info size={16} className="text-zinc-500" />
                      Envie uma selfie comum olhando para a câmera. Não é necessário segurar nenhum documento.
                    </div>
                  </UploadSection>

                  <UploadSection 
                    title="3. Comprovante de Residência"
                    subtitle="Envie 1 (um) comprovante recente: conta de luz, água, internet, telefone ou extrato bancário com no máximo 90 dias"
                  >
                    <UploadField label="Envie ou tire foto do comprovante" />
                    <div className="mt-4 flex items-center gap-3 bg-zinc-900/50 p-4 rounded-xl border border-border-subtle/50 text-zinc-400 text-xs">
                      <Info size={16} className="text-zinc-500" />
                      O comprovante de residência deve estar no nome do titular do documento
                    </div>
                  </UploadSection>
                </div>

                <div className="mt-12">
                  <button 
                    onClick={() => {
                      setViewMode('model');
                      setOnboardingStep(1);
                    }}
                    className="w-full py-4 bg-onboarding-primary hover:bg-onboarding-primary-hover text-white rounded-xl font-bold transition-all uppercase tracking-widest text-sm shadow-xl shadow-onboarding-primary/20"
                  >
                    Processar Documentos
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    );
  }

  if (viewMode === 'client') {
    return (
      <div className={`min-h-screen flex client-theme overflow-hidden relative transition-colors duration-300 ${clientTheme === 'dark' ? 'bg-zinc-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black z-[60] md:hidden"
            />
          )}
        </AnimatePresence>

        {/* Sidebar Client */}
        <aside className={`fixed inset-y-0 left-0 z-[70] w-64 border-r flex flex-col shrink-0 transition-transform duration-300 md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} ${clientTheme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200'}`}>
          <div className={`p-6 flex items-center justify-between gap-3 h-20 border-b ${clientTheme === 'dark' ? 'border-zinc-800/50' : 'border-slate-100'}`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-600 flex items-center justify-center shrink-0 shadow-lg shadow-rose-600/40">
                <Flame size={20} className="text-white fill-white" />
              </div>
              <span className={`text-xl font-black tracking-tighter italic ${clientTheme === 'dark' ? 'text-white' : 'text-slate-900'}`}>SPICY</span>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className={`md:hidden transition-colors ${clientTheme === 'dark' ? 'text-zinc-500 hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}>
              <Plus className="rotate-45" size={24} />
            </button>
          </div>

          <div className="p-4 flex-1">
            <nav className="space-y-1">
              <p className={`px-3 text-[10px] uppercase font-black tracking-[0.2em] mb-4 mt-2 ${clientTheme === 'dark' ? 'text-zinc-600' : 'text-slate-400'}`}>Navegação</p>
              <ClientSidebarButton 
                active={clientTab === 'explore'} 
                icon={<Search size={20} />} 
                label="Explorar" 
                onClick={() => setClientTab('explore')} 
                theme={clientTheme}
              />
              <ClientSidebarButton 
                active={clientTab === 'feed'} 
                icon={<LayoutDashboard size={20} />} 
                label="Meu Feed" 
                onClick={() => setClientTab('feed')} 
                theme={clientTheme}
              />
              <ClientSidebarButton 
                active={clientTab === 'favorites'} 
                icon={<Sun size={20} />} 
                label="Favoritos" 
                onClick={() => setClientTab('favorites')} 
                theme={clientTheme}
              />
              <ClientSidebarButton 
                active={clientTab === 'subscriptions'} 
                icon={<Crown size={20} />} 
                label="Minhas Assinaturas" 
                onClick={() => setClientTab('subscriptions')} 
                theme={clientTheme}
              />
              
              <p className={`px-3 text-[10px] uppercase font-black tracking-[0.2em] mb-4 mt-10 ${clientTheme === 'dark' ? 'text-zinc-600' : 'text-slate-400'}`}>Financeiro</p>
              <ClientSidebarButton 
                active={clientTab === 'wallet'} 
                icon={<Wallet size={20} />} 
                label="Minha Carteira" 
                onClick={() => setClientTab('wallet')} 
                theme={clientTheme}
              />
              
              <p className={`px-3 text-[10px] uppercase font-black tracking-[0.2em] mb-4 mt-10 ${clientTheme === 'dark' ? 'text-zinc-600' : 'text-slate-400'}`}>Conta</p>
              <ClientSidebarButton 
                active={clientTab === 'settings'} 
                icon={<Settings size={20} />} 
                label="Configurações" 
                onClick={() => setClientTab('settings')} 
                theme={clientTheme}
              />
            </nav>
          </div>

          <div className={`p-4 border-t ${clientTheme === 'dark' ? 'border-zinc-800/50' : 'border-slate-100'}`}>
            <button 
              onClick={() => setViewMode('login')}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all font-bold text-sm ${clientTheme === 'dark' ? 'text-zinc-500 hover:bg-red-500/10 hover:text-red-400' : 'text-slate-500 hover:bg-slate-50 hover:text-red-600'}`}
            >
              <LogOut size={20} />
              <span>Sair</span>
            </button>
          </div>
        </aside>

        {/* Content Area Client */}
        <main className="flex-1 flex flex-col h-screen overflow-hidden w-full">
          <header className={`h-20 border-b px-4 md:px-8 flex items-center justify-between shrink-0 sticky top-0 z-50 transition-colors ${clientTheme === 'dark' ? 'bg-zinc-950 border-zinc-800/50' : 'bg-white border-slate-200 shadow-sm'}`}>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className={`md:hidden p-2 transition-colors ${clientTheme === 'dark' ? 'text-zinc-400 hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}
              >
                <LayoutDashboard size={24} />
              </button>
              <div className="relative hidden sm:block">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                <input 
                  type="text" 
                  placeholder="Pesquisar modelos..." 
                  className={`border rounded-2xl py-2.5 pl-12 pr-6 text-sm font-medium outline-none focus:border-rose-500/50 transition-all w-64 lg:w-96 ${clientTheme === 'dark' ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              <button 
                onClick={() => setClientTheme(clientTheme === 'dark' ? 'light' : 'dark')}
                className={`p-2 rounded-xl border transition-all ${clientTheme === 'dark' ? 'bg-zinc-900 border-zinc-800 text-yellow-400 hover:bg-zinc-800' : 'bg-slate-50 border-slate-200 text-slate-400 hover:bg-slate-100'}`}
                title="Alternar Tema"
              >
                {clientTheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <button 
                onClick={() => setShowAddBalanceModal(true)}
                className={`hidden lg:flex items-center gap-2 px-4 py-2 rounded-2xl border transition-all hover:scale-105 active:scale-95 cursor-pointer ${clientTheme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-slate-50 border-slate-200'}`}
              >
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className={`text-[10px] font-black uppercase tracking-widest ${clientTheme === 'dark' ? 'text-zinc-400' : 'text-slate-500'}`}>Saldo: R$ 0,00</span>
                <Plus size={14} className={`ml-2 ${clientTheme === 'dark' ? 'text-zinc-500' : 'text-slate-400'}`} />
              </button>
              <button className={`p-2.5 rounded-xl transition-all relative ${clientTheme === 'dark' ? 'bg-zinc-900 hover:bg-zinc-800 text-zinc-400' : 'bg-slate-50 hover:bg-slate-100 text-slate-500'}`}>
                <Bell size={20} />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-zinc-950"></span>
              </button>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold border ${clientTheme === 'dark' ? 'bg-zinc-800 text-rose-400 border-zinc-700/50' : 'bg-slate-100 text-rose-600 border-slate-200'}`}>
                C
              </div>
            </div>
          </header>

          <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
            <AnimatePresence mode="wait">
              {clientTab === 'explore' && (
                <motion.div
                  key="client-explore"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-10 pb-20"
                >
                  <section>
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h2 className={`text-2xl font-black tracking-tight ${clientTheme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Destaques da Semana</h2>
                        <p className="text-zinc-500 text-sm font-medium">As criadoras mais populares do momento</p>
                      </div>
                      <button className="text-[10px] font-black text-rose-400 uppercase tracking-widest hover:underline">Ver todas</button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {users.filter(u => u.role === 'Modelo').map((model, idx) => (
                        <div key={model.id} className={`group relative rounded-[2.5rem] overflow-hidden border transition-all hover:-translate-y-2 ${clientTheme === 'dark' ? 'bg-zinc-900 border-zinc-800 hover:border-rose-500/30' : 'bg-white border-slate-200 shadow-sm hover:border-rose-200 hover:shadow-xl'}`}>
                          <div className="aspect-[3/4] relative overflow-hidden">
                            <img 
                              src={`https://images.unsplash.com/photo-${1500000000000 + idx * 123456}?auto=format&fit=crop&w=400&q=80`} 
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                              alt={model.name} 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60"></div>
                            
                            <div className="absolute top-6 left-6 flex gap-2">
                               <span className="bg-rose-600 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">Popular</span>
                            </div>
                            
                            <button className="absolute top-6 right-6 p-2.5 bg-black/40 backdrop-blur-md rounded-xl text-white hover:bg-rose-600 transition-all opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-300">
                              <Sun size={18} />
                            </button>
                          </div>
                          
                          <div className="p-6 relative">
                            <div className="flex justify-between items-end">
                              <div>
                                <h3 className={`text-lg font-black tracking-tight group-hover:text-rose-400 transition-colors ${clientTheme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{model.name}</h3>
                                <p className="text-xs text-zinc-500 font-medium">@lauradiamond</p>
                              </div>
                              <div className="text-right">
                                <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest leading-none mb-1">A partir de</p>
                                <p className="text-lg font-black text-emerald-500">R$ 49,90</p>
                              </div>
                            </div>
                            
                            <button className={`w-full mt-6 py-3.5 text-white rounded-2xl font-black transition-all flex items-center justify-center gap-3 text-xs uppercase tracking-widest shadow-xl group/btn overflow-hidden relative ${clientTheme === 'dark' ? 'bg-zinc-800 hover:bg-rose-600' : 'bg-slate-900 hover:bg-rose-600'}`}>
                              <span className="relative z-10">Assinar agora</span>
                              <Crown size={14} className="relative z-10 transform group-hover/btn:rotate-12 transition-transform" />
                              <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-purple-600 opacity-0 group-hover/btn:opacity-100 transition-opacity"></div>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section className={`rounded-[3rem] p-10 relative overflow-hidden border ${clientTheme === 'dark' ? 'bg-zinc-900/40 border-zinc-800' : 'bg-white border-slate-100 shadow-xl shadow-rose-900/5'}`}>
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                      <div className="max-w-md">
                        <span className="bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full border border-emerald-500/20 mb-6 inline-block">Plano VIP</span>
                        <h2 className={`text-4xl font-black tracking-tighter mb-4 leading-tight ${clientTheme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Acesso Ilimitado ao conteúdo Premium</h2>
                        <p className={`font-medium text-lg leading-relaxed mb-8 ${clientTheme === 'dark' ? 'text-zinc-500' : 'text-slate-500'}`}>
                          Assine o plano VIP e tenha acesso a todas as galerias exclusivas de nossas top modelos sem restrições.
                        </p>
                        <div className="flex flex-wrap gap-4">
                          <button className={`px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${clientTheme === 'dark' ? 'bg-white text-black hover:bg-zinc-200' : 'bg-slate-900 text-white hover:bg-rose-600'}`}>Seja VIP Agora</button>
                          <button className={`px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs border transition-all ${clientTheme === 'dark' ? 'bg-zinc-800 text-white border-zinc-700 hover:bg-zinc-700' : 'bg-white text-slate-900 border-slate-200 hover:bg-slate-50'}`}>Saiba Mais</button>
                        </div>
                      </div>
                      <div className="relative">
                        <div className={`w-64 h-64 md:w-80 md:h-96 rounded-[3rem] border-8 shadow-2xl overflow-hidden transform rotate-6 hover:rotate-0 transition-transform duration-500 ${clientTheme === 'dark' ? 'bg-zinc-800 border-zinc-900' : 'bg-white border-white'}`}>
                           <img src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80" className="w-full h-full object-cover grayscale opacity-50" alt="VIP Content Preview" />
                           <div className="absolute inset-0 flex items-center justify-center">
                              <Crown size={64} className="text-rose-500/20" />
                           </div>
                        </div>
                        <div className="absolute -bottom-6 -left-6 bg-rose-600 p-6 rounded-3xl shadow-2xl shadow-rose-600/40 animate-bounce-slow">
                          <Flame size={32} className="text-white fill-white" />
                        </div>
                      </div>
                    </div>
                    <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-[100px] -mr-48 -mt-48"></div>
                  </section>
                </motion.div>
              )}

              {clientTab === 'subscriptions' && (
                <motion.div
                  key="client-subs"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div>
                    <h2 className={`text-3xl font-black tracking-tight ${clientTheme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Minhas Assinaturas</h2>
                    <p className="text-zinc-500 font-medium">Gerencie seus planos ativos e expirados</p>
                  </div>

                  <div className={`rounded-[2.5rem] p-20 flex flex-col items-center text-center gap-6 border ${clientTheme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-100 shadow-sm'}`}>
                    <div className={`w-20 h-20 rounded-[2rem] flex items-center justify-center border ${clientTheme === 'dark' ? 'bg-zinc-800 text-zinc-600 border-zinc-700/50' : 'bg-slate-50 text-slate-300 border-slate-100'}`}>
                      <Crown size={32} />
                    </div>
                    <div>
                      <h3 className={`text-xl font-black mb-2 ${clientTheme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Você ainda não assinou ninguém</h3>
                      <p className="text-zinc-500 text-sm max-w-sm mx-auto">Explore nosso marketplace e encontre sua modelo favorita para começar a acompanhar conteúdos exclusivos.</p>
                    </div>
                    <button 
                      onClick={() => setClientTab('explore')}
                      className="px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-rose-600/20 transition-all"
                    >
                      Ir para Explore
                    </button>
                  </div>
                </motion.div>
              )}

              {clientTab === 'wallet' && (
                <motion.div
                  key="client-wallet"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div>
                    <h2 className={`text-3xl font-black tracking-tight ${clientTheme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Minha Carteira</h2>
                    <p className="text-zinc-500 font-medium">Adicione saldo para assinar suas criadoras favoritas</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className={`p-8 rounded-[2.5rem] border shadow-sm ${clientTheme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-100 shadow-xl shadow-rose-950/5'}`}>
                      <h4 className={`text-[10px] font-black uppercase tracking-[0.2em] mb-6 ${clientTheme === 'dark' ? 'text-zinc-500' : 'text-slate-400'}`}>Saldo Atual</h4>
                      <div className={`text-5xl font-black mb-2 ${clientTheme === 'dark' ? 'text-white' : 'text-slate-900'}`}>R$ 0,00</div>
                      <p className="text-emerald-500 text-[10px] font-bold uppercase tracking-widest">Saldo disponível para uso</p>
                      
                      <button 
                        onClick={() => setShowAddBalanceModal(true)}
                        className="w-full mt-10 py-5 bg-rose-600 hover:bg-rose-700 text-white rounded-[1.5rem] font-black uppercase tracking-widest text-xs shadow-xl shadow-rose-600/20 transition-all flex items-center justify-center gap-3"
                      >
                        <Plus size={20} />
                        Adicionar Saldo
                      </button>
                    </div>

                    <div className={`p-8 rounded-[2.5rem] border shadow-sm ${clientTheme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-100'}`}>
                      <h4 className={`text-[10px] font-black uppercase tracking-[0.2em] mb-6 ${clientTheme === 'dark' ? 'text-zinc-500' : 'text-slate-400'}`}>Últimas Transações</h4>
                      <div className="space-y-4">
                        <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 border-dashed ${clientTheme === 'dark' ? 'border-zinc-800 text-zinc-800' : 'border-slate-100 text-slate-200'}`}>
                            <RefreshCcw size={20} />
                          </div>
                          <p className="text-xs font-medium text-zinc-500">Nenhuma transação encontrada</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>

        {/* Add Balance Modal */}
        <AnimatePresence>
          {showAddBalanceModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowAddBalanceModal(false)}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              />
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className={`relative w-full max-w-md rounded-[2.5rem] overflow-hidden border shadow-2xl ${clientTheme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-slate-900 border-zinc-800'}`}
              >
                <div className="p-8">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                        <Wallet size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl font-black text-white">Add Balance</h3>
                        <p className="text-zinc-500 text-xs font-medium">Current balance: $ 40.00</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setShowAddBalanceModal(false)}
                      className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* Select Amount */}
                  <div className="space-y-4 mb-8">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Select Amount</p>
                    <div className="grid grid-cols-3 gap-3">
                      {[10, 25, 50, 100, 250, 500].map((amount) => (
                        <button 
                          key={amount}
                          onClick={() => {
                            setSelectedBalanceAmount(amount);
                            setCustomBalanceAmount('');
                          }}
                          className={`py-3 rounded-xl border text-sm font-black transition-all flex items-center justify-center gap-2 relative ${
                            selectedBalanceAmount === amount 
                              ? 'bg-emerald-500/10 border-emerald-500 text-white' 
                              : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700'
                          }`}
                        >
                          ${amount}
                          {selectedBalanceAmount === amount && (
                            <div className="absolute top-2 right-2 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
                              <Check size={10} className="text-black font-bold" />
                            </div>
                          )}
                        </button>
                      ))}
                    </div>
                    
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-bold">$</span>
                      <input 
                        type="text" 
                        value={customBalanceAmount}
                        onChange={(e) => {
                          setCustomBalanceAmount(e.target.value);
                          setSelectedBalanceAmount(null);
                        }}
                        placeholder="Custom amount"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-4 pl-8 pr-6 text-sm font-medium text-white outline-none focus:border-zinc-700 transition-all"
                      />
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="space-y-4 mb-10">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Payment Method</p>
                    <div className="space-y-2">
                       <button 
                        onClick={() => setPaymentMethod('card')}
                        className={`w-full p-4 rounded-2xl border transition-all flex items-center gap-4 ${
                          paymentMethod === 'card' 
                            ? 'bg-emerald-500/5 border-emerald-500/30' 
                            : 'bg-zinc-900/50 border-zinc-800'
                        }`}
                       >
                         <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${paymentMethod === 'card' ? 'bg-emerald-500 text-black' : 'bg-zinc-800 text-zinc-500'}`}>
                           <CreditCard size={20} />
                         </div>
                         <div className="flex-1 text-left">
                            <div className="flex items-center gap-2">
                              <span className={`text-sm font-bold ${paymentMethod === 'card' ? 'text-white' : 'text-zinc-400'}`}>Credit Card</span>
                              <span className="bg-rose-500/20 text-rose-500 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md">Popular</span>
                            </div>
                         </div>
                         {paymentMethod === 'card' && <div className="w-2 h-2 rounded-full bg-emerald-500"></div>}
                       </button>

                       <button 
                        onClick={() => setPaymentMethod('razorpay')}
                        className={`w-full p-4 rounded-2xl border transition-all flex items-center gap-4 ${
                          paymentMethod === 'razorpay' 
                            ? 'bg-emerald-500/5 border-emerald-500/30' 
                            : 'bg-zinc-900/50 border-zinc-800'
                        }`}
                       >
                         <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${paymentMethod === 'razorpay' ? 'bg-emerald-500 text-black' : 'bg-zinc-800 text-zinc-500'}`}>
                           <RefreshCcw size={20} />
                         </div>
                         <div className="flex-1 text-left">
                            <span className={`text-sm font-bold ${paymentMethod === 'razorpay' ? 'text-white' : 'text-zinc-400'}`}>Razorpày</span>
                         </div>
                         {paymentMethod === 'razorpay' && <div className="w-2 h-2 rounded-full bg-emerald-500"></div>}
                       </button>

                       <button 
                        onClick={() => setPaymentMethod('paypal')}
                        className={`w-full p-4 rounded-2xl border transition-all flex items-center gap-4 ${
                          paymentMethod === 'paypal' 
                            ? 'bg-emerald-500/5 border-emerald-500/30' 
                            : 'bg-zinc-900/50 border-zinc-800'
                        }`}
                       >
                         <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${paymentMethod === 'paypal' ? 'bg-emerald-500 text-black' : 'bg-zinc-800 text-zinc-500'}`}>
                           <span className="font-bold text-xs">P</span>
                         </div>
                         <div className="flex-1 text-left">
                            <span className={`text-sm font-bold ${paymentMethod === 'paypal' ? 'text-white' : 'text-zinc-400'}`}>PayPal</span>
                         </div>
                         {paymentMethod === 'paypal' && <div className="w-2 h-2 rounded-full bg-emerald-500"></div>}
                       </button>
                    </div>
                  </div>

                  {/* Submit Area */}
                  <div className="space-y-4">
                    <button className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-black rounded-2xl font-black transition-all flex items-center justify-center gap-3 text-xs uppercase tracking-widest shadow-xl shadow-emerald-500/20">
                      <Wallet size={16} />
                      Pay ${selectedBalanceAmount || customBalanceAmount || '0'}.00 Securely
                    </button>
                    
                    <div className="flex items-center justify-center gap-2 text-[10px] text-emerald-500 font-bold uppercase tracking-widest">
                      <ShieldCheck size={14} />
                      Protected by bank-grade encryption & fraud prevention.
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    );
  }


  if (viewMode === 'affiliate') {
    return (
      <div className={`min-h-screen flex relative transition-colors duration-300 ${affiliateTheme === 'dark' ? 'bg-zinc-950 text-white' : 'bg-slate-50 text-slate-900'} affiliate-theme`}>
        {/* Mobile Overlay */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black z-[60] md:hidden"
            />
          )}
        </AnimatePresence>
        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-[70] w-64 border-r flex flex-col shrink-0 transition-all duration-300 md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} ${affiliateTheme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200'}`}>
          <div className={`p-6 flex items-center justify-between gap-2 mb-4 border-b ${affiliateTheme === 'dark' ? 'border-zinc-800' : 'border-slate-50'}`}>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-rose-600 flex items-center justify-center shadow-lg shadow-rose-600/40">
                <Flame className="text-white fill-white" size={20} />
              </div>
              <span className={`text-xl font-black tracking-tighter italic ${affiliateTheme === 'dark' ? 'text-white' : 'text-slate-900'}`}>SPICY</span>
            </div>
            <button onClick={() => setIsSidebarOpen(false)} className={`md:hidden transition-colors ${affiliateTheme === 'dark' ? 'text-zinc-500 hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}>
              <Plus className="rotate-45" size={24} />
            </button>
          </div>

          <nav className="flex-1 px-4 space-y-1">
            <AffiliateNavButton 
              active={false} 
              icon={<ShieldCheck size={20} />} 
              label="Meus Dados (Onboarding)" 
              onClick={() => setViewMode('onboarding')} 
              theme={affiliateTheme}
            />
            <p className={`px-2 text-[10px] font-bold uppercase tracking-widest mb-2 mt-6 ${affiliateTheme === 'dark' ? 'text-zinc-600' : 'text-slate-400'}`}>Menu</p>
            <AffiliateNavButton 
              active={affiliateTab === 'dashboard'} 
              icon={<LayoutDashboard size={20} />} 
              label="Dashboard" 
              onClick={() => setAffiliateTab('dashboard')} 
              theme={affiliateTheme}
            />
            <AffiliateNavButton 
              active={affiliateTab === 'marketplace'} 
              icon={<Store size={20} />} 
              label="Marketplace" 
              onClick={() => setAffiliateTab('marketplace')} 
              theme={affiliateTheme}
            />
            <AffiliateNavButton 
              active={affiliateTab === 'requests'} 
              icon={<Users2 size={20} />} 
              label="Solicitações" 
              onClick={() => setAffiliateTab('requests')} 
              theme={affiliateTheme}
            />
            <AffiliateNavButton 
              active={affiliateTab === 'my-affiliations'} 
              icon={<Users2 size={20} />} 
              label="Minhas afiliações" 
              onClick={() => setAffiliateTab('my-affiliations')} 
              theme={affiliateTheme}
            />
            <AffiliateNavButton 
              active={affiliateTab === 'finance'} 
              icon={<Wallet size={20} />} 
              label="Financeiro" 
              onClick={() => setAffiliateTab('finance')} 
              theme={affiliateTheme}
            />
            <AffiliateNavButton 
              active={affiliateTab === 'materials'} 
              icon={<ImageIcon size={20} />} 
              label="Materiais" 
              onClick={() => setAffiliateTab('materials')} 
              theme={affiliateTheme}
            />
            <AffiliateNavButton 
              active={affiliateTab === 'analytics'} 
              icon={<BarChart3 size={20} />} 
              label="Análises" 
              onClick={() => setAffiliateTab('analytics')} 
              theme={affiliateTheme}
            />
            <AffiliateNavButton 
              active={affiliateTab === 'referrals'} 
              icon={<Share2 size={20} />} 
              label="Indicações" 
              onClick={() => setAffiliateTab('referrals')} 
              theme={affiliateTheme}
            />
          </nav>

          <footer className={`p-4 border-t italic space-y-1 ${affiliateTheme === 'dark' ? 'border-zinc-800' : 'border-slate-100'}`}>
            <AffiliateNavButton 
              active={affiliateTab === 'settings'} 
              icon={<Settings size={20} />} 
              label="Configurações" 
              onClick={() => setAffiliateTab('settings')} 
              theme={affiliateTheme}
            />
            <AffiliateNavButton 
              active={false} 
              icon={<LogOut size={20} />} 
              label="Sair" 
              onClick={() => setViewMode('login')} 
              theme={affiliateTheme}
            />
          </footer>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col h-screen overflow-y-auto w-full">
          {/* Top Bar */}
          <header className={`h-16 border-b px-4 md:px-8 flex items-center justify-between sticky top-0 z-10 transition-colors ${affiliateTheme === 'dark' ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-slate-200'}`}>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className={`md:hidden p-2 rounded-lg ${affiliateTheme === 'dark' ? 'bg-zinc-900 text-zinc-400' : 'bg-slate-100 text-slate-600'}`}
              >
                <LayoutDashboard size={20} />
              </button>
              <div className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium ${affiliateTheme === 'dark' ? 'bg-rose-500/10 border border-rose-500/20 text-rose-400' : 'bg-rose-50 border border-rose-100 text-rose-700'}`}>
                <span role="img" aria-label="wave">📣</span>
                Ganhe dinheiro
              </div>
            </div>

            <div className="flex items-center gap-2 md:gap-4">
              <button 
                onClick={() => setAffiliateTheme(affiliateTheme === 'dark' ? 'light' : 'dark')}
                className={`p-2 rounded-xl border transition-all ${affiliateTheme === 'dark' ? 'bg-zinc-900 border-zinc-800 text-yellow-400 hover:bg-zinc-800' : 'bg-slate-50 border-slate-200 text-slate-400 hover:bg-slate-100'}`}
                title="Alternar Tema"
              >
                {affiliateTheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              <button 
                onClick={() => setViewMode('admin')}
                className={`hidden md:block text-[10px] uppercase font-bold transition-colors mr-4 ${affiliateTheme === 'dark' ? 'text-zinc-500 hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}
              >
                Voltar para Admin
              </button>
              <div className={`flex items-center gap-2 md:gap-3 p-1 pr-3 rounded-xl border min-w-0 ${affiliateTheme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-slate-50 border-slate-200'}`}>
                <div className="w-8 h-8 rounded-lg bg-slate-300 flex items-center justify-center text-slate-600 font-bold text-xs shrink-0 uppercase">
                  M
                </div>
                <span className={`hidden sm:block text-xs font-semibold truncate max-w-[100px] ${affiliateTheme === 'dark' ? 'text-zinc-300' : 'text-slate-700'}`}>moneytalks...</span>
                <ChevronDown size={14} className="text-slate-400 hidden sm:block" />
              </div>
              <button className={`relative p-2 transition-colors ${affiliateTheme === 'dark' ? 'text-zinc-500 hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}>
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
              </button>
            </div>
          </header>

          <main className="p-4 md:p-8 pb-20">
            <AnimatePresence mode="wait">
              {affiliateTab === 'dashboard' && (
                <motion.div
                  key="dashboard"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  <div className="mb-8">
                    <h1 className={`text-3xl font-bold ${affiliateTheme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Dashboard</h1>
                    <div className="flex items-center gap-2 text-slate-500 text-sm mt-1">
                      <span>Seus resultados serão exibidos aqui em tempo real</span>
                      <span className="flex items-center gap-1">
                        <Clock size={14} /> Atualizado
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Level Card */}
                    <div className={`p-6 rounded-2xl border shadow-sm transition-colors ${affiliateTheme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-100'}`}>
                      <div className="flex justify-between items-center mb-6">
                        <h3 className={`font-semibold ${affiliateTheme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Nível Starter</h3>
                      </div>
                      <div className={`flex justify-between text-xs font-bold mb-2 font-mono ${affiliateTheme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        <span>R$ 0,00</span>
                        <span>R$ 50.000,00</span>
                      </div>
                      <div className={`w-full h-3 rounded-full overflow-hidden mb-2 ${affiliateTheme === 'dark' ? 'bg-zinc-800' : 'bg-rose-100'}`}>
                        <div className="w-1/3 h-full bg-rose-500 rounded-full"></div>
                      </div>
                      <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        <span>Starter</span>
                        <span>Bronze</span>
                      </div>
                    </div>

                    {/* Welcome Card */}
                    <div className="bg-gradient-to-br from-rose-500 to-rose-600 p-6 rounded-2xl text-white relative overflow-hidden shadow-lg shadow-rose-500/20">
                      <div className="relative z-10">
                        <span className="bg-white/20 text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-white/10">Plataforma de afiliados</span>
                        <h2 className="text-2xl font-bold mt-6 flex items-center gap-2">
                          Bem-vindo à SPICY 👋
                        </h2>
                        <p className="text-rose-100 mt-2 text-sm max-w-[280px]">
                          Estrutura completa para impulsionar o seu crescimento
                        </p>
                      </div>
                      <div className="absolute right-[-20px] top-[-20px] opacity-30 transform rotate-12">
                        <Flame size={180} className="fill-white" />
                      </div>
                    </div>
                  </div>

                  {/* Profit Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <DashboardStatCard label="Total de vendas" value="R$ 0,00" sub="desde o início" theme={affiliateTheme} />
                    <DashboardStatCard label="Comissões ganhas" value="R$ 0,00" sub="desde o início" theme={affiliateTheme} />
                    <DashboardStatCard 
                      label="Saldo disponível" 
                      value="R$ 0,00" 
                      theme={affiliateTheme}
                      action={<button className={`text-[10px] font-bold border px-3 py-2 rounded-lg transition-colors ${affiliateTheme === 'dark' ? 'text-zinc-400 border-zinc-800 hover:bg-zinc-800' : 'text-slate-500 border-slate-200 hover:bg-slate-50'}`}>Solicitar saque</button>} 
                    />
                  </div>

                  {/* Actions Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                    <ActionCard 
                      icon={<Users2 size={20} className="text-rose-500" />} 
                      title="Novos criadores" 
                      desc="Descubra criadores no marketplace e envie solicitações." 
                      bg="bg-rose-500/10"
                      theme={affiliateTheme}
                    />
                    <ActionCard 
                      icon={<ImageIcon size={20} className="text-rose-500" />} 
                      title="Materiais de marketing" 
                      desc="Encontre imagens e conteúdos prontos para divulgar." 
                      bg="bg-rose-500/10"
                      theme={affiliateTheme}
                    />
                    <ActionCard 
                      icon={<Wallet size={20} className="text-rose-500" />} 
                      title="Solicitar saque" 
                      desc="Envie uma solicitação para transferir o valor para sua conta." 
                      bg="bg-rose-500/10"
                      theme={affiliateTheme}
                    />
                    <ActionCard 
                      icon={<ShieldCheck size={20} className="text-rose-500" />} 
                      title="Gerenciar afiliações" 
                      desc="Acompanhe as criadoras às quais você está afiliado." 
                      bg="bg-rose-500/10"
                      theme={affiliateTheme}
                    />
                  </div>

                  {/* Recent Activity */}
                  <div className={`border rounded-2xl overflow-hidden mt-8 shadow-sm ${affiliateTheme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200'}`}>
                    <div className={`p-6 border-b flex justify-between items-center ${affiliateTheme === 'dark' ? 'border-zinc-800' : 'border-slate-100'}`}>
                      <h3 className={`font-bold ${affiliateTheme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Vendas recentes</h3>
                      <button className={`text-xs font-bold border px-3 py-1.5 rounded-lg transition-colors ${affiliateTheme === 'dark' ? 'text-zinc-500 border-zinc-800 hover:bg-zinc-800' : 'text-zinc-500 border-slate-200 hover:bg-slate-50'}`}>Ver todas</button>
                    </div>
                    <div className="min-h-[300px] flex flex-col items-center justify-center p-12 text-zinc-500">
                      <p className="text-sm">Nenhuma venda recente encontrada.</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {affiliateTab === 'marketplace' && (
                <motion.div
                  key="marketplace"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="mb-10">
                    <h1 className={`text-3xl font-bold ${affiliateTheme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Marketplace</h1>
                    <p className="text-zinc-500 mt-2 text-sm lg:text-base">
                      Explore perfis, escolha conteúdos que combinam com a sua audiência e garanta comissões por cada venda realizada.
                    </p>
                  </div>

                  <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-8">
                    <div className={`flex gap-4 border-b w-full lg:w-auto ${affiliateTheme === 'dark' ? 'border-zinc-800' : 'border-slate-100'}`}>
                      <button className="py-2 px-1 border-b-2 border-rose-500 text-rose-500 font-bold text-sm">Geral</button>
                      <button className="py-2 px-1 text-zinc-500 font-bold text-sm hover:text-rose-500 transition-colors">Em alta</button>
                    </div>
                    <div className="flex items-center gap-3 w-full lg:w-auto">
                      <div className="relative flex-1 lg:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
                        <input className={`w-full border-none rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none ring-rose-500/20 focus:ring-2 transition-all ${affiliateTheme === 'dark' ? 'bg-zinc-900 text-white' : 'bg-slate-100 text-slate-900'}`} placeholder="Pesquisar" />
                      </div>
                      <button className={`border p-2.5 rounded-xl transition-all ${affiliateTheme === 'dark' ? 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:bg-zinc-800' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'}`}>
                        <Calendar size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    <CreatorCard name="Laura Diamond" username="@lauradiamond" commission="10%" img="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=300&q=80" theme={affiliateTheme} />
                    <CreatorCard name="Isabella Gold" username="@isabellagold" commission="10%" img="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80" theme={affiliateTheme} />
                    <CreatorCard name="Sophia Ruby" username="@sophiaruby" commission="50%" img="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80" theme={affiliateTheme} />
                    <CreatorCard name="Valentina" username="@valentina" commission="20%" img="https://images.unsplash.com/photo-1517841905240-472988bad1fa?auto=format&fit=crop&w=300&q=80" theme={affiliateTheme} />
                  </div>
                </motion.div>
              )}

              {affiliateTab === 'finance' && (
                <motion.div
                  key="finance"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  <div className="mb-10">
                    <h1 className={`text-4xl font-black tracking-tight ${affiliateTheme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Financeiro & Saques</h1>
                    <p className="text-zinc-500 mt-2 text-sm lg:text-base font-medium">
                      Gerencie suas comissões, configure sua chave PIX e realize transferências.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Withdrawal Panel */}
                    <div className="lg:col-span-2 space-y-6">
                      <div className={`p-8 rounded-[2.5rem] border shadow-sm ${affiliateTheme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-100 shadow-xl shadow-rose-950/5'}`}>
                        <div className="flex items-center justify-between mb-8">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-500">
                              <Wallet size={24} />
                            </div>
                            <div>
                              <h3 className={`text-xl font-black ${affiliateTheme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Solicitar Saque</h3>
                              <p className="text-zinc-500 text-sm font-medium">Transferência instantânea via PIX</p>
                            </div>
                          </div>
                          <span className="bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-emerald-500/20">Ativo</span>
                        </div>

                        <div className="space-y-6">
                          <div className={`p-6 rounded-3xl border ${affiliateTheme === 'dark' ? 'bg-zinc-950 border-zinc-800' : 'bg-slate-50 border-slate-200'}`}>
                            <label className={`text-[10px] font-black uppercase tracking-[0.2em] mb-3 block ${affiliateTheme === 'dark' ? 'text-zinc-600' : 'text-slate-400'}`}>Valor do Saque</label>
                            <div className="flex items-baseline gap-2">
                              <span className={`text-2xl font-black ${affiliateTheme === 'dark' ? 'text-zinc-400' : 'text-slate-400'}`}>R$</span>
                              <input 
                                type="text" 
                                placeholder="0,00"
                                className={`text-5xl font-black bg-transparent outline-none w-full ${affiliateTheme === 'dark' ? 'text-white placeholder-zinc-800' : 'text-slate-900 placeholder-slate-200'}`}
                              />
                            </div>
                            <div className="mt-4 flex items-center justify-between">
                              <p className="text-xs font-medium text-zinc-500">Saldo disponível: <span className="text-rose-500 font-bold">R$ 0,00</span></p>
                              <button className="text-[10px] font-black text-rose-500 uppercase tracking-widest hover:underline">Sacar tudo</button>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className={`p-4 rounded-2xl border ${affiliateTheme === 'dark' ? 'bg-zinc-950 border-zinc-800' : 'bg-slate-50 border-slate-200'}`}>
                              <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-1">Taxa de Saque</span>
                              <span className={`text-sm font-bold ${affiliateTheme === 'dark' ? 'text-white' : 'text-slate-900'}`}>R$ 3,90</span>
                            </div>
                            <div className={`p-4 rounded-2xl border ${affiliateTheme === 'dark' ? 'bg-zinc-950 border-zinc-800' : 'bg-slate-50 border-slate-200'}`}>
                              <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest block mb-1">Prazo</span>
                              <span className={`text-sm font-bold ${affiliateTheme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Instantâneo</span>
                            </div>
                          </div>

                          <button className="w-full py-5 bg-rose-600 hover:bg-rose-700 text-white rounded-[1.5rem] font-black uppercase tracking-widest text-xs shadow-xl shadow-rose-600/20 transition-all flex items-center justify-center gap-3">
                            Confirmar Saque
                            <ArrowRight size={16} />
                          </button>
                        </div>
                      </div>

                      {/* PIX Configuration */}
                      <div className={`p-8 rounded-[2.5rem] border shadow-sm ${affiliateTheme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-100'}`}>
                        <div className="flex items-center gap-4 mb-8">
                          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-500">
                            <Flame size={24} />
                          </div>
                          <div>
                            <h3 className={`text-xl font-black ${affiliateTheme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Configurar PIX</h3>
                            <p className="text-zinc-500 text-sm font-medium">Vincule sua chave para recebimentos</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className={`text-[10px] font-black uppercase tracking-widest ${affiliateTheme === 'dark' ? 'text-zinc-500' : 'text-slate-400'}`}>Tipo de Chave</label>
                            <select className={`w-full py-4 px-6 rounded-2xl border outline-none font-bold transition-all focus:ring-2 focus:ring-rose-500/20 ${affiliateTheme === 'dark' ? 'bg-zinc-950 border-zinc-800 text-white focus:border-rose-500/50' : 'bg-white border-slate-200 text-slate-900 focus:border-rose-500'}`}>
                              <option>CPF</option>
                              <option>E-mail</option>
                              <option>Celular</option>
                              <option>Chave Aleatória</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <label className={`text-[10px] font-black uppercase tracking-widest ${affiliateTheme === 'dark' ? 'text-zinc-500' : 'text-slate-400'}`}>Chave PIX</label>
                            <input 
                              type="text" 
                              placeholder="suachave@exemplo.com"
                              className={`w-full py-4 px-6 rounded-2xl border outline-none font-bold transition-all focus:ring-2 focus:ring-rose-500/20 ${affiliateTheme === 'dark' ? 'bg-zinc-950 border-zinc-800 text-white focus:border-rose-500/50' : 'bg-white border-slate-200 text-slate-900 focus:border-rose-200'}`} 
                            />
                          </div>
                        </div>
                        
                        <button className="mt-6 px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white rounded-2xl font-black uppercase tracking-widest text-xs transition-all">
                          Atualizar Chave
                        </button>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className={`p-8 rounded-[2.5rem] border shadow-sm ${affiliateTheme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-100 shadow-xl shadow-rose-950/5'}`}>
                        <h4 className={`text-[10px] font-black uppercase tracking-[0.2em] mb-6 ${affiliateTheme === 'dark' ? 'text-zinc-500' : 'text-slate-400'}`}>Resumo financeiro</h4>
                        
                        <div className="space-y-6">
                          <div className="flex justify-between items-center">
                            <span className="text-zinc-500 text-sm font-medium">Saldo total</span>
                            <span className={`text-lg font-black ${affiliateTheme === 'dark' ? 'text-white' : 'text-slate-900'}`}>R$ 0,00</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-zinc-500 text-sm font-medium">Em processamento</span>
                            <span className={`text-lg font-black ${affiliateTheme === 'dark' ? 'text-white' : 'text-slate-900'}`}>R$ 0,00</span>
                          </div>
                          <div className="pt-6 border-t border-dashed border-zinc-800 flex justify-between items-center">
                            <span className="text-rose-500 text-sm font-black uppercase tracking-widest">Disponível</span>
                            <span className="text-2xl font-black text-emerald-500">R$ 0,00</span>
                          </div>
                        </div>
                      </div>

                      <div className={`p-8 rounded-[2.5rem] border shadow-sm ${affiliateTheme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-100'}`}>
                        <div className="flex items-center justify-between mb-6">
                          <h4 className={`text-[10px] font-black uppercase tracking-[0.2em] ${affiliateTheme === 'dark' ? 'text-zinc-500' : 'text-slate-400'}`}>Saques Recentes</h4>
                          <span className="text-[9px] font-black text-rose-500 uppercase tracking-widest cursor-pointer hover:underline">Ver tudo</span>
                        </div>
                        <div className="space-y-4">
                          <div className="flex flex-col items-center justify-center py-10 text-center gap-4">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 border-dashed ${affiliateTheme === 'dark' ? 'border-zinc-800 text-zinc-800' : 'border-slate-100 text-slate-200'}`}>
                              <RefreshCcw size={20} />
                            </div>
                            <p className="text-xs font-medium text-zinc-500">Nenhum histórico disponível</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    );
  }

  // Admin Dashboard Redesign (Fanora Style)
  return (
    <div className={`min-h-screen flex transition-colors duration-300 ${adminTheme === 'dark' ? 'bg-[#0a0a0a] text-white' : 'bg-slate-50 text-slate-900'} admin-theme relative overflow-hidden`}>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] xl:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar Admin (Sync with Model Style) */}
      <aside className={`fixed inset-y-0 left-0 z-[70] w-64 border-r flex flex-col shrink-0 transition-all duration-300 xl:relative xl:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full xl:translate-x-0'} ${adminTheme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200 shadow-xl'}`}>
        <div className={`p-6 flex items-center justify-between gap-3 h-20 border-b ${adminTheme === 'dark' ? 'border-zinc-800/50' : 'border-slate-100'}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-600 flex items-center justify-center shrink-0 shadow-lg shadow-rose-600/40">
              <Flame size={20} className="text-white fill-white" />
            </div>
            <span className={`text-xl font-black tracking-tighter italic ${adminTheme === 'dark' ? 'text-white' : 'text-slate-900'}`}>SPICY</span>
          </div>
          <button onClick={() => setIsSidebarOpen(false)} className={`xl:hidden transition-colors ${adminTheme === 'dark' ? 'text-zinc-500 hover:text-white' : 'text-slate-400 hover:text-slate-900'}`}>
            <Plus className="rotate-45" size={24} />
          </button>
        </div>

        <div className="p-4 flex-1">
          <div className="mb-8 hidden xl:block">
            <div className={`rounded-2xl p-4 border flex items-center gap-3 ${adminTheme === 'dark' ? 'bg-zinc-800/50 border-zinc-700/30 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}>
              <div className="relative">
                <div className={`w-12 h-12 rounded-xl overflow-hidden ${adminTheme === 'dark' ? 'bg-zinc-700' : 'bg-slate-200'}`}>
                  <div className={`w-full h-full flex items-center justify-center font-bold ${adminTheme === 'dark' ? 'bg-gradient-to-br from-zinc-700 to-zinc-800 text-zinc-500' : 'bg-slate-300 text-slate-400'}`}>
                    <User size={24} />
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold flex items-center gap-1">
                  👋 Olá, Admin!
                </h4>
                <p className="text-[10px] text-zinc-500 font-medium tracking-widest uppercase">Master Control</p>
              </div>
            </div>
          </div>

          <nav className="space-y-1">
            <AdminSidebarButton 
              active={activeTab === 'dashboard'} 
              icon={<LayoutDashboard size={20} />} 
              label="Painel Central" 
              onClick={() => setActiveTab('dashboard')} 
              theme={adminTheme}
            />
            <AdminSidebarButton 
              active={activeTab === 'creators'} 
              icon={<Users2 size={20} />} 
              label="Gestão Modelos" 
              onClick={() => setActiveTab('creators')} 
              theme={adminTheme}
            />
            <AdminSidebarButton 
              active={activeTab === 'approvals'} 
              icon={<ShieldCheck size={20} />} 
              label="Aprovações" 
              onClick={() => setActiveTab('approvals')} 
              badge="3"
              theme={adminTheme}
            />
            
            <div className="pt-6 pb-2 px-3">
              <p className={`text-[10px] uppercase font-bold tracking-widest ${adminTheme === 'dark' ? 'text-zinc-600' : 'text-slate-400'}`}>Operacional</p>
            </div>

            <AdminSidebarButton 
              active={activeTab === 'earnings'} 
              icon={<Wallet size={20} />} 
              label="Financeiro" 
              onClick={() => setActiveTab('earnings')} 
              theme={adminTheme}
            />
            <AdminSidebarButton 
              active={activeTab === 'notifications'} 
              icon={<Bell size={20} />} 
              label="Push Center" 
              onClick={() => setActiveTab('notifications')} 
              theme={adminTheme}
            />
            <AdminSidebarButton 
              active={activeTab === 'settings'} 
              icon={<Settings size={20} />} 
              label="Configurações" 
              onClick={() => setActiveTab('settings')} 
              theme={adminTheme}
            />
          </nav>
        </div>

        <div className={`p-4 border-t flex items-center gap-2 ${adminTheme === 'dark' ? 'border-zinc-800/50' : 'border-slate-100'}`}>
          <button 
            onClick={() => setViewMode('login')}
            className={`flex-1 flex items-center justify-center xl:justify-start gap-4 p-4 rounded-2xl transition-all font-bold text-sm ${adminTheme === 'dark' ? 'text-zinc-500 hover:bg-red-500/10 hover:text-red-400' : 'text-slate-500 hover:bg-slate-100 hover:text-red-600'}`}
          >
            <LogOut size={20} />
            <span className="hidden xl:block">Sair do Painel</span>
          </button>
          <button 
            onClick={() => setAdminTheme(adminTheme === 'dark' ? 'light' : 'dark')}
            className={`p-4 rounded-2xl transition-all border ${adminTheme === 'dark' ? 'bg-zinc-800/50 border-zinc-700/30 text-yellow-400 hover:bg-zinc-800' : 'bg-slate-50 border-slate-200 text-slate-400 hover:bg-slate-100'}`}
            title="Alternar Tema"
          >
            {adminTheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </aside>

      {/* Main Content Area Admin */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden w-full">
        {/* Top Header Admin (Sync with Model Style) */}
        <header className={`h-20 border-b px-4 md:px-8 flex items-center justify-between shrink-0 transition-colors ${adminTheme === 'dark' ? 'bg-[#0a0a0a] border-zinc-800/50' : 'bg-white border-slate-200'}`}>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className={`xl:hidden p-2.5 rounded-xl border transition-colors ${adminTheme === 'dark' ? 'bg-zinc-800 border-zinc-700 text-zinc-400' : 'bg-slate-100 border-slate-200 text-slate-600'}`}
            >
              <LayoutDashboard size={20} />
            </button>
            <div className="flex flex-col">
              <h2 className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-1">Visão Geral</h2>
              <p className={`text-lg font-black tracking-tight ${adminTheme === 'dark' ? 'text-white' : 'text-slate-950'}`}>Painel Master</p>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <div className="hidden sm:flex flex-col items-end mr-2">
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded-full">Server ON</span>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">v2.4.0</span>
            </div>
            <button className={`p-2.5 rounded-xl border transition-all relative ${adminTheme === 'dark' ? 'bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-zinc-400' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'}`}>
              <Bell size={18} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-600 rounded-full"></span>
            </button>
            <button 
              onClick={() => setViewMode('model')}
              className="bg-rose-600 hover:bg-rose-700 text-white px-4 md:px-6 py-2.5 rounded-xl text-xs font-black shadow-lg shadow-rose-600/20 transition-all active:scale-95 flex items-center gap-2"
            >
              <User size={16} />
              <span className="hidden sm:inline">Ver como Modelo</span>
            </button>
          </div>
        </header>

        {/* Scrollable Content Admin */}
        <main className="flex-1 overflow-y-auto custom-scrollbar p-4 md:p-8">
          <div className="max-w-7xl mx-auto px-4 md:px-0">
            <AnimatePresence mode="wait">
            {activeTab === 'dashboard' && (
              <motion.div 
                key="dashboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <AdminStatCard title="Usuários Totais" value="1,284" icon={<Users2 size={20} />} trend="+12%" theme={adminTheme} color="text-rose-500" />
                  <AdminStatCard title="Criadores Ativos" value="156" icon={<Crown size={20} />} trend="+5%" theme={adminTheme} color="text-rose-500" />
                  <AdminStatCard title="Aprovações Pendentes" value="03" icon={<ShieldCheck size={20} />} trend="-2" theme={adminTheme} color="text-amber-500" />
                  <AdminStatCard title="Receita Mensal" value="R$ 48.290" icon={<Wallet size={20} />} trend="+24%" theme={adminTheme} color="text-emerald-500" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className={`border rounded-[2rem] p-8 shadow-sm ${adminTheme === 'dark' ? 'bg-[#1a2333] border-[#2d3748]' : 'bg-white border-slate-200'}`}>
                    <div className="flex justify-between items-center mb-10">
                      <div>
                        <h3 className={`text-lg font-black tracking-tight uppercase tracking-widest text-xs opacity-50 ${adminTheme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Volume de Vendas</h3>
                        <p className="text-slate-400 text-xs font-bold font-mono">Últimos 7 dias</p>
                      </div>
                      <select className={`border px-4 py-2 rounded-xl text-xs font-bold outline-none ${adminTheme === 'dark' ? 'bg-[#2d3748] border-[#4a5568] text-white' : 'bg-slate-50 border-slate-200 text-slate-900'}`}>
                        <option>Semanal</option>
                        <option>Mensal</option>
                      </select>
                    </div>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={[
                          { name: 'Seg', total: 4000 },
                          { name: 'Ter', total: 3000 },
                          { name: 'Qua', total: 2000 },
                          { name: 'Qui', total: 2780 },
                          { name: 'Sex', total: 1890 },
                          { name: 'Sáb', total: 2390 },
                          { name: 'Dom', total: 3490 },
                        ]}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={adminTheme === 'dark' ? "#2d3748" : "#f1f5f9"} />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}} />
                          <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 11, fontWeight: 700}} />
                          <Tooltip 
                            cursor={{fill: adminTheme === 'dark' ? '#2d3748' : '#f8fafc'}}
                            contentStyle={{ 
                              borderRadius: '16px', 
                              border: 'none', 
                              boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                              backgroundColor: adminTheme === 'dark' ? '#1a2333' : '#fff',
                              color: adminTheme === 'dark' ? '#fff' : '#000'
                            }}
                          />
                          <Bar dataKey="total" fill="#e11d48" radius={[6, 6, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  <div className={`rounded-[2rem] p-8 relative overflow-hidden shadow-2xl ${adminTheme === 'dark' ? 'bg-zinc-900 text-white shadow-rose-900/20' : 'bg-slate-900 text-white shadow-slate-900/10'}`}>
                    <div className="relative z-10">
                      <h3 className="text-sm font-black text-rose-400 uppercase tracking-[0.2em] mb-8">Novas Solicitações</h3>
                      <div className="space-y-6">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center font-black text-xs">
                                JC
                              </div>
                              <div>
                                <p className="text-xs font-bold">Juliana Costa</p>
                                <p className="text-[10px] text-zinc-500">Solicitado há 2h</p>
                              </div>
                            </div>
                            <button className="text-[10px] font-black text-rose-400 uppercase tracking-widest hover:text-white transition-colors">Detalhes</button>
                          </div>
                        ))}
                      </div>
                      <button className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl mt-10 transition-all font-bold text-xs uppercase tracking-widest">
                        Ver todas solicitações
                      </button>
                    </div>
                    <div className="absolute top-0 right-0 w-40 h-40 bg-rose-500/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'creators' && (
              <motion.div
                key="admin-creators"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <h3 className={`text-2xl font-black tracking-tight ${adminTheme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Modelos</h3>
                    <p className={`text-sm font-medium ${adminTheme === 'dark' ? 'text-zinc-500' : 'text-slate-500'}`}>Gerencie o desempenho e acesso de todas as criadoras</p>
                  </div>
                  <div className="flex gap-3">
                    <div className="relative">
                      <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input 
                        type="text" 
                        placeholder="Pesquisar criador..." 
                        className={`border rounded-xl py-2.5 pl-12 pr-6 text-sm font-medium outline-none focus:border-rose-500 transition-all shadow-sm ${adminTheme === 'dark' ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-white border-slate-200 text-slate-900'}`}
                      />
                    </div>
                    <button className="bg-rose-600 text-white px-6 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 hover:bg-rose-700 transition-all shadow-lg shadow-rose-600/20">
                      <UserPlus size={16} />
                      Novo Cadastro
                    </button>
                  </div>
                </div>

                <div className={`border rounded-[2rem] overflow-hidden shadow-sm ${adminTheme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200'}`}>
                  <div className="overflow-x-auto pb-4 scrollbar-hide">
                    <table className="w-full text-left min-w-[800px]">
                      <thead>
                        <tr className={`border-b text-[10px] font-black uppercase tracking-[0.2em] ${adminTheme === 'dark' ? 'bg-zinc-800/50 border-zinc-800 text-zinc-500' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
                          <th className="py-6 px-8">Perfil</th>
                        <th className="py-6 px-4">Status</th>
                        <th className="py-6 px-4">Assinantes</th>
                        <th className="py-6 px-4">Receita (Mês)</th>
                        <th className="py-6 px-4 text-right pr-8">Ações</th>
                      </tr>
                    </thead>
                    <tbody className={`divide-y ${adminTheme === 'dark' ? 'divide-zinc-800/50' : 'divide-slate-100'}`}>
                      {users.filter(u => u.role === 'Modelo').map(user => (
                        <tr key={user.id} className={`group transition-colors ${adminTheme === 'dark' ? 'hover:bg-zinc-800/20' : 'hover:bg-slate-50/50'}`}>
                          <td className="py-6 px-8">
                            <div className="flex items-center gap-4">
                              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black border ${adminTheme === 'dark' ? 'bg-zinc-800 text-rose-500 border-zinc-700' : 'bg-slate-100 text-rose-600 border-slate-200'}`}>
                                {user.name.charAt(0)}
                              </div>
                              <div>
                                <p className={`font-black tracking-tight ${adminTheme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{user.name}</p>
                                <p className="text-[11px] text-zinc-500 font-bold">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-6 px-4">
                            <span className="bg-emerald-500/10 text-emerald-500 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-500/20 italic">Ativo</span>
                          </td>
                          <td className={`py-6 px-4 font-black font-mono text-xs ${adminTheme === 'dark' ? 'text-zinc-400' : 'text-slate-600'}`}>
                            124
                          </td>
                          <td className={`py-6 px-4 font-black font-mono text-xs ${adminTheme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                            R$ 4.820,00
                          </td>
                          <td className="py-6 px-4 text-right pr-8">
                            <div className="flex justify-end gap-2">
                              <button className={`p-2.5 rounded-xl transition-all group-hover:scale-110 active:scale-95 ${adminTheme === 'dark' ? 'bg-zinc-800 text-zinc-400 hover:bg-rose-600 hover:text-white' : 'bg-slate-100 text-slate-500 hover:bg-rose-600 hover:text-white'}`}>
                                <Eye size={16} />
                              </button>
                              <button 
                                onClick={() => removeUser(user.id)}
                                className={`p-2.5 rounded-xl transition-all group-hover:scale-110 active:scale-95 ${adminTheme === 'dark' ? 'bg-zinc-800 text-zinc-400 hover:bg-rose-500 hover:text-white' : 'bg-slate-100 text-slate-500 hover:bg-rose-500 hover:text-white'}`}
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      </tbody>
                    </table>
                  </div>
                  {users.filter(u => u.role === 'Modelo').length === 0 && (
                    <div className="p-20 text-center flex flex-col items-center gap-4">
                      <div className={`w-16 h-16 rounded-[2rem] flex items-center justify-center ${adminTheme === 'dark' ? 'bg-zinc-800 text-zinc-700' : 'bg-slate-50 text-slate-300'}`}>
                        <Users2 size={32} />
                      </div>
                      <p className="font-bold text-zinc-500">Nenhum criador cadastrado ainda.</p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeTab === 'approvals' && (
              <motion.div
                key="admin-approvals"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                <div className="mb-8">
                  <h3 className={`text-2xl font-black tracking-tight ${adminTheme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Aprovações Pendentes</h3>
                  <p className={`text-sm font-medium ${adminTheme === 'dark' ? 'text-zinc-500' : 'text-slate-500'}`}>Verifique os documentos e ative novos perfis na plataforma</p>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className={`border rounded-[2rem] p-8 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm transition-all ${adminTheme === 'dark' ? 'bg-zinc-900 border-zinc-800 hover:border-rose-500/30' : 'bg-white border-slate-200 hover:border-rose-200'}`}>
                      <div className="flex items-center gap-6">
                        <div className={`w-16 h-16 rounded-[2rem] flex items-center justify-center font-black text-xl border ${adminTheme === 'dark' ? 'bg-zinc-800 text-rose-500 border-zinc-700' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                          M
                        </div>
                        <div>
                          <h4 className={`text-lg font-black ${adminTheme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Mariana Silva</h4>
                          <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mb-2">Solicitado em 24/05/2024</p>
                          <div className="flex gap-2">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${adminTheme === 'dark' ? 'bg-zinc-800 text-zinc-500' : 'bg-slate-100 text-slate-500'}`}>RG/CNH ok</span>
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${adminTheme === 'dark' ? 'bg-zinc-800 text-zinc-500' : 'bg-slate-100 text-slate-500'}`}>Selfie ok</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button className={`px-6 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${adminTheme === 'dark' ? 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'}`}>Documentos</button>
                        <button className="bg-rose-600 hover:bg-rose-700 text-white px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-rose-600/20">Aprovar Cadastro</button>
                        <button className={`px-4 py-3 rounded-2xl transition-all ${adminTheme === 'dark' ? 'bg-zinc-800 text-rose-500 hover:bg-rose-500/10' : 'bg-rose-50 text-rose-500 hover:bg-rose-100'}`}>
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'notifications' && (
              <motion.div
                key="admin-notifications"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-3xl space-y-8"
              >
                <div>
                  <h3 className={`text-2xl font-black tracking-tight ${adminTheme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Notificações do Sistema</h3>
                  <p className={`text-sm font-medium ${adminTheme === 'dark' ? 'text-zinc-500' : 'text-slate-500'}`}>Histórico de ocorrências e logs de segurança</p>
                </div>
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className={`border p-6 rounded-3xl flex items-start gap-5 shadow-sm ${adminTheme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200'}`}>
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${adminTheme === 'dark' ? 'bg-rose-600/10 text-rose-500' : 'bg-rose-50 text-rose-600'}`}>
                        <Bell size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className={`font-bold text-sm ${adminTheme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Novo saque solicitado</h4>
                          <span className="text-[10px] text-zinc-500 font-bold">Hoje às 14:30</span>
                        </div>
                        <p className={`text-xs leading-relaxed ${adminTheme === 'dark' ? 'text-zinc-400' : 'text-slate-500'}`}>A criadora <strong>Juliana Matos</strong> solicitou um saque de R$ 1.250,00 via PIX.</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div
                key="admin-settings"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-4xl space-y-12"
              >
                <div>
                  <h3 className="text-2xl font-black text-slate-900 tracking-tight">Configurações Gerais</h3>
                  <p className="text-slate-500 text-sm font-medium">Ajuste as taxas e parâmetros globais do sistema</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Parâmetros de Taxas</h4>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500">Taxa da Plataforma (%)</label>
                          <input type="number" defaultValue={15} className={`w-full border rounded-2xl px-5 py-3 text-sm font-bold outline-none focus:border-rose-500 shadow-sm ${adminTheme === 'dark' ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-white border-slate-200 text-slate-900'}`} />
                          <p className="text-[10px] text-zinc-500">Essa porcentagem é retida de todas as vendas brutas.</p>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-bold text-slate-500">Saque Mínimo (R$)</label>
                          <input type="number" defaultValue={50} className={`w-full border rounded-2xl px-5 py-3 text-sm font-bold outline-none focus:border-rose-500 shadow-sm ${adminTheme === 'dark' ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-white border-slate-200 text-slate-900'}`} />
                        </div>
                      </div>
                  </div>

                  <div className="space-y-6">
                    <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em]">Segurança & API</h4>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500">Gateway de Pagamento</label>
                        <select className={`w-full border rounded-2xl px-5 py-3 text-sm font-bold outline-none focus:border-rose-500 shadow-sm appearance-none ${adminTheme === 'dark' ? 'bg-zinc-900 border-zinc-800 text-white' : 'bg-white border-slate-200 text-slate-900'}`}>
                          <option>SuitPay (Produção)</option>
                          <option>Stripe (Sandbox)</option>
                          <option>Mercado Pago</option>
                        </select>
                      </div>
                      <div className="p-6 bg-rose-50 border border-rose-100 rounded-[2rem] space-y-3">
                        <div className="flex items-center gap-2 text-rose-700">
                          <ShieldCheck size={18} />
                          <span className="text-xs font-black uppercase tracking-widest">Modo de Manutenção</span>
                        </div>
                        <p className="text-[10px] text-rose-600 font-medium leading-relaxed">Ative o modo de manutenção para impedir novos cadastros e compras enquanto realiza atualizações.</p>
                        <button className="w-full py-2.5 bg-rose-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-rose-600/20">Ativar Agora</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-10 border-t border-slate-200 flex justify-end gap-3">
                  <button className="px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest text-slate-400 hover:text-slate-600 transition-colors">Descartar</button>
                  <button className="px-10 py-3 bg-slate-900 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-slate-900/20 hover:bg-black transition-all">Salvar Configurações</button>
                </div>
              </motion.div>
            )}
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}

function AdminStatCard({ title, value, icon, trend, theme = 'light', color }: { title: string; value: string; icon: React.ReactNode; trend: string; color: string; theme?: 'light' | 'dark' }) {
  return (
    <div className={`p-6 rounded-3xl border group transition-all ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800 hover:border-zinc-700' : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'}`}>
      <div className="flex justify-between items-start mb-4">
        <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest underline decoration-dotted underline-offset-4">{title}</span>
        {icon && <div className={`transition-all group-hover:scale-110 ${color || (theme === 'dark' ? 'text-zinc-500 opacity-50' : 'text-slate-400')}`}>{icon}</div>}
      </div>
      <div className="flex items-end justify-between">
        <div className={`text-2xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>{value}</div>
        <div className={`text-[10px] font-black px-2 py-0.5 rounded-full ${trend.startsWith('+') ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
          {trend}
        </div>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 py-3 px-4 rounded-lg text-sm font-semibold transition-all ${
        active 
          ? 'bg-zinc-800 text-white shadow-lg' 
          : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'
      }`}
    >
      {label}
    </button>
  );
}

function AffiliateNavButton({ active, icon, label, onClick, theme = 'light' }: { active: boolean; icon: React.ReactNode; label: string; onClick: () => void; theme?: 'light' | 'dark' }) {
  return (
    <button 
      onClick={() => {
        onClick();
        window.dispatchEvent(new CustomEvent('close-sidebar'));
      }}
      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-medium text-sm group ${
        active 
          ? (theme === 'dark' ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/20' : 'bg-rose-50 text-rose-600 ring-1 ring-rose-100 shadow-sm') 
          : (theme === 'dark' ? 'text-zinc-400 hover:text-white hover:bg-zinc-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50')
      }`}
    >
      <span className={`${active ? (theme === 'dark' ? 'text-white' : 'text-rose-600') : (theme === 'dark' ? 'text-zinc-500 group-hover:text-white' : 'text-slate-400 group-hover:text-slate-600')}`}>{icon}</span>
      {label}
    </button>
  );
}

function DashboardStatCard({ label, value, sub, action, theme = 'light' }: { label: string; value: string; sub?: string; action?: React.ReactNode; theme?: 'light' | 'dark' }) {
  return (
    <div className={`p-5 md:p-6 rounded-2xl border shadow-sm flex flex-col justify-between min-h-[140px] md:min-h-[160px] transition-colors ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-100'}`}>
      <div>
        <h3 className={`text-sm font-semibold mb-4 md:mb-6 ${theme === 'dark' ? 'text-zinc-400' : 'text-slate-500'}`}>{label}</h3>
        <div className="flex items-baseline gap-2">
          <span className={`text-2xl md:text-3xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{value}</span>
        </div>
        {sub && (
          <div className="flex items-center gap-2 text-slate-400 text-xs mt-1">
            <span className={`w-4 h-0.5 ${theme === 'dark' ? 'bg-zinc-800' : 'bg-slate-200'}`}></span>
            0% <span className="opacity-60">{sub}</span>
          </div>
        )}
      </div>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

function ActionCard({ icon, title, desc, bg, theme = 'light' }: { icon: React.ReactNode; title: string; desc: string; bg: string; theme?: 'light' | 'dark' }) {
  return (
    <div className={`p-6 rounded-2xl border shadow-sm group hover:border-rose-500/30 transition-all cursor-pointer ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-100'}`}>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform ${theme === 'dark' ? 'bg-zinc-800' : bg}`}>
        {icon}
      </div>
      <h4 className={`font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{title}</h4>
      <p className={`text-xs leading-relaxed ${theme === 'dark' ? 'text-zinc-500' : 'text-slate-500'}`}>{desc}</p>
    </div>
  );
}

function CreatorCard({ name, username, commission, img, theme = 'light' }: { name: string; username: string; commission: string; img: string; theme?: 'light' | 'dark' }) {
  return (
    <div className={`border rounded-3xl overflow-hidden group hover:shadow-xl transition-all hover:-translate-y-1 ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-200'}`}>
      <div className={`h-24 relative ${theme === 'dark' ? 'bg-zinc-800' : 'bg-slate-100'}`}>
        <img src={img} className="w-full h-full object-cover opacity-50 grayscale group-hover:grayscale-0 group-hover:opacity-100 transition-all" alt={name} />
      </div>
      <div className="p-5 pt-0 -mt-8 relative z-10 transition-all">
        <div className={`w-12 h-12 rounded-2xl border-4 overflow-hidden mb-3 ${theme === 'dark' ? 'border-zinc-900' : 'border-white'}`}>
          <img src={img} className="w-full h-full object-cover" alt={name} />
        </div>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h4 className={`font-bold transition-colors ${theme === 'dark' ? 'text-white group-hover:text-rose-400' : 'text-slate-900 group-hover:text-rose-600'}`}>{name}</h4>
            <p className="text-[10px] text-zinc-500 font-medium">{username}</p>
          </div>
          <button className="bg-rose-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-rose-600 shadow-lg shadow-rose-500/20">
            Afiliar <Plus size={12} />
          </button>
        </div>
        <div className={`flex items-center justify-between border-t pt-4 mt-2 ${theme === 'dark' ? 'border-zinc-800' : 'border-slate-100'}`}>
          <div className={`text-[10px] ${theme === 'dark' ? 'text-zinc-400' : 'text-slate-400'}`}>
            Ganhe até <span className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{commission}</span>
          </div>
          <div className="text-[10px] font-bold text-rose-500">Aprovação automática</div>
        </div>
      </div>
    </div>
  );
}

function ModelSidebarButton({ active, icon, label, onClick, theme = 'dark' }: { active: boolean; icon: React.ReactNode; label: string; onClick: () => void; theme?: 'light' | 'dark' }) {
  return (
    <button 
      onClick={() => {
        onClick();
        window.dispatchEvent(new CustomEvent('close-sidebar'));
      }}
      className={`w-full flex items-center justify-center md:justify-start gap-4 p-4 rounded-2xl transition-all group ${
        active 
          ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/20' 
          : (theme === 'dark' ? 'text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900')
      }`}
    >
      <div className={`${active ? 'scale-110' : 'group-hover:scale-110'} transition-transform`}>
        {icon}
      </div>
      <span className="font-bold text-sm">{label}</span>
    </button>
  );
}

function ClientSidebarButton({ active, icon, label, onClick, theme = 'light' }: { active: boolean; icon: React.ReactNode; label: string; onClick: () => void; theme?: 'light' | 'dark' }) {
  return (
    <button 
      onClick={() => {
        onClick();
        window.dispatchEvent(new CustomEvent('close-sidebar'));
      }}
      className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all group ${
        active 
          ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/20' 
          : (theme === 'dark' ? 'text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-700')
      }`}
    >
      <div className={`${active ? 'scale-110' : 'group-hover:scale-110'} transition-transform`}>
        {icon}
      </div>
      <span className="font-bold text-sm">{label}</span>
    </button>
  );
}

function ModelNavTab({ active, icon, label, onClick, theme = 'dark' }: { active: boolean; icon: React.ReactNode; label: string; onClick: () => void; theme?: 'light' | 'dark' }) {
  return (
    <button 
      onClick={onClick}
      className={`flex items-center gap-2.5 px-6 py-2.5 rounded-xl text-xs font-bold transition-all ${
        active 
          ? (theme === 'dark' ? 'bg-zinc-800 text-white shadow-xl border border-zinc-700/50' : 'bg-white text-slate-900 shadow-sm shadow-slate-200/50 border border-slate-200') 
          : (theme === 'dark' ? 'text-zinc-500 hover:text-zinc-300' : 'text-slate-400 hover:text-slate-600')
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function ModelStatCard({ title, value, icon, extra, theme = 'dark' }: { title: string; value: string; icon?: React.ReactNode; extra?: React.ReactNode; theme?: 'light' | 'dark' }) {
  return (
    <div className={`border p-6 rounded-3xl group transition-all ${theme === 'dark' ? 'bg-zinc-900 border-zinc-800 hover:border-zinc-700' : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'}`}>
      <div className="flex justify-between items-start mb-4">
        <span className="text-[10px] uppercase font-bold text-zinc-500 tracking-widest underline decoration-dotted underline-offset-4">{title}</span>
        {icon && <div className={`transition-opacity group-hover:opacity-100 ${theme === 'dark' ? 'text-zinc-500 opacity-50' : 'opacity-80'}`}>{icon}</div>}
      </div>
      <div className={`text-2xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>{value}</div>
      {extra && <div className="mt-2">{extra}</div>}
    </div>
  );
}

function DocTypeCard({ title, desc, icon, selected, onClick }: { title: string; desc: string; icon: React.ReactNode; selected: boolean; onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`p-8 rounded-3xl border-2 transition-all flex flex-col items-center text-center gap-4 group ${
        selected 
          ? 'bg-zinc-800 border-zinc-700 shadow-2xl' 
          : 'bg-transparent border-zinc-800 hover:border-zinc-700'
      }`}
    >
      <div className={`w-20 h-20 rounded-2xl flex items-center justify-center transition-all ${
        selected ? 'bg-zinc-700 text-white' : 'bg-zinc-800 text-zinc-500 group-hover:scale-110'
      }`}>
        {icon}
      </div>
      <div>
        <h4 className="font-bold text-lg mb-1">{title}</h4>
        <p className="text-zinc-500 text-xs">{desc}</p>
      </div>
    </button>
  );
}

function UploadSection({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-lg font-bold">{title}</h4>
        <p className="text-zinc-500 text-xs">{subtitle}</p>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}

function UploadField({ label, limit = "10MB" }: { label: string; limit?: string }) {
  return (
    <div className="space-y-2">
      <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{label}</p>
      <div className="border-2 border-dashed border-zinc-800 rounded-2xl p-10 flex flex-col items-center justify-center gap-4 hover:border-zinc-700 transition-colors cursor-pointer group">
        <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-500 group-hover:scale-110 transition-transform">
          <ImageIcon size={24} />
        </div>
        <div className="text-center">
          <p className="font-bold text-sm">Envie ou tire foto {label.toLowerCase()}</p>
          <p className="text-[10px] text-zinc-500 mt-1">Tamanho máximo: {limit}</p>
        </div>
        <button className="mt-2 bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-2 rounded-lg text-xs font-bold border border-zinc-700 transition-all flex items-center gap-2">
          <ExternalLink size={14} />
          Selecionar arquivo
        </button>
      </div>
    </div>
  );
}

function AdminSidebarButton({ active, icon, label, onClick, badge, theme = 'dark' }: { 
  active: boolean; 
  icon: React.ReactNode; 
  label: string; 
  onClick: () => void;
  badge?: string;
  theme?: 'light' | 'dark';
}) {
  return (
    <button 
      onClick={() => {
        onClick();
      }}
      className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all group ${
        active 
          ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/20' 
          : (theme === 'dark' ? 'text-zinc-500 hover:bg-zinc-800 hover:text-zinc-300' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900')
      }`}
    >
      <div className="flex items-center gap-4 font-bold text-sm">
        <div className={`${active ? 'scale-110' : 'group-hover:scale-110'} transition-transform`}>
          {icon}
        </div>
        {label}
      </div>
      {badge && (
        <span className={`${active ? 'bg-white/20 text-white' : (theme === 'dark' ? 'bg-[#1a2333] text-rose-400' : 'bg-rose-100 text-rose-600')} text-[10px] font-bold px-2 py-0.5 rounded-full`}>
          {badge}
        </span>
      )}
    </button>
  );
}




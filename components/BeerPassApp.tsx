import React, { useState } from 'react';
import { Button } from './Button';
import { CreditCard } from './Card';
import { 
    MenuIcon, 
    StarIcon, 
    HomeNavIcon, 
    ExploreNavIcon, 
    CheckInNavIcon, 
    WalletNavIcon,
    ChevronRightIcon,
    MapPinIcon,
    PhoneIcon,
    ClockIcon,
    ChevronLeftIcon,
    PlusIcon,
    PaperAirplaneIcon,
    DocumentTextIcon,
    QrCodeIcon,
    ShoppingBagIcon,
    CurrencyDollarIcon,
    BenefitsNavIcon,
    StorefrontIcon,
    FilmIcon,
    TicketIcon,
    UsersIcon,
    TruckIcon,
} from '../constants';

type Page = 'home' | 'explore' | 'check-in' | 'bar-detail' | 'wallet' | 'beneficios';
type Bar = {
    id: number;
    name: string;
    rating: number;
    location: string;
    imageUrl: string;
    inPlan?: boolean;
    address: string;
    phone: string;
    hours: string;
    menu: string[];
};

type NavigateFunction = (page: Page, context?: any) => void;

// --- MOCK DATA ---
const BARS_DATA: Bar[] = [
    { id: 1, name: 'Empório do Malte', rating: 4.8, location: 'Centro - 1.2km', imageUrl: 'https://source.unsplash.com/random/400x300?craft-beer-bar', inPlan: true, address: 'Rua das Laranjeiras, 123', phone: '(11) 98765-4321', hours: '18:00 - 02:00', menu: ['IPA', 'Pilsen', 'Stout', 'Weiss'] },
    { id: 2, name: 'The Brew Pub', rating: 4.5, location: 'Vila Madalena - 3.5km', imageUrl: 'https://source.unsplash.com/random/400x300?pub,night', inPlan: true, address: 'Rua Augusta, 456', phone: '(11) 91234-5678', hours: '17:00 - 01:00', menu: ['Lager', 'Red Ale', 'Porter'] },
    { id: 3, name: 'Barra Funda Bier', rating: 4.2, location: 'Barra Funda - 5.1km', imageUrl: 'https://source.unsplash.com/random/400x300?bar-interior', inPlan: false, address: 'Av. Pacaembu, 789', phone: '(11) 95555-1212', hours: '16:00 - 00:00', menu: ['Chopp Claro', 'Chopp Escuro'] },
    { id: 4, name: 'Cervejaria do Beco', rating: 4.9, location: 'Pinheiros - 2.8km', imageUrl: 'https://source.unsplash.com/random/400x300?beer-garden', inPlan: true, address: 'Beco do Batman, 321', phone: '(11) 98888-9999', hours: '14:00 - 23:00', menu: ['NEIPA', 'Sour', 'Gose', 'Barleywine'] },
    { id: 5, name: 'O Ponto da Cerveja', rating: 4.6, location: 'Centro - 0.8km', imageUrl: 'https://source.unsplash.com/random/400x300?beer-bottle', inPlan: true, address: 'Praça da Sé, 100', phone: '(11) 97777-1111', hours: '12:00 - 22:00', menu: ['APA', 'Lager', 'Weiss'] },
    { id: 6, name: 'Tap House', rating: 4.7, location: 'Itaim Bibi - 4.5km', imageUrl: 'https://source.unsplash.com/random/400x300?beer-tap-wall', inPlan: true, address: 'Av. Faria Lima, 1500', phone: '(11) 96666-2222', hours: '17:00 - 01:00', menu: ['Saison', 'Tripel', 'Quadrupel'] },
];

const BEERS_DATA = [
    { name: 'Cosmic IPA', style: 'American IPA', brewery: 'Cervejaria Galática', imageUrl: 'https://source.unsplash.com/random/400x300?beer-can' },
    { name: 'Pilsen Pura', style: 'German Pilsner', brewery: 'Mestre Cervejeiro', imageUrl: 'https://source.unsplash.com/random/400x300?beer-glass' },
    { name: 'Stout Noturna', style: 'Imperial Stout', brewery: 'Coruja Negra', imageUrl: 'https://source.unsplash.com/random/400x300?dark-beer' },
    { name: 'Azeda Gose', style: 'Leipzig Gose', brewery: 'Frutas & Cia', imageUrl: 'https://source.unsplash.com/random/400x300?sour-beer' },
];

const EVENTS_DATA = [
    { name: 'Oktoberfest Local', description: 'O melhor da tradição alemã com cervejas artesanais e comidas típicas. Não perca!', iconUrl: 'https://source.unsplash.com/random/200x200?oktoberfest' },
    { name: 'Lançamento NEIPA', description: 'A Cervejaria do Beco lança sua nova New England IPA com lúpulos frescos.', iconUrl: 'https://source.unsplash.com/random/200x200?beer-tap' },
    { name: 'Música ao Vivo no Pub', description: 'Venha curtir um rock clássico no The Brew Pub com double chopp até as 20h.', iconUrl: 'https://source.unsplash.com/random/200x200?live-music' },
];


// --- COMMON UI BLOCKS ---

const LeftNavItem: React.FC<{ item: any; active: string; onNavigate: NavigateFunction; isExpanded: boolean }> = ({ item, active, onNavigate, isExpanded }) => {
    const isActive = item.page === active;
    return (
        <button
            onClick={() => onNavigate(item.page as Page)}
            className={`flex items-center w-full p-3 my-1 rounded-lg transition-colors ${
                isActive ? 'bg-amber-500/10 text-amber-400' : 'text-gray-400 hover:bg-gray-700/50'
            }`}
        >
            <item.icon className="w-6 h-6 flex-shrink-0" />
            <span className={`ml-4 text-sm font-semibold whitespace-nowrap transition-opacity duration-200 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
                {item.name}
            </span>
        </button>
    );
};

const LeftNav: React.FC<{ active: string; onNavigate: NavigateFunction; isExpanded: boolean; setIsExpanded: (expanded: boolean) => void; }> = ({ active, onNavigate, isExpanded, setIsExpanded }) => {
    const navItems = [
        { name: 'Ínicio', page: 'home', icon: HomeNavIcon },
        { name: 'Explorar', page: 'explore', icon: ExploreNavIcon },
        { name: 'Check-in', page: 'check-in', icon: CheckInNavIcon },
        { name: 'Carteira', page: 'wallet', icon: WalletNavIcon },
        { name: 'Benefícios', page: 'beneficios', icon: BenefitsNavIcon },
    ];
    
    return (
        <aside className={`fixed top-0 left-0 h-full bg-gray-800 border-r border-gray-700/50 flex-col transition-all duration-300 ease-in-out z-40 hidden md:flex ${isExpanded ? 'w-64' : 'w-20'}`}>
            <div className="flex items-center p-4 h-20 border-b border-gray-700/50" style={{ paddingLeft: isExpanded ? '1.5rem' : '1.25rem' }}>
                <div className="bg-amber-500 p-2 rounded-lg">
                    <StarIcon className="w-6 h-6 text-gray-900" />
                </div>
                <span className={`ml-3 text-xl font-bold text-white whitespace-nowrap transition-opacity duration-200 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
                    Beer Pass
                </span>
            </div>
            <nav className="flex-1 px-4 py-4">
                {navItems.map(item => <LeftNavItem key={item.name} item={item} active={active} onNavigate={onNavigate} isExpanded={isExpanded} />)}
            </nav>
            <div className="p-4 border-t border-gray-700/50">
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center w-full p-3 rounded-lg text-gray-400 hover:bg-gray-700/50"
                >
                    <ChevronLeftIcon className={`w-6 h-6 flex-shrink-0 transition-transform duration-300 ${!isExpanded && 'rotate-180'}`} />
                    <span className={`ml-4 text-sm font-semibold whitespace-nowrap transition-opacity duration-200 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
                        Recolher
                    </span>
                </button>
            </div>
        </aside>
    );
};


const BottomNav: React.FC<{ active: string, onNavigate: NavigateFunction }> = ({ active, onNavigate }) => {
    const navItems = [
        { name: 'Ínicio', page: 'home', icon: HomeNavIcon },
        { name: 'Explorar', page: 'explore', icon: ExploreNavIcon },
        { name: 'Carteira', page: 'wallet', icon: WalletNavIcon },
        { name: 'Benefícios', page: 'beneficios', icon: BenefitsNavIcon },
        { name: 'Check-in', page: 'check-in', icon: CheckInNavIcon },
    ];
    return (
        <footer className="md:hidden fixed bottom-0 left-0 right-0 bg-gray-800 shadow-[0_-2px_10px_rgba(0,0,0,0.2)] flex justify-around items-center py-2 border-t border-gray-700 z-40">
            {navItems.map(item => {
                const isActive = item.page === active;
                return (
                    <button key={item.name} onClick={() => onNavigate(item.page as Page)} className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors w-[19%]`}>
                        <item.icon className={`w-6 h-6 ${isActive ? 'text-amber-400' : 'text-gray-400'}`} />
                        <span className={`text-xs text-center ${isActive ? 'font-bold text-amber-400' : 'font-semibold text-gray-400'}`}>{item.name}</span>
                    </button>
                )
            })}
        </footer>
    );
};

const Section: React.FC<{ title: string, action?: string, children: React.ReactNode, className?: string }> = ({ title, action, children, className }) => (
    <section className={`py-6 ${className}`}>
        <div className="px-4 md:px-8 pb-4 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-200">{title}</h2>
            {action && <a href="#" className="text-sm font-semibold text-amber-400 hover:text-amber-500">{action}</a>}
        </div>
        {children}
    </section>
);

const FilterPills: React.FC<{ filters: string[] }> = ({ filters }) => (
    <div className="px-4 md:px-8 py-3 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-hide bg-gray-900 border-b border-gray-700/50">
        {filters.map(filter => (
            <button key={filter} className="px-4 py-2 bg-gray-700/50 rounded-full text-sm font-semibold text-gray-300 hover:bg-gray-700 transition-colors">
                {filter}
            </button>
        ))}
    </div>
);

// --- CARDS & ITEMS ---
const BarCard: React.FC<{ bar: Bar, onClick: () => void }> = ({ bar, onClick }) => (
    <div className="w-full cursor-pointer group" onClick={onClick}>
        <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gray-700">
            <img src={bar.imageUrl} alt={bar.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            {bar.inPlan && <div className="absolute top-2 left-2 bg-green-500/80 text-white text-xs font-bold px-2 py-1 rounded">INCLUSO NO PASS</div>}
        </div>
        <div className="pt-2">
            <h3 className="font-bold text-gray-200 truncate">{bar.name}</h3>
            <div className="flex items-center gap-1 text-sm text-gray-400">
                <span className="font-semibold text-green-400">Aberto</span>
                <span>•</span>
                <StarIcon className="w-4 h-4 text-amber-400" />
                <span className="font-bold text-white">{bar.rating.toFixed(1)}</span>
            </div>
            <p className="text-sm text-gray-500">{bar.location}</p>
        </div>
    </div>
);

const BeerCard: React.FC<{ name: string, style: string, brewery: string, imageUrl: string }> = ({ name, style, brewery, imageUrl }) => (
    <div className="w-full">
        <div className="aspect-[4/3] rounded-lg overflow-hidden bg-gray-700">
            <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
        </div>
        <div className="pt-2">
            <h3 className="font-bold text-gray-200 truncate">{name}</h3>
            <p className="text-sm text-gray-400 truncate">{style}</p>
            <p className="text-sm text-gray-500">{brewery}</p>
        </div>
    </div>
);

const EventCard: React.FC<{ name: string, description: string, iconUrl: string }> = ({ name, description, iconUrl }) => (
    <div className="flex items-start gap-4 px-4 md:px-8 py-3 bg-gray-900 border-b border-gray-700/50 last:border-0 cursor-pointer hover:bg-gray-800/50">
        <img src={iconUrl} alt={name} className="w-16 h-16 rounded-xl object-cover bg-gray-700" />
        <div className="text-gray-300 flex-1">
            <h3 className="font-bold text-white">{name}</h3>
            <p className="text-sm line-clamp-2">{description}</p>
        </div>
        <ChevronRightIcon className="w-5 h-5 text-gray-500 self-center" />
    </div>
);

const MenuItem: React.FC<{ name: string }> = ({ name }) => (
    <button className="w-full flex justify-between items-center p-4 bg-gray-800 border-b border-gray-700/50 last:border-b-0 hover:bg-gray-700">
        <span className="font-semibold text-gray-200">{name}</span>
        <ChevronRightIcon className="w-5 h-5 text-gray-500" />
    </button>
);

// --- SCREEN COMPOSITIONS ---
const BeerPassHomeScreen: React.FC<{onNavigate: NavigateFunction}> = ({ onNavigate }) => (
    <div className="bg-gray-900">
        <header className="px-4 md:px-8 py-4 flex justify-end items-center">
            <img src="https://i.pravatar.cc/150?u=alex" alt="User Avatar" className="w-10 h-10 rounded-full border-2 border-amber-400" />
        </header>
        <div className="px-4 md:px-8 py-4">
             <h1 className="text-4xl font-bold text-white">Bem-vindo, Alex!</h1>
             <p className="text-lg text-gray-400 mt-1">Pronto para o próximo check-in?</p>
        </div>
        <div className="px-4 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-700">
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-xl font-bold text-white">Seu Beer Pass</p>
                        <p className="text-sm text-gray-400">Plano Ouro</p>
                    </div>
                </div>
                <div className="mt-4 flex justify-around text-center bg-gray-900/50 p-3 rounded-lg">
                    {[ { v: 28, l: 'Check-ins' }, { v: 12, l: 'Bares' }, { v: 4, l: 'Cervejas' }, { v: 2, l: 'Cidades' } ].map(s => (
                        <div key={s.l}><p className="font-bold text-lg text-white">{s.v}</p><p className="text-xs text-gray-400">{s.l}</p></div>
                    ))}
                </div>
            </div>
             <div className="bg-amber-500/20 p-6 rounded-xl shadow-lg flex items-center justify-between border border-amber-500/30">
                <div>
                    <h3 className="font-bold text-lg text-amber-300">Happy Hour em Dobro!</h3>
                    <p className="text-sm text-amber-200/80">Peça uma, leve duas nos bares parceiros.</p>
                    <a href="#" className="font-bold text-amber-300 mt-2 inline-block">Descubra</a>
                </div>
                <div className="text-6xl transform -rotate-12">🍻</div>
            </div>
        </div>
        <Section title="Bares em Destaque" action="Ver todos">
            <div className="px-4 md:px-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {BARS_DATA.slice(0,5).map(bar => <BarCard key={bar.id} bar={bar} onClick={() => onNavigate('bar-detail', bar)} />)}
            </div>
        </Section>
        <Section title="Cervejas Populares" action="Ver todas">
            <div className="px-4 md:px-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {BEERS_DATA.map(beer => <BeerCard key={beer.name} {...beer} />)}
            </div>
        </Section>
    </div>
);

const ExploreScreen: React.FC<{onNavigate: NavigateFunction}> = ({ onNavigate }) => {
    const [activeTab, setActiveTab] = useState('Bares');
    
    return (
        <div className="bg-gray-900">
            <header className="px-4 md:px-8 pt-6">
                 <h1 className="text-4xl font-bold text-white">Explorar</h1>
                 <div className="mt-6 flex gap-4 border-b border-gray-700/50">
                    {['Bares', 'Cervejas', 'Eventos'].map(tab => {
                        const isActive = tab === activeTab;
                        return (
                            <button key={tab} onClick={() => setActiveTab(tab)} className={`py-3 text-lg font-bold transition-colors relative ${isActive ? 'text-white' : 'text-gray-500'}`}>
                                {tab}
                                {isActive && <div className="absolute bottom-0 left-0 right-0 h-1 bg-amber-500 rounded-t-full"></div>}
                            </button>
                        )
                    })}
                </div>
            </header>
            
            {activeTab === 'Bares' && (
                <>
                    <FilterPills filters={['Próximos a mim', 'Inclusos no Pass', 'Com Cozinha', 'Aceita Pets']} />
                    <div className="p-4 md:p-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {BARS_DATA.map(bar => <BarCard key={bar.id} bar={bar} onClick={() => onNavigate('bar-detail', bar)} />)}
                    </div>
                </>
            )}

            {activeTab === 'Cervejas' && (
                <>
                    <FilterPills filters={['IPA', 'Lager', 'Stout', 'Weiss', 'Sour']} />
                     <div className="p-4 md:p-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {BEERS_DATA.map(beer => <BeerCard key={beer.name} {...beer} />)}
                    </div>
                </>
            )}

            {activeTab === 'Eventos' && (
                 <div className="py-2">
                    {EVENTS_DATA.map(event => <EventCard key={event.name} {...event} />)}
                </div>
            )}
        </div>
    );
};

const CheckInScreen: React.FC = () => {
    return (
        <div className="h-full w-full relative bg-gray-700">
            <img src="https://source.unsplash.com/random/1600x1200?map,city,night" alt="Map of nearby bars" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/30"></div>
            <div className="absolute top-0 left-0 right-0 p-4 md:p-8">
                <h1 className="text-4xl font-bold text-white drop-shadow-lg">Check-in</h1>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
                <div className="bg-gray-800/80 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden border border-gray-700 max-w-2xl mx-auto">
                     <h3 className="p-4 text-lg font-bold text-white border-b border-gray-700">Bares Próximos (3)</h3>
                     <div className="max-h-64 overflow-y-auto">
                        {BARS_DATA.slice(0, 3).map(bar => (
                            <div key={bar.id} className="flex gap-4 p-4 border-b border-gray-700 last:border-0 items-center">
                                <img src={bar.imageUrl} alt={bar.name} className="w-16 h-16 rounded-md object-cover bg-gray-700"/>
                                <div>
                                    <h4 className="font-bold text-white">{bar.name}</h4>
                                    <p className="text-sm text-gray-400">{bar.location}</p>
                                </div>
                                <Button variant="primary" className="ml-auto !px-4 !py-2 !rounded-lg flex-shrink-0">Check-in</Button>
                            </div>
                        ))}
                     </div>
                </div>
            </div>
        </div>
    );
};

const WalletPage: React.FC = () => {
    const transactions = [
        { type: 'expense', icon: ShoppingBagIcon, title: 'Cervejaria do Beco', date: 'Hoje, 19:45', amount: -45.50 },
        { type: 'income', icon: CurrencyDollarIcon, title: 'Depósito via PIX', date: 'Ontem, 10:30', amount: 150.00 },
        { type: 'expense', icon: ShoppingBagIcon, title: 'Empório do Malte', date: '28 de Julho', amount: -89.90 },
        { type: 'expense', icon: ShoppingBagIcon, title: 'The Brew Pub', date: '27 de Julho', amount: -120.00 },
    ];

    const ActionButton: React.FC<{icon: React.FC<any>, label: string}> = ({ icon: Icon, label }) => (
        <div className="flex flex-col items-center gap-2 text-center w-20">
            <button className="w-16 h-16 bg-gray-800 rounded-2xl flex items-center justify-center text-amber-400 hover:bg-gray-700 transition-colors shadow-md border border-gray-700/50">
                <Icon className="w-7 h-7" />
            </button>
            <span className="text-xs font-semibold text-gray-300">{label}</span>
        </div>
    );

    const WalletTransactionItem: React.FC<typeof transactions[0]> = ({ icon: Icon, title, date, amount }) => {
        const isIncome = amount > 0;
        return (
            <div className="flex items-center gap-4 py-3">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${isIncome ? 'bg-green-500/10 text-green-400' : 'bg-gray-700 text-gray-300'}`}>
                    <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1 min-w-0">
                    <p className="font-bold text-white truncate">{title}</p>
                    <p className="text-sm text-gray-400">{date}</p>
                </div>
                <p className={`font-bold text-lg whitespace-nowrap ${isIncome ? 'text-green-400' : 'text-white'}`}>
                    {isIncome ? '+ ' : ''}{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(amount)}
                </p>
            </div>
        );
    }
    
    return (
        <div className="bg-gray-900 pb-20 md:pb-8">
            <header className="px-4 md:px-8 pt-6">
                <h1 className="text-4xl font-bold text-white">Carteira</h1>
            </header>
            
            <div className="p-4 md:p-8">
                <div className="p-6 rounded-2xl flex flex-col justify-between h-52 shadow-lg relative overflow-hidden bg-gray-800/50 backdrop-blur-sm border border-gray-700/50">
                    <div className="absolute -right-20 -top-20 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl"></div>
                    <div className="relative z-10 flex justify-between items-start">
                        <div>
                            <p className="font-semibold text-md text-gray-200">Saldo Disponível</p>
                            <p className="text-3xl font-bold text-white mt-1">{new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(1284.50)}</p>
                        </div>
                        <StarIcon className="w-8 h-8 text-amber-400" />
                    </div>
                    <div className="relative z-10">
                        <p className="font-mono text-lg tracking-widest text-gray-300">•••• •••• •••• 1234</p>
                         <p className="font-semibold text-sm text-gray-400 mt-1">ALEX GREEN</p>
                    </div>
                </div>
            </div>
            
            <div className="px-4 md:px-8 py-4 flex justify-around items-start">
                <ActionButton icon={PlusIcon} label="Adicionar Dinheiro" />
                <ActionButton icon={PaperAirplaneIcon} label="Enviar" />
                <ActionButton icon={DocumentTextIcon} label="Pagar Contas" />
                <ActionButton icon={QrCodeIcon} label="Pagar com QR Code" />
            </div>

            <Section title="Transações Recentes" action="Ver todas" className="mt-4">
                <div className="px-4 md:px-8 flex flex-col gap-2">
                    {transactions.map((tx, i) => <WalletTransactionItem key={i} {...tx} />)}
                </div>
            </Section>
        </div>
    );
};

const BenefitsScreen: React.FC = () => {
    const benefitCategories = [
        { name: 'Lojas', icon: StorefrontIcon, color: 'bg-blue-500/10 text-blue-400' },
        { name: 'Cinema', icon: FilmIcon, color: 'bg-red-500/10 text-red-400' },
        { name: 'Delivery', icon: TruckIcon, color: 'bg-green-500/10 text-green-400' },
        { name: 'Shows', icon: TicketIcon, color: 'bg-purple-500/10 text-purple-400' },
        { name: 'Parceiros', icon: UsersIcon, color: 'bg-orange-500/10 text-orange-400' },
        { name: 'Apps', icon: StarIcon, color: 'bg-yellow-500/10 text-yellow-400' },
    ];

    const BenefitCard: React.FC<{name: string, icon: React.FC<any>, color: string}> = ({ name, icon: Icon, color }) => (
        <div className="bg-gray-800/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-700/50 flex flex-col items-center justify-center text-center gap-4 cursor-pointer hover:bg-gray-700/50 transition-colors">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${color}`}>
                <Icon className="w-8 h-8"/>
            </div>
            <h3 className="font-bold text-lg text-white">{name}</h3>
            <p className="text-sm text-gray-400">Ver vantagens</p>
        </div>
    );

    return (
        <div className="bg-gray-900 pb-20 md:pb-8">
            <header className="px-4 md:px-8 pt-6">
                <h1 className="text-4xl font-bold text-white">Benefícios</h1>
                <p className="text-lg text-gray-400 mt-1">Vantagens exclusivas para membros Beer Pass.</p>
            </header>

            <div className="p-4 md:p-8 grid grid-cols-2 lg:grid-cols-3 gap-6">
                {benefitCategories.map(cat => <BenefitCard key={cat.name} {...cat} />)}
            </div>
        </div>
    );
};

const BarDetailScreen: React.FC<{bar: Bar, onBack: () => void}> = ({ bar, onBack }) => (
    <div className="bg-gray-900 pb-20 md:pb-0">
        <header className="absolute top-0 left-0 z-10 p-4 md:fixed">
             <button onClick={onBack} className="flex items-center gap-2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors">
                <ChevronLeftIcon className="w-6 h-6"/>
             </button>
        </header>
        
        <div className="md:grid md:grid-cols-2 lg:grid-cols-5 md:gap-8">
            <div className="lg:col-span-3 h-80 md:h-screen md:sticky md:top-0">
                <img src={bar.imageUrl} alt={bar.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent"></div>
            </div>
            
            <div className="lg:col-span-2 p-4 md:p-8 relative -mt-16 md:mt-0">
                <h1 className="text-4xl font-bold text-white">{bar.name}</h1>
                <div className="flex items-center gap-2 text-gray-400 mt-2">
                    <StarIcon className="w-5 h-5 text-amber-400" />
                    <span className="font-bold text-white">{bar.rating.toFixed(1)}</span>
                    <span>•</span>
                    <span className="font-semibold text-green-400">Aberto</span>
                </div>
                <Button variant="primary" className="w-full !py-3 mt-6">CHECK-IN</Button>
                
                <div className="mt-8 space-y-4 text-gray-300">
                    <div className="flex items-center gap-4"><MapPinIcon className="w-6 h-6 text-gray-500 flex-shrink-0"/><p>{bar.address}</p></div>
                    <div className="flex items-center gap-4"><PhoneIcon className="w-6 h-6 text-gray-500 flex-shrink-0"/><p>{bar.phone}</p></div>
                    <div className="flex items-center gap-4"><ClockIcon className="w-6 h-6 text-gray-500 flex-shrink-0"/><p>{bar.hours}</p></div>
                </div>
                <Section title="Menu de Cervejas">
                    <div>
                        {bar.menu.map(item => <MenuItem key={item} name={item} />)}
                    </div>
                </Section>
            </div>
        </div>
    </div>
);


// --- MAIN APP CONTAINER ---
export const BeerPassApp: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<Page>('home');
    const [pageContext, setPageContext] = useState<any>(null);
    const [previousPage, setPreviousPage] = useState<Page>('home');
    const [isNavExpanded, setIsNavExpanded] = useState(true);

    const navigate: NavigateFunction = (page, context) => {
        if (page !== currentPage) {
             setPreviousPage(currentPage);
        }
        setCurrentPage(page);
        setPageContext(context);
        window.scrollTo(0,0);
    };

    const handleBack = () => {
        setCurrentPage(previousPage);
        setPageContext(null);
    }
    
    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <BeerPassHomeScreen onNavigate={navigate} />;
            case 'explore':
                return <ExploreScreen onNavigate={navigate} />;
            case 'check-in':
                return <CheckInScreen />;
            case 'wallet':
                return <WalletPage />;
            case 'beneficios':
                return <BenefitsScreen />;
            case 'bar-detail':
                 return <BarDetailScreen bar={pageContext} onBack={handleBack} />;
            default:
                return <BeerPassHomeScreen onNavigate={navigate} />;
        }
    };

    return (
        <div className="w-full h-full flex bg-gray-900">
            <LeftNav 
                active={currentPage} 
                onNavigate={navigate} 
                isExpanded={isNavExpanded} 
                setIsExpanded={setIsNavExpanded} 
            />
            <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${isNavExpanded ? 'md:ml-64' : 'md:ml-20'}`}>
                 <main className="flex-1 overflow-y-auto scrollbar-hide pb-20 md:pb-0">
                    {renderPage()}
                </main>
                <BottomNav active={currentPage} onNavigate={navigate} />
            </div>
        </div>
    );
};
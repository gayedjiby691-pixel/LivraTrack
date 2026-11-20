import React, { useState } from 'react';
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  Truck,
  Phone,
  MessageSquare,
  DollarSign,
  Camera,
  ShieldCheck,
  ArrowRight,
  ChevronRight,
  ExternalLink,
  Smartphone,
  RefreshCw,
  X,
  Copy,
  Check,
  MapPin,
  HelpCircle,
  Send
} from 'lucide-react';

export default function App() {
  // Locale & Currency state
  const [lang, setLang] = useState('fr'); // 'fr' | 'en'
  const [currency, setCurrency] = useState('XOF'); // 'XOF' | 'USD'
  
  // Interactive Demo Tab
  const [activeTab, setActiveTab] = useState('client'); // 'client' | 'driver' | 'manager' | 'generator'
  
  // Tracking Simulator State
  const [trackingCodeInput, setTrackingCodeInput] = useState('LIV-101');
  const [selectedDeliveryId, setSelectedDeliveryId] = useState('101');
  
  // Contact / Demo Modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [demoFormData, setDemoFormData] = useState({
    name: '',
    phone: '',
    company: '',
    driversCount: '3',
    city: 'Dakar'
  });
  const [demoSent, setDemoSent] = useState(false);

  // WhatsApp Link Generator Tool State
  const [genClientName, setGenClientName] = useState('Aminata Fall');
  const [genPhone, setGenPhone] = useState('221774567890');
  const [genRef, setGenRef] = useState('LIV-108');
  const [copiedLink, setCopiedLink] = useState(false);

  // Driver Screen Simulator State
  const [driverDeliveries, setDriverDeliveries] = useState([
    {
      id: '101',
      client: 'Fatou Sall',
      phone: '+221 77 450 12 34',
      address: 'Sacré-Cœur 3 Pyrotechnie',
      landmark: 'Face Boulangerie Jaune villa 124',
      item: 'Robe en soie + Sandales',
      toCollect: 25000,
      collected: 25000,
      paymentMode: 'Wave',
      status: 'Livré',
      proofPhoto: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&auto=format&fit=crop&q=80',
      failureReason: '',
      time: '14:25'
    },
    {
      id: '102',
      client: 'Cheikh Tidiane Sy',
      phone: '+221 78 320 45 67',
      address: 'Mermoz Pyrotechnie',
      landmark: 'Près de l\'école BEM',
      item: 'Montre connectée Smartwatch',
      toCollect: 45000,
      collected: 0,
      paymentMode: 'Espèces',
      status: 'En route',
      proofPhoto: '',
      failureReason: '',
      time: '15:10'
    },
    {
      id: '104',
      client: 'Babacar Seck',
      phone: '+221 70 123 45 67',
      address: 'Almadies Zone 15',
      landmark: 'Derrière King Fahd Palace portail noir',
      item: 'Sneakers Jordan pointure 43',
      toCollect: 50000,
      collected: 0,
      paymentMode: 'Espèces',
      status: 'Échec',
      proofPhoto: '',
      failureReason: 'Client absent (2 appels sans réponse)',
      time: '16:05'
    }
  ]);

  // Driver action handlers
  const handleDriverStatusChange = (id, newStatus, reason = '') => {
    setDriverDeliveries(prev => prev.map(d => {
      if (d.id === id) {
        return {
          ...d,
          status: newStatus,
          failureReason: reason,
          collected: newStatus === 'Livré' ? d.toCollect : (newStatus === 'Échec' ? 0 : d.collected),
          proofPhoto: newStatus === 'Livré' ? 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&auto=format&fit=crop&q=80' : d.proofPhoto,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      }
      return d;
    }));
  };

  const currentTrackedDelivery = driverDeliveries.find(d => 'LIV-' + d.id === trackingCodeInput.trim().toUpperCase()) || driverDeliveries[0];

  // Pricing values based on currency
  const priceStarter = currency === 'XOF' ? '6 000 FCFA' : '$10';
  const pricePro = currency === 'XOF' ? '18 000 FCFA' : '$30';
  const currencyLabel = currency === 'XOF' ? 'FCFA' : 'USD ($)';

  // Generated WhatsApp message
  const generatedWhatsAppUrl = `https://wa.me/${genPhone.replace(/\D/g, '')}?text=${encodeURIComponent(
    `Bonjour ${genClientName}, votre commande (${genRef}) est prise en charge par notre livreur. Suivez l'arrivée en direct ici : https://suivi.livratrack.app?code=${genRef}`
  )}`;

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleDemoSubmit = (e) => {
    e.preventDefault();
    setDemoSent(true);
    const textMsg = `Bonjour Djiby, je m'appelle ${demoFormData.name} (${demoFormData.company || 'Livraison'}). J'ai environ ${demoFormData.driversCount} livreurs à ${demoFormData.city}. Je souhaite tester LivraTrack gratuitement pendant 30 jours !`;
    const waUrl = `https://wa.me/221770000000?text=${encodeURIComponent(textMsg)}`;
    setTimeout(() => {
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#070e0a] text-slate-100 font-sans selection:bg-brand-500 selection:text-black">
      {/* Background Glow */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] bg-brand-600/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[130px]" />
      </div>

      {/* Top Banner */}
      <div className="relative z-10 bg-brand-900/60 border-b border-brand-800/50 backdrop-blur-md px-4 py-2 text-xs text-center flex items-center justify-center gap-2 text-brand-100">
        <span className="inline-block w-2 h-2 rounded-full bg-brand-500 animate-ping" />
        <span>
          {lang === 'fr' 
            ? '🔥 Spécial Dakar : 5 flottes sélectionnées pour 30 jours d’essai 100% gratuit.' 
            : '🔥 Dakar Pilot: 5 delivery fleets selected for a 30-day 100% free trial.'}
        </span>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="underline font-bold text-white hover:text-brand-300 ml-1 transition-colors"
        >
          {lang === 'fr' ? 'Réserver une place →' : 'Book your spot →'}
        </button>
      </div>

      {/* Header / Navigation */}
      <header className="relative z-20 border-b border-emerald-950/80 bg-[#070e0a]/80 backdrop-blur-xl sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-emerald-400 flex items-center justify-center shadow-lg shadow-brand-600/20">
              <Truck className="w-5 h-5 text-black" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-white flex items-center gap-1">
                Livra<span className="text-brand-500">Track</span>
              </span>
              <span className="text-[10px] font-mono block text-emerald-400/80 uppercase tracking-widest">
                Dakar & International
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-brand-400 transition-colors">
              {lang === 'fr' ? 'Fonctionnalités' : 'Features'}
            </a>
            <a href="#simulator" className="hover:text-brand-400 transition-colors flex items-center gap-1">
              <span>{lang === 'fr' ? 'Démo Interactive' : 'Interactive Demo'}</span>
              <span className="px-1.5 py-0.5 rounded text-[10px] bg-brand-500/20 text-brand-400 font-mono">Live</span>
            </a>
            <a href="#tarifs" className="hover:text-brand-400 transition-colors">
              {lang === 'fr' ? 'Tarifs' : 'Pricing'}
            </a>
            <a href="#faq" className="hover:text-brand-400 transition-colors">
              FAQ
            </a>
          </nav>

          <div className="flex items-center gap-3">
            {/* Currency switch */}
            <button
              onClick={() => setCurrency(currency === 'XOF' ? 'USD' : 'XOF')}
              className="px-2.5 py-1 text-xs font-mono rounded-lg border border-emerald-800/60 bg-emerald-950/40 text-slate-300 hover:text-white hover:border-brand-500 transition-colors"
              title="Changer de devise"
            >
              {currency === 'XOF' ? '🇸🇳 XOF (FCFA)' : '🌐 USD ($)'}
            </button>

            {/* Language switch */}
            <button
              onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
              className="px-2 py-1 text-xs font-mono rounded-lg border border-emerald-800/60 bg-emerald-950/40 text-slate-300 hover:text-white hover:border-brand-500 transition-colors"
              title="Switch language"
            >
              {lang === 'fr' ? 'EN' : 'FR'}
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-brand-500 text-black hover:bg-brand-400 shadow-md shadow-brand-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>{lang === 'fr' ? 'Essai gratuit 30j' : '30-Day Free Trial'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 pt-16 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/70 border border-brand-500/30 text-brand-400 text-xs font-mono mb-6 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
            {lang === 'fr' ? 'Conçu à Dakar par un ancien livreur (5 ans de terrain)' : 'Crafted in Dakar by a delivery courier with 5 years field experience'}
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight mb-6">
            {lang === 'fr' ? (
              <>
                Sachez où est chaque colis, <br />
                <span className="bg-gradient-to-r from-brand-400 via-emerald-300 to-emerald-500 bg-clip-text text-transparent">
                  et où est votre argent.
                </span>
              </>
            ) : (
              <>
                Know where every delivery is, <br />
                <span className="bg-gradient-to-r from-brand-400 via-emerald-300 to-emerald-500 bg-clip-text text-transparent">
                  and where your cash is.
                </span>
              </>
            )}
          </h1>

          <p className="text-lg sm:text-xl text-slate-300 mb-8 leading-relaxed">
            {lang === 'fr' ? (
              <>
                Fini les appels <span className="text-white italic">« vous êtes où ? »</span>, les litiges clients <span className="text-white italic">« je n’ai rien reçu »</span> et les écarts de caisse le soir avec les livreurs.
              </>
            ) : (
              <>
                No more <span className="text-white italic">"where are you?"</span> calls, <span className="text-white italic">"I never received it"</span> disputes, or daily cash mismatches with drivers.
              </>
            )}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-brand-500 text-black font-bold text-base hover:bg-brand-400 shadow-xl shadow-brand-500/25 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <span>{lang === 'fr' ? 'Démarrer 30 jours gratuit' : 'Start 30-Day Free Trial'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="#simulator"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-900 border border-emerald-800/60 text-slate-200 font-semibold text-base hover:bg-emerald-950/60 hover:text-white transition-all flex items-center justify-center gap-2"
            >
              <span>{lang === 'fr' ? 'Tester la démo en direct' : 'Try Live Interactive Demo'}</span>
              <Smartphone className="w-5 h-5 text-brand-400" />
            </a>
          </div>

          {/* Social Proof metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-emerald-950/20 border border-emerald-900/40 text-left">
            <div className="p-2">
              <div className="text-2xl font-bold font-mono text-brand-400">100%</div>
              <div className="text-xs text-slate-400">{lang === 'fr' ? 'Preuve photo obligatoire' : 'Mandatory photo proof'}</div>
            </div>
            <div className="p-2">
              <div className="text-2xl font-bold font-mono text-emerald-300">0</div>
              <div className="text-xs text-slate-400">{lang === 'fr' ? 'Écart de caisse à 19h' : 'Discrepancies at 7 PM'}</div>
            </div>
            <div className="p-2">
              <div className="text-2xl font-bold font-mono text-accent-wave">Wave & OM</div>
              <div className="text-xs text-slate-400">{lang === 'fr' ? 'Pointage espèces & transferts' : 'Cash & mobile money sync'}</div>
            </div>
            <div className="p-2">
              <div className="text-2xl font-bold font-mono text-brand-400">WhatsApp</div>
              <div className="text-xs text-slate-400">{lang === 'fr' ? 'Suivi sans application pour le client' : 'Tracking link without app'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* The 3 Core Pillars Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-emerald-950/80">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-mono uppercase tracking-widest text-brand-400 mb-3">
            {lang === 'fr' ? 'La Réalité du Terrain Résolue' : 'Field Reality Solved'}
          </h2>
          <p className="text-3xl font-extrabold text-white">
            {lang === 'fr' ? 'Les 3 problèmes qui vous font perdre de l’argent chaque jour' : 'The 3 daily headaches eating your profits'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="p-8 rounded-3xl bg-slate-900/60 border border-emerald-900/50 hover:border-brand-500/40 transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-brand-500/10 text-brand-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Camera className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              {lang === 'fr' ? '1. Preuve photo incontestable' : '1. Undisputed photo proof'}
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              {lang === 'fr' 
                ? 'Le livreur valide la livraison uniquement en photographiant le colis déposé ou le bon signé devant le client. Fini le client de mauvaise foi qui prétend n’avoir rien reçu.'
                : 'The driver confirms delivery only by taking a photo of the parcel handed over. No more deceptive customers claiming they never received their order.'}
            </p>
            <div className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1.5 rounded-lg border border-emerald-800/40 inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-400" />
              <span>{lang === 'fr' ? 'Zéro litige contestable' : 'Zero disputed deliveries'}</span>
            </div>
          </div>

          {/* Card 2 */}
          <div className="p-8 rounded-3xl bg-slate-900/60 border border-emerald-900/50 hover:border-brand-500/40 transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-accent-wave/10 text-accent-wave flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <DollarSign className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              {lang === 'fr' ? '2. Rapprochement Cash & Wave' : '2. Cash & Mobile Money Reconciliation'}
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              {lang === 'fr'
                ? 'À chaque arrêt, le livreur note le montant exact encaissé et le mode (Espèces, Wave ou Orange Money). À 19h, le bilan calcule l’écart au centime près. Tout écart anormal s’affiche en rouge.'
                : 'At each stop, the driver logs the collected amount and payment mode (Cash, Wave, or Orange Money). At 7 PM, your daily balance highlights any discrepancy in red.'}
            </p>
            <div className="text-xs font-mono text-accent-wave bg-blue-950/60 px-3 py-1.5 rounded-lg border border-blue-800/40 inline-flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{lang === 'fr' ? 'Clôture de caisse en 2 minutes' : '2-minute cash closure'}</span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-8 rounded-3xl bg-slate-900/60 border border-emerald-900/50 hover:border-brand-500/40 transition-all group">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-7 h-7" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">
              {lang === 'fr' ? '3. Suivi WhatsApp sans application' : '3. WhatsApp tracking without an app'}
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              {lang === 'fr'
                ? 'Le client ne télécharge rien. Dès que la commande est en route, il reçoit son lien WhatsApp privé. Il voit le nom de son coursier, son numéro pour l’appeler et l’état d’avancement.'
                : 'Customers install nothing. As soon as the delivery is en route, they receive a private WhatsApp tracking link showing the driver’s name, phone, and real-time status.'}
            </p>
            <div className="text-xs font-mono text-emerald-400 bg-emerald-950/60 px-3 py-1.5 rounded-lg border border-emerald-800/40 inline-flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-brand-400" />
              <span>{lang === 'fr' ? '-80% d’appels entrants' : '-80% incoming calls'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Simulator Section */}
      <section id="simulator" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-emerald-950/80">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-400 text-xs font-mono mb-4">
            <span>✨</span>
            <span>{lang === 'fr' ? 'Simulateur Interactif en Ligne' : 'Live Interactive Simulator'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            {lang === 'fr' ? 'Testez le système comme si vous y étiez' : 'Experience the full system in action'}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            {lang === 'fr'
              ? 'Basculez entre la vue du client, l’écran du livreur sur moto, et le tableau de bord du gérant.'
              : 'Toggle between the client tracking portal, the courier’s phone screen, and the manager’s daily reconciliation.'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          <button
            onClick={() => setActiveTab('client')}
            className={`px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'client'
                ? 'bg-brand-500 text-black shadow-lg shadow-brand-500/20'
                : 'bg-slate-900 border border-emerald-900/60 text-slate-300 hover:text-white'
            }`}
          >
            <ExternalLink className="w-4 h-4" />
            <span>{lang === 'fr' ? '1. Vue Client (Lien Suivi)' : '1. Customer Tracking'}</span>
          </button>

          <button
            onClick={() => setActiveTab('driver')}
            className={`px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'driver'
                ? 'bg-brand-500 text-black shadow-lg shadow-brand-500/20'
                : 'bg-slate-900 border border-emerald-900/60 text-slate-300 hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            <span>{lang === 'fr' ? '2. Smartphone Livreur' : '2. Courier Phone Screen'}</span>
          </button>

          <button
            onClick={() => setActiveTab('manager')}
            className={`px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'manager'
                ? 'bg-brand-500 text-black shadow-lg shadow-brand-500/20'
                : 'bg-slate-900 border border-emerald-900/60 text-slate-300 hover:text-white'
            }`}
          >
            <DollarSign className="w-4 h-4" />
            <span>{lang === 'fr' ? '3. Bilan Caisse Gérant (19h)' : '3. Daily Manager Balance (7 PM)'}</span>
          </button>

          <button
            onClick={() => setActiveTab('generator')}
            className={`px-4 py-2.5 rounded-xl text-sm font-semibold flex items-center gap-2 transition-all ${
              activeTab === 'generator'
                ? 'bg-brand-500 text-black shadow-lg shadow-brand-500/20'
                : 'bg-slate-900 border border-emerald-900/60 text-slate-300 hover:text-white'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>{lang === 'fr' ? '4. Outil Générateur WhatsApp' : '4. WhatsApp Link Tool'}</span>
          </button>
        </div>

        {/* Tab 1: Client Tracking Portal */}
        {activeTab === 'client' && (
          <div className="max-w-2xl mx-auto bg-slate-900/90 border border-emerald-800/60 rounded-3xl p-6 sm:p-8 shadow-2xl relative">
            <div className="flex items-center justify-between pb-6 border-b border-emerald-900/60 mb-6">
              <div>
                <span className="text-xs font-mono uppercase text-brand-400">LivraTrack Public Tracker</span>
                <h3 className="text-xl font-bold text-white">Suivi de Colis en Temps Réel</h3>
              </div>
              <span className="px-2.5 py-1 rounded-full text-xs font-mono bg-emerald-950 border border-brand-500/30 text-brand-300 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-brand-500 animate-ping" />
                Connexion Live
              </span>
            </div>

            {/* Quick selector buttons */}
            <div className="mb-6">
              <label className="block text-xs font-mono text-slate-400 mb-2">
                Tester un code colis d’exemple :
              </label>
              <div className="flex flex-wrap gap-2">
                {driverDeliveries.map(d => (
                  <button
                    key={d.id}
                    onClick={() => {
                      setTrackingCodeInput('LIV-' + d.id);
                      setSelectedDeliveryId(d.id);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all ${
                      trackingCodeInput === 'LIV-' + d.id
                        ? 'bg-brand-500/20 border-brand-500 text-brand-300 font-bold'
                        : 'bg-slate-800/70 border-slate-700 text-slate-400 hover:text-white'
                    }`}
                  >
                    LIV-{d.id} ({d.status})
                  </button>
                ))}
              </div>
            </div>

            {/* Stepper Display */}
            <div className="bg-slate-950/70 rounded-2xl p-6 border border-emerald-900/40 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-xs text-slate-400 font-mono">Référence colis</div>
                  <div className="text-lg font-bold font-mono text-white">LIV-{currentTrackedDelivery.id}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400 font-mono">Article</div>
                  <div className="text-sm font-semibold text-emerald-300">{currentTrackedDelivery.item}</div>
                </div>
              </div>

              {/* Progress Steps */}
              <div className="relative py-4">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-800 -translate-y-1/2 z-0" />
                <div 
                  className="absolute top-1/2 left-0 h-1 bg-brand-500 -translate-y-1/2 z-0 transition-all duration-500"
                  style={{
                    width: currentTrackedDelivery.status === 'Livré' ? '100%' : (currentTrackedDelivery.status === 'En route' ? '66%' : (currentTrackedDelivery.status === 'Échec' ? '100%' : '33%'))
                  }}
                />
                <div className="relative z-10 flex justify-between">
                  {/* Step 1 */}
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-brand-500 text-black flex items-center justify-center font-bold text-xs shadow-md">
                      ✓
                    </div>
                    <span className="text-[11px] text-slate-300 mt-2 font-mono">Enregistrée</span>
                  </div>

                  {/* Step 2 */}
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-md transition-all ${
                      currentTrackedDelivery.status === 'En route' || currentTrackedDelivery.status === 'Livré' || currentTrackedDelivery.status === 'Échec'
                        ? 'bg-brand-500 text-black'
                        : 'bg-slate-800 text-slate-500'
                    }`}>
                      <Truck className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] text-slate-300 mt-2 font-mono">En route</span>
                  </div>

                  {/* Step 3 */}
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-md transition-all ${
                      currentTrackedDelivery.status === 'Livré'
                        ? 'bg-brand-500 text-black'
                        : (currentTrackedDelivery.status === 'Échec' ? 'bg-red-500 text-white' : 'bg-slate-800 text-slate-500')
                    }`}>
                      {currentTrackedDelivery.status === 'Échec' ? '✕' : '✓'}
                    </div>
                    <span className="text-[11px] text-slate-300 mt-2 font-mono">
                      {currentTrackedDelivery.status === 'Échec' ? 'Échec' : 'Livrée'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Message Banner */}
              <div className={`mt-4 p-4 rounded-xl border flex items-start gap-3 ${
                currentTrackedDelivery.status === 'Livré'
                  ? 'bg-brand-950/40 border-brand-500/40 text-brand-200'
                  : (currentTrackedDelivery.status === 'Échec'
                    ? 'bg-red-950/40 border-red-500/40 text-red-200'
                    : 'bg-blue-950/40 border-blue-500/40 text-blue-200')
              }`}>
                {currentTrackedDelivery.status === 'Livré' ? (
                  <CheckCircle2 className="w-5 h-5 text-brand-400 shrink-0 mt-0.5" />
                ) : currentTrackedDelivery.status === 'Échec' ? (
                  <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                ) : (
                  <Truck className="w-5 h-5 text-blue-400 shrink-0 mt-0.5 animate-pulse" />
                )}
                <div>
                  <div className="font-bold text-sm">
                    {currentTrackedDelivery.status === 'Livré' && 'Colis remis en main propre !'}
                    {currentTrackedDelivery.status === 'En route' && 'Le coursier est en route vers votre adresse !'}
                    {currentTrackedDelivery.status === 'Échec' && 'Livraison non aboutie'}
                  </div>
                  <div className="text-xs opacity-90 mt-1">
                    {currentTrackedDelivery.status === 'Livré' && `Livré à ${currentTrackedDelivery.time} — Preuve photo validée.`}
                    {currentTrackedDelivery.status === 'En route' && `Arrivée estimée sous 25 minutes. Adresse : ${currentTrackedDelivery.address} (${currentTrackedDelivery.landmark}).`}
                    {currentTrackedDelivery.status === 'Échec' && `Motif : ${currentTrackedDelivery.failureReason}. Notre service client vous rappelle.`}
                  </div>
                </div>
              </div>

              {/* Photo Proof Display if Delivered */}
              {currentTrackedDelivery.status === 'Livré' && currentTrackedDelivery.proofPhoto && (
                <div className="mt-4 pt-4 border-t border-emerald-900/60">
                  <div className="text-xs font-mono text-slate-400 mb-2 flex items-center gap-1.5">
                    <Camera className="w-3.5 h-3.5 text-brand-400" />
                    <span>Preuve photo horodatée prise par le livreur :</span>
                  </div>
                  <div className="relative rounded-xl overflow-hidden border border-emerald-700/60 max-h-48 group">
                    <img 
                      src={currentTrackedDelivery.proofPhoto} 
                      alt="Preuve de livraison" 
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" 
                    />
                    <div className="absolute bottom-2 left-2 bg-black/80 px-2.5 py-1 rounded text-[11px] font-mono text-brand-300">
                      📍 Dakar — {currentTrackedDelivery.landmark} — {currentTrackedDelivery.time} GMT
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Courier contact widget */}
            <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950/60 border border-emerald-900/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-brand-600/20 border border-brand-500/40 flex items-center justify-center font-bold text-brand-400">
                  MD
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-mono">Votre coursier dédié</div>
                  <div className="text-sm font-bold text-white">Moussa Diop (Moto #04)</div>
                </div>
              </div>
              <div className="flex gap-2">
                <a
                  href={`tel:${currentTrackedDelivery.phone}`}
                  className="p-2.5 rounded-xl bg-emerald-950 border border-emerald-800/80 text-brand-400 hover:text-white transition-colors"
                  title="Appeler le livreur"
                >
                  <Phone className="w-4 h-4" />
                </a>
                <a
                  href={`https://wa.me/221771112233?text=Bonjour%20Moussa,%20je%20suis%20le%20client%20pour%20la%20livraison%20${currentTrackedDelivery.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-emerald-950 border border-emerald-800/80 text-brand-400 hover:text-white transition-colors"
                  title="WhatsApp livreur"
                >
                  <MessageSquare className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Courier Phone Screen */}
        {activeTab === 'driver' && (
          <div className="max-w-md mx-auto bg-slate-950 border-4 border-slate-800 rounded-[2.5rem] p-5 shadow-2xl relative">
            {/* Phone Notch */}
            <div className="w-32 h-4 bg-slate-800 rounded-b-xl mx-auto mb-4" />
            
            {/* Driver App Header */}
            <div className="flex items-center justify-between pb-3 border-b border-emerald-950 mb-4">
              <div>
                <span className="text-[10px] font-mono text-brand-400 uppercase">App Livreur — Dakar</span>
                <div className="text-sm font-bold text-white flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-brand-500" />
                  Moussa Diop (En ligne)
                </div>
              </div>
              <span className="text-xs font-mono bg-emerald-950 px-2 py-0.5 rounded text-emerald-300 border border-emerald-800/40">
                {driverDeliveries.filter(d => d.status === 'Livré').length}/{driverDeliveries.length} Livrées
              </span>
            </div>

            {/* Delivery Cards in Driver Phone */}
            <div className="space-y-3 max-h-[460px] overflow-y-auto pr-1">
              {driverDeliveries.map(d => (
                <div 
                  key={d.id}
                  className="p-3.5 rounded-2xl bg-slate-900 border border-emerald-900/40 hover:border-brand-500/40 transition-all text-xs"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-mono font-bold text-brand-400">LIV-{d.id}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      d.status === 'Livré' ? 'bg-brand-500/20 text-brand-400' :
                      d.status === 'Échec' ? 'bg-red-500/20 text-red-400' :
                      'bg-blue-500/20 text-blue-400'
                    }`}>
                      {d.status}
                    </span>
                  </div>

                  <div className="font-bold text-white text-sm mb-1">{d.client}</div>
                  <div className="text-slate-400 flex items-center gap-1 mb-1">
                    <MapPin className="w-3 h-3 text-brand-500 shrink-0" />
                    <span className="truncate">{d.address}</span>
                  </div>
                  <div className="text-[11px] text-brand-300/80 italic mb-2">
                    Repère : {d.landmark}
                  </div>

                  <div className="flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-black/40 border border-emerald-950 mb-3">
                    <span className="text-slate-400">À encaisser :</span>
                    <span className="font-mono font-bold text-emerald-300">
                      {d.toCollect.toLocaleString()} FCFA ({d.paymentMode})
                    </span>
                  </div>

                  {/* Actions according to status */}
                  {d.status === 'À livrer' && (
                    <button
                      onClick={() => handleDriverStatusChange(d.id, 'En route')}
                      className="w-full py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all flex items-center justify-center gap-1.5"
                    >
                      <Truck className="w-3.5 h-3.5" />
                      <span>J'y vais (En route)</span>
                    </button>
                  )}

                  {d.status === 'En route' && (
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleDriverStatusChange(d.id, 'Livré')}
                        className="py-2 rounded-xl bg-brand-500 hover:bg-brand-400 text-black font-bold transition-all flex items-center justify-center gap-1"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span>Photo + Livré</span>
                      </button>
                      <button
                        onClick={() => handleDriverStatusChange(d.id, 'Échec', 'Client injoignable')}
                        className="py-2 rounded-xl bg-red-950 border border-red-800 text-red-300 hover:bg-red-900 font-bold transition-all flex items-center justify-center gap-1"
                      >
                        <X className="w-3.5 h-3.5" />
                        <span>Échec</span>
                      </button>
                    </div>
                  )}

                  {d.status === 'Livré' && (
                    <div className="text-center py-1.5 rounded-lg bg-brand-950/40 text-brand-300 font-mono text-[11px] border border-brand-800/40">
                      ✓ Validé avec photo ({d.collected.toLocaleString()} FCFA encaissés)
                    </div>
                  )}

                  {d.status === 'Échec' && (
                    <div className="text-center py-1.5 rounded-lg bg-red-950/40 text-red-300 font-mono text-[11px] border border-red-800/40">
                      ✕ Colis non livré : {d.failureReason}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-emerald-950 text-center">
              <span className="text-[10px] text-slate-500 font-mono">
                App Web PWA — 0 Mo d'espace requis sur Android
              </span>
            </div>
          </div>
        )}

        {/* Tab 3: Daily Manager Reconciliation Dashboard */}
        {activeTab === 'manager' && (
          <div className="max-w-4xl mx-auto bg-slate-900/90 border border-emerald-800/60 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-emerald-900/60 gap-4 mb-6">
              <div>
                <span className="text-xs font-mono uppercase text-brand-400">Tableau de Bord Gestionnaire</span>
                <h3 className="text-2xl font-bold text-white">Clôture de Caisse du Jour (19h00 GMT)</h3>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-lg bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs font-mono">
                  Dakar Express Logistique
                </span>
                <button
                  onClick={() => {
                    // Reset deliveries demo
                    setDriverDeliveries([
                      {
                        id: '101',
                        client: 'Fatou Sall',
                        phone: '+221 77 450 12 34',
                        address: 'Sacré-Cœur 3',
                        landmark: 'Face Boulangerie Jaune',
                        item: 'Robe en soie',
                        toCollect: 25000,
                        collected: 25000,
                        paymentMode: 'Wave',
                        status: 'Livré',
                        proofPhoto: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&auto=format&fit=crop&q=80',
                        failureReason: '',
                        time: '14:25'
                      },
                      {
                        id: '102',
                        client: 'Cheikh Tidiane Sy',
                        phone: '+221 78 320 45 67',
                        address: 'Mermoz',
                        landmark: 'Près de l\'école BEM',
                        item: 'Montre connectée',
                        toCollect: 45000,
                        collected: 45000,
                        paymentMode: 'Espèces',
                        status: 'Livré',
                        proofPhoto: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=500&auto=format&fit=crop&q=80',
                        failureReason: '',
                        time: '15:10'
                      },
                      {
                        id: '104',
                        client: 'Babacar Seck',
                        phone: '+221 70 123 45 67',
                        address: 'Almadies',
                        landmark: 'Portail noir',
                        item: 'Sneakers Jordan',
                        toCollect: 50000,
                        collected: 0,
                        paymentMode: 'Espèces',
                        status: 'Échec',
                        proofPhoto: '',
                        failureReason: 'Client absent',
                        time: '16:05'
                      }
                    ]);
                  }}
                  className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                  title="Réinitialiser la démo"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-emerald-950">
                <div className="text-xs text-slate-400 font-mono">Colis Livrés</div>
                <div className="text-2xl font-bold font-mono text-brand-400 mt-1">
                  {driverDeliveries.filter(d => d.status === 'Livré').length}
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  sur {driverDeliveries.length} assignés
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/70 border border-emerald-950">
                <div className="text-xs text-slate-400 font-mono">Cash Espèces (Physique)</div>
                <div className="text-xl font-bold font-mono text-emerald-300 mt-1">
                  {driverDeliveries
                    .filter(d => d.status === 'Livré' && d.paymentMode === 'Espèces')
                    .reduce((sum, d) => sum + d.collected, 0)
                    .toLocaleString()}{' '}
                  FCFA
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">À déposer ce soir</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/70 border border-emerald-950">
                <div className="text-xs text-slate-400 font-mono">Wave & Orange Money</div>
                <div className="text-xl font-bold font-mono text-accent-wave mt-1">
                  {driverDeliveries
                    .filter(d => d.status === 'Livré' && (d.paymentMode === 'Wave' || d.paymentMode === 'Orange Money'))
                    .reduce((sum, d) => sum + d.collected, 0)
                    .toLocaleString()}{' '}
                  FCFA
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">Virements reçus</div>
              </div>

              <div className="p-4 rounded-2xl bg-slate-950/70 border border-emerald-950">
                <div className="text-xs text-slate-400 font-mono">Écart de Caisse</div>
                <div className="text-2xl font-bold font-mono text-brand-400 mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-5 h-5 text-brand-500" />
                  0 FCFA
                </div>
                <div className="text-[11px] text-brand-400/80 mt-0.5">Caisse 100% carrée</div>
              </div>
            </div>

            {/* Drivers Breakdown Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-emerald-900/60 text-slate-400 font-mono">
                    <th className="pb-3">Livreur</th>
                    <th className="pb-3">Livrées</th>
                    <th className="pb-3">Échecs</th>
                    <th className="pb-3">Espèces</th>
                    <th className="pb-3">Wave / OM</th>
                    <th className="pb-3">Total Encaissé</th>
                    <th className="pb-3 text-right">Statut Caisse</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-950/80 font-mono">
                  <tr>
                    <td className="py-3 font-bold text-white">Moussa Diop (Moto 01)</td>
                    <td className="py-3 text-brand-400">
                      {driverDeliveries.filter(d => d.status === 'Livré').length}
                    </td>
                    <td className="py-3 text-red-400">
                      {driverDeliveries.filter(d => d.status === 'Échec').length}
                    </td>
                    <td className="py-3 text-slate-200">
                      {driverDeliveries
                        .filter(d => d.status === 'Livré' && d.paymentMode === 'Espèces')
                        .reduce((sum, d) => sum + d.collected, 0)
                        .toLocaleString()}{' '}
                      FCFA
                    </td>
                    <td className="py-3 text-accent-wave">
                      {driverDeliveries
                        .filter(d => d.status === 'Livré' && (d.paymentMode === 'Wave' || d.paymentMode === 'Orange Money'))
                        .reduce((sum, d) => sum + d.collected, 0)
                        .toLocaleString()}{' '}
                      FCFA
                    </td>
                    <td className="py-3 font-bold text-white">
                      {driverDeliveries
                        .filter(d => d.status === 'Livré')
                        .reduce((sum, d) => sum + d.collected, 0)
                        .toLocaleString()}{' '}
                      FCFA
                    </td>
                    <td className="py-3 text-right">
                      <span className="px-2 py-0.5 rounded bg-brand-500/20 text-brand-400 text-[10px] font-bold">
                        OK / CONFORME
                      </span>
                    </td>
                  </tr>
                  <tr>
                    <td className="py-3 font-bold text-white">Ibrahima Ndiaye (Moto 02)</td>
                    <td className="py-3 text-brand-400">4</td>
                    <td className="py-3 text-slate-500">0</td>
                    <td className="py-3 text-slate-200">65 000 FCFA</td>
                    <td className="py-3 text-accent-wave">30 000 FCFA</td>
                    <td className="py-3 font-bold text-white">95 000 FCFA</td>
                    <td className="py-3 text-right">
                      <span className="px-2 py-0.5 rounded bg-brand-500/20 text-brand-400 text-[10px] font-bold">
                        OK / CONFORME
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 4: WhatsApp Link Tool */}
        {activeTab === 'generator' && (
          <div className="max-w-2xl mx-auto bg-slate-900/90 border border-emerald-800/60 rounded-3xl p-6 sm:p-8 shadow-2xl">
            <div className="pb-4 border-b border-emerald-900/60 mb-6">
              <span className="text-xs font-mono uppercase text-brand-400">Utilitaire Gratuit</span>
              <h3 className="text-xl font-bold text-white">Générateur de Lien WhatsApp LivraTrack</h3>
              <p className="text-xs text-slate-400 mt-1">
                Générez le lien WhatsApp exact envoyé au client avec le code de suivi pour tester sur votre propre téléphone.
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Nom du client :</label>
                <input
                  type="text"
                  value={genClientName}
                  onChange={(e) => setGenClientName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-emerald-900/60 text-white text-sm focus:outline-none focus:border-brand-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Numéro WhatsApp (avec indicatif) :</label>
                  <input
                    type="text"
                    value={genPhone}
                    onChange={(e) => setGenPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-emerald-900/60 text-white text-sm focus:outline-none focus:border-brand-500"
                    placeholder="221774567890"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">Référence colis :</label>
                  <input
                    type="text"
                    value={genRef}
                    onChange={(e) => setGenRef(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-emerald-900/60 text-white text-sm focus:outline-none focus:border-brand-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-300 mb-1">Aperçu du message :</label>
                <div className="p-3.5 rounded-xl bg-slate-950 border border-emerald-950 text-xs font-mono text-emerald-200">
                  Bonjour {genClientName}, votre commande ({genRef}) est prise en charge par notre livreur. Suivez l'arrivée en direct ici : https://suivi.livratrack.app?code={genRef}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => copyToClipboard(generatedWhatsAppUrl)}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-mono flex items-center justify-center gap-2 transition-colors"
              >
                {copiedLink ? <Check className="w-4 h-4 text-brand-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedLink ? 'Lien copié !' : 'Copier le lien wa.me'}</span>
              </button>

              <a
                href={generatedWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-black text-xs font-bold flex items-center justify-center gap-2 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Tester sur WhatsApp maintenant →</span>
              </a>
            </div>
          </div>
        )}
      </section>

      {/* Pricing Section */}
      <section id="tarifs" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-emerald-950/80">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-mono uppercase tracking-widest text-brand-400 mb-3">
            {lang === 'fr' ? 'Tarification Transparente' : 'Clear & Transparent Pricing'}
          </h2>
          <p className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
            {lang === 'fr' ? 'Rentabilisé dès le premier litige évité' : 'Profitable from the very first prevented dispute'}
          </p>
          <p className="text-slate-400 text-sm">
            {lang === 'fr' 
              ? 'Sans engagement. 30 jours d’essai 100% gratuit avec accompagnement personnalisé à Dakar.'
              : 'No contract. 100% free 30-day trial with full setup support.'}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Tier 1: Free Trial */}
          <div className="p-8 rounded-3xl bg-slate-900/60 border border-emerald-900/50 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-brand-400 uppercase tracking-widest mb-2">
                {lang === 'fr' ? 'Offre Pilote' : 'Pilot Offer'}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {lang === 'fr' ? 'Essai 30 Jours' : '30-Day Free Trial'}
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                {lang === 'fr' ? 'Idéal pour tester sur 2 à 3 livreurs cette semaine.' : 'Perfect to test on 2-3 couriers this week.'}
              </p>
              <div className="text-4xl font-extrabold font-mono text-white mb-6">
                0 <span className="text-sm font-sans text-slate-400 font-normal">{currencyLabel} / 30j</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-300 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-brand-400" />
                  <span>Jusqu’à 3 livreurs inclus</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-brand-400" />
                  <span>Preuves photos illimitées</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-brand-400" />
                  <span>Suivi WhatsApp pour vos clients</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-brand-400" />
                  <span>Configuration en 10 min par Djiby</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors"
            >
              {lang === 'fr' ? 'Commencer l’essai gratuit' : 'Start Free Trial'}
            </button>
          </div>

          {/* Tier 2: Standard (Recommended) */}
          <div className="p-8 rounded-3xl bg-gradient-to-b from-brand-950/60 to-slate-900/90 border-2 border-brand-500 relative flex flex-col justify-between shadow-2xl shadow-brand-500/10">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-brand-500 text-black font-mono font-bold text-[11px] uppercase tracking-wider">
              {lang === 'fr' ? 'Le Plus Populaire' : 'Most Popular'}
            </div>
            <div>
              <div className="text-xs font-mono text-brand-400 uppercase tracking-widest mb-2">
                {lang === 'fr' ? 'Flotte Standard' : 'Standard Fleet'}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {lang === 'fr' ? 'Par Livreur' : 'Per Driver'}
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                {lang === 'fr' ? 'Pour flottes de 3 à 20 livreurs à Dakar ou à l’international.' : 'For fleets of 3-20 drivers.'}
              </p>
              <div className="text-4xl font-extrabold font-mono text-white mb-6">
                {priceStarter} <span className="text-sm font-sans text-slate-400 font-normal">/ livreur / mois</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-300 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-brand-400" />
                  <span>Tout le pack Essai inclus</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-brand-400" />
                  <span>Rapprochement Cash + Wave + OM</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-brand-400" />
                  <span>Bilan automatique à 19h00 par livreur</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-brand-400" />
                  <span>Support WhatsApp prioritaire 7j/7</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full py-3 rounded-xl bg-brand-500 hover:bg-brand-400 text-black font-bold text-xs shadow-lg shadow-brand-500/20 transition-all hover:scale-[1.02]"
            >
              {lang === 'fr' ? 'Choisir la Flotte Standard' : 'Choose Standard Fleet'}
            </button>
          </div>

          {/* Tier 3: Enterprise */}
          <div className="p-8 rounded-3xl bg-slate-900/60 border border-emerald-900/50 flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-slate-400 uppercase tracking-widest mb-2">
                {lang === 'fr' ? 'Grand Compte' : 'Enterprise'}
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                {lang === 'fr' ? 'Sur Mesure' : 'Custom Fleet'}
              </h3>
              <p className="text-xs text-slate-400 mb-6">
                {lang === 'fr' ? 'Flottes de plus de 20 motos, messageries et hubs régionaux.' : 'For 20+ couriers and regional logistics hubs.'}
              </p>
              <div className="text-3xl font-extrabold font-mono text-white mb-6">
                {lang === 'fr' ? 'Sur Devis' : 'Custom Quote'}
              </div>
              <ul className="space-y-3 text-xs text-slate-300 mb-8">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-brand-400" />
                  <span>API WhatsApp officielle automatisée</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-brand-400" />
                  <span>Nom de domaine personnalisé</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-brand-400" />
                  <span>Intégration ERP / Shopify / WooCommerce</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-brand-400" />
                  <span>Formation sur site à Dakar</span>
                </li>
              </ul>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors"
            >
              {lang === 'fr' ? 'Contacter l’équipe' : 'Contact Us'}
            </button>
          </div>
        </div>
      </section>

      {/* The Story / Founder Credibility */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-emerald-950/80">
        <div className="p-8 sm:p-10 rounded-3xl bg-emerald-950/20 border border-emerald-900/40 flex flex-col md:flex-row items-center gap-8">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-tr from-brand-600 to-emerald-400 flex items-center justify-center text-4xl font-bold text-black shrink-0 shadow-xl shadow-brand-500/20">
            🛵
          </div>
          <div>
            <div className="inline-block text-xs font-mono text-brand-400 uppercase tracking-widest mb-1">
              {lang === 'fr' ? 'Le Mot du Fondateur' : 'Founder Note'}
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
              {lang === 'fr' 
                ? '« J’ai fait 5 ans sur les routes de Dakar. Je sais exactement où l’argent disparaît. »'
                : '“I spent 5 years riding delivery bikes across Dakar. I know exactly where the leaks happen.”'}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              {lang === 'fr' ? (
                <>
                  « Les logiciels américains ou européens ne comprennent rien aux réalités de Dakar : les adresses qui sont des repères (<i>« face à la mosquée blanche »</i>), les coupures de réseau, et le mix constant entre cash liquide, Wave et Orange Money. LivraTrack a été créé sur le terrain, pour les motos et pour les gérants d’ici. »
                </>
              ) : (
                <>
                  « Standard western delivery apps fail in African cities: addresses are landmarks, network drops occur, and drivers constantly juggle physical cash and mobile money. LivraTrack was engineered from real street experience for local delivery realities. »
                </>
              )}
            </p>
            <div className="mt-4 text-xs font-mono text-emerald-400">
              — Djiby Gaye, Fondateur de LivraTrack Dakar
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-emerald-950/80">
        <div className="text-center mb-12">
          <h2 className="text-xs font-mono uppercase tracking-widest text-brand-400 mb-2">FAQ</h2>
          <p className="text-2xl sm:text-3xl font-extrabold text-white">
            {lang === 'fr' ? 'Questions fréquentes des gérants' : 'Frequently Asked Questions'}
          </p>
        </div>

        <div className="space-y-4">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-emerald-900/40">
            <h4 className="font-bold text-white text-sm mb-2 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-brand-400" />
              {lang === 'fr' 
                ? 'Mes livreurs ont de vieux téléphones, est-ce que ça va marcher ?' 
                : 'My couriers have budget phones, will it work?'}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {lang === 'fr'
                ? 'Oui, à 100%. Il n’y a aucune application lourde à télécharger sur le Play Store. C’est une application web légère qui s’ouvre directement dans Chrome ou depuis un lien WhatsApp, même sur un smartphone Android à 25 000 FCFA.'
                : 'Yes, 100%. There is no heavy app to install. It runs directly in the browser or via WhatsApp links, even on entry-level Android devices.'}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-emerald-900/40">
            <h4 className="font-bold text-white text-sm mb-2 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-brand-400" />
              {lang === 'fr'
                ? 'Que se passe-t-il si la connexion internet coupe pendant la tournée ?'
                : 'What if internet connection drops during delivery?'}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {lang === 'fr'
                ? 'L’application enregistre la photo et l’encaissement localement sur le téléphone. Dès que le livreur retrouve du réseau au quartier suivant, les données se synchronisent automatiquement sans perte.'
                : 'The app caches the photo and collected amount locally. As soon as the driver reconnects in the next neighborhood, all data syncs automatically.'}
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-emerald-900/40">
            <h4 className="font-bold text-white text-sm mb-2 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-brand-400" />
              {lang === 'fr'
                ? 'Comment fonctionne l’essai gratuit de 30 jours ?'
                : 'How does the 30-day free trial work?'}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              {lang === 'fr'
                ? 'Aucune carte bancaire n’est requise. Djiby configure votre compte en 10 minutes avec vous. Vous testez sur 2 ou 3 de vos livreurs dès demain. Si vous n’êtes pas convaincu à la fin du mois, vous arrêtez librement.'
                : 'No credit card required. Djiby sets up your account in 10 minutes. You test on 2-3 couriers starting tomorrow without any commitment.'}
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-emerald-950/80 bg-[#050a07] py-12 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-brand-500 flex items-center justify-center text-black font-bold">
              L
            </div>
            <span className="font-bold text-white tracking-tight">LivraTrack</span>
            <span>— Plateforme de Suivi & Encaissements Dakar</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1.5 font-mono">
              <span className="w-2 h-2 rounded-full bg-brand-500" />
              Système 100% Opérationnel
            </span>
          </div>

          <div>
            © {new Date().getFullYear()} LivraTrack Technologies. Tous droits réservés.
          </div>
        </div>
      </footer>

      {/* Modal Demo / 30-Day Trial Booking */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-emerald-700/60 rounded-3xl p-6 sm:p-8 max-w-md w-full relative shadow-2xl">
            <button
              onClick={() => {
                setIsModalOpen(false);
                setDemoSent(false);
              }}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl bg-slate-800/60 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!demoSent ? (
              <>
                <div className="mb-6">
                  <div className="text-xs font-mono text-brand-400 uppercase tracking-widest mb-1">
                    Essai 30 Jours Sans Engagement
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Activer LivraTrack pour votre flotte
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Démo de 10 min en visio ou à Dakar avec Djiby, ancien livreur.
                  </p>
                </div>

                <form onSubmit={handleDemoSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Votre Prénom & Nom *</label>
                    <input
                      type="text"
                      required
                      value={demoFormData.name}
                      onChange={(e) => setDemoFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Ex : Djiby Ndiaye"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-emerald-900/60 text-white text-sm focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1">Numéro WhatsApp *</label>
                    <input
                      type="tel"
                      required
                      value={demoFormData.phone}
                      onChange={(e) => setDemoFormData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+221 77 123 45 67"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-emerald-900/60 text-white text-sm focus:outline-none focus:border-brand-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Nom entreprise</label>
                      <input
                        type="text"
                        value={demoFormData.company}
                        onChange={(e) => setDemoFormData(prev => ({ ...prev, company: e.target.value }))}
                        placeholder="Ex : Dakar Colis"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-emerald-900/60 text-white text-sm focus:outline-none focus:border-brand-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-300 mb-1">Nombre de livreurs</label>
                      <select
                        value={demoFormData.driversCount}
                        onChange={(e) => setDemoFormData(prev => ({ ...prev, driversCount: e.target.value }))}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-emerald-900/60 text-white text-sm focus:outline-none focus:border-brand-500"
                      >
                        <option value="1-2">1 à 2 livreurs</option>
                        <option value="3-5">3 à 5 livreurs</option>
                        <option value="6-15">6 à 15 livreurs</option>
                        <option value="15+">Plus de 15 livreurs</option>
                      </select>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-black font-bold text-sm shadow-xl shadow-brand-500/20 transition-all mt-2 flex items-center justify-center gap-2"
                  >
                    <span>Valider et ouvrir sur WhatsApp →</span>
                  </button>
                  <p className="text-[11px] text-center text-slate-500">
                    🔒 Aucune carte bancaire requise. 100% gratuit pendant 30 jours.
                  </p>
                </form>
              </>
            ) : (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-brand-500/20 text-brand-400 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Demande enregistrée !</h3>
                <p className="text-xs text-slate-300 mb-6">
                  La conversation WhatsApp s'est ouverte sur votre téléphone. Djiby vous répond dans les 15 minutes.
                </p>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-brand-500 text-black font-bold text-xs"
                >
                  Fermer
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

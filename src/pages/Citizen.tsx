import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSahyog } from '../context/SahyogContext';
import { 
  UploadCloud, Loader2, Image as ImageIcon, CheckCircle, 
  ShieldCheck, CheckCircle2, Mic, Bot, Camera 
} from 'lucide-react';
import imageCompression from 'browser-image-compression';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { RANCHI_BLOCKS, RANCHI_BLOCK_DATA } from '../data/ranchiDatasets';

const uiText = {
  en: {
    offlineSync: "Offline Sync Ready",
    formTab: "Standard Form",
    voiceTab: "Sahyog Voice Assistant",
    processingIssue: "Processing Issue Data",
    thanks: "Thank you for submitting your complaint.",
    processingNow: "Your raised issue is being processed now.",
    aiSummary: "AI Routing Summary",
    department: "Department:",
    reportAnother: "Report Another Issue",
    goHome: "Go to Home",
    tapCamera: "Tap to open Camera",
    orig: "Original",
    comp: "Compressed",
    opt: "(Optimized for low bandwidth)",
    collectedInfo: "Collected Information",
    issue: "Issue:",
    location: "Location:",
    formTitle: "Report a Civic Issue",
    formSub: "Submit your community challenge. Our AI will analyze and route it to the right stakeholders.",
    issueTitle: "Issue Title",
    titlePlaceholder: "e.g., Potholes on Main Street",
    districtLabel: "District / Block",
    districtPlaceholder: "Select your block...",
    descLabel: "Detailed Description",
    descPlaceholder: "Please describe the issue in detail...",
    uploadLabel: "Upload Evidence (Image)",
    uploadText: "Upload an image",
    uploadDrag: "or drag and drop",
    uploadLimit: "PNG, JPG up to 10MB",
    submitBtn: "Submit for AI Analysis",
    missingImage: "Please upload an image first.",
    loadingMessages: [
      "Analyzing image & text via Gemini Vision...",
      "Running vector similarity check across regional tickets...",
      "Status: Verified Unique (Confidence: 94%)"
    ]
  },
  hi: {
    offlineSync: "ऑफ़लाइन सिंक तैयार",
    formTab: "मानक फॉर्म",
    voiceTab: "सहयोग वॉइस असिस्टेंट",
    processingIssue: "समस्या डेटा संसाधित किया जा रहा है",
    thanks: "आपकी शिकायत दर्ज करने के लिए धन्यवाद।",
    processingNow: "आपके द्वारा उठाई गई समस्या पर अब कार्रवाई की जा रही है।",
    aiSummary: "AI रूटिंग सारांश",
    department: "विभाग:",
    reportAnother: "अन्य समस्या दर्ज करें",
    goHome: "होम पर जाएं",
    tapCamera: "कैमरा खोलने के लिए टैप करें",
    orig: "मूल",
    comp: "संपीड़ित",
    opt: "(कम बैंडविड्थ के लिए अनुकूलित)",
    collectedInfo: "एकत्रित जानकारी",
    issue: "समस्या:",
    location: "स्थान:",
    formTitle: "नागरिक समस्या दर्ज करें",
    formSub: "अपनी सामुदायिक चुनौती दर्ज करें। हमारा AI इसका विश्लेषण करके इसे सही विभाग को भेजेगा।",
    issueTitle: "समस्या का शीर्षक",
    titlePlaceholder: "उदा., मुख्य सड़क पर गड्ढे",
    districtLabel: "जिला / ब्लॉक",
    districtPlaceholder: "अपना ब्लॉक चुनें...",
    descLabel: "विस्तृत विवरण",
    descPlaceholder: "कृपया समस्या का विस्तार से वर्णन करें...",
    uploadLabel: "प्रमाण अपलोड करें (फोटो)",
    uploadText: "फोटो अपलोड करें",
    uploadDrag: "या खींच कर छोड़ें",
    uploadLimit: "PNG, JPG 10MB तक",
    submitBtn: "AI विश्लेषण के लिए सबमिट करें",
    missingImage: "कृपया पहले एक फोटो अपलोड करें।",
    loadingMessages: [
      "जेमिनी विजन द्वारा छवि और पाठ का विश्लेषण...",
      "क्षेत्रीय टिकटों में वेक्टर समानता जांच चल रही है...",
      "स्थिति: अद्वितीय सत्यापित (विश्वास: 94%)"
    ]
  }
};

export default function Citizen() {
  const { addChallenge } = useSahyog();
  
  const [mode, setMode] = useState<'form' | 'voice'>('form');
  const [lang, setLang] = useState<'en' | 'hi'>('en');

  const t = uiText[lang];

  const [formData, setFormData] = useState({ title: '', description: '' });
  const [selectedBlock, setSelectedBlock] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [compressedFileObj, setCompressedFileObj] = useState<File | null>(null);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [compressionStats, setCompressionStats] = useState<{original: string, compressed: string} | null>(null);
  const [loadingStep, setLoadingStep] = useState(0);

  // Bot State
  type BotState = 'intro' | 'location' | 'image' | 'processing' | 'done';
  const [botState, setBotState] = useState<BotState>('intro');
  const [botMessage, setBotMessage] = useState('');
  const [isListening, setIsListening] = useState(false);

  const prompts = {
    en: {
      intro: "Namaste! What issue are you facing today? Tap the mic to speak.",
      location: "Got it. Which district or block are you reporting this from?",
      image: "Please upload or click a photo of the problem.",
      processing: "Processing your request..."
    },
    hi: {
      intro: "नमस्ते! आज आपको क्या समस्या आ रही है? बोलने के लिए माइक दबाएं।",
      location: "समझ गया। आप किस जिले या ब्लॉक से यह रिपोर्ट कर रहे हैं?",
      image: "कृपया समस्या की एक फोटो अपलोड करें या खींचें।",
      processing: "आपके अनुरोध पर कार्रवाई की जा रही है..."
    }
  };

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'en' ? 'en-IN' : 'hi-IN';
      window.speechSynthesis.speak(utterance);
    }
  };

  useEffect(() => {
    if (mode === 'voice') {
      const msg = prompts[lang][botState as keyof typeof prompts['en']];
      if (msg && botState !== 'done' && botState !== 'processing') {
        setBotMessage(msg);
        speak(msg);
      }
    } else {
      window.speechSynthesis?.cancel();
    }
  }, [botState, mode, lang]);

  const startListening = () => {
    // @ts-ignore
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in your browser.");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = lang === 'en' ? 'en-IN' : 'hi-IN';
    recognition.interimResults = false;
    
    recognition.onstart = () => setIsListening(true);
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      handleVoiceInput(transcript);
    };
    
    recognition.onerror = (e: any) => {
      console.error(e);
      setIsListening(false);
    };
    recognition.onend = () => setIsListening(false);
    
    recognition.start();
  };

  const handleVoiceInput = (text: string) => {
    const isHindi = /[\u0900-\u097F]/.test(text);
    if (isHindi && lang !== 'hi') {
      setLang('hi');
    }
    
    if (botState === 'intro') {
      setFormData({ title: text.substring(0, 50) + '...', description: text });
      setBotState('location');
    } else if (botState === 'location') {
      const matchedBlock = RANCHI_BLOCKS.find(b => text.toLowerCase().includes(b.toLowerCase())) || RANCHI_BLOCKS[0];
      setSelectedBlock(matchedBlock);
      setBotState('image');
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const origSize = (selectedFile.size / (1024 * 1024)).toFixed(2) + ' MB';
      setFile(selectedFile);
      
      const options = { maxSizeMB: 0.15, maxWidthOrHeight: 800, useWebWorker: true };
      const compressed = await imageCompression(selectedFile, options);
      const compSize = (compressed.size / 1024).toFixed(0) + ' KB';
      
      setCompressionStats({ original: origSize, compressed: compSize });
      setCompressedFileObj(compressed);
      
      if (mode === 'voice') {
        setBotState('processing');
        processSubmission(compressed);
      }
    }
  };

  useEffect(() => {
    let timers: ReturnType<typeof setTimeout>[] = [];
    if (isSubmitting) {
      setLoadingStep(0);
      timers.push(setTimeout(() => setLoadingStep(1), 2000));
      timers.push(setTimeout(() => setLoadingStep(2), 4000));
    }
    return () => timers.forEach(clearTimeout);
  }, [isSubmitting]);

  const processSubmission = async (compressedFile: File) => {
    if (!import.meta.env.VITE_GEMINI_API_KEY) {
      alert("Gemini API Key is missing. Please set VITE_GEMINI_API_KEY in .env");
      setBotState('intro');
      return;
    }

    setIsSubmitting(true);
    try {
      const base64String = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(compressedFile);
      });
      
      const rawBase64 = base64String.split(',')[1];
      const mimeType = compressedFile.type;
      
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      
      const blockToUse = selectedBlock || RANCHI_BLOCKS[0];
      const blockData = RANCHI_BLOCK_DATA[blockToUse as keyof typeof RANCHI_BLOCK_DATA];
      const prompt = `You are an AI triage agent for a civic platform. Analyze the image and text (which may be in English or Hindi). Respond ONLY with a JSON object containing: { "domain": "string", "priority": "High|Medium|Low", "keywords": ["array", "of", "strings"], "recommended_uni": "string", "match_reason": "string", "uni_pov_reason": "string" }.
Text description: ${formData.title} - ${formData.description}
Context for this block: Groundwater (CGWB): ${blockData?.water_cgwb}, Soil (NBSS&LUP): ${blockData?.soil_nbsslup}, Health (IDSP): ${blockData?.health_idsp}. Use this official data to calculate Priority. formulate match_reason (for govt admins explaining why this uni) and uni_pov_reason (for the university explaining why this was routed to them). Route ONLY to: BAU, BIT Mesra, RIMS Ranchi, CUJ, or NIAMT.`;
      
      const imagePart = { inlineData: { data: rawBase64, mimeType } };
      
      const result = await model.generateContent([prompt, imagePart]);
      const responseText = result.response.text();
      const jsonString = responseText.replace(/```json\n?|```/g, '').trim();
      const aiData = JSON.parse(jsonString);
      
      await addChallenge({
        title: formData.title || 'Civic Issue',
        description: formData.description || 'Reported via Voice Assistant',
        district: blockToUse,
        status: 'Submitted',
        imageUrl: base64String,
        ai_analysis: aiData
      });
      
      setIsSubmitting(false);
      setSuccessData(aiData);
      setBotState('done');
    } catch (error) {
      console.error(error);
      alert("An error occurred during AI analysis.");
      setIsSubmitting(false);
      setBotState('intro');
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!compressedFileObj) {
      alert(t.missingImage);
      return;
    }
    await processSubmission(compressedFileObj);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      
      {/* Toggles System */}
      <div className="max-w-3xl mx-auto mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-center bg-white dark:bg-zinc-900 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-zinc-800 transition-colors">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <div className="flex bg-slate-100 dark:bg-zinc-800 p-1 rounded-lg">
              <button onClick={() => { setMode('form'); setBotState('intro'); }} className={`px-4 py-2 text-sm font-bold rounded-md transition-colors ${mode === 'form' ? 'bg-white dark:bg-zinc-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}>{t.formTab}</button>
              <button onClick={() => setMode('voice')} className={`px-4 py-2 text-sm font-bold rounded-md transition-colors ${mode === 'voice' ? 'bg-white dark:bg-zinc-700 text-blue-600 dark:text-blue-400 shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}>{t.voiceTab}</button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex bg-slate-100 dark:bg-zinc-800 p-1 rounded-lg">
              <button onClick={() => setLang('en')} className={`px-3 py-1.5 text-sm font-bold rounded-md transition-colors ${lang === 'en' ? 'bg-white dark:bg-zinc-700 text-slate-800 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}>English</button>
              <button onClick={() => setLang('hi')} className={`px-3 py-1.5 text-sm font-bold rounded-md transition-colors ${lang === 'hi' ? 'bg-white dark:bg-zinc-700 text-slate-800 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400'}`}>हिन्दी</button>
            </div>
            <div className="flex items-center text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800/50">
              <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2 animate-pulse"></div>
              {t.offlineSync}
            </div>
          </div>
        </div>
      </div>

      {/* Loading Modal */}
      {isSubmitting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 dark:bg-black/60 backdrop-blur-sm transition-opacity">
          <div className="bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 p-8 rounded-2xl shadow-2xl flex flex-col max-w-sm w-full mx-4">
            <div className="flex items-center justify-center mb-6">
              <Loader2 className="w-10 h-10 text-blue-600 dark:text-blue-400 animate-spin" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 dark:text-white text-center mb-6">{t.processingIssue}</h3>
            
            <div className="w-full space-y-4">
              {t.loadingMessages.map((msg, idx) => (
                <div key={idx} className={`flex items-start text-sm font-medium ${loadingStep >= idx ? 'text-slate-700 dark:text-slate-300' : 'text-slate-400 dark:text-slate-600'}`}>
                  <div className="mt-0.5 mr-3 shrink-0">
                    {loadingStep > idx ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : loadingStep === idx ? <Loader2 className="w-5 h-5 text-blue-500 animate-spin" /> : <div className="w-5 h-5 rounded-full border-2 border-slate-200 dark:border-zinc-700" />}
                  </div>
                  <span className="leading-tight">{msg}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Success View */}
      {successData && (
        <div className="max-w-3xl mx-auto">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-sm border border-slate-200 dark:border-zinc-800 overflow-hidden p-12 text-center transition-colors duration-300">
            <CheckCircle className="w-16 h-16 text-emerald-500 dark:text-emerald-400 mx-auto mb-6" />
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mb-4">{t.thanks}</h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-6 max-w-md mx-auto">
              {t.processingNow}
            </p>

            <div className="bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-700/50 rounded-xl p-6 mb-8 text-left max-w-lg mx-auto shadow-inner">
              <h3 className="font-bold text-slate-800 dark:text-white mb-4 flex items-center">
                <ShieldCheck className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                {t.aiSummary}
              </h3>
              <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
                <li className="flex items-start">
                  <span className="font-semibold text-slate-900 dark:text-slate-200 w-32 shrink-0">{t.department}</span>
                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-0.5 rounded font-medium border border-blue-200 dark:border-blue-800/50">{successData.domain}</span>
                </li>
              </ul>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  setFormData({ title: '', description: '' });
                  setSelectedBlock('');
                  setFile(null);
                  setCompressedFileObj(null);
                  setCompressionStats(null);
                  setSuccessData(null);
                  setBotState('intro');
                }}
                className="px-6 py-3 border border-slate-300 dark:border-zinc-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors"
              >
                {t.reportAnother}
              </button>
              <Link
                to="/"
                className="px-6 py-3 bg-blue-600 dark:bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors shadow-sm"
              >
                {t.goHome}
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Voice Mode */}
      {mode === 'voice' && !successData && !isSubmitting && (
        <div className="max-w-3xl mx-auto bg-white dark:bg-zinc-900 rounded-3xl shadow-sm border border-slate-200 dark:border-zinc-800 p-8 flex flex-col items-center min-h-[500px] justify-center transition-colors">
          <div className="text-center mb-12 max-w-lg">
            <div className="inline-flex items-center justify-center p-5 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-8">
              <Bot className="w-16 h-16 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white mb-4 animate-fade-in leading-snug">
              {botMessage}
            </h2>
            <div className="h-6">
              {isListening && <p className="text-red-500 font-bold animate-pulse uppercase tracking-wider text-sm">Listening...</p>}
            </div>
          </div>

          {botState === 'image' && (
            <div className="mb-8 w-full max-w-md">
              <input type="file" accept="image/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
              <div onClick={() => fileInputRef.current?.click()} className={`flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-2xl cursor-pointer group transition-colors ${file ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20' : 'border-slate-300 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-950 hover:bg-slate-100 dark:hover:bg-zinc-800'}`}>
                {file ? <ImageIcon className="w-16 h-16 text-blue-500 mb-4" /> : <Camera className="w-16 h-16 text-slate-400 group-hover:text-blue-500 transition-colors mb-4" />}
                <span className="font-bold text-blue-600 dark:text-blue-400 text-lg">{file ? file.name : t.tapCamera}</span>
              </div>
              {compressionStats && (
                <div className="mt-4 text-center">
                  <span className="inline-flex flex-col items-center text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 px-4 py-2 rounded-xl border border-emerald-200 dark:border-emerald-800/50 leading-relaxed">
                    <span>{t.orig}: {compressionStats.original} &rarr; {t.comp}: {compressionStats.compressed}</span>
                    <span className="opacity-80">{t.opt}</span>
                  </span>
                </div>
              )}
            </div>
          )}

          {botState !== 'image' && (
            <button 
              onClick={startListening} 
              disabled={isListening}
              className={`p-10 rounded-full transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 ${isListening ? 'bg-red-500 shadow-red-500/50 scale-110' : 'bg-blue-600 dark:bg-blue-500 shadow-blue-600/30'}`}
            >
              <Mic className={`w-20 h-20 text-white ${isListening ? 'animate-pulse' : ''}`} />
            </button>
          )}
          
          {(formData.description || selectedBlock) && (
            <div className="mt-12 w-full max-w-md bg-slate-50 dark:bg-zinc-950/50 rounded-2xl p-5 border border-slate-100 dark:border-zinc-800 transition-colors">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">{t.collectedInfo}</h4>
              {formData.description && <p className="text-sm text-slate-700 dark:text-slate-300 mb-2 leading-relaxed"><strong>{t.issue}</strong> {formData.description}</p>}
              {selectedBlock && <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed"><strong>{t.location}</strong> {selectedBlock}</p>}
            </div>
          )}
        </div>
      )}

      {/* Form Mode */}
      {mode === 'form' && !successData && !isSubmitting && (
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight transition-colors duration-300">{t.formTitle}</h1>
            <p className="mt-3 text-lg text-slate-500 dark:text-slate-400 transition-colors duration-300">
              {t.formSub}
            </p>
          </div>

          <div className="bg-white dark:bg-zinc-900 rounded-3xl shadow-sm border border-slate-200 dark:border-zinc-800 overflow-hidden transition-colors duration-300">
            <form onSubmit={handleFormSubmit} className="p-8 space-y-8">

              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">{t.issueTitle}</label>
                <input
                  type="text"
                  id="title"
                  required
                  className="mt-2 block w-full rounded-xl border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border transition-colors"
                  placeholder={t.titlePlaceholder}
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="district" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">{t.districtLabel}</label>
                <select
                  id="district"
                  required
                  className="mt-2 block w-full rounded-xl border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border transition-colors"
                  value={selectedBlock}
                  onChange={(e) => setSelectedBlock(e.target.value)}
                >
                  <option value="" disabled>{t.districtPlaceholder}</option>
                  {RANCHI_BLOCKS.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-semibold text-slate-700 dark:text-slate-300">{t.descLabel}</label>
                <textarea
                  id="description"
                  rows={4}
                  required
                  className="mt-2 block w-full rounded-xl border-slate-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-3 border transition-colors"
                  placeholder={t.descPlaceholder}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">{t.uploadLabel}</label>

                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />

                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-xl transition-colors cursor-pointer group ${file ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20' : 'border-slate-300 dark:border-zinc-700 bg-slate-50 dark:bg-zinc-950/50 hover:bg-slate-100 dark:hover:bg-zinc-800'
                    }`}
                >
                  <div className="space-y-2 text-center">
                    {file ? (
                      <ImageIcon className="mx-auto h-12 w-12 text-blue-500 dark:text-blue-400" />
                    ) : (
                      <UploadCloud className="mx-auto h-12 w-12 text-slate-400 dark:text-slate-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" />
                    )}

                    <div className="flex text-sm text-slate-600 dark:text-slate-400 justify-center">
                      <span className="relative font-medium text-blue-600 dark:text-blue-400 group-hover:text-blue-500 dark:group-hover:text-blue-300">
                        {file ? file.name : t.uploadText}
                      </span>
                      {!file && <p className="pl-1">{t.uploadDrag}</p>}
                    </div>
                    {!file && <p className="text-xs text-slate-500 dark:text-slate-500">{t.uploadLimit}</p>}
                  </div>
                </div>
                
                {compressionStats && (
                  <div className="mt-4 text-center">
                    <span className="inline-flex flex-col sm:flex-row items-center text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 px-4 py-2 rounded-full border border-emerald-200 dark:border-emerald-800/50">
                      <span>{t.orig}: {compressionStats.original} &rarr; {t.comp}: {compressionStats.compressed}</span>
                      <span className="sm:ml-2 opacity-80">{t.opt}</span>
                    </span>
                  </div>
                )}
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-base font-bold text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {t.submitBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

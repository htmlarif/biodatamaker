import { useState, useRef } from 'react';
import { Printer, Download, Eye, Edit3, ChevronDown, ChevronUp } from 'lucide-react';

const THEMES = {
  maroon: { name: "ঐতিহ্যবাহী মেরুন", class: "bg-red-50 border-red-900 text-red-950", header: "bg-red-900 text-white" },
  emerald: { name: "ইসলামিক সবুজ", class: "bg-emerald-50 border-emerald-900 text-emerald-950", header: "bg-emerald-900 text-white" },
  navy: { name: "ক্লাসিক নেভি ব্লু", class: "bg-blue-50 border-blue-900 text-blue-950", header: "bg-blue-900 text-white" },
  minimalist: { name: "সাদামাটা প্রিন্ট ফ্রেন্ডলি", class: "bg-white border-gray-400 text-black", header: "bg-gray-800 text-white" },
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [theme, setTheme] = useState<keyof typeof THEMES>('maroon');
  const [openSection, setOpenSection] = useState<string>('personal');
  const previewRef = useRef<HTMLDivElement>(null);

  const [form, setForm] = useState({
    personal: { name: "মোঃ করিম", dob: "1998-01-01", height: "৫'৮\"", weight: "৭০ কেজি", complexion: "উজ্জ্বল শ্যামলা", bloodGroup: "O+", maritalStatus: "অবিবাহিত", religion: "ইসলাম" },
    education: "বি.এস.সি (কম্পিউটার সায়েন্স), ঢাকা বিশ্ববিদ্যালয়, ২০২০",
    profession: "সফটওয়্যার ইঞ্জিনিয়ার, গুগল, ঢাকা",
    family: "পিতা: মোঃ রহিম, মাতা: রহিমা বেগম",
    address: "বর্তমান: মিরপুর, ঢাকা; স্থায়ী: কুমিল্লা",
    partner: "বয়স ২২-২৫, উচ্চতা ৫'২\"+",
    contact: "পিতা: ০১৭১১-০০০০০০"
  });

  const handleDownload = () => {
    const element = previewRef.current;
    if (element && (window as any).html2pdf) {
      (window as any).html2pdf().from(element).set({
        margin: 0.5, filename: 'biodata.pdf', image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 }, jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
      }).save();
    }
  };

  const Section = ({ id, title, children }: { id: string, title: string, children: React.ReactNode }) => (
    <div className="border rounded-lg mb-2 bg-white shadow-sm">
      <button onClick={() => setOpenSection(openSection === id ? '' : id)} className="w-full p-4 flex justify-between items-center font-bold text-lg text-gray-800">
        {title} {openSection === id ? <ChevronUp /> : <ChevronDown />}
      </button>
      {openSection === id && <div className="p-4 space-y-4">{children}</div>}
    </div>
  );

  const InfoRow = ({ label, value }: { label: string, value: string }) => (
    <div className="grid grid-cols-[1fr,2fr] gap-2 py-1 border-b border-gray-200">
      <span className="font-bold text-gray-700">{label}</span>
      <span className="text-gray-900">{value}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
      <header className="bg-white shadow-sm p-4 sticky top-0 z-20">
        <h1 className="text-xl font-bold text-center text-gray-800">বিয়ে বা পাত্র-পাত্রীর বায়োডাটা মেকার</h1>
      </header>

      <main className="container mx-auto p-2 md:p-4 flex flex-col md:flex-row gap-6">
        <div className={`w-full md:w-1/2 ${activeTab === 'preview' ? 'hidden md:block' : ''}`}>
          <select onChange={e => setTheme(e.target.value as keyof typeof THEMES)} className="w-full p-3 border rounded mb-4 font-bold">
            {Object.entries(THEMES).map(([k, v]) => <option key={k} value={k}>{v.name}</option>)}
          </select>
          
          <Section id="personal" title="১. ব্যক্তিগত তথ্য">
            <input type="text" value={form.personal.name} onChange={e => setForm({...form, personal: {...form.personal, name: e.target.value}})} className="w-full p-3 border rounded" placeholder="পূর্ণ নাম" />
            <input type="date" value={form.personal.dob} onChange={e => setForm({...form, personal: {...form.personal, dob: e.target.value}})} className="w-full p-3 border rounded" />
          </Section>
          <Section id="education" title="২. শিক্ষাগত যোগ্যতা">
             <textarea value={form.education} onChange={e => setForm({...form, education: e.target.value})} className="w-full p-3 border rounded" placeholder="যেমন: বি.এস.সি (কম্পিউটার সায়েন্স), ঢাকা বিশ্ববিদ্যালয়, ২০২০" />
          </Section>
          <Section id="profession" title="৩. পেশাগত তথ্য">
             <textarea value={form.profession} onChange={e => setForm({...form, profession: e.target.value})} className="w-full p-3 border rounded" placeholder="পেশা, পদবী, কর্মস্থল" />
          </Section>
          <Section id="family" title="৪. পারিবারিক তথ্য">
             <textarea value={form.family} onChange={e => setForm({...form, family: e.target.value})} className="w-full p-3 border rounded" placeholder="পিতা-মাতার নাম ও পেশা" />
          </Section>
          <Section id="address" title="৫. ঠিকানা">
             <textarea value={form.address} onChange={e => setForm({...form, address: e.target.value})} className="w-full p-3 border rounded" placeholder="বর্তমান ও স্থায়ী ঠিকানা" />
          </Section>
          <Section id="partner" title="৬. কেমন জীবনসঙ্গী প্রত্যাশা">
             <textarea value={form.partner} onChange={e => setForm({...form, partner: e.target.value})} className="w-full p-3 border rounded" />
          </Section>
          <Section id="contact" title="৭. যোগাযোগ ও অভিভাবক">
             <textarea value={form.contact} onChange={e => setForm({...form, contact: e.target.value})} className="w-full p-3 border rounded" />
          </Section>
        </div>

        <div className={`w-full md:w-1/2 ${activeTab === 'edit' ? 'hidden md:block' : ''}`}>
          <div ref={previewRef} className={`p-6 md:p-10 border-4 ${THEMES[theme].class} font-serif min-h-[1000px] shadow-xl overflow-hidden`}>
            <h2 className={`text-2xl font-bold text-center py-2 mb-6 ${THEMES[theme].header}`}>বায়োডাটা</h2>
            <div className="space-y-4">
              <InfoRow label="পূর্ণ নাম :" value={form.personal.name} />
              <InfoRow label="জন্ম তারিখ :" value={form.personal.dob} />
              <InfoRow label="শিক্ষাগত যোগ্যতা :" value={form.education} />
              <InfoRow label="পেশা :" value={form.profession} />
              <InfoRow label="পরিবার :" value={form.family} />
              <InfoRow label="ঠিকানা :" value={form.address} />
              <InfoRow label="প্রত্যাশা :" value={form.partner} />
              <InfoRow label="যোগাযোগ :" value={form.contact} />
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <button onClick={window.print} className="flex-1 p-4 bg-green-700 text-white rounded font-bold shadow-md">🖨️ প্রিন্ট</button>
            <button onClick={handleDownload} className="flex-1 p-4 bg-blue-700 text-white rounded font-bold shadow-md">📥 PDF ডাউনলোড</button>
          </div>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 w-full flex md:hidden bg-white border-t z-30 shadow-2xl">
        <button onClick={() => setActiveTab('edit')} className={`flex-1 p-4 text-center font-bold ${activeTab === 'edit' ? 'bg-blue-100 text-blue-700' : ''}`}><Edit3 className="inline mr-2" /> তথ্য লিখুন</button>
        <button onClick={() => setActiveTab('preview')} className={`flex-1 p-4 text-center font-bold ${activeTab === 'preview' ? 'bg-blue-100 text-blue-700' : ''}`}><Eye className="inline mr-2" /> দেখুন</button>
      </div>
    </div>
  );
}

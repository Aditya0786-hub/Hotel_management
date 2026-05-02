import { Construction } from 'lucide-react'

const PlaceholderPage = ({ title }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] text-center p-16 bg-white border border-slate-100 rounded-[64px] shadow-[0_4px_40px_rgba(0,0,0,0.02)]">
      <div className="p-12 bg-slate-50 rounded-[48px] mb-12 border border-slate-100">
        <Construction size={80} className="text-[#2d3436]" strokeWidth={1} />
      </div>
      <h1 className="text-[11px] font-black text-slate-300 uppercase tracking-[0.6em] mb-6">In Development</h1>
      <h2 className="text-5xl font-black text-[#2d3436] uppercase tracking-tight mb-8">{title} MODULE</h2>
      <p className="text-slate-400 max-w-md mx-auto text-[11px] font-bold uppercase tracking-widest leading-[2.2]">
        We are engineering the {title} interface with surgical precision. Our architects are currently refining the final touches.
      </p>
      
      <div className="mt-20 flex items-center gap-8">
        <div className="w-2.5 h-2.5 rounded-full bg-slate-100"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-[#2d3436] animate-pulse shadow-2xl shadow-slate-400"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-slate-100"></div>
      </div>
    </div>
  )
}

export const FrontOffice = ({ title }) => <PlaceholderPage title={title || "Front Office"} />
export const Store = () => <PlaceholderPage title="STORE" />
export const ChannelManager = () => <PlaceholderPage title="CHANNEL MANAGER" />
export const KitchenPOS = () => <PlaceholderPage title="KITCHEN & POS" />

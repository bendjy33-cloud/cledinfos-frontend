"use client";
 import { useState } from "react"; 
 import { useLocale, useTranslations } from "next-intl";
 import { usePathname, useRouter } from "@/i18n/navigation";
 import { Globe } from "lucide-react";
 export default function LanguageSwitcher() { 
  const t = useTranslations("LanguageSwitcher");

  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname(); 

  const [open, setOpen] = useState(false); 

 const locales = [
  {
    code: "fr",
    label: t("french"),
    flag: "🇫🇷",
  },
  {
    code: "en",
    label: t("english"),
    flag: "🇺🇸",
  },
  {
    code: "ht",
    label: t("creole"),
    flag: "🇭🇹",
  },
  {
    code: "es",
    label: t("spanish"),
    flag: "🇪🇸",
  },
];
  function changeLocale(newLocale: string) {
    if (newLocale === locale) {
       setOpen(false); 
      return; 
    } 
    
    router.replace(pathname, {
        locale: newLocale, 
      }); 
      
      setOpen(false); 
    } 
    
    return ( 
        <div className="relative"> 
          <button 
            type="button" 
            onClick={() => setOpen(!open)} 
            aria-label={t("label")} 
            aria-expanded={open} 
            className="flex items-center justify-center p-2 rounded-lg hover:bg-slate-800 transition" 
          > 
            <Globe size={22} /> 
          </button> 
          
          {open && (
              <div className="absolute right-0 top-full mt-2 w-40 bg-slate-900 border border-slate-700 rounded-lg shadow-xl overflow-hidden z-[100]">
                {locales.map((item) => ( 
                  <button 
                    key={item.code} 
                    type="button" 
                    onClick={() => changeLocale(item.code)} 
                    className={`w-full text-left px-4 py-3 text-sm transition ${ 
                      item.code === locale 
                      ? "bg-red-600 text-white" 
                      : "text-white hover:bg-slate-800" 
                    }`}
                  >                   
                    
                      {item.flag} {item.label} 
                  </button> 
                ))} 
              </div> 
            )} 
        </div> 
    ); 
}
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { IoMdClose } from "react-icons/io";

const App: React.FC = () => {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Ahoj!", isUser: false },
    { text: "Jsem Q&A Bot, jsem tady, abych pomohl s otázkami ohledně mé práce.", isUser: false },
    { text: "S čím vám mohu dnes pomoci?", isUser: false }
  ]);

  const allOptions = [
    [
      { text: "Jak vás mohu kontaktovat?", response: "Můžete mě kontaktovat e-mailem nebo na tel +420 605 367 403!" },
      { text: "Denní připomenutí", response: "Nezapomeňte se podívat na můj Github!" },
      { text: "Na jakých projektech pracujete?", response: "Momentálně pracuji na vlastním CMS na tvorbu jednoduchých webů " },
      { text: "Jaký používáte tech stack?", response: "Nejčajstěji pracuji s Reactem, TypeScriptem a TailwindCSS!" }
    ],
    [
      { text: "Mohu nějak přispět k vaši práci?", response: "Samozřejmě, stačí forknout nějaké moje repository na Githubu a použít jej jak potřebujete. Stačí když zmíníte, že je základ moje práce." },
      { text: "Máte nějaká doporučení?", response: "Ano, pokud se zajímáte se o programování, tak vždy aktivně programujte, sledujte novinky a neztrácejte hlavu" },
      { text: "Mohu přispět?", response: "Samozřejmě! Stačí se ozvat a můžeme spolupracovat." },
      { text: "Jaký je váš oblíbený programovací jazyk?", response: "Mám rád TypeScript kvůli jeho flexibilitě a širokému použití." }
    ],
    [
      { text: "Jaký je váš oblíbený framework?", response: "Baví mě pracovat s Next.js díky jeho silným funkcím jakou jsou file-routing, optimalizace a mnoho jiných funkcí..." },
      { text: "Jak se udržujete v obraze?", response: "Čtu technologické blogy, sleduji různé videa a experimentuji s novými nástroji." },
      { text: "Nějaké tipy pro začátečníky?", response: "Začněte se základy, pravidelně cvičte a neváhejte požádat o pomoc" },
      { text: "Jaké nástroje používáte k ladění?", response: "Používám Chrome DevTools a vestavěný debugger ve VS Code." }
    ],
    [
      { text: "Jaké je vaše oblíbené IDE?", response: "Rád používám VS Code díky jeho rozšířením a možnostem přizpůsobení. Občasně také používám ZED pro MacOS" },
      { text: "Máte nějaké koníčky?", response: "Ano, rád programuji a hraju videohry" },
      { text: "Jaký je nejnovější projekt, který jste dokončili?", response: "Právě jsem dokončil dynamický web pro malou firmu, pomocí React a TailwindCSS." },
      { text: "Jaké zdroje doporučujete?", response: "Doporučuji podívat se na Github, Stack Overflow, daily.dev a nebo používat ChatGPT" }
    ]
  ];

  const [currentOptionsIndex, setCurrentOptionsIndex] = useState(0);
  const [showButtons, setShowButtons] = useState(true);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleOptionClick = (option: { text: string; response: string }) => {
    setMessages((prev) => [...prev, { text: option.text, isUser: true }]);
    setShowButtons(false);

    setTimeout(() => {
      setMessages((prev) => [...prev, { text: option.response, isUser: false }]);

      setCurrentOptionsIndex((prevIndex) => (prevIndex + 1) % allOptions.length);

      setTimeout(() => {
        setShowButtons(true);
      }, 500);
    }, 500);
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-[500px] bg-white rounded-xl shadow-lg">
        <div className='w-full flex flex-row rounded-t-xl items-center justify-between bg-gradient-to-r from-[#57a77c] via-[#49d382] to-[#1ecf82] p-4'>
          <div>
            <h2 className='text-white font-semibold text-xl'> Losík bot </h2>
            <p className='text-gray-100 font-light'> Zeptejte se na cokoliv </p>
          </div>
          <IoMdClose className='w-5 h-5 fill-white cursor-pointer hover:scale-110 duration-200' />
        </div>
        <div ref={chatContainerRef} className='p-4 max-h-[450px] overflow-y-auto flex flex-col space-y-2'>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`max-w-max p-2 rounded-md shadow-sm text-gray-700 ${msg.isUser ? 'bg-green-100 self-end' : 'bg-neutral-100 self-start'}`}
            >
              {msg.text}
            </motion.div>
          ))}
          {showButtons && (
            <div className="mt-4 space-y-2">
              {allOptions[currentOptionsIndex]?.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="block p-2 border border-green-500 text-green-500 rounded max-w-max"
                  onClick={() => handleOptionClick(option)}
                >
                  {option.text}
                </motion.button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

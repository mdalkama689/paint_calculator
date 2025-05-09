import { useEffect, useState } from 'react';
import Header from './components/Header';
import PaintCalculator from './components/PaintCalculator';
import MobileShare from './components/share/MobileShare';
import TabShare from './components/share/TabShare';

function App() {
  const [deviceType, setDeviceType] = useState<"big" | "small">("big");

  useEffect(() => {
    const handleResize = () => {
      setDeviceType(window.innerWidth < 1024 ? "small" : "big");
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  return (
    <div className="min-h-screen bg-black text-gray-100">
      {deviceType === "small" ? <MobileShare/> : <TabShare />}
      <div className="container mx-auto px-4 py-8 flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <PaintCalculator />
        </main>
      </div>
    </div>
  );
}

export default App;
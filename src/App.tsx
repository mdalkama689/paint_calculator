import Header from './components/Header';
import PaintCalculator from './components/PaintCalculator';

function App() {
  return (
    <div className="min-h-screen bg-black text-gray-100">
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
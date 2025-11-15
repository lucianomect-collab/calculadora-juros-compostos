import React from 'react';

const InfoSection: React.FC = () => {
  return (
    <div className="bg-white p-6 sm:p-8 rounded-xl shadow-sm mt-8 text-gray-700 space-y-8">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-brand-blue-600">Como Usar o Simulador de Juros Compostos</h2>
        <p>Utilizar nossa ferramenta para projetar seus investimentos é simples e intuitivo. Siga estes passos:</p>
        <ol className="list-decimal list-inside space-y-2 pl-4">
          <li><strong>Valor Inicial:</strong> Insira a quantia com a qual você começará o investimento. Se for começar do zero, pode deixar em 0.</li>
          <li><strong>Valor Mensal:</strong> Adicione o valor que você planeja investir regularmente a cada mês.</li>
          <li><strong>Taxa de Juros:</strong> Informe a rentabilidade esperada do seu investimento. Você pode definir se a taxa é mensal ou anual.</li>
          <li><strong>Período:</strong> Defina por quanto tempo o dinheiro ficará investido, seja em meses ou anos.</li>
          <li><strong>Calcular:</strong> Clique no botão para ver a mágica dos juros compostos acontecer!</li>
        </ol>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-brand-blue-600">Entendendo a Fórmula dos Juros Compostos</h2>
        <p>A base para o crescimento exponencial dos seus investimentos é a fórmula dos juros compostos:</p>
        <p className="text-center font-mono bg-gray-100 p-4 rounded-md text-lg">M = C (1 + i) ^ t</p>
        <ul className="space-y-2">
          <li><strong>M:</strong> Montante final, o valor total que você terá ao final do período.</li>
          <li><strong>C:</strong> Capital inicial investido.</li>
          <li><strong>i:</strong> Taxa de juros (convertida para formato decimal).</li>
          <li><strong>t:</strong> Tempo de aplicação.</li>
        </ul>
        <p>Um ponto crucial é que a taxa de juros (i) e o tempo (t) devem estar na mesma unidade. Se a taxa é mensal, o tempo deve ser em meses. Nossa calculadora faz essa conversão automaticamente para você.</p>
      </div>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-brand-blue-600">Juros Simples vs. Juros Compostos</h2>
        <p>A principal diferença reside em como os juros são calculados. Entenda de forma clara:</p>
        <ul className="space-y-3">
          <li>
            <strong>Juros Simples:</strong> A taxa incide sempre sobre o capital inicial. O rendimento é constante e linear ao longo do tempo.
          </li>
          <li>
            <strong>Juros Compostos:</strong> A taxa incide sobre o capital inicial somado aos juros acumulados de períodos anteriores. É o famoso "juros sobre juros", que gera um crescimento exponencial.
          </li>
        </ul>
        <p>Veja como a diferença se torna gigantesca no longo prazo, considerando um investimento inicial de R$ 5.000 com taxa de 1% ao mês:</p>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-2 px-4 border-b">Período</th>
                <th className="py-2 px-4 border-b">Juros Simples</th>
                <th className="py-2 px-4 border-b">Juros Compostos</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="py-2 px-4 border-b">5 anos</td><td className="py-2 px-4 border-b">R$ 8.000,00</td><td className="py-2 px-4 border-b">R$ 9.083,48</td></tr>
              <tr><td className="py-2 px-4 border-b">10 anos</td><td className="py-2 px-4 border-b">R$ 11.000,00</td><td className="py-2 px-4 border-b">R$ 16.501,93</td></tr>
              <tr><td className="py-2 px-4 border-b">20 anos</td><td className="py-2 px-4 border-b">R$ 17.000,00</td><td className="py-2 px-4 border-b">R$ 54.462,77</td></tr>
              <tr><td className="py-2 px-4 border-b">30 anos</td><td className="py-2 px-4 border-b">R$ 23.000,00</td><td className="py-2 px-4 border-b">R$ 179.748,21</td></tr>
            </tbody>
          </table>
        </div>
        <p className="italic text-center mt-4">"Juros compostos são a oitava maravilha do mundo. Aquele que entende, ganha. Aquele que não entende, paga." - Atribuído a Albert Einstein.</p>
      </div>
    </div>
  );
};

export default InfoSection;
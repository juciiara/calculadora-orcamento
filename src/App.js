import { useState } from 'react';
import './App.css';

function App() {
  const [despesas, setDespesas] = useState([]);
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');

  const adicionarDespesa = (e) => {
    e.preventDefault();
    if (!descricao || !valor) return;

    const novaDespesa = {
      id: Date.now(),
      descricao,
      valor: parseFloat(valor)
    };

    setDespesas([...despesas, novaDespesa]);
    setDescricao('');
    setValor('');
  };

  const removerDespesa = (id) => {
    setDespesas(despesas.filter(d => d.id !== id));
  };

  const total = despesas.reduce((acc, d) => acc + d.valor, 0);

  return (
    <div className="app">
      <h1>Calculadora de Orçamento</h1>

      <form onSubmit={adicionarDespesa}>
        <input 
          type="text" 
          placeholder="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          required
        />
        <input 
          type="number" 
          placeholder="Valor (R$)"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
          min="0.01"
          step="0.01"
          required
        />
        <button type="submit">Adicionar</button>
      </form>

      <h2>Total: R$ {total.toFixed(2)}</h2>

      <ul>
        {despesas.map(d => (
          <li key={d.id}>
            {d.descricao} - R$ {d.valor.toFixed(2)}
            <button onClick={() => removerDespesa(d.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

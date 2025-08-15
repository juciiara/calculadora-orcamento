import { useState } from "react";
import "./App.css";

function App() {
  const [despesas, setDespesas] = useState([]);
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState("");
  const [categoria, setCategoria] = useState("Outros");
  const [erro, setErro] = useState("");

  const adicionarDespesa = (e) => {
    e.preventDefault();
    if (!descricao || !valor || parseFloat(valor) <= 0) {
      setErro("Preencha todos os campos e insira um valor positivo.");
      return;
    }

    const novaDespesa = {
      id: Date.now(),
      descricao,
      valor: parseFloat(valor),
      categoria,
    };

    setDespesas([...despesas, novaDespesa]);
    setDescricao("");
    setValor("");
    setCategoria("Outros");
    setErro("");
  };

  const removerDespesa = (id) => {
    setDespesas(despesas.filter((d) => d.id !== id));
  };

  const total = despesas.reduce((soma, d) => soma + d.valor, 0);

  return (
    <div className="background">
      <div className="app">
        <h1>Calculadora de Orçamento</h1>

        {erro && <p className="erro">{erro}</p>}

        <form onSubmit={adicionarDespesa} className="formulario">
          <input
            type="text"
            placeholder="Descrição"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
          />
          <input
            type="number"
            placeholder="Valor (R$)"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            step="0.01"
            min="0.01"
          />
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="Moradia">Moradia</option>
            <option value="Alimentação">Alimentação</option>
            <option value="Transporte">Transporte</option>
            <option value="Lazer">Lazer</option>
            <option value="Outros">Outros</option>
          </select>
          <button type="submit">Adicionar</button>
        </form>

        <div className="total-box">
          <span>Total:</span>
          <strong>R$ {total.toFixed(2)}</strong>
        </div>

        <ul className="lista-despesas">
          {despesas.map((d) => (
            <li key={d.id}>
              <div className="info">
                <span>{d.descricao}</span>
                <span>R$ {d.valor.toFixed(2)}</span>
              </div>
              <small>{d.categoria}</small>
              <button onClick={() => removerDespesa(d.id)}>X</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

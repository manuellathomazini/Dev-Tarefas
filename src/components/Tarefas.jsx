import React, { useEffect, useState } from 'react'



const Tarefas = () => {
    const [tarefas, setTarefas]=useState(()=>{
    const salvarTarefa = localStorage.getItem("item-tarefa");
    return salvarTarefa ? JSON.parse(salvarTarefa):[];
    });
    const [nome, setNome]=useState("");
    const [data, setData]=useState("");
    const [prioridade, setPrioridade]=useState("Low");
    const [descricao, setDescricao]=useState("");

    useEffect(()=>{
        localStorage.setItem("item-tarefa", JSON.stringify(tarefas));
    },[tarefas]);

    const adicionarTarefa=(e)=>{
        e.preventDefault();

        if(!nome.trim()) return;

        const novaTarefa={
            id:Date.now(),
            nome:nome,
            data:data,
            prioridade: prioridade || "Low",
            descricao:descricao,
        };
        setTarefas([...tarefas, novaTarefa])
        setNome('');
        setData('');
        setPrioridade('');
        setDescricao('');
    };

    const removerTarefa=(id)=>{
        const apagartarefa = tarefas.filter((tarefa)=>tarefa.id !== id);
        setTarefas(apagartarefa);
    };

    return(
        <div className=''>
            <h1 className=''>Tarefas</h1>
            <form onSubmit={adicionarTarefa}>
                <input
                type='text'
                value={nome}
                onChange={(e) => {setNome(e.target.value)}}
                placeholder="Digite o Nome">
                </input>

                <input
                type='date'
                value={data}
                onChange={(e) => {setData(e.target.value)}}>
                </input>

                <select
                    value={prioridade}
                    onChange={(e) => setPrioridade(e.target.value)}
                >
                    <option value="">Selecione a prioridade</option>
                    <option value="High">High</option>
                    <option value="Med">Med</option>
                    <option value="Low">Low</option>
                </select>

                <input
                type='text'
                value={descricao}
                onChange={(e) => { setDescricao(e.target.value) }}
                placeholder="Digite a descricao">
                </input>

                <button type='submit'>X</button>
            </form>
            <ul>
                {tarefas.map((tarefa)=>(
                    <li key={tarefa.id}>
                        <span>{tarefa.nome}</span>
                        <span> {tarefa.data}</span>
                        <span> {tarefa.prioridade}</span>
                        <span> {tarefa.descricao}</span>
                        <button onClick={() => removerTarefa(tarefa.id)}>X</button>
                    </li>
                ))}
            </ul>
            {tarefas.length === 0 && <p>Nenhuma tarefa salva</p>}
        </div>
    )
}

export default Tarefas

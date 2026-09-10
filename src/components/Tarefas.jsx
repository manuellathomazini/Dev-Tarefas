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

    const corPrioridade = {
        High: 'text-green-400 border-green-400',
        Med: 'text-green-600 border-green-600',
        Low: 'text-zinc-500 border-zinc-600',
    };

    return(
        <div className='min-h-screen bg-black text-zinc-100 flex justify-center px-4 py-12'>
            <div className='w-full max-w-xl'>
                <h1 className='text-2xl font-semibold text-green-400 mb-6'>Tarefas</h1>

                <form onSubmit={adicionarTarefa} className='bg-zinc-900 border border-zinc-800 rounded-lg p-4 space-y-3 mb-8'>
                    <input
                    type='text'
                    value={nome}
                    onChange={(e) => {setNome(e.target.value)}}
                    placeholder="Digite o Nome"
                    className='w-full bg-black border border-zinc-700 rounded px-3 py-2 text-sm placeholder-zinc-500 focus:border-green-500 focus:outline-none'>
                    </input>

                    <input
                    type='date'
                    value={data}
                    onChange={(e) => {setData(e.target.value)}}
                    className='w-full bg-black border border-zinc-700 rounded px-3 py-2 text-sm text-zinc-300 focus:border-green-500 focus:outline-none'>
                    </input>

                    <select
                        value={prioridade}
                        onChange={(e) => setPrioridade(e.target.value)}
                        className='w-full bg-black border border-zinc-700 rounded px-3 py-2 text-sm focus:border-green-500 focus:outline-none'
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
                    placeholder="Digite a descricao"
                    className='w-full bg-black border border-zinc-700 rounded px-3 py-2 text-sm placeholder-zinc-500 focus:border-green-500 focus:outline-none'>
                    </input>

                    <button
                    type='submit'
                    className='w-full bg-green-600 hover:bg-green-500 text-black font-medium rounded px-4 py-2 text-sm transition-colors'>
                        Adicionar
                    </button>
                </form>

                <ul className='space-y-2'>
                    {tarefas.map((tarefa)=>(
                        <li key={tarefa.id} className='flex items-center justify-between gap-3 bg-zinc-900 border border-zinc-800 rounded-md px-4 py-3'>
                            <div className='flex flex-col gap-0.5'>
                                <span className='text-sm font-medium'>{tarefa.nome}</span>
                                <span className='text-xs text-zinc-500'>{tarefa.data} {tarefa.descricao && `· ${tarefa.descricao}`}</span>
                            </div>
                            <div className='flex items-center gap-3 shrink-0'>
                                <span className={`text-xs border rounded-full px-2 py-0.5 ${corPrioridade[tarefa.prioridade] || corPrioridade.Low}`}>
                                    {tarefa.prioridade}
                                </span>
                                <button
                                onClick={() => removerTarefa(tarefa.id)}
                                className='text-zinc-500 hover:text-red-400 text-sm'>
                                    Remover
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
                {tarefas.length === 0 && <p className='text-zinc-500 text-sm text-center py-6'>Nenhuma tarefa salva</p>}
            </div>
        </div>
    )
}

export default Tarefas
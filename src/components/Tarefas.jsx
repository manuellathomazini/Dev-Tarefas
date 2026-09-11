import React, { useEffect, useState } from 'react'

const Tarefas = () => {
    // HOOK: useState com "lazy initializer" — a função () => {...} só roda
    // UMA vez, na primeira renderização, para ler o localStorage.
    // Isso evita ler o localStorage toda vez que o componente re-renderiza.
    const [tarefas, setTarefas]=useState(()=>{
    const salvarTarefa = localStorage.getItem("item-tarefa");
    return salvarTarefa ? JSON.parse(salvarTarefa):[];
    });

    // HOOKS: useState simples para controlar os campos do formulário (inputs controlados)
    const [nome, setNome]=useState("");
    const [data, setData]=useState("");
    const [prioridade, setPrioridade]=useState("");
    const [descricao, setDescricao]=useState("");

    // HOOK: useEffect — roda um "efeito colateral" (salvar no localStorage)
    // sempre que o array de dependências [tarefas] mudar, ou seja,
    // toda vez que uma tarefa for adicionada, removida ou concluída.
    useEffect(()=>{
        localStorage.setItem("item-tarefa", JSON.stringify(tarefas));
    },[tarefas]);

    // CALLBACK: função passada para o atributo onSubmit={adicionarTarefa} do <form>.
    // É "chamada de volta" pelo React no momento em que o formulário é enviado.
    const adicionarTarefa=(e)=>{
        e.preventDefault();

        if(!nome.trim()) return;

        const novaTarefa={
            id:crypto.randomUUID(),
            nome:nome.trim(),
            data:data,
            prioridade: prioridade || "Low",
            descricao:descricao,
            concluida: false,
        };
        setTarefas([...tarefas, novaTarefa])
        setNome('');
        setData('');
        setPrioridade('');
        setDescricao('');
    };

    // CALLBACK + MÉTODO DE ARRAY (map): recebe o id da tarefa clicada (via onChange
    // no checkbox) e usa map para percorrer TODO o array, retornando um novo array
    // onde só a tarefa com o id correspondente é alterada (concluida vira o oposto).
    // As demais tarefas são retornadas sem mudança (...tarefa).
    const concluirTarefa = (id) => {
    const tarefasAtualizadas = tarefas.map((tarefa) =>
        tarefa.id === id
            ? { ...tarefa, concluida: !tarefa.concluida }
            : tarefa
    );
    setTarefas(tarefasAtualizadas);
};

    // CALLBACK + MÉTODO DE ARRAY (filter): recebe o id (via onClick no botão "Remover")
    // e usa filter para criar um novo array contendo apenas as tarefas
    // CUJO id é DIFERENTE do id recebido — ou seja, remove a tarefa clicada.
    const removerTarefa=(id)=>{
        const apagartarefa = tarefas.filter((tarefa)=>tarefa.id !== id);
        setTarefas(apagartarefa);
    };

    const corPrioridade = {
        High: 'text-green-400 border-green-400',
        Med: 'text-green-600 border-green-600',
        Low: 'text-zinc-500 border-zinc-600',
    };

    const ordemPrioridade = { High: 0, Med: 1, Low: 2 };

    // MÉTODO DE ARRAY (sort): reordena uma cópia do array ([...tarefas]) primeiro
    // por prioridade (usando o objeto ordemPrioridade) e, em caso de empate,
    // por data. A função de comparação passada para sort também é um callback.
    const tarefasOrdenadas = [...tarefas].sort((a, b) => {
        const diffPrioridade = ordemPrioridade[a.prioridade] - ordemPrioridade[b.prioridade];
        if (diffPrioridade !== 0) return diffPrioridade;

        if (!a.data && !b.data) return 0;
        if (!a.data) return 1;
        if (!b.data) return -1;

        return new Date(a.data) - new Date(b.data);
    });

    // MÉTODO DE ARRAY (filter): separa as tarefas já ordenadas em dois novos arrays —
    // um só com as pendentes (concluida === false) e outro só com as concluídas.
    const pendentes = tarefasOrdenadas.filter((tarefa) => !tarefa.concluida);
    const concluidas = tarefasOrdenadas.filter((tarefa) => tarefa.concluida);

    return(
        <div className='min-h-screen bg-black text-zinc-100 flex justify-center px-4 py-12'>
            <div className='w-full max-w-xl'>
                <h1 className='text-2xl font-semibold text-green-400 mb-6'>Tarefas</h1>

                {/* CALLBACK: onSubmit={adicionarTarefa} — chama a função quando o form é enviado */}
                <form onSubmit={adicionarTarefa} className='bg-zinc-900 border border-zinc-800 rounded-lg p-4 space-y-3 mb-8'>
                    <input
                    type='text'
                    value={nome}
                    // CALLBACK: onChange recebe uma arrow function que atualiza o estado "nome"
                    // a cada tecla digitada, mantendo o input "controlado" pelo React
                    onChange={(e) => {setNome(e.target.value)}}
                    placeholder="Digite o Nome"
                    className='w-full bg-black border border-zinc-700 rounded px-3 py-2 text-sm placeholder-zinc-500 focus:border-green-500 focus:outline-none'>
                    </input>

                    <input
                    type='date'
                    value={data}
                    // CALLBACK: mesmo padrão do input acima, mas atualizando o estado "data"
                    onChange={(e) => {setData(e.target.value)}}
                    className='w-full bg-black border border-zinc-700 rounded px-3 py-2 text-sm text-zinc-300 focus:border-green-500 focus:outline-none scheme-dark'>
                    </input>

                    <select
                        value={prioridade}
                        // CALLBACK: atualiza o estado "prioridade" quando o usuário escolhe uma opção
                        onChange={(e) => setPrioridade(e.target.value)}
                        className='w-full bg-black border border-zinc-700 rounded px-3 py-2 text-sm focus:border-green-500 focus:outline-none'
                    >
                        <option value="" disabled>Selecione a prioridade</option>
                        <option value="High">High</option>
                        <option value="Med">Med</option>
                        <option value="Low">Low</option>
                    </select>

                    <input
                    type='text'
                    value={descricao}
                    // CALLBACK: atualiza o estado "descricao"
                    onChange={(e) => { setDescricao(e.target.value) }}
                    placeholder="Descrição da tarefa"
                    className='w-full bg-black border border-zinc-700 rounded px-3 py-2 text-sm placeholder-zinc-500 focus:border-green-500 focus:outline-none'>
                    </input>

                    <button
                    type='submit'
                    className='w-full bg-green-600 hover:bg-green-500 text-black font-medium rounded px-4 py-2 text-sm transition-colors'>
                        Adicionar
                    </button>
                </form>
                {pendentes.length > 0 && (
                    <div className='mt-8'>
                        <h2 className='text-sm font-semibold text-zinc-400 mb-3'>Pendentes</h2>
                        <ul className='space-y-2'>
                            {/* MÉTODO DE ARRAY (map): transforma cada objeto "tarefa" do array
                                pendentes em um elemento JSX (<li>...). O "key" é obrigatório
                                para o React identificar cada item da lista de forma única. */}
                            {pendentes.map((tarefa) => (
                                <li key={tarefa.id} className='flex items-center justify-between gap-3 bg-zinc-900 border border-zinc-800 rounded-md px-4 py-3'>
                                    <div className='flex gap-4 min-w-0 items-center'>
                                        <input
                                            type="checkbox"
                                            checked={tarefa.concluida}
                                            // CALLBACK: onChange chama concluirTarefa passando o id
                                            // desta tarefa específica (fechamento/closure sobre "tarefa")
                                            onChange={() => concluirTarefa(tarefa.id)}
                                            className="appearance-none w-4 h-4 checked:bg-green-700 rounded-full border border-white hover:bg-green-700 cursor-pointer"
                                        />
                                        <div className='flex flex-col gap-0.5 min-w-0'>
                                            <span className='text-xl font-medium break-words'>{tarefa.nome}</span>
                                            {tarefa.data && (
                                                <span className='text-base text-green-400 break-words'>{tarefa.data}</span>
                                            )}
                                            <span className='text-xs text-zinc-500 break-words'>{tarefa.descricao && `· ${tarefa.descricao}`}</span>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-3 shrink-0'>
                                        <span className={`text-xs border rounded-full px-2 py-0.5 ${corPrioridade[tarefa.prioridade] || corPrioridade.Low}`}>
                                            {tarefa.prioridade}
                                        </span>
                                        {/* CALLBACK: onClick chama removerTarefa passando o id desta tarefa */}
                                        <button
                                            onClick={() => removerTarefa(tarefa.id)}
                                            className='text-zinc-500 hover:text-red-400 text-sm cursor-pointer'>
                                            Remover
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {pendentes.length === 0 && concluidas.length === 0 && (
                    <p className='text-zinc-500 text-sm text-center py-6'>Nenhuma tarefa salva</p>
                )}

                {concluidas.length > 0 && (
                    <div className='mt-8'>
                        <h2 className='text-sm font-semibold text-zinc-400 mb-3'>Concluídas</h2>
                        <ul className='space-y-2'>
                            {/* MÉTODO DE ARRAY (map): mesmo padrão da lista de pendentes,
                                agora renderizando cada tarefa concluída */}
                            {concluidas.map((tarefa) => (
                                <li key={tarefa.id} className='flex items-center justify-between gap-3 bg-zinc-900 border border-zinc-800 rounded-md px-4 py-3 opacity-60'>
                                    <div className='flex gap-4 min-w-0 items-center'>
                                        <input
                                            type="checkbox"
                                            checked={tarefa.concluida}
                                            // CALLBACK: reaproveita concluirTarefa para "desmarcar" a tarefa
                                            onChange={() => concluirTarefa(tarefa.id)}
                                            className="appearance-none w-4 h-4 checked:bg-green-700 rounded-full border border-white hover:bg-transparent cursor-pointer"
                                        />
                                        <div className='flex flex-col gap-0.5 min-w-0'>
                                            <span className='text-xl font-medium line-through break-words'>{tarefa.nome}</span>
                                            {tarefa.data && (
                                                <span className='text-base text-green-400 break-words'>{tarefa.data}</span>
                                            )}
                                            <span className='text-xs text-zinc-500 break-words'>{tarefa.descricao && `· ${tarefa.descricao}`}</span>
                                        </div>
                                    </div>
                                    <div className='flex items-center gap-3 shrink-0'>
                                        <span className={`text-xs border rounded-full px-2 py-0.5 ${corPrioridade[tarefa.prioridade] || corPrioridade.Low}`}>
                                            {tarefa.prioridade}
                                        </span>
                                        {/* CALLBACK: onClick chama removerTarefa passando o id */}
                                        <button
                                            onClick={() => removerTarefa(tarefa.id)}
                                            className='text-zinc-500 hover:text-red-400 text-sm cursor-pointer'>
                                            Remover
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Tarefas
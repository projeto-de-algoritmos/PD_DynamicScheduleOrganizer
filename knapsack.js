function knapsack() {
    const qtdHoras = Number(horasDisponiveis);
    const qtdTarefas = tasks.length
    // Criando um vetor de tarefas iniciando na posição 1, para alinhar com os iteradores da matriz.
    let tarefas = [0, ...tasks]
    
    // Crio a matriz
    const memoization = [];
    console.log(tarefas)
    for (let i = 0 ; i <= qtdTarefas; i++){
      memoization[i]= []
      for (let j = 0; j <= qtdHoras; j++){
        memoization[i][j]= -1
      }
    }
  
    // inicializo a primeira linha com 0's
    for (let col = 0; col <= qtdHoras; col++) {
      memoization[0][col] = 0;
    }
  
    // inicializo a primeira coluna com 0's
    for (let lin = 0; lin <= qtdTarefas; lin++) {
      memoization[lin][0] = 0;
    }
    
    // percorro toda a matriz
    // assim evitando um acesso a uma região não alocada de memória
    for (let i = 1; i <= qtdTarefas; i++) {
        for (let w = 1; w <= qtdHoras; w++) {
        // se o meu item não cabe na mochila (com peso atual w) decido não levar 
        // nesse caso: OPT(i,w)=OPT(i-1,w)        
        if (tarefas[i].duracao > w) {
          memoization[i][w] = memoization[i-1][w];
        } else {
            // se o meu item cabe na mochila vejo o que é melhor
            // a celula de cima da mochila com os itens presentes nela com aquele mesmo peso ou
            // a celula de cima da mochila com os itens presentes nela quando ela tinha peso
            // suficiente para levar o item mais o valor do novo item
            //  OPT(i,w) = max(OPT(i-1,w),  // Não levar
            //                  v_i + OPT(i-1, w-w_i)) // Levar
            const naoLevar = memoization[i-1][w]
            const valorAtual = tarefas[i].preco
            const duracaoAtual = tarefas[i].duracao
            const levar = valorAtual + memoization[i-1][w-duracaoAtual]
            
            memoization[i][w] = Math.max(naoLevar, levar);
        }
      }
    }
    console.log(memoization)
    console.log(`O maior faturamento possível é de R$${memoization[qtdTarefas][qtdHoras]}!`)
    const resultado = findSolution(memoization);
  
    return resultado;
  }


function findSolution(memoization) {
    resultado = [];
  
    let linha = tasks.length;
    let coluna = Number(horasDisponiveis);
    const totalValue = memoization[linha][coluna];
    let totalObjects = 0;
  
    // @TODO: verificar caso no qual nenhum objeto cabe na mochila
    // Enquanto não chegar em uma coluna ou coluna que o valor é zero
    // continua buscando de onde veio o valor da celula
    while (linha != 0 || coluna != 0) {
      // verifico se veio de não pegar o objeto na posição
      // memoization[linha][coluna], pois está igual ao da linha de cima
      // se não peguei o objeto vou para linha de cima, caso contrario
      // peguei o objeto e vou para linha de cima menos o peso do objeto
      if (totalValue == memoization[linha-1][coluna]) {
        linha = linha-1;
      } else {
        resultado[totalObjects] = tasks[linha];
        totalObjects = totalObjects + 1;
        linha = linha - 1;
        coluna = coluna - tasks[linha].duracao;
      }
    }
  
    return resultado;
  }
  
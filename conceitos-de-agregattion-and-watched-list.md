# Conceitos

- Aggregate 
    É quando temos uma entidade que depende de outra entidade para existir  
    ## Exemplo: E-commerce
        - Order -> OrderItem[] 
        - Order -> Shipping  
    O conjunto de entidades trabalha junto e elas junto compõe algo maior, como por exemplo o Forum, que tem as respostas e as respostas para as respostas
    Mas a diferença se dá por serem usadas para trabalharem juntas, seja na criação, edição, remoção... Significa que temos um agregado

- Watched List  
    É uma lista observada, por exemplo o Fórum:
      - Criada a Question quero permitir que enquanto a question é criada, possam ser criados anexos
        Question -> Anexos[] (Que é um agregado)
        A question teria 
            - Titulo
            - Conteúdo
            - Anexos
    Mas quando fosse editada

    ### Edição
    Quando for editar o agregado, que seria o conjunto, onde poderia ser editado o 
        - Titulo
        - Conteúdo
        - Anexos(3)
    Mas vamos por que sejam 3 anexos, 
    quando for pra edição passar o metodo(update)
    eu posso add um novo anexo (create)
    remover o segundo anexo(delete)
    ou até nomear os anexos/editar um anexo(update)


    ## A watched List
    Nada mais é do que uma classe que permite que tenhamos mais informações sobre itens contidos
    numa lista e cada item dessa lista tem as informações sobre se foi adicionado, editado ou removido
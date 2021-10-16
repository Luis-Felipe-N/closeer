- Seguir interface proposta: https://bit.ly/3AEcym7

- Os dados de Yuji devem ser consumidos de um arquivo .JSON, simulando o consumo de dados de uma API.

- A agenda de Yuji apenas guarda as datas dos jobs do ano corrente, dessa forma, como
estamos no ano de 2021, a agenda não aceitará datas cujos anos sejam [...2018, 2019,
2020, 2022, 2023...]

- Yuji é um pouco distraído e ganancioso e provavelmente tentará colocar vários jobs em uma mesma data - hora. Quando Yuji tentar fazer isso, um alerta deve ser exibido
informando que há um conflito e que Yuji já tem um job para aquela data - hora agendado,
afinal, Yuji não desenvolveu sua expansão de domínio para poder estar em dois lugares ao
mesmo tempo.

- [] Ao adicionar um novo job na agenda, o formulário deve ser resetado, para estar pronto para uma nova inserção.

- [] A cada novo job inserido, a listagem de jobs na agenda deve ser ordenada de forma cronológica.

- [] Ao provocar um :hover nos círculos indicadores de categoria da agenda e de cada job, o Tooltip (um balão flutuante informativo) corresponde deve ser exibido.

- O projeto deve ser construído utilizando React# closser

//importa o objeto Queue da lib bullMQ
// criou a conexão
//definiu a fila
//se inscreveu nessa fila

import { Queue } from "bullmq";

const connection = {
    host: 'paybank-redis',
    port: 6379
}

const queueName = 'twoFactorQueue'

//aqui estou me inscrevendo na fila, faz com que meu teste assuma o papel do ouvinte email
const queue = new Queue(queueName, {connection})

//faz com que a constante getJob receba o retorno da arrowFunction criada
//Obs.: a lib bullMQ não tem uma função para trazer um único job, pq ele é feito 
// pra se inscrever pegar toda a lista e processar toda ela
//por isso desse tratamento para pegar o último job
export const getJob = async () => {
   const jobs = await queue.getJobs() //busca todos os jobs
   //lembrar que precisa do await pq ambas as funções resolvem promessas
   console.log(jobs[0].data.code)
   return jobs[0].data.code //pega apenas o último job
}

//lembrar que precisa do await pq ambas as funções resolvem promessas
export const cleanJobs = async () => {
   await queue.obliterate() //função que limpa a fila do redis, a fila toFactorcode
}


//OU SEJA, para usar os recursos dessa implementação a fim de fato pegar realmente o último job criado, basta primeiro
// chamar a funnction cleanJobs, e depois a getJob, pois ali haverá o "último" (e na verdade o único) job criado


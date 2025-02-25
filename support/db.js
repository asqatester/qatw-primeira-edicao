import pgPromise from 'pg-promise'

const pgp = pgPromise()
const db = pgp('postgresql://dba:dba@paybank-db:5432/UserDB')

//export torna a função acessível ao test
//atenção à estrura de consulta qdo operar em ambiente compartilhado!
//a query a segui foi tratada para evitar conflito em ambiente compartilhado
export async function obterCodigo2FA(cpf) {
    const query = `
       SELECT t.code
	    FROM public."TwoFactorCode" t
		JOIN public."User" u ON u."id" = t."userId"
		WHERE u."cpf" = '${cpf}'
	    ORDER BY t.id DESC
	    LIMIT 1;
    `
    //chamada de função oneOrNone, a qual retorna apenas um registro ou retorna nulo
    //mas ela é uma função assíncrona, ou seja, ela resolve uma "promessa", típico da programação JS
    //por isso tem que passar o await e um async na função acima da const query
    const result = await db.oneOrNone(query)
    return result.code 
    //esse result retornado será um objeto JS, por isso especifico que traga apenas a coluna de interesse,
    //no caso a coluna code da tabela consultada

}
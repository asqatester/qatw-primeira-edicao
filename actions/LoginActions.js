//classe para assumir padrão de projeto PageObjects
//e favorecer aproveitamento de código
export class LoginActions{
    //a função abaixo é executada automaticamente qdo ela é estanciada
    constructor(page){
        this.page = page//esse page é o que vem pelo parâmetro
    }

    async acessaPagina(){
    //acessa página alvo
        await this.page.goto('http://paybank-mf-auth:3000/');
    }

    async informaCpf(cpf){
        await this.page.getByRole('textbox', { name: 'Digite seu CPF' }).fill(cpf);
        await this.page.getByRole('button', { name: 'Continuar' }).click();
    }

    async informaSenha(senha){
        //esse for abaixo foi validado no site playcode.io
        for (const digito of senha){
          await this.page.getByRole('button', { name: digito }).click();
        }
        await this.page.getByRole('button', { name: 'Continuar' }).click();
    }

    async informa2FA(codigo){
        await this.page.getByRole('textbox', { name: '000000' }).fill(codigo);//ir ao banco e pegar o código
        await this.page.getByRole('button', { name: 'Verificar' }).click();
    }

    async obterSaldo() {
        return this.page.locator('#account-balance');
    }
}
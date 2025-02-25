import { test, expect } from "@playwright/test";
//import { obterCodigo2FA } from "../support/db";
import { LoginPage } from "../pages/LoginPage";
import { DashPage } from "../pages/DashPage";
import { LoginActions } from "../actions/LoginActions";
import { cleanJobs, getJob } from "../support/redis";

test("Nao deve logar quando o codigo de autenticacao e invalido", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const usuario = {
    cpf: "00000014141",
    senha: "147258", //substitui o trecho comentado abaixo
  };

  await cleanJobs();

  await loginPage.acessaPagina();
  await loginPage.informaCpf(usuario.cpf);
  await loginPage.informaSenha(usuario.senha);

  //o ckeckpoint abaixo garante que após 3 seg de espera fomos de fato para o próximo box
  //checkpoint
  await page.getByRole("heading", { name: "Verificação em duas etapas" }).waitFor({ timeout: 6000 })

   //ATENÇÃO! manter aqui nome code pois é com vem do json do redis!
  const codigo = await getJob();

  await loginPage.informa2FA("123456");

  await expect(page.locator("span")).toContainText("Código inválido. Por favor, tente novamente.");
});




//cada método do playwrithg recebe o contexto page do browser
//que é o contexto principal do playwrigth
test("Deve acessar a conta do usuario", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const dashPage = new DashPage(page);

  //define uma massa de teste
  const usuario = {
    cpf: "00000014141",
    senha: "147258", //substitui o trecho comentado abaixo
  };

  await cleanJobs();

  await loginPage.acessaPagina();
  await loginPage.informaCpf(usuario.cpf);
  await loginPage.informaSenha(usuario.senha);

  //o ckeckpoint abaixo garante que após 3 seg de espera fomos de fato para o próximo box
  //checkpoint
  await page.getByRole("heading", { name: "Verificação em duas etapas" }).waitFor({ timeout: 6000 })

  //ATENÇÃO! manter aqui nome code pois é com vem do json do redis!
  const codigo = await getJob();

  //const codigo = await obterCodigo2FA(usuario.cpf)

  await loginPage.informa2FA(codigo);

  //esse page.locator não precisa de await, mas apenas o expect
  expect(await dashPage.obterSaldo()).toHaveText("R$ 5.000,00");
});

//caso de teste para demonstrar padrão de projeto Actions
test("Deve acessar a conta do usuario 2", async ({ page }) => {
  const loginActions = new LoginActions(page);

  //define uma massa de teste
  const usuario = {
    cpf: "00000014141",
    senha: "147258", //substitui o trecho comentado abaixo
  };

  await cleanJobs();

  await loginActions.acessaPagina();
  await loginActions.informaCpf(usuario.cpf);
  await loginActions.informaSenha(usuario.senha);

  //o ckeckpoint abaixo garante que após 3 seg de espera fomos de fato para o próximo box
  //checkpoint
  await page.getByRole("heading", { name: "Verificação em duas etapas" }).waitFor({ timeout: 6000 })

  //ATENÇÃO! manter aqui nome code pois é com vem do json do redis!
  const codigo = await getJob();

  //const codigo = await obterCodigo2FA(usuario.cpf)

  await loginActions.informa2FA(codigo);

  //esse page.locator não precisa de await, mas apenas o expect
  expect(await loginActions.obterSaldo()).toHaveText("R$ 5.000,00");
});

import AccessControl from 'accesscontrol';

const controle = new AccessControl();

controle
  .grant('leitor')
  .readAny('livro', ['id', 'titulo', 'paginas'])
  .readAny('editora', ['id', 'nome', 'cidade', 'email']);

controle
  .grant('editor')
  .extend('leitor')
  .createOwn('livro')
  .deleteOwn('livro');

controle // Usar dica do CTRL+D no vscode aqui
// Tbm tem outra forma nessa lib que é passando um obj inteiro no construtor
  .grant('admin')
  .createAny('livro')
  .readAny('livro')
  .updateAny('livro')
  .deleteAny('livro')
  .createAny('editora')
  .readAny('editora')
  .updateAny('editora')
  .deleteAny('editora')
  .readAny('usuario')
  .deleteAny('usuario');

export default controle;

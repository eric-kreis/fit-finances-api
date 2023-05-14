## Boas-vindas à FitFinances API!

### Autenticação

Um Bearer Token é um tipo de token de autenticação, para permitir que um usuário ou um aplicativo autorizado acesse recursos protegidos.

#### O que é um Bearer Token?

Em termos simples, um Bearer Token é uma sequência de caracteres alfanuméricos que é utilizado como um tipo de "chave" para autenticar um usuário ou aplicativo em uma API. Ele é chamado de "bearer" (portador) porque é considerado como uma credencial portada pelo cliente autorizado para acessar recursos protegidos.

#### Como o Bearer Token é utilizado na autenticação de APIs?

A autenticação com bearer token é um método comum utilizado em APIs para proteger os recursos disponibilizados por um servidor. Quando um cliente deseja um recurso protegido, ele deve fornecer um bearer token válido como parte da requisição HTTP. O bearer token deve ser incluído no cabeçalho de autorização (Authorization) da requisição, utilizando o seguinte formato:

`Authorization: Bearer <TOKEN>`

Onde `<TOKEN>` é o bearer token válido que foi previamente obtido e associado com o usuário ou aplicativo autorizado.

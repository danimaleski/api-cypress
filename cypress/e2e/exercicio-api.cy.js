/// <reference types= "cypress"/>
import users from "../contracts/usuarios.contract";
import { faker } from "@faker-js/faker";

describe("Testes da Funcionalidade Usuários", () => {
	let token;
	before(() => {
		cy.token("fulano@qa.com", "teste").then((tkn) => {
			token = tkn;
		});
	});

	it("Deve validar contrato de usuários", () => {
		cy.request("usuarios").then((response) => {
			return users.validateAsync(response.body);
		});
	});

	it("Deve listar usuários cadastrados", () => {
		cy.request({
			method: "GET",
			url: "usuarios",
		}).should((response) => {
			expect(response.status).to.equal(200);
			expect(response.body).to.have.property("usuarios");
		});
	});

	it("Deve cadastrar um usuário com sucesso", () => {
		let name = faker.person.fullName();
		let email = faker.internet.email();
		let passw = faker.internet.password();
		cy.cadastrarUsuario(token, name, email, passw, "true").should(
			(response) => {
				expect(response.status).to.equal(201);
				expect(response.body.message).equal("Cadastro realizado com sucesso");
			}
		);
	});

	it("Deve validar um usuário com email inválido", () => {
		let name = faker.person.fullName();
		let pass = faker.internet.password();
		cy.cadastrarUsuario(token, name, "beltrano@qa.com.br", pass, "true").should(
			(response) => {
				expect(response.status).to.equal(400);
				expect(response.body.message).to.equal(
					"Este email já está sendo usado"
				);
			}
		);
	});

	it("Deve editar um usuário previamente cadastrado", () => {
		let name = faker.person.fullName();
		let email = faker.internet.email();
		let passw = faker.internet.password();
		cy.cadastrarUsuario(token, name, email, passw, "true").then((response) => {
			let id = response.body._id;

			cy.request({
				method: "PUT",
				url: `usuarios/${id}`,
				headers: { authorization: token },
				body: {
					nome: name,
					email: email,
					password: passw,
					administrador: "true",
				},
			}).then((response) => {
				expect(response.body.message).equal("Registro alterado com sucesso");
				expect(response.status).to.equal(200);
			});
		});
	});

	it("Deve deletar um usuário previamente cadastrado", () => {
		let name = faker.person.fullName();
		let email = faker.internet.email();
		let passw = faker.internet.password();
		cy.cadastrarUsuario(token, name, email, passw, "true").then((response) => {
			let id = response.body._id;

			cy.request({
				method: "DELETE",
				url: `usuarios/${id}`,
				headers: { authorization: token },
				body: {
					nome: name,
					email: email,
					password: passw,
					administrador: "true",
				},
			}).then((response) => {
				expect(response.body.message).equal("Registro excluído com sucesso");
				expect(response.status).to.equal(200);
			});
		});
	});
});

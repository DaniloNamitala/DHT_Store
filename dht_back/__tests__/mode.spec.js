const clienteDAO = require("../model/clienteDAO")
const controllerCliente = require("../controller/controllerCliente")
describe("Testes Banco de dados", ()=>{
  let cliente = {
    "name": "TESTE-123",
    "cpf": "111.111.111-11",
    "email": "TESTE-123@TESTE.COM",
    "birthDate": "2002-01-21",
    "password": "123456",
    "admin": 0
  }


  test("Inserrir cliente", async ()=>{
    clienteDAO.inserirCliente(cliente, async (err, res) => {
      let result = await clienteDAO.buscarCliente("111.111.111-11")
      expect(result[0].cpf).toEqual(cliente.cpf)
    })
  })

  test("deletar cliente", async ()=>{
    clienteDAO.deletarCliente("111.111.111-11", async (err, res) => {
      let result = await clienteDAO.buscarCliente("111.111.111-11")
      expect(result[0]).toBeNull()
    })
  })
})

describe("teste validacao", ()=>{
  test("CPF", () => {
    expect(controllerCliente.validarCPF("136.882.536-20")).toEqual(true)
    expect(controllerCliente.validarCPF("136.882.536-30")).toEqual(false)
  })
  
})
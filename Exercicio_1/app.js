class Endereco {
    constructor(rua, numero, complemento, bairro, cidade, uf, cep) {
        this.rua = rua;
        this.numero = numero;
        this.complemento = complemento;
        this.bairro = bairro;
        this.cidade = cidade;
        this.uf = uf;
        this.cep = cep;
    }
}

class Email {
    constructor(endereco, tipo) {
        this.endereco = endereco;
        this.tipo = tipo;
    }
}

class Colaborador {
    constructor(nome, dataNascimento, enderecos, emails) {
        this.nome = nome;
        this.dataNascimento = dataNascimento;
        this.enderecos = enderecos;
        this.emails = emails;
    }
}

class Estagiario extends Colaborador {
    constructor(nome, dataNascimento, enderecos, emails, dataContratacao, dataFinalContrato, valorBolsa, chavePix) {
        super(nome, dataNascimento, enderecos, emails);
        this.dataContratacao = dataContratacao;
        this.dataFinalContrato = dataFinalContrato;
        this.valorBolsa = valorBolsa;
        this.chavePix = chavePix;
    }
}

class CLT extends Colaborador {
    constructor(nome, dataNascimento, enderecos, emails, dataContratacao, cargo, salario, agenciaConta, numeroConta) {
        super(nome, dataNascimento, enderecos, emails);
        this.dataContratacao = dataContratacao;
        this.cargo = cargo;
        this.salario = salario;
        this.agenciaConta = agenciaConta;
        this.numeroConta = numeroConta;
    }
}

class PJ extends Colaborador {
    constructor(nome, dataNascimento, enderecos, emails, dataContratacao, dataFinalContrato, valorHora, horasMinimas, chavePix) {
        super(nome, dataNascimento, enderecos, emails);
        this.dataContratacao = dataContratacao;
        this.dataFinalContrato = dataFinalContrato;
        this.valorHora = valorHora;
        this.horasMinimas = horasMinimas;
        this.chavePix = chavePix;
    }
}

class OgitrovAnalog {
    constructor(estagiarios, clts, pjs) {
        this.estagiarios = estagiarios;
        this.clts = clts;
        this.pjs = pjs;
    }

    calcularCustoMensal() {
        let custoEstagiarios = this.estagiarios.reduce((total, estagiario) => total + estagiario.valorBolsa, 0);
        let custoCLTs = this.clts.reduce((total, clt) => total + clt.salario, 0);
        let custoPJs = this.pjs.reduce((total, pj) => total + (pj.valorHora * pj.horasMinimas), 0);

        return custoEstagiarios + custoCLTs + custoPJs;
    }
}

const endereco = new Endereco('Rua Ney da Gama', '123', '', 'Bairro Sergipe', ' Porto Alegre', 'RS', '8623456788');
const emailPessoal = new Email('eduardoc@gmail.com', 'Pessoal');
const emailProfissional = new Email('vortigo@empresa.com', 'Profissional');
const colaborador = new Colaborador('Eduardo', '01/01/1990', [endereco], [emailPessoal, emailProfissional]);

const estagiario = new Estagiario('Estagiário', '01/01/1995', [endereco], [emailPessoal], '01/01/2024', '31/12/2024', 1000, 'chavePixEstagiario');
const clt = new CLT('CLT', '01/01/1980', [endereco], [emailPessoal], '01/01/2000', 'Cargo', 5000, 'Agencia', '123456');
const pj = new PJ('PJ', '01/01/1975', [endereco], [emailPessoal], '01/01/2020', '31/12/2022', 100, 80, 'chavePixPJ');

const ogitrov = new OgitrovAnalog([estagiario], [clt], [pj]);

const custoMensal = ogitrov.calcularCustoMensal();
document.getElementById('output').innerText = `Custo mensal da folha: R$ ${custoMensal.toFixed(2)}`;
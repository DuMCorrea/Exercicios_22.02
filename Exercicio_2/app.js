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
    constructor(estagiarios, clts, pjs, projetos) {
        this.estagiarios = estagiarios;
        this.clts = clts;
        this.pjs = pjs;
        this.projetos = projetos;
    }

    calcularCustoFolhaMensal() {
        let custoEstagiarios = this.estagiarios.reduce((total, estagiario) => total + estagiario.valorBolsa, 0);
        let custoCLTs = this.clts.reduce((total, clt) => total + clt.salario, 0);
        let custoPJs = this.pjs.reduce((total, pj) => total + (pj.valorHora * pj.horasMinimas), 0);

        return custoEstagiarios + custoCLTs + custoPJs;
    }

    calcularLucroMensal() {
        const custoFolha = this.calcularCustoFolhaMensal();
        const receitaProjetos = this.projetos.reduce((total, projeto) => total + projeto.calcularValorLiquido(), 0);

        return receitaProjetos - custoFolha;
    }
}

class Projeto {
    constructor(nome, clts, pjs, estagiarios, valorBruto) {
        this.nome = nome;
        this.clts = clts;
        this.pjs = pjs;
        this.estagiarios = estagiarios;
        this.valorBruto = valorBruto;
    }

    calcularCustoProjeto() {
        let custoCLTs = this.clts.reduce((total, clt) => total + clt.salario, 0);
        let custoPJs = this.pjs.reduce((total, pj) => total + (pj.valorHora * pj.horasMinimas), 0);
        let custoEstagiarios = this.estagiarios.reduce((total, estagiario) => total + estagiario.valorBolsa, 0);

        return custoCLTs + custoPJs + custoEstagiarios;
    }

    calcularValorLiquido() {
        return this.valorBruto - this.calcularCustoProjeto();
    }
}


const endereco = new Endereco('Santo Cristo', '674', '', 'Tereza', 'Porto Alegre', 'RS', '7533596332');
const emailPessoal = new Email('guiliano@gmail.com', 'Pessoal');
const emailProfissional = new Email('Dello@empresa.com', 'Profissional');
const colaborador = new Colaborador('Guiliano', '01/01/1990', [endereco], [emailPessoal, emailProfissional]);

const estagiario = new Estagiario('Estagiário', '01/01/1995', [endereco], [emailPessoal], '01/01/2024', '31/12/2024', 2000, 'chavePixEstagiario');
const clt = new CLT('CLT', '01/01/1980', [endereco], [emailPessoal], '01/01/2000', 'Cargo', 700, 'Agencia', '123456');
const pj = new PJ('PJ', '01/01/1975', [endereco], [emailPessoal], '01/01/2020', '31/12/2022', 200, 60, 'chavePixPJ');

const projeto1 = new Projeto('Projeto 1', [clt], [pj], [estagiario], 10000);
const projeto2 = new Projeto('Projeto 2', [clt], [pj], [estagiario], 15000);

const ogitrov = new OgitrovAnalog([estagiario], [clt], [pj], [projeto1, projeto2]);

const lucroMensal = ogitrov.calcularLucroMensal();
document.getElementById('output').innerText = `Lucro mensal da Ogitrov Analog: R$ ${lucroMensal.toFixed(2)}`;
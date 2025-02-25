class Despesa{
    constructor(ano,mes,dia,tipo,descricao,valor){
        this.ano = ano
        this.mes = mes
        this.dia = dia
        this.tipo = tipo
        this.descricao = descricao
        this.valor = valor
    }

    validarDados(){
        for(let i in this){
            if(this[i] == undefined || this[i] == '' || this[i] == null){
                return false
            }
        }
        return true
    }
}

class Bd {

    constructor(){
        let id = localStorage.getItem('id')

        if(id === null){
            localStorage.setItem('id', 0)
        }
    }

    getProximoId(){
        let proximoId = localStorage.getItem('id')
        return parseInt(proximoId) + 1 
    }
    gravar(d){
        let id = this.getProximoId()
        localStorage.setItem(id, JSON.stringify(d))
        localStorage.setItem('id',id)
    }
} 

let bd = new Bd()

function cadastrarDespesa(){
    let ano = document.getElementById('ano')
    let mes = document.getElementById('mes')
    let dia = document.getElementById('dia')
    let tipo = document.getElementById('tipo')
    let descricao = document.getElementById('descricao')
    let valor = document.getElementById('valor')

    
    let despesa = new Despesa(
        ano.value,
        mes.value,
        dia.value,
        tipo.value,
        descricao.value,
        valor.value
    )
//validacao de dados
    if(despesa.validarDados()){
        bd.gravar(despesa)

        document.getElementById('modal_titulo').innerHTML = 'Registro inserido com sucesso'
        document.getElementById('modal_titulo_div').className = 'modal-header text-success'
        document.getElementById('modal_conteudo').innerHTML = 'Despesa foi cadastrada com sucesso!'
        document.getElementById('modal_btn').className = 'btn btn-success'
        document.getElementById('modal_btn').innerHTML = 'voltar'

        //dialog de sucesso
        $('#modalRegistroDespesa').modal('show')
    }else{

        document.getElementById('modal_titulo').innerHTML = 'Erro na inclusao do registro'
        document.getElementById('modal_titulo_div').className = 'modal-header text-danger'
        document.getElementById('modal_conteudo').innerHTML = 'Erro na gravacao, verifique se todos os campos foram preenchidos corretamente!'
        document.getElementById('modal_btn').className = 'btn btn-danger'
        document.getElementById('modal_btn').innerHTML = 'voltar e corrigir'

        //dialog de erro
        $('#modalRegistroDespesa').modal('show')
    }

}


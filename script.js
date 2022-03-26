$(document).ready(() => {

    //EVENTO MOVIMENTO CANETA
    $('.link1').on('mouseenter', () => {

        $('img').addClass('imgGiro2')
        
    })
    $('.link2').on('mouseenter', () => {

        $('img').addClass('imgGiro2')
        
    })
    //EVENTO AUMENTAR LETRA 1
    $('.link1').on('mouseenter', () => {

        $('.link1').animate({
            fontSize: "5em"
        },
        {
            duration: 700,
            start: () => {
                //console.log('iniciado')
            },
            complete: () => {
               //console.log('finalizado')
                $('img').removeClass('imgGiro2')
                
            }
        })
    })
     //EVENTO AUMENTAR LETRA 2
     $('.link2').on('mouseenter', () => {

        $('.link2').animate({
            fontSize: "5em"
        },
        {
            duration: 700,
            start: () => {
                //console.log('iniciado')
            },
            complete: () => {
                //console.log('finalizado')
                $('img').removeClass('imgGiro2')
                
            }
        })
    })
    //EVENTO DIMINUIR LETRA 1
    $('.link1').on('mouseleave', () => {
        $('.link1').animate({
            fontSize: "3.5em"
        },
        {
            duration: 1000
        })
    })
    //EVENTO DIMINUIR LETRA 2
    $('.link2').on('mouseleave', () => {
        $('.link2').animate({
            fontSize: "3.5em"
        },
        {
            duration: 1000
        })
    })

    //INSERÇÃO DE DATA NA PÁGINA ESCREVA

    let data = new Date()
    const dia = String(data.getDate()).padStart(2,'0')
    const mes = String(data.getMonth() + 1).padStart(2,'0')
    const ano = data.getFullYear()

    function mesAtual(){
        if(mes == '01'){
            $('#mes').html('Jan.')
        }
        if(mes == '02'){
            $('#mes').html('Fev.')
        }
        if(mes == '03'){
            $('#mes').html('Mar.')
        }
        if(mes == '04'){
            $('#mes').html('Abr.')
        }
        if(mes == '05'){
            $('#mes').html('Mai.')
        }
        if(mes == '06'){
            $('#mes').html('Jun.')
        }
        if(mes == '07'){
            $('#mes').html('Jul.')
        }
        if(mes == '08'){
            $('#mes').html('Ago.')
        }
        if(mes == '09'){
            $('#mes').html('Set.')
        }
        if(mes == '10'){
            $('#mes').html('Out.')
        }
        if(mes == '11'){
            $('#mes').html('Nov.')
        }
        if(mes == '12'){
            $('#mes').html('Dez.')
        }
    }

    $('#dia').html(dia)
    mesAtual()
    $('#ano').html(ano)


    //RETORNO HOME
    $('#btnRetornoHome').on('click', () => {
        window.location.href = "index.html"
    })
    //PAGINA PESQUISA
    $('#btnPesquisa').on('click', () => {
        window.location.href = "pesquisa.html"
    })
    //PAGINA CADASTR
    $('#btnRegistro').on('click', () => {
        window.location.href = "pastas.html"
    })

    //FORMATAÇÕES DE TEXTO
    //NEGRITO
    $('.btnNegrito').on('click', () => {
        $('textarea').css('font-weight','bold')
        $('.btnNegrito').addClass('active')
        $('.btnRegular').removeClass('active')
    })
    //ITALICO
    $('.btnItalico').on('click', () => {
        $('textarea').css('font-style','italic')
        $('.btnItalico').addClass('active')
        $('.btnRegular').removeClass('active')
    })
    //REGULAR
    $('.btnRegular').on('click', () => {
        $('textarea').css({
            'font-weight': '',
            'font-style': ''
        })
        $('.btnNegrito').removeClass('active')
        $('.btnItalico').removeClass('active')
        $('.btnRegular').addClass('active')
        $('textarea').css('font-size','medium')
    })
    //TAMANHO
    $('.alterarFonte').on('change', value => {
        let valorFonte = $(value.target).val()

        if(valorFonte == '12'){
            $('textarea').css('font-size','medium')
        } else if(valorFonte == '14'){
            $('textarea').css('font-size','large')
        } if(valorFonte == '16'){
            $('textarea').css('font-size','x-large')
        } else if(valorFonte == '20'){
            $('textarea').css('font-size','xx-large')
        }
    })

    //REGISTRO DAS INFORMAÇÕES EM LOCALSTORAGE
    class Informacao{
        constructor(texto){
            this.texto = texto
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

    class BancoDados{
        constructor(){
            let id = localStorage.getItem('id')

            if(id === null || id === undefined){
                localStorage.setItem('id', 0)
            }
        }

        getProximoId(){
            let proximoId = localStorage.getItem('id')
            return parseInt(proximoId) + 1
        }

        gravar(i){     
            let id = this.getProximoId()

            localStorage.setItem(id, JSON.stringify(i))

            localStorage.setItem('id', id)

        }

        recuperarTodosRegistros(){
            let textos = Array()

            let id = localStorage.getItem('id')

            for(let i = 1; i <= id; i++){
                let texto = JSON.parse(localStorage.getItem(i))

                if(texto === null){
                    continue
                }
                texto.id = i
                textos.push(texto)
            }

            return textos
        }

        remover(id){
            localStorage.removeItem(id)
        }
    }

    let bancodados = new BancoDados()

    $('.btnSalvar').on('click', () => {
        let texto = $('textarea').val()
        
        let informacao = new Informacao(texto)

        if(informacao.validarDados()){
            bancodados.gravar(informacao)

            $('#tituloModal').html('Obrigado!')
            $('#tituloModal').addClass('text-secondary')
            $('#textoModal').html('Arquivo salvo com sucesso.')


            $('#eventoModal').modal('show');
            setTimeout(function () {
                $('#eventoModal').modal('hide')
            }, 3000);

            $('textarea').val('')
            
        }else {

            $('#tituloModal').html('Atenção!')
            $('#tituloModal').addClass('text-secondary')
            $('#textoModal').html('Não existe texto para ser salvo.')


            $('#eventoModal').modal('show');
            setTimeout(function () {
                $('#eventoModal').modal('hide')
            }, 3000);
        }
        
    })

    $('.btnCancelar').on('click', () => {
        $('#eventoModalDelete').modal('show')
    })

    $('#deleteSim').on('click', () => {
        $('textarea').val('')
    })

    //LISTAR ARQUIVOS SALVOS
    let textos = Array()
    
    textos = bancodados.recuperarTodosRegistros()

    let listaTextos = $('tbody')

    textos.forEach(function(t){
        listaTextos.append('<tr><td><button id="'+ t.id +'" class="btn btn-dark border-0 bg-transparent editarTexto">'+ t.texto +'</button></td></tr>')
    })

    //EDITAR OU APAGAR TEXTOS
    $('.editarTexto').on('click', (btn) => {

        let textoPesquisado = btn.target.innerText
        let id = btn.target.id

        $('#eventoModalPesquisa').modal('show')

        $('#apagaTexto').on('click', () => {            
            
            
            bancodados.remover(id)
            window.location.reload()                            
        })

        $('#mantenhaTexto').on('click', () => {
            
        })
    })
    
})

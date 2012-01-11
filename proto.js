//função tipo singleton (objeto único) - é o objeto (retangulo maior). Matriz 1x1. 
//Fracton pode ser mudado para ambiente de fração.
function fractron(){
    this._init();
}

//{}notaçao para novo objeto {} = new Object();
//[]notação para novo vetor  [] = new Array();
 
//Prototype -> Propriedade do objeto. Esta propriedade é nativa do javascript. Todo 
//objeto possui esta função.
//Aqui, estamos sobreescrevendo (adicionando) as propriedade (prototype).
fractron.prototype = {
    _init: function(){},
    questoes : [],
    graficos : [],
}

//Instanciando a Aplicação (retangulo maior)
const Fractron = new fractron();

//função que cria o objeto matriz, com linhas e colunas.
function grafico(w, h, linhas, colunas){
    this._init(w, h, linhas, colunas);
}

grafico.prototype = {
    
    partes: [],
    linhas:1,
    colunas:1,
    elem: undefined,
    selecionado:false,
    
    _init: function(w, h, linhas, colunas){

        Fractron.graficos.push(this);

        this.linhas = linhas;
        this.colunas = colunas;

        this.elem = $('<div class="grafico"></div>');//usar a formatação css 
                                                     //(div com a classe grafico)
        this.elem.attr('id', 'grafico'+Fractron.graficos.length)
                 .width(w)
                 .height(h);

        this.renderizar();
        $('body').prepend(this.elem);// prepend: pegar o objeto da 
                                     //memoria e disponibilizar no html
        
        this.elem.bind('dblclick', function(){//duplo clique apenas no elemento maior
            this.tecer();
        }.bind(this));
    },
    
    renderizar: function(){

        this.partes.forEach(function(parte){
            parte.remove();
        });

        this.partes = [];

        this.partes.w = Math.floor(this.elem.width() / this.colunas);
        //Math: função do javascript para calculos matematicos
        //floor: arredondamento do valos da largura do objetos para
        //dividir os quadros em partes iguais. Trabalha com valores em pixel.
        this.partes.h = Math.floor(this.elem.height() / this.linhas);

        for(i = 0; i < this.colunas * this.linhas; i++){
            var parte;
            parte = $('<div class="grafico"></div>');
            parte.attr('id', 'grafico'+Fractron.graficos.length)
                 .width(this.partes.w)
                 .height(this.partes.h);
            this.partes.push(parte);
            this.elem.append(parte);

            parte.click(function(){//evento de seleção
                $(this).toggleClass('selecionado');
            });
        }    
    },
    tecer: function(){//aumenta a malha de linhas e colunas
        this.linhas = this.linhas*2;
        this.colunas = this.colunas*2;
        this.renderizar();
    },
}
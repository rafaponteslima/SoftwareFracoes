function fractron(){
    this._init();
}
fractron.prototype = {
    _init: function(){},
    questoes : [],
    graficos : [],
    elem: undefined
}

const Fractron = new fractron();

function grafico(w, h, linhas, colunas){
    this._init(w, h, linhas, colunas);
}
grafico.prototype = {
    _init: function(w, h, linhas, colunas){

        Fractron.graficos.push(this);

        this.linhas = linhas;
        this.colunas = colunas;

        this.elem = $('<div class="grafico" draggable="true"></div>');
        this.elem.attr('id', 'grafico'+Fractron.graficos.length)
                 .width(w)
                 .height(h);

        this.renderizar();
        $('#palco').append(this.elem);

        this.elem.bind('dblclick', function(){
            this.tecer();
        }.bind(this));

        this.elem.bind('dragstart', function(e){
        });

        this.elem.bind('dragend', function(e){
            console.log(e);
            $(this).css({ position:'absolute',
                          top: e.originalEvent.y,
                          left: e.originalEvent.x,
                          margin:0 });
        });

        this.elem.bind('mousemove', function(e){
            if(e.ctrlKey == true){
                $(this).css({ position:'absolute',
                              top: e.pageY - $(this).height() / 2,
                              left: e.pageX - $(this).width() / 2,
                              margin:0 })
                       .addClass('movendo');
            }
            else{
                $(this).removeClass('movendo');
            }
        });
    },
    renderizar: function(){

        this.partes.forEach(function(parte){
            parte.remove();
        });

        this.partes = [];

        this.partes.w = Math.floor(this.elem.width() / this.colunas);
        this.partes.h = this.elem.height() / this.linhas;

        for(i = 0; i < this.colunas * this.linhas; i++){
            var parte;
            parte = $('<div class="grafico"></div>');
            parte.attr('id', 'grafico'+Fractron.graficos.length)
                 .width(this.partes.w)
                 .height(this.partes.h);
            this.partes.push(parte);
            this.elem.append(parte);

            parte.click(function(){
                $(this).toggleClass('selecionado');
            });
        }    
    },
    tecer: function(){
        this.linhas = this.linhas*2;
        this.colunas = this.colunas*2;
        this.renderizar();
    },
    partes: [],
    linhas:1,
    colunas:1,
    elem: undefined,
    selecionado:false,
}
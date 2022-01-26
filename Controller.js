const express = require('express'); 
const cors = require('cors');
const models=require('./models');
const { DATE } = require('sequelize');
const { json } = require('express/lib/response');
const req = require('express/lib/request');

const {Sequelize} = require('./models');

const app=express();
app.use(cors());
app.use (express.json());
let cliente=models.cliente;
let itempedido = models.ItemPedido;
let pedido = models.Pedido;
let servico = models.Servico;
let compra = models.Compra;
let itemcompra = models.ItemCompra;
let produto = models.Produto;

app.get('/',function(req,res){
    res.send('Ola,Mundo!')
});

app.post('/servicos',async(req,res)=>{
    await servico.create(
        req.body
    ).then(function(){
        return res.json({
            error:false,
            message:"Servico criado com. sucesso!.,"
        })
    }).catch(function(error){
        return  res.status(400).json({
            error:true,
            message:"erro de conecção!.,"
        })
    });
});


app.post('/clientes',async(req,res)=>{
    await cliente.create(
        req.body
        ).then(function(){
            return res.json({
                error:false,
                message:"Servico criado com. sucesso!.,"
            })
        }).catch(function(error){
            return  res.status(400).json({
                error:true,
                message:"erro de conecção!.," 
            })
    }); 
});
app.post('/pedidos',async(req,res)=>{
    await pedido.create(
        req.body
        ).then(function(){
            return res.json({
                error:false,
                message:"Servico criado com. sucesso!..,"
            })
        }).catch(function(error){
            return  res.status(400).json({
                error:true,
                message:"erro de conecção!.,," 
            })
    });
});

app.post('/itempedidos',async(req,res)=>{
    await itempedido.create(
        req.body
        ).then(function(){
            return res.json({
                error:false,
                message:"Servico criado com. sucesso!..,"
            })
        }).catch(function(error){
            return  res.status(400).json({
                error:true,
                message:"erro de conecção!.,," 
            })
    });
});

app.post('/compras',async(req,res)=>{
    await compra.create(
        req.body
    ).then(function(){
        return res.json({
            error:false,
            message:"salvo com sucesso."
        })
    }).catch(function(error){
        return res.status(400).json({
            error:true,
            message:"erro."
        })
    });
});

app.post('/produtos',async(req,res)=>{
    await produto.create(
        req.body
    ).then(function(){
        return res.json({
            error:false,
            message:"salvo com sucesso."
        })
    }).catch(function(error){
        return res.status(400).json({
            error:true,
            message:"erro."
        })
    });
});

app.post('/itemcompras',async(req,res)=>{
    await itemcompra.create(
        req.body
    ).then(function(){
        return res.json({
            error:false,
            message:"salvo com sucesso."
        })
    }).catch(function(error){
        return res.status(400).json({
            error:true,
            message:"erro."
        })
    });
});

app.get('/listaservicos',async(req,res)=>{
    await servico.findAll({
       // raw:true
       order:[['nome','DESC']]
    }).then(function(servicos){
        res.json({servicos})
    });
});
app.get('/listaclientes',async(req,res)=>{
    await cliente.findAll({
        raw:true
    }).then(function(clientes){
        res.json({clientes})
    });
});

app.get('/listaprodutos',async(req,res)=>{
    await produto.findAll({
        raw:true
    }).then(function(produtos){
        res.json({produtos})
    });
});
app.get('/listacompras',async(req,res)=>{
    await compra.findAll({
        raw:true
    }).then(function(compras){
        res.json({compras})
    });
});
app.get('/listaitempedidos',async(req,res)=>{
    await itempedido.findAll({
        raw:true
    }).then(function(itempedidos){
        res.json({itempedidos})
    });
});
app.get('/listapedidos',async(req,res)=>{
    await pedido.findAll({
        raw:true
    }).then(function(pedidos){
        res.json({pedidos})
    });
});
app.get('/listaitemcompras',async(req,res)=>{
    await itemcompra.findAll({
        raw:true
    }).then(function(itemcompras){
        res.json({itemcompras})
    });
});
app.get ('/ofertaservicos',async(req,res)=>{
    await servico.count('id').then(function(servicos){
        res.json({servicos});
    });
}); // serve para saber a quantidade de serviços pelo numero de id

app.get('/servico/:id/pedidos',async(req,res)=>{
    await itempedido.findAll({
        where:{ServicoId: req.params.id}})
    .then(item =>{
        return res.json({
        error:false,
        item
    });
}).catch(function(error){
    return res.status(400).json({
        error:true,
        message:"Erro no codigo!"
    });
    });
});//usado pra achar um so id 

// app.get('/atualizaservico',async(req,res)=>{
//     await servico.findByPk(2)
//     .then(serv =>{
//         serv.nome='HTML/CSS/JS';
//         serv.descricao ='PAGINA ESTATICAS e dinamicas ESTILIZADAS';
//         serv.save();

//         return res.json({serv});
//      });
// });
app.get('/pedidos/:id',async(req, res)=>{
    await pedido.findByPk(req.params.id,{include:[{all: true}]})
    .then(ped=>{
        return res.json({ped});
    });
});

app.put('/atualizaservico',async(req, res)=>{
    await servico.update(req.body,{
        where:{id:req.body.id}
    }).then(function(){
       return res.json({
           error: false,
           message:"Serviço foi alterado com sucesso!"
       });
    }).catch(function(erro){
        return res.status(400).json({
            error:true,
            message:"Erro na alteração do serviço."
        });
    });
});
app.put('/atualizacliente',async(req, res)=>{
    await cliente.update(req.body,{
        where:{id:req.body.id}
    }).then(function(){
       return res.json({
           error: false,
           message:"Cliente foi alterado com sucesso!"
       });
    }).catch(function(erro){
        return res.status(400).json({
            error:true,
            message:"Erro na alteração do cliente."
        });
    });
});
app.put('/atualizaproduto',async(req, res)=>{
    await produto.update(req.body,{
        where:{id:req.body.id}
    }).then(function(){
       return res.json({
           error: false,
           message:"Produto foi alterado com sucesso!"
       });
    }).catch(function(erro){
        return res.status(400).json({
            error:true,
            message:"Erro na alteração do produto."
        });
    });
});
app.put('/atualizacompra',async(req, res)=>{
    await compra.update(req.body,{
        where:{id:req.body.id}
    }).then(function(){
       return res.json({
           error: false,
           message:"Compra foi alterado com sucesso!"
       });
    }).catch(function(erro){
        return res.status(400).json({
            error:true,
            message:"Erro na alteração da compra."
        });
    });
});
app.put('/atualizaitempedido',async(req, res)=>{
    await itempedido.update(req.body,{
        where:{id:req.body.id}
    }).then(function(){
       return res.json({
           error: false,
           message:"Item pedido foi alterado com sucesso!"
       });
    }).catch(function(erro){
        return res.status(400).json({
            error:true,
            message:"Erro na alteração do item pedido."
        });
    });
});
app.put('/atualizapedido',async(req, res)=>{
    await pedido.update(req.body,{
        where:{id:req.body.id}
    }).then(function(){
       return res.json({
           error: false,
           message:"Pedido foi alterado com sucesso!"
       });
    }).catch(function(erro){
        return res.status(400).json({
            error:true,
            message:"Erro na alteração do pedido."
        });
    });
});
app.put('/atualizaitemcompra',async(req, res)=>{
    await itemcompra.update(req.body,{
        where:{id:req.body.id}
    }).then(function(){
       return res.json({
           error: false,
           message:"Item compra foi alterado com sucesso!"
       });
    }).catch(function(erro){
        return res.status(400).json({
            error:true,
            message:"Erro na alteração da item compra ."
        });
    });
});

app.put('/pedidos/:id/editaritem',async(req, res)=>{
    const item = {
        quantidade:req.body.quantidade,
        valor:req.body.valor
    }
    if (!await pedido.findByPk(req.params.id)){
        return res.status(400).json({
            error:true,
            message:'Pedido nao encontrado.'
        });
    };
    if (!await servico.findByPk(req.body.ServicoId)){
        return res.status(400).json({
            error:true,
            message:'Serviço nao encontardo.'
        });
    };
    await itempedido.update(item,{
        where:Sequelize.and({servicoId:req.body.ServicoId},
            {PedidoId: req.params.id})
        }).then(function (itens){
            return res.json({
                error:false,
                message:"Pedido foi alterado com sucesso.",
                itens
            });
        }).catch(function(erro){
            return res.status(400).json({
                error:true,
                message:"Erro: nao foi possivel alterar."
            });
        });;
});
app.get('/excluircliente/:id',async(req, res)=>{
    await cliente.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error:false,
            message: "Cliente excluido com sucesso."
        });
    }).catch(function(erro){
        return res.status(400).json({
            error:true,
            messagem:"Erro ao tentar excluir."
        });
    });
});
app.get('/excluirservico/:id',async(req, res)=>{
    await servico.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error:false,
            message: "Serviço foi  excluido com sucesso."
        });
    }).catch(function(erro){
        return res.status(400).json({
            error:true,
            messagem:"Erro ao tentar excluir."
        });
    });
});
app.get('/excluirproduto/:id',async(req, res)=>{
    await produto.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error:false,
            message: "Produto foi  excluido com sucesso."
        });
    }).catch(function(erro){
        return res.status(400).json({
            error:true,
            messagem:"Erro ao tentar excluir."
        });
    });
});
app.get('/excluircompra/:id',async(req, res)=>{
    await compra.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error:false,
            message: "Compra foi  excluido com sucesso."
        });
    }).catch(function(erro){
        return res.status(400).json({
            error:true,
            messagem:"Erro ao tentar excluir."
        });
    });
});
app.get('/excluiritempedido/:id',async(req, res)=>{
    await itempedido.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error:false,
            message: "Item pedido foi  excluido com sucesso."
        });
    }).catch(function(erro){
        return res.status(400).json({
            error:true,
            messagem:"Erro ao tentar excluir."
        });
    });
});
app.get('/excluirpedido/:id',async(req, res)=>{
    await pedido.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error:false,
            message: "Pedido foi excluido com sucesso."
        });
    }).catch(function(erro){
        return res.status(400).json({
            error:true,
            messagem:"Erro ao tentar excluir."
        });
    });
});
app.get('/excluiritemcompra/:id',async(req, res)=>{
    await itemcompra.destroy({
        where: {id: req.params.id}
    }).then(function(){
        return res.json({
            error:false,
            message: "Item compra foi  excluido com sucesso."
        });
    }).catch(function(erro){
        return res.status(400).json({
            error:true,
            messagem:"Erro ao tentar excluir."
        });
    });
});

let port=process.env.PORT || 3001;

app.listen(port,(req,res)=>{
    console.log('Servidor ativo:http://localhost:3001');
})
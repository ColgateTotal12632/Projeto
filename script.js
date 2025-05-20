document.addEventListener("DOMContentLoaded", () => {
  const comprar = document.getElementById("botaocomprar");
  const carrinho = document.getElementById("botaocarrinho");

  if (comprar) {
    comprar.addEventListener("click", () => {
      alert("Você será redirecionado para finalizar a compra!");
    });
  }

  if (carrinho) {
    carrinho.addEventListener("click", () => {
      alert("Produto adicionado ao carrinho!");
    });
  }
});





document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formAvaliacao");
  const lista = document.getElementById("listaAvaliacoes");
  const jogoId = document.body.dataset.jogo;

  if (form && lista && jogoId) {
    const carregarAvaliacoes = () => {
      lista.innerHTML = "";
      const avaliacoes = JSON.parse(localStorage.getItem(`avaliacoes-${jogoId}`) || "[]");

      avaliacoes.forEach(av => {
        const div = document.createElement("div");
        div.classList.add("comentario");
        div.innerHTML = `
          <p><strong>${av.nome}</strong> — ${"⭐".repeat(av.nota)}</p>
          <p>${av.comentario}</p>
        `;
        lista.appendChild(div);
      });
    };

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const nome = document.getElementById("nome").value.trim();
      const nota = parseInt(document.getElementById("nota").value);
      const comentario = document.getElementById("comentario").value.trim();

      if (!nome || !nota || !comentario) return;

      const novaAvaliacao = { nome, nota, comentario };

      const avaliacoes = JSON.parse(localStorage.getItem(`avaliacoes-${jogoId}`) || "[]");
      avaliacoes.push(novaAvaliacao);
      localStorage.setItem(`avaliacoes-${jogoId}`, JSON.stringify(avaliacoes));

      form.reset();
      carregarAvaliacoes();
    });

    carregarAvaliacoes();
  }
});






document.addEventListener("DOMContentLoaded", () => {
  const carrinhoContainer = document.getElementById("itens-carrinho");
  const totalCarrinho = document.getElementById("total-carrinho");

  if (carrinhoContainer && totalCarrinho) {
    const atualizarCarrinho = () => {
      carrinhoContainer.innerHTML = "";
      let total = 0;
      let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

      carrinho.forEach((item, index) => {
        const subtotal = item.preco * item.quantidade;
        total += subtotal;

        const div = document.createElement("div");
        div.classList.add("item-carrinho");
        div.innerHTML = `
          <div class="item-info">
            <img src="${item.imagem}" alt="${item.nome}">
            <div>
              <h4>${item.nome}</h4>
              <p>R$ ${item.preco.toFixed(2)}</p>
              <p class="item-subtotal">Subtotal: R$ ${subtotal.toFixed(2)}</p>
            </div>
          </div>
          <div class="controles">
            <button class="diminuir" data-index="${index}">-</button>
            <span>${item.quantidade}</span>
            <button class="aumentar" data-index="${index}">+</button>
            <button class="remover" data-index="${index}">Remover</button>
          </div>
        `;
        carrinhoContainer.appendChild(div);
      });

      totalCarrinho.textContent = total.toFixed(2);

      document.querySelectorAll(".aumentar").forEach(btn => {
        btn.addEventListener("click", () => {
          const i = btn.dataset.index;
          carrinho[i].quantidade++;
          localStorage.setItem("carrinho", JSON.stringify(carrinho));
          atualizarCarrinho();
        });
      });

      document.querySelectorAll(".diminuir").forEach(btn => {
        btn.addEventListener("click", () => {
          const i = btn.dataset.index;
          if (carrinho[i].quantidade > 1) {
            carrinho[i].quantidade--;
          } else {
            carrinho.splice(i, 1);
          }
          localStorage.setItem("carrinho", JSON.stringify(carrinho));
          atualizarCarrinho();
        });
      });

      document.querySelectorAll(".remover").forEach(btn => {
        btn.addEventListener("click", () => {
          const i = btn.dataset.index;
          carrinho.splice(i, 1);
          localStorage.setItem("carrinho", JSON.stringify(carrinho));
          atualizarCarrinho();
        });
      });
    };

    atualizarCarrinho();
  }
});




document.addEventListener("DOMContentLoaded", () => {
  const botaoCarrinho = document.getElementById("botaocarrinho");

  if (botaoCarrinho && typeof produto !== "undefined") {
    botaoCarrinho.addEventListener("click", () => {
      let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

      const index = carrinho.findIndex(p => p.id === produto.id);

      if (index !== -1) {
        carrinho[index].quantidade += 1;
      } else {
        carrinho.push(produto);
      }

      localStorage.setItem("carrinho", JSON.stringify(carrinho));
      alert("Produto adicionado ao carrinho!");
    });
  }
});





document.addEventListener("DOMContentLoaded", () => {
  const botaoFav = document.getElementById("botaoFavorito");

  if (botaoFav && typeof produto !== "undefined") {
    botaoFav.addEventListener("click", () => {
      let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

      const index = favoritos.findIndex(p => p.id === produto.id);

      if (index !== -1) {
        alert("Este produto já está nos favoritos!");
        return;
      }

      favoritos.push(produto);
      localStorage.setItem("favoritos", JSON.stringify(favoritos));
      alert("Adicionado aos favoritos!");
    });
  }
});






document.addEventListener("DOMContentLoaded", () => {
  const containerFav = document.getElementById("itens-favoritos");

  if (containerFav) {
    const favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

    containerFav.innerHTML = "";

    favoritos.forEach((item, index) => {
      const div = document.createElement("div");
      div.classList.add("item-favorito");
      div.innerHTML = `
        <div class="item-info">
          <img src="${item.imagem}" alt="${item.nome}">
          <div>
            <h4>${item.nome}</h4>
            <p>R$ ${item.preco.toFixed(2)}</p>
          </div>
        </div>
        <button class="btn-remover-fav" data-index="${index}">Remover</button>
      `;

      containerFav.appendChild(div);
    });

    document.querySelectorAll(".btn-remover-fav").forEach(btn => {
      btn.addEventListener("click", () => {
        const index = btn.dataset.index;
        favoritos.splice(index, 1);
        localStorage.setItem("favoritos", JSON.stringify(favoritos));
        location.reload();
      });
    });
  }
});






document.addEventListener("DOMContentLoaded", () => {
  const nomeSpan = document.getElementById("perfil-nome");
  const emailSpan = document.getElementById("perfil-email");
  const telefoneSpan = document.getElementById("perfil-telefone");
  const nascimentoSpan = document.getElementById("perfil-nascimento");
  const enderecoSpan = document.getElementById("perfil-endereco");

  const form = document.getElementById("form-edicao");
  const btnEditar = document.getElementById("editarPerfil");
  const btnSair = document.getElementById("sairPerfil");

  const inputs = {
    nome: document.getElementById("inputNome"),
    email: document.getElementById("inputEmail"),
    telefone: document.getElementById("inputTelefone"),
    nascimento: document.getElementById("inputNascimento"),
    endereco: document.getElementById("inputEndereco")
  };

  function carregarDados() {
    nomeSpan.textContent = localStorage.getItem("perfil-nome") || "Visitante";
    emailSpan.textContent = localStorage.getItem("perfil-email") || "-";
    telefoneSpan.textContent = localStorage.getItem("perfil-telefone") || "-";
    nascimentoSpan.textContent = localStorage.getItem("perfil-nascimento") || "-";
    enderecoSpan.textContent = localStorage.getItem("perfil-endereco") || "-";
  }

  function preencherFormulario() {
    inputs.nome.value = localStorage.getItem("perfil-nome") || "";
    inputs.email.value = localStorage.getItem("perfil-email") || "";
    inputs.telefone.value = localStorage.getItem("perfil-telefone") || "";
    inputs.nascimento.value = localStorage.getItem("perfil-nascimento") || "";
    inputs.endereco.value = localStorage.getItem("perfil-endereco") || "";
  }

  btnEditar.addEventListener("click", () => {
    form.style.display = "flex";
    preencherFormulario();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    localStorage.setItem("perfil-nome", inputs.nome.value);
    localStorage.setItem("perfil-email", inputs.email.value);
    localStorage.setItem("perfil-telefone", inputs.telefone.value);
    localStorage.setItem("perfil-nascimento", inputs.nascimento.value);
    localStorage.setItem("perfil-endereco", inputs.endereco.value);
    form.style.display = "none";
    carregarDados();
  });

  btnSair.addEventListener("click", () => {
    localStorage.removeItem("perfil-nome");
    localStorage.removeItem("perfil-email");
    localStorage.removeItem("perfil-telefone");
    localStorage.removeItem("perfil-nascimento");
    localStorage.removeItem("perfil-endereco");
    alert("Você saiu.");
    location.reload();
  });

  carregarDados();
});





document.addEventListener("DOMContentLoaded", () => {
  const botaoComprar = document.getElementById("botaocomprar");

  if (botaoComprar && typeof produto !== "undefined") {
    botaoComprar.addEventListener("click", () => {
      const logado = localStorage.getItem("usuarioLogado");

      if (logado !== "true") {
        alert("Você precisa estar logado para comprar.");
        localStorage.setItem("voltarPara", window.location.href);
        window.location.href = "login.html";
        return;
      }

      localStorage.setItem("compra-atual", JSON.stringify(produto));
      window.location.href = "finalizar.html";
    });
  }
});





document.addEventListener("DOMContentLoaded", () => {
  const formLogin = document.getElementById("formLogin");

  if (formLogin) {
    formLogin.addEventListener("submit", (e) => {
      e.preventDefault();

      const nome = document.getElementById("loginNome").value.trim();
      const email = document.getElementById("loginEmail").value.trim();

      if (!nome || !email) {
        alert("Preencha todos os campos.");
        return;
      }

      localStorage.setItem("usuarioLogado", "true");
      localStorage.setItem("perfil-nome", nome);
      localStorage.setItem("perfil-email", email);

      const destino = localStorage.getItem("voltarPara") || "index.html";
      localStorage.removeItem("voltarPara");
      window.location.href = destino;
    });
  }
});





document.addEventListener("DOMContentLoaded", () => {
  const formCadastro = document.getElementById("formCadastro");

  if (formCadastro) {
    formCadastro.addEventListener("submit", (e) => {
      e.preventDefault();

      const nome = document.getElementById("cadastroNome").value.trim();
      const email = document.getElementById("cadastroEmail").value.trim();

      if (!nome || !email) {
        alert("Preencha todos os campos.");
        return;
      }

      localStorage.setItem("usuarioLogado", "true");
      localStorage.setItem("perfil-nome", nome);
      localStorage.setItem("perfil-email", email);

      alert("Cadastro realizado com sucesso!");

      const destino = localStorage.getItem("voltarPara") || "index.html";
      localStorage.removeItem("voltarPara");
      window.location.href = destino;
    });
  }
});





document.addEventListener("DOMContentLoaded", () => {
  const botaoSair = document.getElementById("sairPerfil");

  if (botaoSair) {
    botaoSair.addEventListener("click", () => {
      const confirmar = confirm("Tem certeza que deseja sair da sua conta?");
      if (!confirmar) return;

      localStorage.removeItem("usuarioLogado");
      localStorage.removeItem("perfil-nome");
      localStorage.removeItem("perfil-email");
      localStorage.removeItem("perfil-telefone");
      localStorage.removeItem("perfil-nascimento");
      localStorage.removeItem("perfil-endereco");

      alert("Você saiu da sua conta.");
      window.location.href = "login.html";
    });
  }
});




document.addEventListener("DOMContentLoaded", () => {
  const resumo = document.getElementById("resumoProduto");
  const form = document.getElementById("formEntrega");

  if (resumo && form) {
    const produto = JSON.parse(localStorage.getItem("compra-atual"));

    if (!produto) {
      resumo.innerHTML = "<p>Nenhum produto selecionado para compra.</p>";
      form.style.display = "none";
      return;
    }

    resumo.innerHTML = `
      <img src="${produto.imagem}" alt="${produto.nome}" />
      <div>
        <h4>${produto.nome}</h4>
        <p>Preço: R$ ${produto.preco.toFixed(2)}</p>
      </div>
    `;

    const enderecoInput = document.getElementById("endereco");
    const enderecoSalvo = localStorage.getItem("perfil-endereco");
    if (enderecoSalvo) {
      enderecoInput.value = enderecoSalvo;
    }

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const pedidos = JSON.parse(localStorage.getItem("pedidos") || "[]");
      const data = new Date().toLocaleDateString("pt-BR");

      const novoPedido = {
  ...produto,
  data,
  status: "Pendente",
  id: Date.now()
};


      pedidos.push(novoPedido);
      localStorage.setItem("pedidos", JSON.stringify(pedidos));

      localStorage.removeItem("compra-atual");

      alert("Pedido realizado com sucesso!");
      window.location.href = "pedidos.html";
    });
  }
});




document.addEventListener("DOMContentLoaded", () => {
  const lista = document.getElementById("listaPedidos");

  if (lista) {
    let pedidos = JSON.parse(localStorage.getItem("pedidos") || "[]");

    if (pedidos.length === 0) {
      lista.innerHTML = "<p>Você ainda não fez nenhum pedido.</p>";
      return;
    }

    lista.innerHTML = "";

    pedidos.reverse().forEach(pedido => {
      const div = document.createElement("div");
      div.classList.add("pedido");

      const podeCancelar = pedido.status === "Pendente" || pedido.status === "Em preparo";

      div.innerHTML = `
        <img src="${pedido.imagem}" alt="${pedido.nome}" />
        <div class="pedido-info">
          <h4>${pedido.nome}</h4>
          <p>Preço: R$ ${pedido.preco.toFixed(2)}</p>
          <p>Data do pedido: ${pedido.data}</p>
          <p>Status: <strong>${pedido.status}</strong></p>
          ${podeCancelar ? `<button class="cancelar-pedido" data-id="${pedido.id}">Cancelar Pedido</button>` : ""}
        </div>
      `;

      lista.appendChild(div);
    });

    document.querySelectorAll(".cancelar-pedido").forEach(botao => {
      botao.addEventListener("click", () => {
        const id = botao.dataset.id;
        const confirmar = confirm("Tem certeza que deseja cancelar este pedido?");

        if (confirmar) {
          pedidos = pedidos.map(p => {
            if (p.id.toString() === id) {
              return { ...p, status: "Cancelado" };
            }
            return p;
          });

          localStorage.setItem("pedidos", JSON.stringify(pedidos));
          location.reload();
        }
      });
    });
  }
});





document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formVenda");
  const lista = document.getElementById("listaVendas");

  if (form && lista) {
    const email = localStorage.getItem("perfil-email") || "visitante";

    const carregarVendas = () => {
      const todas = JSON.parse(localStorage.getItem("vendas") || "[]");
      const minhas = todas.filter(p => p.email === email);

      lista.innerHTML = "";
      if (minhas.length === 0) {
        lista.innerHTML = "<p>Você ainda não anunciou nenhum produto.</p>";
        return;
      }

      minhas.forEach(prod => {
        const div = document.createElement("div");
        div.classList.add("produto");
        div.innerHTML = `
          <img src="${prod.imagem}" alt="${prod.nome}">
          <h3>${prod.nome}</h3>
          <h5>${prod.descricao}</h5>
          <p class="preco">R$ ${prod.preco.toFixed(2)}</p>
        `;
        lista.appendChild(div);
      });
    };

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const nome = document.getElementById("nomeProduto").value.trim();
      const descricao = document.getElementById("descricaoProduto").value.trim();
      const preco = parseFloat(document.getElementById("precoProduto").value);
      const imagem = document.getElementById("imagemProduto").value.trim();

      if (!nome || !descricao || !imagem || isNaN(preco)) return;

      const novoProduto = { nome, descricao, preco, imagem, email };

      const vendas = JSON.parse(localStorage.getItem("vendas") || "[]");
      vendas.push(novoProduto);
      localStorage.setItem("vendas", JSON.stringify(vendas));

      form.reset();
      carregarVendas();
    });

    carregarVendas();
  }
});





document.addEventListener("DOMContentLoaded", () => {

  const protegido = document.body.dataset.protegido;
  if (protegido === "true" && localStorage.getItem("usuarioLogado") !== "true") {
    alert("Você precisa estar logado para acessar essa página.");
    window.location.href = "index.html";
    return;
  }


  const perfil = document.getElementById("dadosPerfil");
  if (perfil) {
    const nome = localStorage.getItem("perfil-nome") || "Não informado";
    const email = localStorage.getItem("perfil-email") || "Não informado";
    const telefone = localStorage.getItem("perfil-telefone") || "Não informado";
    const nascimento = localStorage.getItem("perfil-nascimento") || "Não informado";
    const endereco = localStorage.getItem("perfil-endereco") || "Não informado";

    perfil.innerHTML = `
      <p><strong>Nome:</strong> ${nome}</p>
      <p><strong>E-mail:</strong> ${email}</p>
      <p><strong>Telefone:</strong> ${telefone}</p>
      <p><strong>Data de nascimento:</strong> ${nascimento}</p>
      <p><strong>Endereço:</strong> ${endereco}</p>
    `;
  }


  const botaoSair = document.getElementById("sairPerfil");
  if (botaoSair) {
    botaoSair.addEventListener("click", () => {
      const confirmar = confirm("Deseja sair da conta?");
      if (!confirmar) return;

      localStorage.removeItem("usuarioLogado");
      localStorage.removeItem("perfil-nome");
      localStorage.removeItem("perfil-email");
      localStorage.removeItem("perfil-telefone");
      localStorage.removeItem("perfil-nascimento");
      localStorage.removeItem("perfil-endereco");
      window.location.href = "index.html";
    });
  }


  const btnFormProduto = document.getElementById("mostrarFormProduto");
  const formProduto = document.getElementById("formProduto");
  const produtosContainer = document.getElementById("produtosDoUsuario");

  if (btnFormProduto && formProduto) {
    btnFormProduto.addEventListener("click", () => {
      formProduto.style.display = formProduto.style.display === "none" ? "flex" : "none";
    });
  }

  if (formProduto && produtosContainer) {
    formProduto.addEventListener("submit", (e) => {
      e.preventDefault();

      const nome = document.getElementById("nomeProduto").value.trim();
      const descricao = document.getElementById("descricaoProduto").value.trim();
      const preco = parseFloat(document.getElementById("precoProduto").value);
      const imagem = document.getElementById("imagemProduto").value.trim();
      const emailUsuario = localStorage.getItem("perfil-email");

      if (!nome || !descricao || !imagem || isNaN(preco)) {
        alert("Preencha todos os campos.");
        return;
      }

      const novoProduto = {
        id: Date.now(),
        nome,
        descricao,
        preco,
        imagem,
        email: emailUsuario
      };

      const lista = JSON.parse(localStorage.getItem("vendas") || "[]");
      lista.push(novoProduto);
      localStorage.setItem("vendas", JSON.stringify(lista));

      formProduto.reset();
      formProduto.style.display = "none";
      carregarProdutosDoUsuario();
    });

    function carregarProdutosDoUsuario() {
      const emailUsuario = localStorage.getItem("perfil-email");
      const lista = JSON.parse(localStorage.getItem("vendas") || "[]");
      const meusProdutos = lista.filter(p => p.email === emailUsuario);

      produtosContainer.innerHTML = "";

      if (meusProdutos.length === 0) {
        produtosContainer.innerHTML = "<p>Você ainda não adicionou produtos.</p>";
        return;
      }

      meusProdutos.forEach(prod => {
        const div = document.createElement("div");
        div.classList.add("produto");
        div.innerHTML = `
          <img src="${prod.imagem}" alt="${prod.nome}">
          <h3>${prod.nome}</h3>
          <h5>${prod.descricao}</h5>
          <p class="preco">R$ ${prod.preco.toFixed(2)}</p>
        `;
        produtosContainer.appendChild(div);
      });
    }

    carregarProdutosDoUsuario();
  }


  const formLogin = document.getElementById("formLogin");
  if (formLogin) {
    formLogin.addEventListener("submit", (e) => {
      e.preventDefault();
      const nome = document.getElementById("loginNome").value.trim();
      const email = document.getElementById("loginEmail").value.trim();

      if (!nome || !email) {
        alert("Preencha todos os campos.");
        return;
      }

      localStorage.setItem("usuarioLogado", "true");
      localStorage.setItem("perfil-nome", nome);
      localStorage.setItem("perfil-email", email);

      const destino = localStorage.getItem("voltarPara") || "index.html";
      localStorage.removeItem("voltarPara");
      window.location.href = destino;
    });
  }


  const formCadastro = document.getElementById("formCadastro");
  if (formCadastro) {
    formCadastro.addEventListener("submit", (e) => {
      e.preventDefault();

      const nome = document.getElementById("cadastroNome").value.trim();
      const email = document.getElementById("cadastroEmail").value.trim();
      const telefone = document.getElementById("cadastroTelefone")?.value.trim() || "";
      const nascimento = document.getElementById("cadastroNascimento")?.value.trim() || "";
      const endereco = document.getElementById("cadastroEndereco")?.value.trim() || "";

      if (!nome || !email) {
        alert("Preencha nome e email.");
        return;
      }

      localStorage.setItem("usuarioLogado", "true");
      localStorage.setItem("perfil-nome", nome);
      localStorage.setItem("perfil-email", email);
      localStorage.setItem("perfil-telefone", telefone);
      localStorage.setItem("perfil-nascimento", nascimento);
      localStorage.setItem("perfil-endereco", endereco);

      alert("Cadastro realizado com sucesso!");

      const destino = localStorage.getItem("voltarPara") || "index.html";
      localStorage.removeItem("voltarPara");
      window.location.href = destino;
    });
  }
});

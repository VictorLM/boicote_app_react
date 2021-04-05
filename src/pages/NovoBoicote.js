import React, { useEffect, useState } from 'react';
import { isEmail, isURL } from 'validator';
import { toast } from 'react-toastify';

import axios from '../config/axios';
import visitanteCheck from '../config/visitanteCheck';
import NovoBoicoteForm from '../components/NovoBoicoteForm';

function NovoBoicote() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [marca, setMarca] = useState('');
  const [titulo, setTitulo] = useState('');
  const [texto, setTexto] = useState('');
  const [tags, setTags] = useState('');
  const [links, setLinks] = useState('');
  const [loadingCasdastrarNovoBoicote, setLoadingCasdastrarNovoBoicote] = useState(false);
  const [boicoteCadastradoComSucesso, setBoicoteCadastradoComSucesso] = useState(false);

  function montaArray(stringao) {
    if (stringao === null || stringao === '') {
      return [];
    }
    const arr = stringao.split(',').map((item) => item.trim());
    return arr.filter((item) => item); // LIMPAR VALORES EM BRANCO
  }

  async function cadastrarNovoBoicote(e) {
    e.preventDefault();
    // VALIDANDO FORM
    let formErrors = false;

    if (nome.length < 3 || nome.length > 255) {
      formErrors = true;
      toast.error('Nome deve ter entre 3 e 255 caracteres');
    }
    if (!isEmail(email)) {
      formErrors = true;
      toast.error('E-mail inválido.');
    }
    if (marca.length < 3 || marca.length > 255) {
      formErrors = true;
      toast.error('Marca deve ter entre 3 e 255 caracteres');
    }
    if (titulo.length < 3 || titulo.length > 255) {
      formErrors = true;
      toast.error('Título deve ter entre 3 e 255 caracteres');
    }
    if (texto.length < 5 || texto.length > 2000) {
      formErrors = true;
      toast.error('Texto deve ter entre 3 e 2000 caracteres');
    }
    if (tags.length < 3 || tags.length > 255) {
      formErrors = true;
      toast.error('Todas as Tags devem ter entre 3 e 255 caracteres. Poste ao menos uma Tag.');
    }
    const tagsArray = montaArray(tags);
    tagsArray.map((tag) => { //eslint-disable-line
      if (tag.length < 3 || tag.length > 20) {
        formErrors = true;
        toast.error('Cada Tag deve ter entre 3 e 20 caracteres.');
      }
    });
    if (links.length < 10) {
      formErrors = true;
      toast.error('Poste ao menos um Link.');
    }
    const linksArray = montaArray(links);
    if (linksArray.length > 3) {
      formErrors = true;
      toast.error('Máximo três Links.');
    }
    linksArray.map((link) => { //eslint-disable-line
      if (!isURL(link)) {
        formErrors = true;
        toast.error(`Link inválido: ${link}`);
      } else if (link.length < 10 || link.length > 255) {
        formErrors = true;
        toast.error('Cada Link deve ter entre 10 e 255 caracteres');
      }
    });

    if (formErrors) return;

    const body = {
      nome,
      email,
      marca,
      titulo,
      texto,
      tags: tagsArray,
      links: linksArray,
    };

    setLoadingCasdastrarNovoBoicote(true);

    // ENVIANDO REQUEST PARA API
    try {
      await axios.post('/boicotes', body, { withCredentials: true });
      setLoadingCasdastrarNovoBoicote(false);
      setBoicoteCadastradoComSucesso(true);
      // LIMPAR FORM
      setNome('');
      setEmail('');
      setMarca('');
      setTitulo('');
      setTexto('');
      setTags('');
      setLinks('');
    } catch (err) {
      setLoadingCasdastrarNovoBoicote(false);
      toast.error('Erro ao enviar o boicote. Recarregar a página pode resolver o problema.');
      // console.error(err);
    }
  }

  useEffect(async () => {
    // CHECA COOKIE VISITANTEID
    await visitanteCheck();
  }, []);

  return (
    <>
      <hr />
      <h1 className="text-center">Novo Boicote</h1>
      <hr />
      <NovoBoicoteForm
        loading={loadingCasdastrarNovoBoicote}
        boicoteCadastradoComSucesso={boicoteCadastradoComSucesso}
        nome={nome}
        email={email}
        marca={marca}
        titulo={titulo}
        texto={texto}
        tags={tags}
        links={links}
        setNome={setNome}
        setEmail={setEmail}
        setMarca={setMarca}
        setTitulo={setTitulo}
        setTexto={setTexto}
        setTags={setTags}
        setLinks={setLinks}
        cadastrarNovoBoicote={cadastrarNovoBoicote}
      />
    </>
  );
}

export default NovoBoicote;

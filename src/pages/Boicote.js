import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { isEmail } from 'validator';
import { toast } from 'react-toastify';

import axios from '../config/axios';
import visitanteCheck from '../config/visitanteCheck';
import BoicoteUnico from '../components/Boicote';
import Comentarios from '../components/Comentarios';
import LoadingGrande from '../components/LoadingGrande';
import NovoComentarioForm from '../components/NovoComentarioForm';

function Boicote() {
  // BOICOTE
  const [boicote, setBoicote] = useState([]);
  const [loadingBoicotes, setLoadingBoicotes] = useState(true);
  const { boicoteId } = useParams();
  // VOTOS
  const [votos, setVotos] = useState([]);
  // COMENTÁRIOS
  const [comentarios, setComentarios] = useState([]);
  const [loadingComentarios, setLoadingComentarios] = useState(true);
  // FORM COMENTAR
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [comentario, setComentario] = useState('');
  const [loadingComentar, setLoadingComentar] = useState(false);

  async function getBoicote() {
    await axios.get(`/boicotes/${boicoteId}`, { withCredentials: false })
      .then((response) => {
        setBoicote(response.data);
      })
      .catch((error) => {
        setLoadingBoicotes(false);
        // eslint-disable-next-line
        console.log(error); // TODO
      })
      .then(() => {
        // always executed
      });
  }

  async function getVotos() {
    await axios.get('/visitantes/votos', { withCredentials: true })
      .then((response) => {
        setVotos(response.data);
      })
      .catch((error) => {
        // eslint-disable-next-line
        console.log(error); // TODO
      })
      .then(() => {
        // always executed
      });
  }

  async function getComentarios() {
    await axios.get(`/comentarios/${boicoteId}`, { withCredentials: false })
      .then((response) => {
        setComentarios(response.data);
      })
      .catch((error) => {
        setLoadingComentarios(false);
        // eslint-disable-next-line
        console.log(error); // TODO
      })
      .then(() => {
        // always executed
      });
  }

  async function comentar(e) {
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
    if (comentario.length < 3 || comentario.length > 255) {
      formErrors = true;
      toast.error('Motivo deve ter entre 3 e 255 caracteres');
    }
    if (formErrors) return;

    const body = {
      nome,
      email,
      comentario,
    };

    setLoadingComentar(true);

    // ENVIANDO REQUEST PARA API
    await axios.post(`/comentarios/${boicote.id}`, body, { withCredentials: true })
      .then((response) => {
        setComentarios([response.data, ...comentarios]);
        setLoadingComentar(false);
        // LIMPAR FORM
        setNome('');
        setEmail('');
        setComentario('');
        toast.success('Comentário cadastrado com sucesso.');
      })
      .catch((error) => {
        setLoadingComentar(false);
        // eslint-disable-next-line
        console.log(error);
        toast.error('Erro interno. Por favor, tente novamente mais tarde.');
      })
      .then(() => {
      // always executed
      });
  }

  useEffect(async () => {
    if (!boicoteId) return;

    setLoadingBoicotes(true);
    setLoadingComentarios(true);
    await getVotos();
    await getBoicote();
    setLoadingBoicotes(false);
    await getComentarios();
    setLoadingComentarios(false);
    // CHECA COOKIE VISITANTEID
    await visitanteCheck();
  }, []);

  if (loadingBoicotes) {
    return (
      <>
        <LoadingGrande />
      </>
    );
  }

  return (
    <div key={String(boicote.id)} className="mb-2 mt-4">
      <BoicoteUnico
        boicote={boicote}
        boicoteUnico
        voto={votos.findIndex((voto) => voto.boicoteId === boicote.id) !== -1
          ? Number(votos[votos.findIndex((voto) => voto.boicoteId === boicote.id)].cima)
          : null}
      />
      <hr />
      <h2 className="text-center">Comentar</h2>
      <hr />
      <NovoComentarioForm
        loading={loadingComentar}
        nome={nome}
        email={email}
        comentario={comentario}
        setNome={setNome}
        setEmail={setEmail}
        setComentario={setComentario}
        comentar={comentar}
      />
      <hr />
      <h2 className="text-center">Comentários</h2>
      <hr />
      {loadingComentarios ? <LoadingGrande /> : <Comentarios comentarios={comentarios} />}
    </div>
  );
}

export default Boicote;

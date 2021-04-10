import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { isEmail } from 'validator';
import { toast } from 'react-toastify';

import axios from '../config/axios';
import visitanteCheck from '../config/visitanteCheck';
import BoicoteUnico from '../components/Boicote';
import Comentario from '../components/Comentario';
import LoadingGrande from '../components/LoadingGrande';
import NovoComentarioForm from '../components/NovoComentarioForm';
import Erro from '../components/Erro';

function Boicote() {
  // BOICOTE
  const [boicote, setBoicote] = useState([]);
  const [loadingBoicote, setLoadingBoicote] = useState(true);
  const [boicoteErro, setBoicoteErro] = useState();
  const { boicoteId } = useParams();
  // VOTOS VISITANTE
  const [votos, setVotos] = useState([]);
  const [loadingVotos, setLoadingVotos] = useState(true);
  // COMENTÁRIOS
  const [comentarios, setComentarios] = useState([]);
  const [loadingComentarios, setLoadingComentarios] = useState(true);
  // FORM COMENTAR
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [comentario, setComentario] = useState('');
  const [loadingComentar, setLoadingComentar] = useState(false);

  async function getBoicote() {
    // ENVIANDO REQUEST PARA API
    try {
      const response = await axios.get(`/boicotes/${boicoteId}`, { withCredentials: false });
      setBoicote(response.data);
    } catch (err) {
      setLoadingBoicote(false);
      if (err.response) {
        // HOUVE RESPOSTA COM ERROR CODE
        setBoicoteErro(err.response.data[0].message ?? `Erro interno. Response code: ${err.response.status}`);
      } else if (err.request) {
        // NÃO HOUVE RESPOSTA
        setBoicoteErro('Nossos servidores não estão respondendo. Tente novamente mais tarde.');
      }
      // console.error(err);
    }
  }

  async function getVotos() {
    // ENVIANDO REQUEST PARA API
    try {
      const response = await axios.get('/visitantes/votos', { withCredentials: true });
      setVotos(response.data);
    } catch (err) {
      setLoadingVotos(false);
      if (err.response) {
        // HOUVE RESPOSTA COM ERROR CODE
        const errors = err.response.data ?? []; // NÃO PEGA ERRO UNIQUE DO SEQUELIZE

        if (errors.length > 0 && typeof errors === 'object') { // PARA STRING NÃO DAR FATAL NO MAP
          errors.map((error) => toast.error(error.message));
        } else {
          toast.error(`Erro ao carregar seus votos. Tente novamente mais tarde. Code: ${err.response.status}.`);
        }
      } else if (err.request) {
        // NÃO HOUVE RESPOSTA
        toast.error('Nossos servidores não estão respondendo. Tente novamente mais tarde.');
      }
      // console.error(err);
    }
  }

  async function getComentarios() {
    // ENVIANDO REQUEST PARA API
    try {
      const response = await axios.get(`/comentarios/${boicoteId}`, { withCredentials: false });
      setComentarios(response.data);
    } catch (err) {
      setLoadingComentarios(false);
      if (err.response) {
        // HOUVE RESPOSTA COM ERROR CODE
        const errors = err.response.data ?? []; // NÃO PEGA ERRO UNIQUE DO SEQUELIZE

        if (errors.length > 0 && typeof errors === 'object') { // PARA STRING NÃO DAR FATAL NO MAP
          errors.map((error) => toast.error(error.message));
        } else {
          toast.error(`Erro desconhecido ao carregar os comentários. Tente novamente mais tarde. Code: ${err.response.status}.`);
        }
      } else if (err.request) {
        // NÃO HOUVE RESPOSTA
        toast.error('Nossos servidores não estão respondendo. Tente novamente mais tarde.');
      }
      // console.error(err);
    }
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
    try {
      const response = await axios.post(`/comentarios/${boicote.id}`, body, { withCredentials: true });
      setComentarios([response.data, ...comentarios]);
      setLoadingComentar(false);
      // LIMPAR FORM
      setNome('');
      setEmail('');
      setComentario('');
      toast.success('Comentário cadastrado com sucesso.');
    } catch (err) {
      setLoadingComentar(false);
      if (err.response) {
        // HOUVE RESPOSTA COM ERROR CODE
        const errors = err.response.data ?? []; // NÃO PEGA ERRO UNIQUE DO SEQUELIZE

        if (errors.length > 0 && typeof errors === 'object') { // PARA STRING NÃO DAR FATAL NO MAP
          errors.map((error) => toast.error(error.message));
        } else {
          toast.error(`Erro desconhecido ao enviar comentário. Tente novamente mais tarde. Code: ${err.response.status}.`);
        }
      } else if (err.request) {
        // NÃO HOUVE RESPOSTA
        toast.error('Nossos servidores não estão respondendo. Tente novamente mais tarde.');
      }
      // console.error(err);
    }
  }

  useEffect(async () => {
    if (!boicoteId) return;

    // CHECA COOKIE VISITANTEID
    await visitanteCheck();

    setLoadingBoicote(true);
    setLoadingComentarios(true);
    await getBoicote();
    setLoadingBoicote(false);
    await getVotos();
    setLoadingVotos(false);
    await getComentarios();
    setLoadingComentarios(false);
  }, []);

  if (loadingBoicote || loadingVotos) {
    return (
      <>
        <LoadingGrande />
      </>
    );
  }

  if (boicote.length < 1) {
    return (
      <>
        <Erro mensagem={boicoteErro} />
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
      <h2 className="text-center mt-5 mb-4 header">COMENTAR</h2>
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
      <h2 className="text-center mt-5 mb-4 header">COMENTÁRIOS</h2>
      {loadingComentarios
        ? <LoadingGrande />
        : [
          (comentarios.length < 1
            ? (
              <h5 key="0" className="text-center">
                Não há comentários cadastrados. Seja o primeiro a comentar!
              </h5>
            ) : (
              comentarios.map((cadaComentario) => (
                <Comentario key={String(cadaComentario.id)} comentario={cadaComentario} />
              ))
            )
          ),
        ]}
    </div>
  );
}

export default Boicote;

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
    try {
      const response = await axios.get(`/boicotes/${boicoteId}`, { withCredentials: false });
      setBoicote(response.data);
    } catch (err) {
      setLoadingBoicote(false);
      if (err.response) {
        // Request made and server responded
        setBoicoteErro(err.response.data.errors ?? `Erro interno. Response code: ${err.response.status}`);
      } else if (err.request) {
        // The request was made but no response was received
        setBoicoteErro('Erro ao carregar boicote. Recarregar a página pode resolver o problema.');
      }
      // console.error(err);
    }
  }

  async function getVotos() {
    try {
      const response = await axios.get('/visitantes/votos', { withCredentials: true });
      setVotos(response.data);
    } catch (err) {
      setLoadingVotos(false);
      toast.error('Erro ao carregar seus votos. Recarregar a página pode resolver o problema.');
      // console.error(err);
    }
  }

  async function getComentarios() {
    try {
      const response = await axios.get(`/comentarios/${boicoteId}`, { withCredentials: false });
      setComentarios(response.data);
    } catch (err) {
      setLoadingComentarios(false);
      toast.error('Erro ao carregar os comentários. Recarregar a página pode resolver o problema.');
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
      toast.error('Erro ao enviar comentário. Tente novamente mais tarde.');
      // console.error(err);
    }
  }

  useEffect(async () => {
    if (!boicoteId) return;

    setLoadingBoicote(true);
    setLoadingComentarios(true);
    await getBoicote();
    setLoadingBoicote(false);
    await getVotos();
    setLoadingVotos(false);
    await getComentarios();
    setLoadingComentarios(false);
    // CHECA COOKIE VISITANTEID
    await visitanteCheck();
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

import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

import axios from '../config/axios';
import visitanteCheck from '../config/visitanteCheck';
import BoicotesMultiplos from '../components/Boicote';
import LoadingGrande from '../components/LoadingGrande';
import PaginationBoicotes from '../components/PaginationBoicotes';

function Boicotes() {
  // BOICOTE
  const [boicotes, setBoicotes] = useState([]);
  const [loadingBoicotes, setLoadingBoicotes] = useState(true);
  // PAGINATION
  const [boicotesCount, setBoicotesCount] = useState();
  const pagina = Number(new URLSearchParams(useLocation().search).get('pagina') || 1);
  const boicotesPorPagina = 10; // TODO - ALTERAR - LIMITE DE BOICOTES POR PÁGINA
  // VOTOS
  const [votos, setVotos] = useState([]);
  const [loadingVotos, setLoadingVotos] = useState(true);

  async function getBoicotes() { // TODO - PAGINATION
    // ENVIANDO REQUEST PARA API
    try {
      const response = await axios.get(`/boicotes?pagina=${pagina}`, { withCredentials: false });
      setBoicotes(response.data.boicotes);
      setBoicotesCount(Number(response.data.boicotesTotalCount));
    } catch (err) {
      setLoadingBoicotes(false);
      if (err.response) {
        // HOUVE RESPOSTA COM ERROR CODE
        const errors = err.response.data ?? []; // NÃO PEGA ERRO UNIQUE DO SEQUELIZE

        if (errors.length > 0 && typeof errors === 'object') { // PARA STRING NÃO DAR FATAL NO MAP
          errors.map((error) => toast.error(error.message));
        } else {
          toast.error(`Erro ao carregar os boicotes. Tente novamente mais tarde. Code: ${err.response.status}.`);
        }
      } else if (err.request) {
        // NÃO HOUVE RESPOSTA
        toast.error('Nossos servidores não estão respondendo. Tente novamente mais tarde.');
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

  useEffect(async () => {
    // CHECA COOKIE VISITANTEID
    await visitanteCheck();

    setLoadingBoicotes(true);
    setLoadingVotos(true);
    await getBoicotes();
    setLoadingBoicotes(false);
    await getVotos();
    setLoadingVotos(false);
  }, []);

  if (loadingBoicotes || loadingVotos) {
    return (
      <>
        <hr />
        <h1 className="text-center">Boicotes</h1>
        <hr />
        <LoadingGrande />
      </>
    );
  }

  if (boicotes.length < 1) {
    return (
      <>
        <hr />
        <h1 className="text-center">Boicotes</h1>
        <hr />
        <h4 className="text-center">Não há boicotes cadastrados para exibir.</h4>
      </>
    );
  }

  return (
    <div className="">
      <hr />
      <h1 className="text-center">Boicotes</h1>
      <hr />
      {boicotes.map((boicote) => (
        <BoicotesMultiplos
          key={String(boicote.id)}
          boicote={boicote}
          boicoteUnico={false}
          voto={votos.findIndex((voto) => voto.boicoteId === boicote.id) !== -1
            ? Number(votos[votos.findIndex((voto) => voto.boicoteId === boicote.id)].cima)
            : null}
        />
      ))}

      {boicotesCount > boicotesPorPagina && (
        <PaginationBoicotes
          boicotesCount={boicotesCount}
          boicotesPorPagina={boicotesPorPagina}
          pagina={pagina}
        />
      )}

    </div>

  );
}

export default Boicotes;

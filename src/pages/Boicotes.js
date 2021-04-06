import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import axios from '../config/axios';
import visitanteCheck from '../config/visitanteCheck';
import BoicotesMultiplos from '../components/Boicote';
import LoadingGrande from '../components/LoadingGrande';

function Boicotes() {
  // BOICOTE
  const [boicotes, setBoicotes] = useState([]);
  const [loadingBoicotes, setLoadingBoicotes] = useState(true);
  // VOTOS
  const [votos, setVotos] = useState([]);
  const [loadingVotos, setLoadingVotos] = useState(true);

  async function getBoicotes() {
    try {
      const response = await axios.get('/boicotes', { withCredentials: false });
      setBoicotes(response.data);
    } catch (err) {
      setLoadingBoicotes(false);
      toast.error('Erro ao carregar os boicotes. Recarregar a página pode resolver o problema.');
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
    </div>

  );
}

export default Boicotes;

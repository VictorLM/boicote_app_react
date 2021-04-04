import React, { useEffect, useState } from 'react';
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

  async function getBoicotes() {
    await axios.get('/boicotes', { withCredentials: false })
      .then((response) => {
        setBoicotes(response.data);
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

  useEffect(async () => {
    setLoadingBoicotes(true);
    await getBoicotes();
    await getVotos();
    setLoadingBoicotes(false);
    // CHECA COOKIE VISITANTEID
    await visitanteCheck();
  }, []);

  if (loadingBoicotes) {
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

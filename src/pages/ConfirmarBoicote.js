import React, { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { Card } from 'react-bootstrap';

import axios from '../config/axios';
import visitanteCheck from '../config/visitanteCheck';
import LoadingGrande from '../components/LoadingGrande';

function ConfirmarBoicote() {
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);
  const [confirmarErro, setConfirmarErro] = useState();
  const [redirect, setRedirect] = useState(false);

  const { boicoteId, token } = useParams();

  async function confirmarBoicote() {
    // ENVIANDO REQUEST PARA API
    try {
      await axios.get(`/boicotes/confirmar/${boicoteId}/${token}`, { withCredentials: false });
      setTimeout(() => setRedirect(true), 5000); // O TEMPO DE LER A PÁGINA
    } catch (err) {
      setLoading(false);
      if (err.response) {
        // HOUVE RESPOSTA COM ERROR CODE
        setConfirmarErro(err.response.data[0].message ?? `Erro interno. Response code: ${err.response.status}`);
      } else if (err.request) {
        // NÃO HOUVE RESPOSTA
        setConfirmarErro('Nossos servidores não estão respondendo. Tente novamente mais tarde.');
      }
      setErro(true);
      // console.error(err);
    }
  }

  useEffect(async () => {
    if (!boicoteId || !token) return;

    setLoading(true);
    await confirmarBoicote();
    setLoading(false);
    // CHECA COOKIE VISITANTEID
    await visitanteCheck();
  }, []);

  if (loading) {
    return (
      <>
        <LoadingGrande />
      </>
    );
  }

  return (

    <Card className="p-4 my-5 border-0 shadow">
      <Card.Body className="mt-2 pb-0">

        {erro
          ? (
            <>
              <h3 className="text-center header">
                ERRO AO CONFIRMAR BOICOTE
              </h3>
              <h1 className="text-center display-1">
                <FaExclamationCircle className="text-danger" />
              </h1>
              <h5 className="text-center text-primary mt-4 mb-5">{confirmarErro}</h5>
            </>
          ) : (
            <>
              <h3 className="text-center header">
                BOICOTE CONFIRMADO COM SUCESSO!
              </h3>
              <h1 className="text-center display-1">
                <FaCheckCircle className="text-success" />
              </h1>
              <h5 className="text-center text-primary mt-4 mb-5">
                Aguarde um momento, em breve você será redirecionado(a) para visualiza-lo.
              </h5>
              {redirect && <Redirect to={`/boicotes/${boicoteId}`} />}
            </>
          )}

      </Card.Body>
    </Card>
  );
}

export default ConfirmarBoicote;

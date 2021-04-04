import React, { useEffect, useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

import axios from '../config/axios';
import visitanteCheck from '../config/visitanteCheck';
import LoadingGrande from '../components/LoadingGrande';

function ConfirmarBoicote() {
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const { boicoteId, token } = useParams();

  async function confirmarBoicote() {
    await axios.get(`/boicotes/confirmar/${boicoteId}/${token}`, { withCredentials: false })
      .then((response) => { //eslint-disable-line
        toast.success('Boicote confirmado com sucesso. Em breve você será redirecionado(a) para visualiza-lo.');
        setTimeout(() => setRedirect(true), 6000);
      })
      .catch((error) => {
        setLoading(false);
        setErro(true);
        // eslint-disable-next-line
        console.log(error); // TODO
        toast.error('Erro interno. Verifique o link acessado ou tente novamente mais tarde.');
      })
      .then(() => {
        // always executed
      });
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
    <div className="mb-4 mt-4">

      <h1 className="text-center display-1">
        {erro
          ? <FaExclamationCircle className="text-danger" />
          : (
            <>
              <FaCheckCircle className="text-success" />
              {redirect && <Redirect to={`/boicotes/${boicoteId}`} />}
            </>
          )}
      </h1>

    </div>
  );
}

export default ConfirmarBoicote;

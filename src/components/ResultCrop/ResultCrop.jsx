import useSWR from 'swr';
import PropTypes from 'prop-types';
import React from 'react';
import CountUp from 'react-countup';
import cx from 'classnames';
import { Card } from '..';

function fetcher(url) {
  return fetch(url).then((r) => r.json());
}

const ResultCrop = ({ crop }) => {
  const route = 'result';
  const { data, error } = useSWR(
    '/api/api_inativo?route=' + route + '&key=' + crop,
    fetcher,
  );

  let title = data?.menssage;
  if (!data) title = 'Carregando...';
  if (error) title = 'sem internet';

  return (
    <Card className={cx('card', 'card-results')}>
      <div>
        <p className="title">
          RESULTADOS do TREINO: <CountUp start={0} end={crop} duration={1} />
        </p>
        {data?.data.map((aux, i) => (
          <p key={i} className="subtitle">
            {aux.rotulo}{' '}
          </p>
        ))}

        {data?.data.map((aux, i) => (
          <p className="subtitle" key="i">
            <a className="font-bold">
              AUC: <CountUp start={0} end={aux.auc} duration={1} /> e KS:{' '}
              <CountUp start={0} end={aux.ks} duration={1} />
            </a>
            <br />
            Instância de Treino:{' '}
            <CountUp
              className="font-bold"
              start={0}
              end={aux.instancias_treino}
              duration={1}
              separator=","
            />
            <br />
            Instância de Teste:{' '}
            <CountUp
              className="font-bold"
              start={0}
              end={aux.instancias_teste}
              duration={1}
              separator=","
            />
          </p>
        ))}
      </div>
    </Card>
  );
};

export default ResultCrop;
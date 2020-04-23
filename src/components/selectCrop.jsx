import FeaturePlot from './featurePlot';
import KsPlot from './ksPlot';
import ROCcurves from './ROCcurves';
import MixedChart from './MixedChart';
import ConfusionPlot from './confusionPlot';
import TrainingResults from './trainingResults';
import useSWR from 'swr';
import React, { useState } from 'react';

function fetcher(url) {
  return fetch(url).then((r) => r.json());
}

function Crop() {
  const [valuekey, setCount] = useState(201803);

  const { data, error } = useSWR('/api/inativo', fetcher);
  let title = data?.menssage;
  let safra = [];
  data?.data.map((aux) => {
    safra.push(aux.safra);
  });
  if (!data) title = 'Carregando...';
  if (error) title = 'Selecione sua Safra';

  return (
    <>
      {/* <div className="flex justify-between overflow-hidden p-6 bg-white col-span-2 rounded-md shadow-sm">
        <div className="items-center self-center">
          <p className="text-xl uppercase">{title}</p>
          <p className="text-sm">
            Clique o botão para selecionar o ano e mês correspondente
          </p>
        </div>
        <div className="flex">
          {safra.map((name) => {
            return (
              <div className="m-1 flex flex-col items-center">
                <p className="text-xs font-bold mb-3">{name}</p>
                <button
                  className="bg-blue-default h-24 overflow-hidden shadow w-6 rounded-md hover:bg-yellow-400"
                  onClick={() => setCount(name)}
                  value={name}
                />
              </div>
            );
          })}
        </div>
      </div> */}
      <TrainingResults safra={valuekey} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 col-span-2">
        <FeaturePlot safra={valuekey} />
        <KsPlot safra={valuekey} />
        <ROCcurves safra={valuekey} />
        <MixedChart safra={valuekey} />
      </div>
      <ConfusionPlot safra={valuekey} />
    </>
  );
}

class SelectCrop extends React.Component {
  render() {
    return <Crop />;
  }
}

export default SelectCrop;

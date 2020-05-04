import React, { useState, useEffect } from 'react';
import Card from '../Card/Card';
import cx from 'classnames';
import Rota from '../../Routes/Rota';
import Skeleton from "@material-ui/lab/Skeleton";
import Router from 'next/router';
const CropPicker = ({ handleCropChange }) => {

  const route = '/home/safras'
  const [data, setData] = useState([]);
  const [menssage, setMenssage] = useState('');

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const { data, menssage } = await Rota({ method: 'GET', route });
        setMenssage(menssage)
        setData(data)
      } catch (error) {
        Router.push('/notfound');
      }


    }
    fetchAPI();
  }, [route])


  return (
    <Card className={cx('card', 'card-picker')}>
      <div className="self-center">
        <p className="title">
          {menssage ? menssage : <Skeleton width={300} animation="wave" />}
        </p>
        <p className="subtitle">{cropTitle}</p>
      </div>
      <div className="crop-colunm">

        {
          data.map(aux => (
            <div key={aux.safra} className="crop-colunm__item">
              <button
                className="crop-colunm__btn"
                onClick={() => handleCropChange(aux.safra)}
              />
              <p>{aux.safra}</p>
            </div>
          ))
        }
      </div>

    </Card>
  );

  // return (
  //   <Card className={cx('card', 'card-picker')}>
  //     <div className="self-center">
  //       <p className="title">LISTA DE SAFRAS DISPONÍVEIS</p>
  //       <p className="subtitle">{cropTitle}</p>
  //     </div>

  //     <div className="crop-colunm">
  //       <div className="crop-colunm__item">
  //         <button className="crop-colunm__btn disabled" />
  //         <p>201801</p>
  //       </div>
  //       {data?.data.map((aux, i) => (
  //         <div key={i} className="crop-colunm__item">
  // <button
  //   className="crop-colunm__btn"
  //   onClick={(e) => handleCropChange(aux.safra)}
  // />
  //           <p>{aux.safra}</p>
  //         </div>
  //       ))}

  //       {numbers.map((aux, i) => (
  //         <div key={i} className="crop-colunm__item">
  //           <button className="crop-colunm__btn disabled" />
  //           <p>{aux}</p>
  //         </div>
  //       ))}
  //     </div>
  //   </Card>
  // );
};

export default CropPicker;



const cropTitle = 'Clique para selecionar o ano e mês correspondente';
const numbers = [
  '201804',
  '201805',
  '201806',
  '201807',
  '201808',
  '201809',
  '201810',
  '201811',
  '201812',
];

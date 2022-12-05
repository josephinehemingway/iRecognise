import React from 'react';
import './Cards.css';

type Props = {
  url: string;
  cameraName: string
  locationName: string;
  onClick?: React.MouseEventHandler
}

const LivestreamCard: React.FC<Props>  = ({ url, locationName, cameraName, onClick}) => {
  return (
    <div className='card-wrapper' onClick={onClick}>
      <div className='card-img'>
        <img src={url} width="100%"  alt=''/>
      </div>
      <h2 className="card-name"> {cameraName} </h2>
      <h2 className="card-subtitle"> {locationName} </h2>
    </div>
  );
};

export default LivestreamCard;
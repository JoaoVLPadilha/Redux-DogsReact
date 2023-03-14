import React from 'react';
import FeedPhotosItem from './FeedPhotosItem';
import { useSelector, useDispatch } from 'react-redux';
import styles from './FeedPhotos.module.css';
const FeedPhotos = ({ setModalPhoto }) => {
  const { list } = useSelector((state) => state.feed);
  return (
    <ul className={`${styles.feed} animeLeft`}>
      {list.map((photo) => (
        <FeedPhotosItem
          key={photo.id}
          photo={photo}
          setModalPhoto={setModalPhoto}
        />
      ))}
    </ul>
  );
  return null;
};

export default FeedPhotos;

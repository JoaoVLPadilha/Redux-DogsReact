import React from 'react';
import { PHOTOS_GET, PHOTO_GET } from '../../api';
import useFetch from '../../Hooks/useFetch';
import Error from '../Helper/Error';
import Loading from '../Helper/Loading';
import PhotoContent from '../Photo/PhotoContent';
import styles from './FeedModal.module.css';
const FeedModal = ({ photo, setModalPhoto }) => {
  const { data, error, loading, request } = useFetch();
  React.useEffect(() => {
    const { url, options } = PHOTO_GET(photo.id);
    request(url, options);
    console.log(data);
  }, [photo]);
  function handleOutsideClick(event) {
    if (event.target === event.currentTarget) setModalPhoto(null);
    console.log('Target', event.target);
    console.log('Current', event.currentTarget);
  }
  return (
    <div className={styles.modal} onClick={handleOutsideClick}>
      {error && <Error error={error} />}
      {loading && <Loading />}
      {data && <PhotoContent data={data} />}
    </div>
  );
};

export default FeedModal;

import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PhotoCommentsForm from './PhotoCommentsForm';
import styles from './PhotoComments.module.css';
const PhotoComments = (props) => {
  const [comments, setComments] = React.useState(() => props.comments);
  const commentsSection = React.useRef(null);
  const { user } = useSelector((state) => state);

  React.useEffect(() => {
    commentsSection.current.scrollTop = commentsSection.current.scrollHeight;
  }, [comments]);
  return (
    <>
      <ul
        ref={commentsSection}
        className={`${styles.comments} ${props.single ? styles.single : ''}`}
      >
        {comments.map((itemComment) => {
          return (
            <li key={itemComment.comment_ID}>
              <b>{itemComment.comment_author}: </b>
              <span>{itemComment.comment_content}</span>
            </li>
          );
        })}
      </ul>
      {user.data && (
        <PhotoCommentsForm
          single={props.single}
          id={props.id}
          setComments={setComments}
        />
      )}
    </>
  );
};

export default PhotoComments;

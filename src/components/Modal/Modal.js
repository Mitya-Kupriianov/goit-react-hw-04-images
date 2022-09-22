import s from './Modal.module.css';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

export default function Modal({ handleClose, tags, largeImageURL }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleClose]);

  const handleClick = e => {
    if (e.currentTarget === e.target) {
      handleClose();
    }
  };

  return (
    <div className={s.overlay} onClick={handleClick}>
      <div className={s.modal}>
        <img src={largeImageURL} alt={tags} />
      </div>
    </div>
  );
}

// export default class Modal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = e => {
//     if (e.code === 'Escape') {
//       this.props.handleClose();
//     }
//   };

//   handleClick = e => {
//     if (e.currentTarget === e.target) {
//       this.props.handleClose();
//     }
//   };

//   render() {
//     const { tags, largeImageURL } = this.props;
//     return (
//       <div className={s.overlay} onClick={this.handleClick}>
//         <div className={s.modal}>
//           <img src={largeImageURL} alt={tags} />
//         </div>
//       </div>
//     );
//   }
// }

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};

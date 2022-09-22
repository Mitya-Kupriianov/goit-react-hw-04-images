import { useState, useEffect } from 'react';
import Notiflix from 'notiflix';
import Button from './Button';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Searchbar from './Searchbar';
import searchImages from './services';

export function App() {
  const [searchValue, setSearchValue] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (searchValue === '') {
      return;
    }
    async function getImages() {
      setIsLoading(true);
      try {
        const {
          data: { hits, totalHits },
        } = await searchImages(searchValue, page);

        if (page === 1) {
          if (totalHits === 0) {
            setIsLoading(false);
            return Notiflix.Notify.failure('No results, try again');
          }

          Notiflix.Notify.success(`We found ${totalHits} images`);

          setTotalHits(totalHits);
        }

        setIsLoading(false);
        setImages([...images, ...hits]);
      } catch (error) {
        setError(error.message);
        Notiflix.Notify.failure(`Error - ${error.message}`);
      }
    }

    getImages();
  }, [page, searchValue]);

  const onSubmit = event => {
    event.preventDefault();

    const query = event.target.elements.query.value.trim().toLowerCase();

    if (query === '' || query === searchValue) {
      Notiflix.Notify.warning('Please, enter another search parameters');
      return;
    }

    if (query !== searchValue || page !== 1) {
      setSearchValue(query);
      setImages([]);
      setPage(1);
      setTotalHits(0);
    }
    event.target.reset();
  };

  const handleClick = event => {
    event.preventDefault();
    setPage(page + 1);
  };

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gridGap: '16px',
        paddingBottom: '24px',
      }}
    >
      <Searchbar handleSubmit={onSubmit} />
      {isLoading && <Loader />}

      {error && (
        <h2 style={{ margin: 'auto' }}>Something went wrong, try again</h2>
      )}

      {images.length > 0 && <ImageGallery data={images} />}
      {images.length < totalHits && <Button onClick={handleClick} />}
    </div>
  );
}

//   async componentDidUpdate(_, prevState) {
//     if (
//       prevState.page !== this.state.page ||
//       prevState.searchValue !== this.state.searchValue
//     ) {
//       await this.getImages();
//     }
//   }

//   getImages = async () => {
//     this.setState({ isLoading: true });
//     try {
//       const {
//         data: { hits, totalHits },
//       } = await searchImages(this.state.searchValue, this.state.page);

//       if (this.state.page === 1) {
//         if (totalHits === 0) {
//           this.setState({
//             isLoading: false,
//           });
//           return Notiflix.Notify.failure('No results, try again');
//         }

//         Notiflix.Notify.success(`We found ${totalHits} images`);

//         this.setState({
//           totalHits,
//         });
//       }

//       this.setState(prevState => ({
//         isLoading: false,

//         images: [...prevState.images, ...hits],
//       }));

//       // this.setState({
//       // });
//     } catch (error) {
//       this.setState({ error: error.message });
//       Notiflix.Notify.failure(`Error - ${error.message}`);
//     }
//   };

//   onSubmit = event => {
//     event.preventDefault();
//     const query = event.target.elements.query.value.trim().toLowerCase();

//     if (query === '') {
//       Notiflix.Notify.warning('Please, enter another search parameters');
//       return;
//     }

//     if (query !== this.state.searchValue || this.state.page !== 1) {
//       this.setState({
//         searchValue: query,
//         images: [],
//         page: 1,
//         totalHits: 0,
//       });
//     }
//     event.target.reset();
//   };

//   handleClick = event => {
//     event.preventDefault();
//     this.setState(prevPage => ({
//       page: prevPage.page + 1,
//     }));
//   };

//   render() {
//     const { images, totalHits, isLoading, error } = this.state;
//     return (
//       <div
//         style={{
//           display: 'grid',
//           gridTemplateColumns: '1fr',
//           gridGap: '16px',
//           paddingBottom: '24px',
//         }}
//       >
//         <Searchbar handleSubmit={this.onSubmit} />
//         {isLoading && <Loader />}

//         {error && (
//           <h2 style={{ margin: 'auto' }}>Something went wrong, try again</h2>
//         )}

//         {images.length > 0 && <ImageGallery data={images} />}
//         {images.length < totalHits && <Button onClick={this.handleClick} />}
//       </div>
//     );
//   }
// }

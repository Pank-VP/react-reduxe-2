import { Alert, AppBar, Button, Container, Snackbar } from '@mui/material';
import { FC, useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { IPlace } from '../../../api/Places';
import { ThemeContext } from '../../../providers/ThemeProvider';
import CreateSafePlacePopup from '../../../components/CreateSavePlacePopup/CreateSafePlacePopup';
import { ICreateSafePlaceFormData } from '../../../components/CreateSavePlacePopup/validateSafePlaceForm';
import { RootState, useAppDispatch } from '../../../store';
import { createPlace, getPlaces } from '../../../store/Places/ActionCreators';
import { closeSafePlacePopup, openSafePlacePopup } from '../../../store/PopupManagement/ActionCreators';
import styles from './PageLayout.module.scss'

const PageLayout: FC = ({ children }) => {
  const navigate = useNavigate();
  const { isCreateSafePlacePopupOpen } = useSelector((state: RootState) => state.popupManagement);
  const [isSuccessToasterShown, setIsSuccessToasterShown] = useState(false);
  const [isErrorToasterShown, setIsErrorToasterShown] = useState(false);
  const dispatch = useAppDispatch();
  const { isDarkTheme, setIsDarkTheme } = useContext(ThemeContext);

  const handleGoToHome = () => {
    navigate('/');
  };

  const handleAddNewSavePlace = () => {
    dispatch(openSafePlacePopup());
  };

  const handleOnSave = async (data: ICreateSafePlaceFormData) => {
    try {
      const newPlace: IPlace = await (dispatch(createPlace(data)) as any).unwrap();
      setIsSuccessToasterShown(true);
      dispatch(closeSafePlacePopup());
      dispatch(getPlaces());

      navigate(`/places/${newPlace.id}`);
    } catch (error) {
      setIsErrorToasterShown(true);
    }
  };

  const handleSuccessToasterClose = () => {
    setIsSuccessToasterShown(false);
  };

  const handleErrorToasterClose = () => {
    setIsErrorToasterShown(false);
  };

  const handleChangeTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <div className={styles.mainContainer}>
      <AppBar position="sticky" className={styles.appBar} color={isDarkTheme ? 'primary' : 'secondary'}>
        <Container className={styles.container}>
          <div className={styles.logo} onClick={handleGoToHome}>Ukraine</div>
          <Button variant="contained" color="secondary" onClick={handleChangeTheme}>Chenge Theme</Button>
          <Button variant="contained" color="secondary" onClick={handleAddNewSavePlace}>Add New Safe Place</Button>
        </Container>
      </AppBar>
      {children}
      {isCreateSafePlacePopupOpen && <CreateSafePlacePopup onSave={handleOnSave} />}
      <Snackbar open={isSuccessToasterShown} autoHideDuration={2000} onClose={handleSuccessToasterClose} >
        <Alert>
          New Safe Place Has Been Created!
        </Alert>
      </Snackbar>
      <Snackbar open={isErrorToasterShown} autoHideDuration={2000} onClose={handleErrorToasterClose} >
        <Alert severity="error">
          Ooops something went wrong! :(
        </Alert>
      </Snackbar>
    </div>
  );
};

export default PageLayout;

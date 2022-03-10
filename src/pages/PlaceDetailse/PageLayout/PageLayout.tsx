import { AppBar, Button, Container } from '@mui/material';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CreateSafePlacePopup from '../../../components/CreateSavePlacePopup/CreateSafePlacePopup';
import { ICreateSafePlaceFormData } from '../../../components/CreateSavePlacePopup/validateSafePlaceForm';
import { RootState } from '../../../store';
import { createPlace } from '../../../store/Places/ActionCreators';
import { closeSafePlacePopup, openSafePlacePopup } from '../../../store/PopupManagement/ActionCreators';
import styles from './PageLayout.module.scss'

const PageLayout: FC = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoToHome = () => {
    navigate('/');
  };

  const handleAddNewSavePlace = () => {
    dispatch(openSafePlacePopup());
  };

  const { isCreateSafePlacePopupOpen } = useSelector((state: RootState) => state.popupManagement);

  const handleOnSave = async (data: ICreateSafePlaceFormData) => {
    await dispatch(createPlace(data));
    dispatch(closeSafePlacePopup());
  };

  return (
    <div className={styles.mainContainer}>
      <AppBar position="sticky" className={styles.appBar}>
        <Container className={styles.container}>
          <div className={styles.logo} onClick={handleGoToHome}>
            Ukrain
          </div>
          <Button variant="contained" color="secondary" onClick={handleAddNewSavePlace}>Add New Safe Place</Button>
        </Container>
      </AppBar>
      {children}
      {isCreateSafePlacePopupOpen && <CreateSafePlacePopup onSave={handleOnSave} />}
    </div>
  );
};

export default PageLayout;

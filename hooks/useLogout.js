import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { authActions } from '../store/auth-slice';
import { deleteToken } from '../storage/tokenStorage';
const useLogout = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const logout = async () => {
    await deleteToken();
    navigation.navigate('SignIn');
  };

  return logout;
};

export default useLogout;

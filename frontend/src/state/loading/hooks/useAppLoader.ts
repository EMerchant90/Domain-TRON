import { useDispatch , useSelector } from "react-redux";
import { setLoading } from "../actions";
import { AppState } from "state";

export const useAppLoader = () => {
    const dispatch = useDispatch();

    const isLoading = useSelector((state:AppState) => state.isLoading.isLoading);

    const showLoader = () => {
        dispatch(setLoading(true));
    }

    const hideLoader = () => {
        dispatch(setLoading(false));
    }

    return {
        isLoading,
        showLoader,
        hideLoader
    }
}
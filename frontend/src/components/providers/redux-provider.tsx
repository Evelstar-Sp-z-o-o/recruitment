import store from "@/src/redux/store";
import { Provider } from "react-redux";

interface Props {
    children: React.ReactNode;
}

const ReduxProvider: React.FC<Props> = ({ children }) => {
    return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;

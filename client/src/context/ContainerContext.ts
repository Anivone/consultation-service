import { createContext } from "react";
import { AuthService } from "../services/AuthService";
import { initAxiosInterceptors } from "../helpers/AxiosInterceptor";
import { AxiosInstance } from "axios";

interface IContainer {
    authService: AuthService;
}

const ContainerContext = createContext<IContainer>({
    authService: new AuthService(),
});

export default ContainerContext;
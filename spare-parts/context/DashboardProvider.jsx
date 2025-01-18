import { useGeneral } from "../hooks/useGeneral";
import { usePersonal } from "../hooks/usePersonal";
import { DashboardContext } from "./DashboardContext";

export const DashboardProvider = ({ children }) => {
  //GENERAL
  const {
    onKeyShift,
    onInputShift,
    onKeyName,
    onInputName,
    onKeyNumEm,
    onInputNumEm,
  } = useGeneral();

  //PERSONAL
  const {
    //const
    visibleForm,
    initialPersonalForm,
    personal,
    employeeSelected,
    isSend,
    isLoading,
    errors,
    //functions
    handlerEmployeeSelected,
    handlerCloseFormPersonal,
    handlerOpenFormPersonal,
    handlerAddPersonal,
    handlerDeleteEmployee,

    //api
    getPersonal,
  } = usePersonal();

  return (
    <DashboardContext.Provider
      value={{
        //GENERAL
        //functions
        onKeyShift,
        onInputShift,
        onKeyName,
        onInputName,
        onKeyNumEm,
        onInputNumEm,

        //PERSONAL
        //const
        initialPersonalForm,
        visibleForm,
        personal,
        employeeSelected,
        isSend,
        isLoading,
        errors,

        //functions
        handlerCloseFormPersonal,
        handlerOpenFormPersonal,
        handlerEmployeeSelected,
        handlerAddPersonal,
        handlerDeleteEmployee,

        //apiPersonal
        getPersonal,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

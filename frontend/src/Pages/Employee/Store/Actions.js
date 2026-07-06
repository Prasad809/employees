import { employeeList,createEmp,updateEmp,inActiveEmp, employeeInActList, updateToActvedEmp } from "./restApi";


export const fetchEmpAct = (creds) => {
    return async (dispatch) => {
        try {
            const empLtsRes = await employeeList(creds);
            return dispatch({
                type: "EMP_LIST_REQUEST",
                payload: empLtsRes
            });
        }
        catch (error) {
            dispatch({
                type: "EMP_LIST_REQUEST",
                payload: error?.message || null
            });
        }
    }
};
export const fetchInActvedEmpAct = (creds) => {
    return async (dispatch) => {
        try {
            const empLtsRes = await employeeInActList(creds);
            return dispatch({
                type: "INACT_EMP_LIST",
                payload: empLtsRes
            });
        }
        catch (error) {
            dispatch({
                type: "INACT_EMP_LIST",
                payload: error?.message || null
            });
        }
    }
};
export const updateToActiveEmpAct = (creds) => {
    return async (dispatch) => {
        try {
            const empLtsRes = await updateToActvedEmp(creds);
            return dispatch({
                type: "ACT_EMP",
                payload: empLtsRes
            });
        }
        catch (error) {
            dispatch({
                type: "ACT_EMP",
                payload: error?.message || null
            });
        }
    }
};
export const createEmpAct = (creds) => {
    return async (dispatch) => {
        try {
            const empCretRes = await createEmp(creds);
            return dispatch({
                type: "CREATE_EMP",
                payload: empCretRes
            });
        }
        catch (error) {
            dispatch({
                type: "CREATE_EMP",
                payload: error?.message || null
            });
        }
    }
};
export const updateEmpAct = (creds) => {
    return async (dispatch) => {
        try {
            const empCretRes = await updateEmp(creds);
            return dispatch({
                type: "UPDATE_EMP",
                payload: empCretRes
            });
        }
        catch (error) {
            dispatch({
                type: "UPDATE_EMP",
                payload: error?.message || null
            });
        }
    }
};
export const inActiveEmpAct = (creds) => {
    return async (dispatch) => {
        try {
            const empCretRes = await inActiveEmp(creds);
            return dispatch({
                type: "INACT_EMP",
                payload: empCretRes
            });
        }
        catch (error) {
            dispatch({
                type: "INACT_EMP",
                payload: error?.message || null
            });
        }
    }
};



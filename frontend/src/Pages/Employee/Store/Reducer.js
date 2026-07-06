let initialValues={
    error:false,
    user:null,
    errMsg:""
}

export const fetchEmployeesRed=(state=initialValues,action)=>{
    switch(action.type){
        case "EMP_LIST_REQUEST":
            // if(action){
                return state = {
                    ...state,
                    user:action.payload.data,
                    error:false,
                    errMsg:""
                }
            // }
            case "SETERR":
                return state={
                    ...state,
                    user:null,
                    error:true,
                    errMsg:action.payload.data.message?.[0]?.description
                }
            default:
                return state
    }
};
export const fetchInActEmployeesRed=(state=initialValues,action)=>{
    switch(action.type){
        case "INACT_EMP_LIST":
            // if(action){
                return state = {
                    ...state,
                    user:action.payload.data,
                    error:false,
                    errMsg:""
                }
            // }
            case "SETERR":
                return state={
                    ...state,
                    user:null,
                    error:true,
                    errMsg:action.payload.data.message?.[0]?.description
                }
            default:
                return state
    }
};
export const updateActEmpRed=(state=initialValues,action)=>{
    switch(action.type){
        case "ACT_EMP":
            // if(action){
                return state = {
                    ...state,
                    user:action.payload.data,
                    error:false,
                    errMsg:""
                }
            // }
            case "SETERR":
                return state={
                    ...state,
                    user:null,
                    error:true,
                    errMsg:action.payload.data.message?.[0]?.description
                }
            default:
                return state
    }
};
export const createEmployeeRed=(state=initialValues,action)=>{
    switch(action.type){
        case "CREATE_EMP":
            // if(action){
                return state = {
                    ...state,
                    user:action.payload.data,
                    error:false,
                    errMsg:""
                }
            // }
            case "SETERR":
                return state={
                    ...state,
                    user:null,
                    error:true,
                    errMsg:action.payload.data.message?.[0]?.description
                }
            default:
                return state
    }
};
export const updateEmployeeRed=(state=initialValues,action)=>{
    switch(action.type){
        case "UPDATE_EMP":
            // if(action){
                return state = {
                    ...state,
                    user:action.payload.data,
                    error:false,
                    errMsg:""
                }
            // }
            case "SETERR":
                return state={
                    ...state,
                    user:null,
                    error:true,
                    errMsg:action.payload.data.message?.[0]?.description
                }
            default:
                return state
    }
};
export const inActiveEmployeeRed=(state=initialValues,action)=>{
    switch(action.type){
        case "INACT_EMP":
            // if(action){
                return state = {
                    ...state,
                    user:action.payload.data,
                    error:false,
                    errMsg:""
                }
            // }
            case "SETERR":
                return state={
                    ...state,
                    user:null,
                    error:true,
                    errMsg:action.payload.data.message?.[0]?.description
                }
            default:
                return state
    }
};


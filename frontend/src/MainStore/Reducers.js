import { combineReducers } from "redux";
import { authReducer, logoutReducer, RegisterReducer } from "../Pages/Login/Store/Reducer";
import { usersReducer, groupsReducer, createGroupReducer, addMemberReducer, addExpenseReducer, transGroupReducer, settledBalReducer, apprveMemReducer, requestMemReducer } from "../Pages/Group/Store/Reducer";
import { userSummaryReducer } from "../Pages/UserProfile/Store/Reducer";
import { notifyReducer, pendingReducer, readNotifyReducer } from "../Pages/Notification/Store/Reducer";
import { createEmployeeRed, fetchEmployeesRed, fetchInActEmployeesRed, inActiveEmployeeRed, updateActEmpRed, updateEmployeeRed } from "../Pages/Employee/Store/Reducer";

const rootReducers = combineReducers({
    authReducer,
    RegisterReducer,
    usersReducer,
    groupsReducer,
    createGroupReducer,
    addMemberReducer,
    userSummaryReducer,
    notifyReducer,
    readNotifyReducer,
    addExpenseReducer,
    transGroupReducer,
    settledBalReducer,
    apprveMemReducer,
    requestMemReducer,
    pendingReducer,
    fetchEmployeesRed,
    createEmployeeRed,
    updateEmployeeRed,
    inActiveEmployeeRed,
    fetchInActEmployeesRed,
    updateActEmpRed,
    logoutReducer
});

export default rootReducers;
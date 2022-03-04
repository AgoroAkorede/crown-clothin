import { createSelector } from 'reselect'

const selectUser = state => state.user;


export const selctCurrentUser = createSelector(
    [ selectUser ],
    (user)=>user.currentUser
)
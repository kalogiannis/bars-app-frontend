import { useGetMyUser, useUpdateMyUser } from '@/api/MyUserApi'
import UserProfileForm from '@/forms/user-form/UserProfileForm'

const UserProfilePage = () => {
  const {isLoading:isGetLoading, currentUser} = useGetMyUser()
  const {isLoading:isUpdateLoading, updateUser} = useUpdateMyUser()
  
  if(isGetLoading){
    return <span>loading...</span>
  }
  
  if(!currentUser){
    return <span>Unable to load user profile!</span>
  }

  return (
    <UserProfileForm
      currentUser={currentUser}
      onSave={updateUser}
      isLoading={isUpdateLoading}
    />
  )
}

export default UserProfilePage
import { useCreateMyBar, useGetMyBar, useUpdateMyBar } from '@/api/MyBarApi'
import ManageBarForm from '@/forms/manage-bar-form/ManageBarForm'

const ManageBarPage = () => {
  const { bar} = useGetMyBar()
    const { createMyBar,isLoading:isCreateLoading} = useCreateMyBar()
    const { updateMyBar,isLoading:isUpadteLoading } = useUpdateMyBar()
    const editing=!!bar
  return (
    <ManageBarForm
        bar={bar}
        isLoading={isCreateLoading || isUpadteLoading}
        onSave={ editing ? updateMyBar : createMyBar}
    />
  )
}
export default ManageBarPage
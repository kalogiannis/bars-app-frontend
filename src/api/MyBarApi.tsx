
import { useAuth0 } from '@auth0/auth0-react'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { toast } from 'sonner'
import { Bar } from '@/types'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL!
const QUERY_KEY = 'fetchBar'

export const useGetMyBar = () => {
  const { getAccessTokenSilently } = useAuth0()
  const getMyBarRequest = async (): Promise<Bar> => {
    const token = await getAccessTokenSilently()
    const res = await fetch(`${API_BASE_URL}/api/my/bar`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    if (!res.ok) throw new Error('Failed to get bar')
    return res.json()
  }

  const { data: bar, isLoading } = useQuery<Bar>(QUERY_KEY, getMyBarRequest)
  return { bar, isLoading }
}

export const useCreateMyBar = () => {
  const { getAccessTokenSilently } = useAuth0()
  const qc = useQueryClient()

  const createMyBarRequest = async (data: FormData): Promise<Bar> => {
    const token = await getAccessTokenSilently()
    const res = await fetch(`${API_BASE_URL}/api/my/bar`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data, 
    })
    if (!res.ok) {
      throw new Error('Failed to create bar')
    }
    return res.json()
  }

  const {
    mutate: createMyBar,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createMyBarRequest, {
    onSuccess: () => qc.invalidateQueries(QUERY_KEY),
  })

  if (isSuccess) toast.success('Bar was created')
  if (error) toast.error('Failed to create bar')

  return { createMyBar, isLoading }
}

export const useUpdateMyBar = () => {
  const { getAccessTokenSilently } = useAuth0()
  const qc = useQueryClient()

  const updateMyBarRequest = async (data: FormData): Promise<Bar> => {
    const token = await getAccessTokenSilently()
    const res = await fetch(`${API_BASE_URL}/api/my/bar`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: data,
    })
    if (!res.ok) throw new Error('Failed to update bar')
    return res.json()
  }

  const {
    mutate: updateMyBar,
    isLoading,
    isSuccess,
    error,
  } = useMutation(updateMyBarRequest, {
    onSuccess: () => qc.invalidateQueries(QUERY_KEY),
  })

  if (isSuccess) toast.success('Bar was updated')
  if (error) toast.error('Failed to update bar')

  return { updateMyBar, isLoading }
}


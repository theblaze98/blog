import { axiosConfig } from '@/helpers'
import { IPostsResponse } from '@/interfaces'

export const getAllPosts = async (): Promise<IPostsResponse[]> => {
	const res = await axiosConfig('posts')
	return res.data
}

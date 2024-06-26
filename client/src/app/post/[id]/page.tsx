'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Avatar, Divider, Image } from '@nextui-org/react'
import { getPostById } from '@/services/post.service'
import { IPostsResponse } from '@/interfaces'

export default function Page() {
	const { id } = useParams()
	const [post, setPost] = useState<IPostsResponse>()

	const getPost = async () => {
		try {
			const data = await getPostById(`${id}`)
			console.log(data)
			setPost(data)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		getPost()
	})

	return (
		<main className='w-11/12 max-w-5xl mx-auto min-h-[calc(100vh-160px)]'>
			<div className='flex justify-between items-center'>
				<div className='flex items-center gap-5'>
					<Avatar
						src={post?.author.avatarUrl}
						alt={post?.author.username}
						size='lg'
					/>
					<h3 className='text-xl'>{post?.author.username}</h3>
				</div>
				<span className='text-xs text-foreground-400'>{post?.createdAt}</span>
			</div>
			<Divider className='my-4 bg-foreground-300' />

			<h2 className='text-3xl text-center mb-5 font-medium'>{post?.title}</h2>

			<div className='flex justify-center w-full'>
				<Image
					src={post?.imageUrl}
					alt={post?.title}
					className='max-w-xl mb-5 aspect-auto w-full'
				/>
			</div>
			<p className=''>{post?.content}</p>
		</main>
	)
}

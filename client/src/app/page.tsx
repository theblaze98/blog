'use client'
import Image from 'next/image'
import { Avatar } from '@nextui-org/react'
import { IPostsResponse } from "@/interfaces"
import { getAllPosts } from "@/services/post.service"
import { useEffect, useState } from "react"

export default function Home() {
	const [posts, setPots] = useState<IPostsResponse[]>()

	const getPost = async () => {
		const data = await getAllPosts()
		setPots(data)
	}

	useEffect(() => {
		getPost()
	}, [])

	return (
		<>
			<main>
				{posts?.map(post => (
					<>
						<span key={post.id}>{post.title}</span>
						<Avatar
							src={post.author.avatarUrl}
							alt={post.author.username}
							size='sm'
						/>
						{/* <Image
							src={post.author.avatarUrl}
							alt={post.author.username}
							width={200}
							height={200}
						/> */}
					</>
				))}
			</main>
		</>
	)
}
